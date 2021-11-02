# 스프링부트와 AWS로 혼자 구현하는 웹서비스

mkdate : 2020-07-10-Fri

## Ch09. Travis CI 배포 자동화

### CI/CD 개념

CI

- Continiuous Integration
- VCS에 Push되면 자동으로 테스트와 빌드 수행되어 배포 파일 만드는 과정

CD

- Continiuous Deployment
- CI 빌드 결과를 자동으로 운영 서버에 무중단 배포하는 과정


단순히 CI 도구를 도입했다고 CI를 하고 있는 것은 아니다

마틴 파울러, 4가지 규칙

- 모든 소스 코드가 실행되고 있고, 누구든 현재 소스에 접근할 수 있는 단일 지점 유지
- 빌드 프로세스를 자동화해서 누구든 소스로부터 시스템을 빌드하는 단일 명령어 사용할 수 있게 할 것
- ***테스팅 자동화*** - 단일 명령어로 언제든지 시스템에 대한 건전한 테스트 수트 실행 가능할 것
- 누구나 현재 실행 파일을 얻으면 지금까지 가장 완전한 실행 파일을 얻었다는 확신을 하게 할 것

### Travis CI 연동하기

Github에서 제공하는 무료 CI 서비스

cf) 

- Jenkins

	- 설치형 CI
	- EC2 인스턴스 하나 더 필요; 간단한 서비스에서 쓰기 부담

- AWS CodeBuild

	- 빌드 시간만큼 요금 부과

#### Settings

https://travis-ci.org/ > Settings > Activate Repository

