# 스프링부트와 AWS로 혼자 구현하는 웹서비스

mkdate : 2020-07-09-Thu ~ 07-10-Fri

## Ch08. EC2 서버에 프로젝트 배포

### EC2에서 `git clone`

```bash

[ec2-user@gitgitwi-spring ~]$ git --version
-bash: git: command not found

[ec2-user@gitgitwi-spring ~]$ sudo yum install git

[ec2-user@gitgitwi-spring ~]$ git --version
git version 2.14.5

```

git 설치

```bash

[ec2-user@gitgitwi-spring ~]$ pwd
/home/ec2-user

[ec2-user@gitgitwi-spring ~]$ mkdir ~/app && mkdir ~/app/test1 && cd ~/app/test1

[ec2-user@gitgitwi-spring test1]$ pwd
/home/ec2-user/app/test1

```

프로젝트 저장할 임시 디렉토리 생성 및 이동

```bash

[ec2-user@gitgitwi-spring test1]$ git clone https://github.com/gitgitWi/book-aws
Cloning into 'book-aws'...
Username for 'https://github.com': johnwi@knou.ac.kr
Password for 'https://johnwi@knou.ac.kr@github.com': 
remote: Enumerating objects: 145, done.
remote: Counting objects: 100% (145/145), done.
remote: Compressing objects: 100% (88/88), done.
remote: Total 145 (delta 32), reused 138 (delta 25), pack-reused 0
Receiving objects: 100% (145/145), 79.64 KiB | 292.00 KiB/s, done.
Resolving deltas: 100% (32/32), done.

[ec2-user@gitgitwi-spring test1]$ ll
total 4
drwxrwxr-x 5 ec2-user ec2-user 4096 Jul  9 17:53 book-aws

[ec2-user@gitgitwi-spring test1]$ cd book-aws

[ec2-user@gitgitwi-spring book-aws]$ ll
total 28
-rw-rw-r-- 1 ec2-user ec2-user 1907 Jul  9 17:53 build.gradle
drwxrwxr-x 3 ec2-user ec2-user 4096 Jul  9 17:53 gradle
-rw-rw-r-- 1 ec2-user ec2-user 5764 Jul  9 17:53 gradlew
-rw-rw-r-- 1 ec2-user ec2-user 2842 Jul  9 17:53 gradlew.bat
-rw-rw-r-- 1 ec2-user ec2-user   27 Jul  9 17:53 settings.gradle
drwxrwxr-x 4 ec2-user ec2-user 4096 Jul  9 17:53 src

```

git clone project

```bash

[ec2-user@gitgitwi-spring book-aws]$ ./gradlew test
-bash: ./gradlew: Permission denied

[ec2-user@gitgitwi-spring book-aws]$ chmod +x ./gradlew

[ec2-user@gitgitwi-spring book-aws]$ ./gradlew test

```

권한 없는 경우 권한 설정 후 gradle build

<br />

---

### 배포 스크립트 만들기

#### '배포'란?

작성한 코드를 실제 서버에 반영하는 것

- `git clone`, `git pull` 을 통해 새 버전의 프로젝트 다운로드
- Gradle 또는 Maven 을 통해 프로젝트 테스트 - 빌드
- EC2 서버에서 해당 프로젝트 실행 및 재실행

#### 배포 스크립트

```bash

[ec2-user@gitgitwi-spring ~]$ vim ~/app/test1/deploy.sh

```

스크립트 파일 생성
- 프로젝트 디렉토리의 상위 디렉토리에 있어야 함

```bash

#! /bin/bash

REPOSITORY=/home/ec2-user/app/test1
PROJECT_NAME=book-aws

cd $REPOSITORY/$PROJECT_NAME/

echo "> Git Pull"

git pull

echo "> Start Building Project"

./gradlew build

echo "> Change Directory to Test"

cd $REPOSITORY

echo "> Copy Build Files"

cp $REPOSITORY/$PROJECT_NAME/build/libs/*.jar $REPOSITORY/

echo "> Check Current Application Pids"

# pgrep : process id만 추출
# -f : process 이름으로 검색
CURRENT_PID=$(pgrep -f ${PROJECT_NAME}*.jar)

echo "> Current Application Pids : $CURRENT_PID"

if [ -z "$CURRENT_PID" ] ; then
	echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다."

else
	echo "> kill -15 $CURRENT_PID"
	kill -15 $CURRENT_PID
	sleep 5
fi

echo "> Deploy New Application"

# 새로 실행할 jar파일 찾아서
# 여러 jar파일 중 가장 마지막(최신) 파일을 변수에 저장
JAR_NAME=$(ls -tr $REPOSITORY/ | grep *.jar | tail -n 1)

echo "> JAR NAME : JAR_NAME"

# nohup으로 파일 실행
# application-oauth.properties 파일 위치 설정
nohup java -jar \
        -Dspring.config.location=classpath:/application.properties,/home/ec2-user/app/application-oauth.properties \
        $REPOSITORY/$JAR_NAME 2>&1 &

```

