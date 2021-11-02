# 스프링부트와 AWS로 혼자 구현하는 웹서비스

mkdate : 2020-07-11-Sat, 07-13-Mon

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

<br />

----

### 무중단 배포 스크립트

#### `ProfileController`

배포시 어떤 포트를 쓸지 판단하는 API 추가

> https://github.com/gitgitWi/book-aws/commit/777aa623c070842482ff1ba444f5c8c908a2dfe8

- ProfileController : "/profile" 로 접속했을 때 현재 활성화된 profile 출력
- ProfileControllerUnitTest
- ProfileControllerTest


#### real1, real2 properties

> https://github.com/gitgitWi/book-aws/commit/88a8cf6ba5d4096f9213c99fb31485bd95a5887f

- `application-real1.properties` : 8081 port
- `application-real2.properties` : 8082 port

`application-real.properties`와 거의 동일하나, `server.port=` 추가

```properties

server.port=8081
spring.profiles.include=oauth,real-db
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5InnoDBDialect
spring.session.store-type=jdbc

```

#### Nginx 설정 수정

***무중단 배포의 핵심***

배포할 때마다 NginX 프록시 설정 교체


```bash

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

<br />

---

### 배포 스크립들 작성


#### 무중단 배포 위한 새로운 디렉토리 생성

```bash

[ec2-user@gitgitwi-spring app]$ mkdir ./deploy2 && mkdir ./deploy2/zip

[ec2-user@gitgitwi-spring app]$ ll
total 24
-rw-rw-r-- 1 ec2-user ec2-user 1194 Jul 10 18:01 application-oauth.properties
-rw-rw-r-- 1 ec2-user ec2-user  287 Jul 10 19:04 application-real-db.properties
drwxrwxr-x 3 ec2-user ec2-user 4096 Jul 13 09:10 deploy
drwxrwxr-x 3 ec2-user ec2-user 4096 Jul 13 09:38 deploy2
drwxrwxr-x 2 ec2-user ec2-user 4096 Jul 10 15:42 git
drwxrwxr-x 3 ec2-user ec2-user 4096 Jul 10 19:13 test1

```


#### `appspec.yml` 수정

- 무중단 배포 위한 디렉토리 지정

```yaml

...
files:
  - source:  /
	# 위에서 생성한 디렉토리로 지정
    destination: /home/ec2-user/app/deploy2/zip/
...

hooks:
  AfterInstall:
    - location: stop.sh
      timeout: 60
      runas: ec2-user

  ApplicationStart:
    - location: start.sh 
      timeout: 60
      runas: ec2-user

  ValidateService:
    - location: health.sh
      timeout: 60
      runas: ec2-user

```


#### Scripts

`stop.sh`

- NginX 와 연결되지 않았지만 실행 중인 SpringBoot 종료 

```bash

#!/usr/bin/env bash

# 현재 stop.sh 가 위치한 경로
ABSPATH=$(readlink -f $0)
ABSDIR=$(dirname $ABSPATH)

# import
source ${ABSDIR}/profile.sh

IDLE_PORT=$(find_idle_port)

echo "> $IDLE_PORT 에서 구동중인 App PID 확인"
IDLE_PID=$(lsof -ti tcp:${IDLE_PORT})

if [ -z ${IDLE_PID} ]
then
  echo "> 현재 구동중인 App이 없으므로 종료하지 않습니다."
else
  echo "> kill -15 $IDLE_PID"
  kill -15 ${IDLE_PID}
  sleep 5
fi 

```


`start.sh`

- NginX 와 연결되지 않은 port 로 새 버전의 SpringBoot 시작
- `stop.sh` 로 종료한 profile로 실행
- 기본구조는 기존 `deploy.sh` 와 유사

```bash

#!/usr/bin/env bash

ABSPATH=$(readlink -f $0)
ABSDIR=$(dirname $ABSPATH)
source ${ABSDIR}/profile.sh

REPOSITORY=/home/ec2-user/app/deploy2
PROJECT_NAME=book-aws

echo "> Copy Build Files"

