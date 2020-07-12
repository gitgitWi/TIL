# 자주 쓰이는 리눅스 명령어 모음

## Linux 환경 설정

### `(sudo) apt / apt-get update`

### TimeZone 설정

```

$ sudo rm /etc/localtime

$ sudo ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime

$ date

```

#### Goorm IDE

- `sudo apt/apt-get update`에서 PublicKey 문제 발생

- `sudo apt-get install --upgrade openjdk-8-jdk` 이런식으로 하나하나 업데이트는 됨

### apt-get 막혀서 안되는 경우

DeepNote 등 일부 가상환경에서 apt-get으로 설치 가능한 패키지 일부를 막아놓은 경우


- refs ) https://imitator.kr/Linux/3366

- /etc/apt/sources.list 를 수정해야 함
- sources.list 수정도 아예 막아놓은 경우, 현재 workspace에서 작성 후 `cp sources.list /etc/apt/sources.list`

```bash

$ vi /etc/apt/sources.list

```
    
- 각 주소 뒤에 `restricted universe multiverse` 를 추가

```

deb http://archive.ubuntu.com/ubuntu bionic main restricted universe multiverse

deb http://archive.ubuntu.com/ubuntu bionic-security main restricted universe multiverse

deb http://archive.ubuntu.com/ubuntu bionic-updates main restricted universe multiverse 

```

<br />

---

## JAVA 설치

```bash

$ sudo apt-get install -y java-1.8.0-openjdk-devel.x86_64

$ sudo /usr/sbin/alternatives --config java

```

<br />

---

## MySQL 

설정 파일

```bash

$ vim /etc/mysql/mysql.conf.d/mysqld.cnf

```

접속

```bash

$ sudo service mysql start

$ mysql -u root -p

```