```bash

[ec2-user@gitgitwi-spring git]$ chmod +x ./deploy.sh

[ec2-user@gitgitwi-spring test1]$ ll
total 8
drwxrwxr-x 7 ec2-user ec2-user 4096 Jul  9 18:03 book-aws
-rwxrwxr-x 1 ec2-user ec2-user  822 Jul 10 15:58 deploy.sh

```

`deploy.sh`에 권한 부여

- `-rwxrwxr-x` : 마지막 `x` 권한 추가되었는지 확인

```bash

[ec2-user@gitgitwi-spring test1]$ ./deploy.sh
> Git Pull

# 해당 github repo가 private으로 설정되어 로그인 필요

Username for 'https://github.com': johnwi@knou.ac.kr 
Password for 'https://johnwi@knou.ac.kr@github.com': 
Already up-to-date.
> Start Building Project
Starting a Gradle Daemon (subsequent builds will be faster)

Deprecated Gradle features were used in this build, making it incompatible with Gradle 5.0
Use '--warning-mode all' to show the individual deprecation warnings.
See https://docs.gradle.org/4.10.2/userguide/command_line_interface.html#sec:command_line_warnings

BUILD SUCCESSFUL in 14s
6 actionable tasks: 1 executed, 5 up-to-date
> Change Directory to Test
> Copy Build Files
> Check Current Application Pids
> Current Application Pids : 
> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다.
> Deploy New Application
> JAR NAME : JAR_NAME

[ec2-user@gitgitwi-spring test1]$ nohup: appending output to 'nohup.out'

```

자동 배포

<br />

---

### 외부 Security 파일 등록

1. `/home/ec2-user/app/` 디렉토리에 `application-oauth.properties` 파일 생성

2. `deploy.sh` 파일 수정
	- application-oauth.properties 파일이 gitignore에 등록되어 git pull로 받아지지 않으므로 Spring 설정 파일 위치 설정

<br />

---

### MariaDB RDS 사용하기

#### Table 생성

H2 DB와 다르게 MariaDB를 사용하는 경우 직접 Table 생성해야 함

RDS에서 해당 Query 실행하여 테이블 생성

- JPA Entity Table test 코드 수행시 로그로 생성되는 코드 복사하면 편함

```sql

SpringBoot0709> create table posts (id bigint not null auto_increment, created_date datetime, modified_date datetime, author varchar(255), content TEXT not null, title varchar(500) not null, primary key (id)) engine=InnoDB
[2020-07-10 18:51:01] completed in 51 ms

SpringBoot0709> create table user (id bigint not null auto_increment, created_date datetime, modified_date datetime, email varchar(255) not null, name varchar(255) not null, picture varchar(255), role varchar(255) not null, primary key (id)) engine=InnoDB
[2020-07-10 18:51:01] completed in 19 ms

```

- Spring Session Table : spring session 라이브러리에 있는 schema-mysql.sql 복사하여 실행

