# 스프링부트와 AWS로 혼자 구현하는 웹서비스

mkdate : 2020-07-11-Sat

## Ch10. Nginx를 활용한 무중단 배포

### 무중단 배포 개념, Nginx

무중단 배포의 다양한 방식

- AWS Blue-Green Deployment
- Docker
- L4 Switch : 장비가 너무 고가라 대형 기업 외에 거의 못 씀
- Nginx : 고성능 웹서버, 오픈소스, 대부분 서비스들이 사용

Reverse Proxy

- Nginx가 외부 요청 받아 백엔드 서버로 요청 전달하는 과정
- 무중단 배포에 활용

Structure

- Nginx : 80 (http), 443 (https) 포트
- Spring Boot Jar 1 : 8081
- Spring Boot Jar 2 : 8082

### Install Nginx

```bash

[ec2-user@gitgitwi-spring ~]$ sudo yum install nginx

[ec2-user@gitgitwi-spring ~]$ sudo service nginx start
Starting nginx:                                            [  OK  ]

```

EC2 보안그룹에 80 포트 추가

![image](https://user-images.githubusercontent.com/57997672/87184186-81ab1a00-c322-11ea-8772-41a049e3430c.png)

8080 없애고 도메인 주소만으로 접근, Nginx 페이지 확인

![image](https://user-images.githubusercontent.com/57997672/87184694-6bea2480-c323-11ea-9764-4a885f490e7c.png)

구글/네이버 로그인에 80 포트로 변경된 주소 추가

![image](https://user-images.githubusercontent.com/57997672/87184453-fda56200-c322-11ea-8054-2ebd2a0819e8.png)


### Spring Boot - Nginx 연동

nginx.conf 파일에서 server > location 부분 수정

```bash

[ec2-user@gitgitwi-spring ~]$ sudo vim /etc/nginx/nginx.conf

	location / {
			// Nginx 에 요청이 오면 해당 주소로 전달
			proxy_pass http://localhost:8080/;
			// X-Real-IP 에 요청자의 IP 저장
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header Host $http_host;
	}

[ec2-user@gitgitwi-spring ~]$ sudo service nginx restart
Stopping nginx:                                            [  OK  ]
Starting nginx:                                            [  OK  ]

```

포트 번호 없이 DNS 주소만으로 접속 가능


### 무중단 배포 스크립트

### `ProfileController`

배포시 어떤 포트를 쓸지 판단하는 API 추가

> https://github.com/gitgitWi/book-aws/commit/777aa623c070842482ff1ba444f5c8c908a2dfe8

- ProfileController : "/profile" 로 접속했을 때 현재 활성화된 profile 출력
- ProfileControllerUnitTest
- ProfileControllerTest


### real1, real2 properties

> https://github.com/gitgitWi/book-aws/commit/88a8cf6ba5d4096f9213c99fb31485bd95a5887f

- `application-real1.properties` : 8081 port
- `application-real2.properties` : 8082 port

`application-real.properties`와 거의 동일하나, `server.port=` 추가

```

server.port=8081
spring.profiles.include=oauth,real-db
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5InnoDBDialect
spring.session.store-type=jdbc

```

#### Nginx 설정 수정

***무중단 배포의 핵심***

배포할 때마다 NginX 프록시 설정 교체


```

[ec2-user@gitgitwi-spring ~]$ pwd
/home/ec2-user

[ec2-user@gitgitwi-spring ~]$ cd /etc/nginx/conf.d/

[ec2-user@gitgitwi-spring conf.d]$ ll
total 4
-rw-r--r-- 1 root root 283 Sep 13  2019 virtual.conf

# service_url 설정 파일
[ec2-user@gitgitwi-spring conf.d]$ sudo vim service-url.inc

set $service_url http://127.0.0.1:8080;


# nginx 설정 파일 수정
[ec2-user@gitgitwi-spring conf.d]$ cd ..

[ec2-user@gitgitwi-spring nginx]$ pwd
/etc/nginx

[ec2-user@gitgitwi-spring nginx]$ sudo vim nginx.conf 

	...
	include /etc/nginx/conf.d/service-url.inc;

	location / {
			proxy_pass $service_url;
	...


[ec2-user@gitgitwi-spring nginx]$ sudo service nginx restart
Stopping nginx:                                            [  OK  ]
Starting nginx:                                            [  OK  ]

```

### 배포 스크립들 작성



