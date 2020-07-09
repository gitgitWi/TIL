# 스프링부트와 AWS로 혼자 구현하는 웹서비스

mkdate : 2020-07-09-Thu

## Ch06. AWS 서버 환경 만들기 - AWS EC2

### EC2 인스턴스 생성

인스턴스 시작

#### OS

Amazon Linux 1 추천

- 아직 국내에는 2보다 1에 대한 자료가 많음
- Amazon Linux 1는 CentOS 6과 유사 ; RedHat Linux 계열
- 아마존의 지원, AWS 각종 서비스와 상성 좋고, 독자적인 개발 repository 사용으로 yum install이 빠름

#### 태그

웹 콘솔에서 표시될 태그

- Name : SpringBoot-AWS

#### 보안그룹

방화벽 설정

- SSH 22 : 로컬에서 터미널로 접속할 때 사용
- TCP 8080 : 전체 오픈하여 접속, Nginx-Tomcat 등
- HTTPS 443

#### pem Key

마스터키

#### EIP 할당

![image](https://user-images.githubusercontent.com/57997672/87000573-62ac6b00-c1f0-11ea-90b6-78519609326d.png)

Elastic IP (탄력적 IP)

인스턴스 생성 및 재시작할 때마다 새로운 IP 할당

접속할 때마다 IP를 확인할 필요없도록 고정 IP를 할당받아야

![image](https://user-images.githubusercontent.com/57997672/87000511-2c6eeb80-c1f0-11ea-8f93-0f35c98be657.png)

***할당받은 EIP를 바로 EC2에 연결하지 않으면 비용 발생***

<br />

---

### EC2 접속

#### on MacOS

- SSH 접속을 편하게 위해 pem 파일을 `~/.ssh`로 복사

```bash

# pem파일 저장한 경로로 이동
$ cd /Users/WnJ/.../AWS/

$ cp SpringBoot-AWS.pem ~/.ssh/

# ssh 디렉토리로 이동하여, 잘 복사되었는지 확인
$ cd ~/.ssh/ && ll

# pem키의 권한 변경
$ chmod 600 ~/.ssh/SpringBoot-AWS-0709.pem

# Host config 파일 생성
$ vim ~/.ssh/config

Host SpringBoot # 원하는 이름
        HostName 000.000.000.000 # EIP 주소
        User ec2-user
        IdentityFile ~/.ssh/[pem키 파일명].pem

# Config 파일 권한 설정
$ chmod 700 ~/.ssh/config

# SSH로 접속
$ ssh SpringBoot

The authenticity of host '000.000.000.000 (000.000.000.000)' can't be established.
ECDSA key fingerprint is SHA256:vc1Knb0qYHowgpN94xWn9mF56V1jSEwr3/V4yf4sZtw.
Are you sure you want to continue connecting (yes/no/[fingerprint])? y
Please type 'yes', 'no' or the fingerprint: yes
Warning: Permanently added '000.000.000.000' (ECDSA) to the list of known hosts.

       __|  __|_  )
       _|  (     /   Amazon Linux AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-ami/2018.03-release-notes/
1 package(s) needed for security, out of 3 available
Run "sudo yum update" to apply all updates.
-bash: warning: setlocale: LC_CTYPE: cannot change locale (UTF-8): No such file or directory
[ec2-user@ip- ~]$ 

```

EC2 접속 성공!

#### on Windows

pass

<br />

---

### 필수 설정

#### Java 8 설치

```bash

[ec2-user@ip- ~]$ java -version
java version "1.7.0_261"
OpenJDK Runtime Environment (amzn-2.6.22.1.83.amzn1-x86_64 u261-b02)
OpenJDK 64-Bit Server VM (build 24.261-b02, mixed mode)

```

Amazon Linux 1에는 기본으로 Java 7 설치됨

```bash

[ec2-user@ip- ~]$ sudo yum install -y java-1.8.0-openjdk-devel.x86_64

```

OpenJDK 1.8 설치

``` bash

[ec2-user@ip- ~]$ java -version
java version "1.7.0_261"
OpenJDK Runtime Environment (amzn-2.6.22.1.83.amzn1-x86_64 u261-b02)
OpenJDK 64-Bit Server VM (build 24.261-b02, mixed mode)

```

설치했더라도 기본 JDK는 1.7로 설정되어있음

```bash

[ec2-user@ip- ~]$ sudo /usr/sbin/alternatives --config java

There are 2 programs which provide 'java'.

  Selection    Command
-----------------------------------------------
*+ 1           /usr/lib/jvm/jre-1.7.0-openjdk.x86_64/bin/java
   2           /usr/lib/jvm/jre-1.8.0-openjdk.x86_64/bin/java

Enter to keep the current selection[+], or type selection number: 2

```

기본 JDK를 Java 1.8로 지정

```bash

[ec2-user@ip-172-31-39-99 ~]$ java -version
openjdk version "1.8.0_252"
OpenJDK Runtime Environment (build 1.8.0_252-b09)
OpenJDK 64-Bit Server VM (build 25.252-b09, mixed mode)

```

기본 자바 버전 다시 확인

```bash

[ec2-user@ip- ~]$ sudo yum remove java-1.7.0-openjdk

```

사용하지 않는 Java 7 삭제


#### Timezone 변경

EC2 서버의 기본 타임존은 UTC

한국시간 KST로 변경 필요

```bash

# 기존 Timezone 삭제
[ec2-user@ip- ~]$ sudo rm /etc/localtime

# KST 설정
[ec2-user@ip- ~]$ sudo ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime

# KST로 설정되었는지 확인
[ec2-user@ip- ~]$ date
Thu Jul  9 15:07:44 KST 2020

```

#### HostName 변경

HostName은 기본 설정으로 IP를 노출하게 되어있음

원하는 이름(주로 서비스명)으로 변경

```bash

[ec2-user@ip- ~]$ sudo vim /etc/sysconfig/network

# 기존
#
# NETWORKING=yes
# HOSTNAME=localhost.localdomain
# NOZEROCONF=yes

NETWORKING=yes
HOSTNAME=gitgitwi-spring
NOZEROCONF=yes

# 설정 저장했더라도 재부팅해야 적용됨
[ec2-user@ip- ~]$ sudo reboot

[ec2-user@ip- ~]$ 
Broadcast message from ec2-user@ip-
	(/dev/pts/0) at 15:15 ...

The system is going down for reboot NOW!
Connection to #### closed by remote host.
Connection to #### closed.

# 재부팅 잠시 기다렸다가 EC2 재접속
(base) ➜  .ssh ssh SpringBoot

[ec2-user@gitgitwi-spring ~]$ 

```

hosts에 변경한 HostName 등록

- host 주소를 찾을 때 가장 먼저 검색해보는 파일
- 여기에 이름이 등록되지 않으면 장애 발생

```bash

[ec2-user@gitgitwi-spring ~]$ curl gitgitwi-spring
curl: (7) Failed to connect to gitgitwi-spring port 80: Connection refused

[ec2-user@gitgitwi-spring ~]$ sudo vim /etc/hosts

127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost6 localhost6.localdomain6

127.0.0.1   gitgitwi-spring

```

```bash

[ec2-user@gitgitwi-spring ~]$ curl gitgitwi-spring
curl: (7) Failed to connect to gitgitwi-spring port 80: Connection refused

```

아직은 80 포트를 열어놓지 않아서 `port 80: Connection refused` 에러 발생

---