```sql

mysql> show databases
[2020-07-10 18:48:27] 5 rows retrieved starting from 1 in 176 ms (execution: 45 ms, fetching: 131 ms)

mysql> use SpringBoot0709
[2020-07-10 18:48:37] completed in 13 ms

SpringBoot0709> CREATE TABLE SPRING_SESSION (
                                                PRIMARY_ID CHAR(36) NOT NULL,
                                                SESSION_ID CHAR(36) NOT NULL,
                                                CREATION_TIME BIGINT NOT NULL,
                                                LAST_ACCESS_TIME BIGINT NOT NULL,
                                                MAX_INACTIVE_INTERVAL INT NOT NULL,
                                                EXPIRY_TIME BIGINT NOT NULL,
                                                PRINCIPAL_NAME VARCHAR(100),
                                                CONSTRAINT SPRING_SESSION_PK PRIMARY KEY (PRIMARY_ID)
                ) ENGINE=InnoDB ROW_FORMAT=DYNAMIC
[2020-07-10 18:49:06] completed in 37 ms

SpringBoot0709> CREATE UNIQUE INDEX SPRING_SESSION_IX1 ON SPRING_SESSION (SESSION_ID)
[2020-07-10 18:49:23] completed in 29 ms

SpringBoot0709> CREATE INDEX SPRING_SESSION_IX2 ON SPRING_SESSION (EXPIRY_TIME)
[2020-07-10 18:49:23] completed in 36 ms

SpringBoot0709> CREATE INDEX SPRING_SESSION_IX3 ON SPRING_SESSION (PRINCIPAL_NAME)
[2020-07-10 18:49:23] completed in 18 ms

SpringBoot0709> CREATE TABLE SPRING_SESSION_ATTRIBUTES (
                                                           SESSION_PRIMARY_ID CHAR(36) NOT NULL,
                                                           ATTRIBUTE_NAME VARCHAR(200) NOT NULL,
                                                           ATTRIBUTE_BYTES BLOB NOT NULL,
                                                           CONSTRAINT SPRING_SESSION_ATTRIBUTES_PK PRIMARY KEY (SESSION_PRIMARY_ID, ATTRIBUTE_NAME),
                                                           CONSTRAINT SPRING_SESSION_ATTRIBUTES_FK FOREIGN KEY (SESSION_PRIMARY_ID) REFERENCES SPRING_SESSION(PRIMARY_ID) ON DELETE CASCADE
                ) ENGINE=InnoDB ROW_FORMAT=DYNAMIC
[2020-07-10 18:49:31] completed in 55 ms

```

#### 프로젝트 & EC2 설정

`build.gradle` : MariaDB 의존성 추가

```

compile('org.mariadb.jdbc:mariadb-java-client')

```

`application-real.properties` 파일 생성

- 서버에서 구동될 환경 설정

```

spring.profiles.include=oauth,real-db
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5InnoDBDialect
spring.session.store-type=jdbc

```

`application-real-db.properties` 파일 생성

- 서버 접속 관련 설정이므로 github에 저장하지 않고,
- EC2에서 직접 생성

```

# JPA로 테이블 자동생성 되는 것 방지
# 실제 운영되는 테이블이므로 절대 스프링 부트가 자동 생성하면 안됨
spring.jpa.hibernate.ddl-auto=none
spring.datasource.url=jdbc:mariadb://{RDS주소}:3306/{DB이름}
spring.datasource.username=DB계정
spring.datasource.password=PWD
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver

```

`deploy.sh` 수정
- `/home/ec2-user/app/application-real-db.properties` ; `application-real-db.properties` 경로 추가
- `-Dspring.profiles.active=real` : `application-real.properties` 활성화

```bash

nohup java -jar \
        -Dspring.config.location=classpath:/application.properties,/home/ec2-user/app/application-oauth.properties,/home/ec2-user/app/application-real-db.properties \
        -Dspring.profiles.active=real \
        $REPOSITORY/$JAR_NAME 2>&1 &

```

`./deploy.sh` 실행하여 프로젝트 실행 확인

```bash

[ec2-user@gitgitwi-spring test1]$ vim nohup.out

	# 아래처럼 Tomcat / Application 이 시작됐다는 내용 있으면 성공
	2020-07-10 16:01:17.696  INFO 6757 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
	2020-07-10 16:01:17.700  INFO 6757 --- [           main] com.spring.booting.Application           : Started Application in 18.046 seconds (JVM running for 19.15)


# HTML이 정상적으로 불러와지면 성공
[ec2-user@gitgitwi-spring test1]$ curl localhost:8080

```

<br />

---

### 소셜 로그인

EC2 보안 그룹 > 인바운드 > 8080 포트가 전체공개 (0.0.0.0) 되어있는지 확인

퍼블릭 DNS 확인

![image](https://user-images.githubusercontent.com/57997672/87144070-278a6480-c2e2-11ea-8757-dd4ed0363ef5.png)

구글 및 네이버에 위 도메인 등록

- 구글 : 기존 사용자 인증정보에서 URI 추가

![image](https://user-images.githubusercontent.com/57997672/87144658-12620580-c2e3-11ea-8027-1cfa92c73d3b.png)

- 네이버
	- 서비스 URL 수정 : DNS 그대로
	- Callback URL 추가 : DNS + 8080 포트 + 로그인 시 리다이렉션 주소

![image](https://user-images.githubusercontent.com/57997672/87144958-87cdd600-c2e3-11ea-9069-15451c43bc89.png)