![image](https://user-images.githubusercontent.com/57997672/87159602-91176c80-c2fc-11ea-9488-64732f850d5b.png)

`.travis.yml`

> https://github.com/gitgitWi/book-aws/commit/07cfc8e88390036b52869778549dae5ac316342b#diff-354f30a63fb0907d4ad57269548329e3

```yaml

language: java
jdk:
  - openjdk8

branches:
  only:
    - master

# Travis CI Server의 Home
cache:
  directories:
    - '$HOME/.m2/repository'
    - '$HOME/.gradle'

# Permission Denied Error 때문에 추가
before_install:
  - chmod +x ./gradlew

script: "./gradlew clean build"

# CI 완료시 메일 알람
notifications:
  email:
    recipients:
      - gitgitwi@gmail.com

```

git commit & push 후

Travis가 자동으로 감지하여 code building

![image](https://user-images.githubusercontent.com/57997672/87161165-126ffe80-c2ff-11ea-8b9b-859051fca884.png)

<br />

---

### Travis - AWS S3 연동

#### Process

빌드와 배포 분리
: 빌드 없이 배포만 하는 경우도 있음, 확장성을 위해 분리하는 것이 좋다

1. Travis CI : build - jar 전달, 배포 요청

2. AWS S3 : jar 저장 - AWS CodeBuild에 jar 전달

3. AWS CodeBuild : EC2에 배포

#### AWS IAM Key 발급

IAM
: Identity and Access Management
- 외부 서비스에서 접근할 수 있도록 접근 방식 및 권한 관리

**AWS IAM > 사용자 > 사용자 추가**

- 사용자 이름
- 액세스 유형 : 프로그래밍 방식 액세스

![image](https://user-images.githubusercontent.com/57997672/87162569-113fd100-c301-11ea-832f-88802457e112.png)

- 권한설정 : 기존 정책 직접 연결
	- S3 Full Access
	- Code Deploy Full Access

![image](https://user-images.githubusercontent.com/57997672/87162831-709de100-c301-11ea-8e6c-fc87387e44f6.png)

- 태그

![image](https://user-images.githubusercontent.com/57997672/87162997-aa6ee780-c301-11ea-8732-2437702b0b3b.png)

Access Key, Secret Key 확인
- Travis CI 에 등록

![image](https://user-images.githubusercontent.com/57997672/87163145-dd18e000-c301-11ea-93b4-e7c11b1f1652.png)

#### Travis CI에 키 등록

More Options > Settings > Environment Variables

- AWS_ACCESS_KEY
- AWS_SECRET_KEY
- 추후 `.travis.yml`에 동일 이름으로 등록

![image](https://user-images.githubusercontent.com/57997672/87163645-a394a480-c302-11ea-8f54-1b09e2841982.png)

#### S3 버킷 생성

S3
: Simple Storage Service

**S3 > 버킷 만들기**

이름 및 리전

- 이름 : 영소문자로 시작 (대문자X)

![image](https://user-images.githubusercontent.com/57997672/87164499-cc696980-c303-11ea-930c-41df8b0dd47c.png)

버전 관리 설정 : 별다른 설정 필요 없음

권한 설정

- 퍼블릭 액세스 차단 : jar 파일 안에 모든 액세스 Key 값들 등 보안이 필요한 내용들이 담겨있으므로 ***반드시*** 차단 필요

![image](https://user-images.githubusercontent.com/57997672/87164838-3bdf5900-c304-11ea-9e7d-5e26e155201d.png)

#### `.travis.yml` 수정

```yaml

before_deploy:
	# AWS CodeDeploy는 jar 파일 인식 불가능 - Zip 파일로 압축
	# 현재 위치 (프로젝트) 모든 파일을 압축
  - zip -r book-aws * 
	# TravisCI가 실행중인 위치에서 dir 생성
  - mkdir -p deploy
  - mv book-aws.zip deploy/book-aws.zip

deploy:
  - provider: s3
    access_key_id: $AWS_ACCESS_KEY
    secret_access_key: $AWS_SECRET_KEY
    bucket: spring-boot-0701-build
    region: ap-northeast-2
    skip_cleanup: true
    acl: private
	# 위에서 만든 deploy 디렉토리의 파일들만 S3로 전송
    local_dir: deploy
    wait-until-deployed: true

```

S3 버킷에서 zip 파일 확인

![image](https://user-images.githubusercontent.com/57997672/87166262-40a50c80-c306-11ea-91aa-a1315416df1a.png)

<br />

---

### TravisCI - S3 - CodeDeploy 연동

#### EC2에서 사용할 IAM 생성

IAM > 역할 > 역할 만들기

신뢰할 수 있는 유형의 개체 선택
- AWS 서비스

사용 사례 선택
- EC2

![image](https://user-images.githubusercontent.com/57997672/87166688-e193c780-c306-11ea-9ddc-34de934fec21.png)

권한 정책 연결

- EC2 Role for AWS CodeDeploy

![image](https://user-images.githubusercontent.com/57997672/87166818-1011a280-c307-11ea-8769-02be7323552a.png)

태그

- Name : 본인이 식별 가능한 이름으로

![image](https://user-images.githubusercontent.com/57997672/87166952-3e8f7d80-c307-11ea-9844-9551c2d622a0.png)

검토

- 역할 이름 : 원하는 이름

![image](https://user-images.githubusercontent.com/57997672/87167099-6d0d5880-c307-11ea-9eb4-72ab3236083c.png)

EC2 IAM 역할 변경

- 재부팅 필요

![image](https://user-images.githubusercontent.com/57997672/87167305-b65da800-c307-11ea-8971-7ac449b17c8d.png)

![image](https://user-images.githubusercontent.com/57997672/87167386-d9885780-c307-11ea-9a99-aefb95070cc7.png)

#### EC2에 CodeDeploy agent 설치

```bash

[ec2-user@gitgitwi-spring ~]$ aws s3 cp s3://aws-codedeploy-ap-northeast-2/latest/install . --region ap-northeast-2
download: s3://aws-codedeploy-ap-northeast-2/latest/install to ./install

# 권한 부여
[ec2-user@gitgitwi-spring ~]$ chmod +x ./install

[ec2-user@gitgitwi-spring ~]$ sudo ./install auto

# 정상 실행되고 있는지 상태 확인
[ec2-user@gitgitwi-spring ~]$ sudo service codedeploy-agent status
The AWS CodeDeploy agent is running as PID 2751

```

#### CodeDeploy IAM 역할 생성

IAM > 역할 > 역할 만들기

신뢰할 수 있는 유형의 개체 선택
- AWS 서비스

사용 사례 선택
- CodeDeploy

![image](https://user-images.githubusercontent.com/57997672/87168288-359fab80-c309-11ea-96c8-38b9ac2deffe.png)

#### CodeDeploy 생성

AWS 배포 관련 툴 3가지

- Code Commit : 대부분 Github 사용; 거의 쓰이지 않음
- Code Build : 간단한 서비스는 Travis CI, 큰 서비스는 Jenkins/TeamCity; 거의 쓰이지 않음
- Code Deploy : 대체제 없음, 다양한 서비스 제공

애플리케이션 생성

![image](https://user-images.githubusercontent.com/57997672/87168808-00e02400-c30a-11ea-967e-f7a22b2f5e29.png)

![image](https://user-images.githubusercontent.com/57997672/87168918-25d49700-c30a-11ea-9609-99d79cbf7a1b.png)

배포 그룹 생성

![image](https://user-images.githubusercontent.com/57997672/87169186-8d8ae200-c30a-11ea-96af-d23a7c7c02f2.png)

- EC2 인스턴스 연결

![image](https://user-images.githubusercontent.com/57997672/87169225-9a0f3a80-c30a-11ea-93c7-9663389c4f46.png)

- 배포설정 : AllAtOnce (한번에 배포)

![image](https://user-images.githubusercontent.com/57997672/87169270-abf0dd80-c30a-11ea-8b9e-d195ded33ba9.png)

- 로드 밸런서 : 활성화 해제

#### TravisCI - S3 - CodeDeploy 연동

EC2에 zip 파일 저장할 디렉토리 생성

```bash

[ec2-user@gitgitwi-spring ~]$ mkdir ~/app/deploy && mkdir ~/app/deploy/zip

```

- commit
	- https://github.com/gitgitWi/book-aws/commit/b948d5030370ae2b662290a80a7cd3a4ed5557c5
	- https://github.com/gitgitWi/book-aws/commit/be9849d00db8d14fa299cffea7ee65b01eda722b (modified)
- YAML Syntax check : http://www.yamllint.com/

`appspec.yml` : AWS CodeDeploy 설정

```yaml

# CodeDeploy version : 프로젝트 버전이 아니므로 다른 버전 사용시 오류
version: 0.0
os: linux
files:
	# CodeDeploy에 전달한 파일 중 destination으로 이동시킬 대상
	# / : 전체 파일 
  - source: /
    destination: /home/ec2-user/app/deploy/zip/
    overwrite: yes

```

`.travis.yml` 수정

```yaml

deploy:
	
	...

  - provider: codedeploy
    access_key_id: $AWS_ACCESS_KEY
    secret_access_key: $$AWS_SECRET_KEY
    bucket: spring-boot-0701-build
    key: book-aws.zip
    bundle_type: zip
    application: SpringBoot-0701
    deployment_group: SpringBoot-0701
    region: ap-northeast-2
    wait-until-deployed: true

```

TravisCI Build 성공 - CodeDeploy 배포 성공 확인

![image](https://user-images.githubusercontent.com/57997672/87174784-a8615480-c312-11ea-9f23-dac1904d30ee.png)

EC2 ~/app/deploy/zip 에서 파일 확인

```bash

[ec2-user@gitgitwi-spring zip]$ pwd
/home/ec2-user/app/deploy/zip

[ec2-user@gitgitwi-spring zip]$ ll
total 36
-rw-rw-r-- 1 root root  110 Jul 11 01:03 appspec.yml
drwxr-xr-x 8 root root 4096 Jul 11 01:04 build
-rw-rw-r-- 1 root root 1970 Jul 11 01:03 build.gradle
drwxr-xr-x 3 root root 4096 Jul 11 01:04 gradle
-rwxrwxr-x 1 root root 5764 Jul 11 01:03 gradlew
-rw-rw-r-- 1 root root 2842 Jul 11 01:03 gradlew.bat
-rw-rw-r-- 1 root root   27 Jul 11 01:03 settings.gradle
drwxr-xr-x 4 root root 4096 Jul 11 01:04 src

```

연동 완료

<br />

---

### 배포 자동화

#### `scripts/deploy.sh`

이전에 만든 deploy.sh와 거의 유사

CodeDeploy 로그에 표준 입출력 내용 출력
- nohup 실행 시 CodeDeploy는 무한 대기
- `nohup.out` 파일을 별도의 표준 입출력용 파일로 사용하여
- nohup 실행과 동시에 CodeDeploy 실행되도록 설정

```bash

#! /bin/bash

REPOSITORY=/home/ec2-user/app/deploy
PROJECT_NAME=book-aws

echo "> Copy Build Files"

cp $REPOSITORY/zip/*.jar $REPOSITORY/

echo "> Check Current Application PIDs"

CURRENT_PID=$(pgrep -fl book-aws | grep jar | awk '{print $1}')

echo "> Current Application PID : $CURRENT_PID"

if [ -z "$CURRENT_PID" ] ; then
    echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다."

else
    echo "> kill -15 $CURRENT_PID"
    kill -15 $CURRENT_PID
    sleep 5
fi

echo "> Deploy New Application"

JAR_NAME=$(ls -tr $REPOSITORY/*.jar | tail -n 1)

echo "> JAR NAME : JAR_NAME"

echo "> Add Execution Authority to $JAR_NAME"

chmod +x $JAR_NAME

echo "> START $JAR_NAME"

nohup java -jar \
        -Dspring.config.location=classpath:/application.properties,classpath:application-real.properties,/home/ec2-user/app/application-oauth.properties,/home/ec2-user/app/application-real-db.properties \
        -Dspring.profiles.active=real \
        $JAR_NAME > $REPOSITORY/nohup.out 2>&1 &

```

#### `.travis.yml` 수정

지금까지는 프로젝트의 모든 파일을 zip으로 압축

실제 필요한 jar, appspec.yml, 배포 스크립트 외 다른 파일들 포함하지 않도록 `before_deploy` 수정

```yaml

before_deploy:
  - mkdir -p before-deploy
  - cp scripts/*.sh before-deploy/
  - cp appspec.yml before-deploy/
  - cp build/libs/*.jar before-deploy/
  - cd before-deploy && zip -r before-deploy *
  - cd ../ && mkdir -p real-deploy
  - mv before-deploy/before-deploy.zip real-deploy/book-aws.zip

deploy:
  - provider: s3
	...
	# before_deploy 에서 만든 디렉토리와 동일하게 설정
    local_dir: real-deploy

```

#### `appspec.yml` 수정

```yaml

permissions:
  - object: /
    pattern: "**"
    owner: ec2-user
    group: ec2-user

hooks:
  ApplicationStart:
    - location: deploy.sh
      timeout: 60
      runas: ec2-user

```

CodeDeploy에서 배포 확인

![image](https://user-images.githubusercontent.com/57997672/87181373-2dea0200-c31d-11ea-9b7a-b60f39b2a9ef.png)


#### 배포 자동화 테스트

`build.gradle` 프로젝트 버전 업

```

version '1.0.1-SNAPSHOT-'+new Date().format("yyyyMMddHHmm")

```

`index.mustache` 수정

```html

<h1>Spring Boot - AWS 와 함께하는 CRUD / CI/CD </h1>

```

![image](https://user-images.githubusercontent.com/57997672/87182162-8d94dd00-c31e-11ea-821f-a6d15d3ab55d.png)


##### CodeDeploy 로그 확인

```bash

[ec2-user@gitgitwi-spring zip]$ cd /opt/codedeploy-agent/deployment-root/

[ec2-user@gitgitwi-spring deployment-root]$ ll
total 16
drwxr-xr-x 5 root root 4096 Jul 11 02:28 [CodeDeployID]
drwxr-xr-x 2 root root 4096 Jul 11 02:28 deployment-instructions
drwxr-xr-x 2 root root 4096 Jul 11 02:19 deployment-logs
drwxr-xr-x 2 root root 4096 Jul 11 02:28 ongoing-deployment

[ec2-user@gitgitwi-spring deployment-root]$ cd deployment-logs

[ec2-user@gitgitwi-spring deployment-logs]$ ll
total 4
-rw-r--r-- 1 root root 1761 Jul 11 02:28 codedeploy-agent-deployments.log

[ec2-user@gitgitwi-spring deployment-logs]$ vim codedeploy-agent-deployments.log

[2020-07-11 02:28:34.499] [d-5YRO0F3E4]LifecycleEvent - ApplicationStart
[2020-07-11 02:28:34.500] [d-5YRO0F3E4]Script - deploy.sh
[2020-07-11 02:28:34.507] [d-5YRO0F3E4][stdout]> Copy Build Files
[2020-07-11 02:28:34.536] [d-5YRO0F3E4][stdout]> Check Current Application PIDs
[2020-07-11 02:28:34.541] [d-5YRO0F3E4][stdout]> Current Application PID : 3455
[2020-07-11 02:28:34.541] [d-5YRO0F3E4][stdout]> kill -15 3455
[2020-07-11 02:28:39.542] [d-5YRO0F3E4][stdout]> Deploy New Application
[2020-07-11 02:28:39.545] [d-5YRO0F3E4][stdout]> JAR NAME : JAR_NAME
[2020-07-11 02:28:39.545] [d-5YRO0F3E4][stdout]> Add Execution Authority to /home/ec2-user/app/deploy/sams-1.0.1-SNAPSHOT-202007101727.jar
[2020-07-11 02:28:39.546] [d-5YRO0F3E4][stdout]> START /home/ec2-user/app/deploy/sams-1.0.1-SNAPSHOT-202007101727.jar

```