cp $REPOSITORY/zip/*.jar $REPOSITORY/

echo "> Deploy New Application"

JAR_NAME=$(ls -tr $REPOSITORY/*.jar | tail -n 1)

echo "> JAR NAME : $JAR_NAME"

echo "> Add Execution Authority to $JAR_NAME"

chmod +x $JAR_NAME

echo "> START $JAR_NAME"

IDLE_PROFILE=$(find_idle_profile)

echo "> $JAR_NAME profile = $IDLE_PROFILE"

nohup java -jar \
        -Dspring.config.location=classpath:/application.properties,classpath:application-$IDLE_PROFILE.properties,/home/ec2-user/app/application-oauth.properties,/home/ec2-user/app/application-real-db.properties \
        -Dspring.profiles.active=$IDLE_PROFILE \
        $JAR_NAME > $REPOSITORY/nohup.out 2>&1 &
        
```

`health.sh`

- `start.sh` 로 실행시킨 새 프로젝트가 정상 실행되는지 확인

```bash

#!/usr/bin/env bash

ABSPATH=$(readlink -f $0)
ABSDIR=$(dirname $ABSPATH)
source ${ABSDIR}/profile.sh
source ${ABSDIR}/switch.sh

IDLE_PORT=$(find_idle_port)

echo "> Health Check Start.."
echo "> IDLE_PORT : $IDLE_PORT"
echo "> curl -s http://localhost:$IDLE_PORT/profile"

sleep 10

for RETRY_COUNT in {1..10}
do
  RESPONSE=$( curl -s http://localhost:${IDLE_PORT}/profile )
  UP_COUNT=$( echo ${RESPONSE} | grep 'real' | wc -l )

  # UP_COUNT>= 1 인 경우
  # 'real' 문자열 있는지 
  if [ ${UP_COUNT} -ge 1 ]
  then
    echo "> SUCCESS : Health Check"
    switch_proxy
    break
  else
    echo "> ERROR : Can't understand Response of Health Check or Doesn't Running"
    echo "> Health Check : ${RESPONSE}"
  fi

  if [ ${RETRY_COUNT} -eq 10 ]
  then
    echo "> FAIL : Health Check"
    echo "> Terminate Deployment without Connection to NginX"
    exit 1
  fi

  echo "> Retry ... Fail to Health Check Connection"
  sleep 10
done

```


`switch.sh`

- NginX 가 바라보는 SpringBoot 를 최신 버전으로 변경

```bash

#!/usr/bin/env bash

ABSPATH=$(readlink -f $0)
ABSDIR=$(dirname $ABSPATH)
source ${ABSDIR}/profile.sh

function switch_proxy() {

    IDLE_PORT=$(find_idle_port)

    echo "> Port to Switch : $IDLE_PORT"
    echo "> Switching Port"
	
	# 하나의 문장 만들어 다음 파이프라인으로 넘김
	# 반드시 홑따옴표 사용
	# `sudo tee..` :  앞에서 넘어온 문장을 `service-url.inc` 에 덮어씀
    echo 'set \$service_url http://127.0.0.1:${IDLE_PORT};' | sudo tee /etc/nginx/conf.d/service-url.inc

    echo "> Reload NginX"

	# nginx reload는 restart와 다르게 중단 없이 불러옴
	# 중요 설정들은 반영되지 않음
    sudo service nginx reload

}

```


`profile.sh`

- 위 4개 스크립트 파일에서 공용으로 사용할 profile 과 port 체크 로직

```bash

#!/usr/bin/env bash

# 쉬고 있는 profile (IDLE_PROFILE) 찾는 함수
function find_idle_profile ()
{
	# 현재 Nginx 가 바라보는 SpringBoot 가 정상 수행 중인지 확인
	# HttpStatus 값을 받음
    RESPONSE_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/profile)

	# 오류 코드가 400 이상이면 예외로 보고 real2 를 profile 로 사용
    if [ ${RESPONSE_CODE} -ge 400 ]
    then
      CURRENT_PROFILE=real2
    else
      CURRENT_PROFILE=$(curl -s http://localhost/profile )
    fi

    if [ ${CURRENT_PROFILE } ==real1 ]
    then
      IDLE_PROFILE=real2
    else
      IDLE_PROFILE=real1
    fi

	# bash 에서는 함수 값을 return 하는 기능 없음,
	# echo 로 출력되는 값을 클라이언트에서 잡아서 사용
	# 그래서 중간에 echo 있으면 안됨
    echo "${IDLE_PROFILE}"
}

# 쉬고 있는 profile 의 port 찾는 함수
function find_idle_port()
{
    IDLE_PROFILE=$(find_idle_profile)

    if [ ${IDLE_PROFILE} == real1 ]
    then
      echo "8081"
    else
      echo "8082"
    fi
}

```

<br />

---

### 배포 테스트

배포 후 CodeDeploy log 확인

```bash

[ec2-user@gitgitwi-spring app]$ tail -f /opt/codedeploy-agent/deployment-root/deployment-logs/codedeploy-agent-deployments.log

```

SpringBoot log 확인

```bash

[ec2-user@gitgitwi-spring deploy2]$ cat ~/app/deploy2/nohup.out

# 또는 

[ec2-user@gitgitwi-spring deploy2]$ vim ~/app/deploy2/nohup.out

```

자바 애플리케이션 실행 여부 확인

```bash

[ec2-user@gitgitwi-spring deploy2]$ ps -ef | grep java
ec2-user  2701     1  0 09:10 ?        00:00:29 java -jar -Dspring.config.location=classpath:/application.properties,classpath:application-real.properties,/home/ec2-user/app/application-oauth.properties,/home/ec2-user/app/application-real-db.properties -Dspring.profiles.active=real /home/ec2-user/app/deploy/sams-1.0.1-SNAPSHOT-202007130009.jar
ec2-user  3836     1 11 11:58 ?        00:00:16 java -jar -Dspring.config.location=classpath:/application.properties,classpath:application-real1.properties,/home/ec2-user/app/application-oauth.properties,/home/ec2-user/app/application-real-db.properties -Dspring.profiles.active=real1 /home/ec2-user/app/deploy2/sams-1.0.1-SNAPSHOT-202007130256.jar
ec2-user  3938  2644  0 12:00 pts/0    00:00:00 grep --color=auto java

```