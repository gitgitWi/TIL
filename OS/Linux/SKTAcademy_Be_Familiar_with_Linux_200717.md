# 리눅스와 친해지기

- 번개장터 Data Scientist 김태진
- T 아카데미
- 2020-07-17-Fri


## Intro

강의 계획하게 된 이유

- 머신러닝, 클라우드, 컨테이너.. 대부분 리눅스 기반
- 수요는 많지만 진입장벽이 높고, 하면 할수록 해야 할 것이 너무 많다

강사소개

- 중고거래 플랫폼 서비스
- Data Scientist ; 사기거래 탐지, 자동화, 추천 시스템 등 연구

<br />

---

## Overview

우리에게 컴퓨터는? GUI vs CLI

리눅스를 한다는 것

- 시스템 프로그래밍, 커널 프로그래밍
- 클라우드, 도커
- 서버운용, 머신러닝..

리눅스는 하나의 커널 체계에 불과, CLI 라고 통칭하는 것이 맞다

GUI

- 한 화면에 많은 정보 담을 수 있음, 눈으로 보고 대상을 선택 가능
- 그러나 한 화면에서 다양한 일을 하게 된다면?

CLI

- 눈에는 터미널만 보임
- 까막눈이면 할 수 없지만, 숙련자에겐?

***복잡도가 커질수록 GUI 의 비용은 급격히 증가***

리눅스를 잘 다룬다는 것

- 리눅스 환경에서 파일, 프로그램을 얼마나 잘 다루는가?
- CLI 환경이 얼마나 익숙한가?

<br />

---

## Linux 란?

Linux 커널을 사용하는 Unix 계열 운영체제

- 대규모 오픈소스 프로젝트 by 리누스 토르발스


### 커널 - 운영체제

OS 안에 Kernel Space

- Linux Kernel, Windows Kernel, Unix Kernel ...

OS 위에 User Space

- web browser, game, music ...


Linux Kernel Map

- 매우 다양한 리눅스 커널
- https://makelinux.github.io/kernel/map/


Unix 계보

- open source 라서 수없이 다양함
- 그중에서 유명한 것들이 ubuntu, fedora, debian, red hat, centOS, android ...
- android 도 리눅스 커널을 사용

<br />

---

## AWS EC2를 활용한 리눅스 원격 접속 실습

### 인스턴스 생성

단계 3: 인스턴스 세부정보 구성
- 스팟 인스턴스 요청 : 사용량이 일정 수준 이상 올라갈 경우 자동으로 서버 종료
  ![image](https://user-images.githubusercontent.com/57997672/87750678-0fad6600-c837-11ea-895d-f7df98e26885.png)

    - 최고가격
    - 연속 요청 선택 >> 인터럽트 방식 설정
    - T2 인스턴스에서는 사용 불가

단계 5:  태그 추가

- 규모가 커지는 경우, 생성자 및 생성일시 등 기록

단계 6: 보안 그룹 구성

CI/DI 표기법
- 0.0.0.0/0 : 모든 IP에 개방

Key pair 선택 및 생성

### 인스턴스 접속

SSH 접속 (인스턴스에 연결 화면 참고)

> macOS 기준

```bash

➜  cd ~/.ssh

➜  chmod 400 Key-Pair-Example.pem

➜  ssh -i "Key-Pair-Example.pem" ubuntu@ec2-$$$-$$$-$$$-$$$.ap-northeast-2.compute.amazonaws.com

```

- `ssh` ; secure shell, 원격 보안 연결
- `-i`  ; identification
- ssh 의 기본 포트는 22 : Host의 프로세스에 연결하기 위한 구분


#### SSH Key Pair

원래는 SSH Keygen을 사용해 만들어야 함

- public key : SSH Server의 자물쇠


    ```bash

    ~/.ssh$ cat authorized_keys

    ssh-rsa ....

    ```

- private key : SSH Client의 열쇠

<br />

---

## Linux 활용

### Shell

Hardware - Kernel - Shell - Utilities

- 유틸리티와 커널 사이에서 사용자 명령을 해석하고 처리결과를 출력하는 프로그램

#### 종류

- Linux : bash, zsh, csh, ksh
- Windows : cmd, PowerShell

### 기본 명령어

- tail
- man
- which
- grep
- l / ls / ls -l / ls -al
- alias

```bash

$ alias

alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias grep='grep --color=auto'
alias l='ls -CF'
alias la='ls -A'
alias ll='ls -alF'
alias ls='ls --color=auto'

```

- mv : 이동 또는 이름 변경

  ```bash
  
  $ mkdir 0717

  $ l
  0717/
  
  $ mv 0717 test0717
  
  $ l
  test0717/

  ```

- mkdir
- touch : 파일 생성
- cd : 이동
  - `cd  ` : 홈 디렉토리로 이동
- rm
  - linux에서는 휴지통 개념 없음, 한번 지우면 그냥 지워짐, ***주의!!***
  - `rm -i ###` : 정말 지울 것인지 물어봄
- rmdir / rm -rf


- top / htop : cpu/memory 등 리소스 현황, htop이 좀더 보기좋게 나옴, q로 종료
- ps : 현재 실행 중인 process

```bash

$ ps
  PID TTY          TIME CMD
 1837 pts/1    00:00:00 bash
 1861 pts/1    00:00:00 ps

 $ ps -ef
 UID        PID  PPID  C STIME TTY          TIME CMD

 ```

 - df : 디스크 사용 현황

```bash

$ df -H
Filesystem      Size  Used Avail Use% Mounted on
udev            491M     0  491M   0% /dev
tmpfs           103M  775k  102M   1% /run
/dev/xvda1      8.3G  1.2G  7.1G  15% /           ## Root
tmpfs           514M     0  514M   0% /dev/shm
tmpfs           5.3M     0  5.3M   0% /run/lock
tmpfs           514M     0  514M   0% /sys/fs/cgroup
/dev/loop0      102M  102M     0 100% /snap/core/9289
/dev/loop1       19M   19M     0 100% /snap/amazon-ssm-agent/1566
tmpfs           103M     0  103M   0% /run/user/1000

```

- du : 현재 디렉토리 이하 디렉토리에서 사용하고 있는 disk 용량 확인, 보통 `ls`로 확인

```bash

$ du
4       ./.cache
4       ./.gnupg/private-keys-v1.d
8       ./.gnupg
4       ./test0717
8       ./.config/htop
12      ./.config
8       ./.ssh
52      .

$ du -a
0       ./.cache/motd.legal-displayed
4       ./.cache
4       ./.gnupg/private-keys-v1.d
8       ./.gnupg
4       ./.profile
4       ./.bashrc
4       ./.bash_logout
4       ./test0717
4       ./.config/htop/htoprc
8       ./.config/htop
12      ./.config
4       ./.ssh/authorized_keys
8       ./.ssh
52      .

```

- find : 검색, `grep` 과 같이 사용

```bash

$ find
.
./.cache
./.cache/motd.legal-displayed
./.gnupg
./.gnupg/private-keys-v1.d
./.profile
./.bashrc
./.bash_logout
./test0717
./.config
./.config/htop
./.config/htop/htoprc
./.ssh
./.ssh/authorized_keys

$ find | grep "test"
./test0717

$ find | grep "config"
./.config
./.config/htop
./.config/htop/htoprc

```

- man : manual, q로 종료

```bash

$ man ls
$ man sudo
$ man nohup

```

- ***which*** : 해당 명령어가 실행되고 있는 위치
  - 특히 파이썬 가상환경이 다수인 경우 그 중에서 어떤 파이썬이 실행되고 있는지 파악할 때

```bash

$ which python3
/usr/bin/python3

```

- echo
  - redirection ; 출력된 것 저장
    - `echo 내용 > 파일` : 해당 파일에 내용 저장
    - `echo 내용 >> 파일` : 해당 파일 하단에 내용 추가

- tail : 해당 파일의 아랫 부분 출력
  - `tail -f 파일` : 다른 쉘에서 추가하는 내용 실시간으로 추적, 로그로 활용


```bash

$ echo 2341
2341

$ echo 3411 > test

$ cat test
3411

$ echo 234425 >> test
$ echo 32352352355 >> test
$ echo 57454552352355 >> test

$ cat test
3411
234425
32352352355
57454552352355

$ tail test
3411
234425
32352352355
57454552352355

$ tail -f test
3411
234425
32352352355
57454552352355
Hi

```

### 여러 명령어를 한번에

` ; ` : `명령어; 명령어; 명령어` 

- 중간에 syntax 틀린 명령어가 있는 경우 중단 없이 뒤 명령어도 모두 실행

```bash

$ echo aa ; echo bb;
aa
bb

$ echocho aa ; echo bb;
echocho: command not found
bb

```

`&& , ||`

```bash

$ echo aa || echo bb
aa

$ echo aa && echo bb
aa
bb

$ echocho aa && echo bb
echocho: command not found

$ echocho aa || echo bb
echocho: command not found
bb

```

` | `

: 명령어 실행 이후 결과가 너무 많이 나오는 경우, 서브 명령어 사용
- `grep`, `awk`

```bash

$ ls | grep "test"
test
test0717

# "test" 뻬고 출력
$ ls | grep -v "test"

```


#### Text file에서 검색

sample file 생성

```bash

$ touch sm

$ vi sm

```

파일 sm에서 "WARN"이 포함된 곳 검색

- ` -n ` : numbering; 맨 앞에 몇번째 줄인지 표시

```bash

$ cat sm | grep "WARN" -n
29:03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
35:03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
42:03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
48:03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.

```

출력 결과를 파일로 저장

- `cat sm | grep "WARN" -n > ./warn_log.txt`
- `> 파일 경로`

```bash

$ cat sm | grep "WARN" -n > ./warn_log.txt

$ l
sm  warn_log.txt

$ cat warn_log.txt
29:03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
35:03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
42:03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
48:03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.

```

#### `awk`

- 특정 위치에 있는 내용만 출력
- 반드시 작은 따옴표 사용

```bash

$ ll
total 20
drwxrwxr-x 2 ubuntu ubuntu 4096 Jul 17 06:56 ./
drwxr-xr-x 7 ubuntu ubuntu 4096 Jul 17 06:52 ../
-rw-rw-r-- 1 ubuntu ubuntu 4495 Jul 17 06:52 sm
-rw-rw-r-- 1 ubuntu ubuntu  444 Jul 17 06:56 warn_log.txt

$ ll | awk '{ print $1 }'
total
drwxrwxr-x
drwxr-xr-x
-rw-rw-r--
-rw-rw-r--

```

### File Descriptor

표준 입출력, 에러를 숫자로 표현

```bash

$ touch err_test

$ dvnsfgg 1> err_test
dvnsfgg: command not found

$ dvnsfgg 2> err_test

$ cat err_test
dvnsfgg: command not found

```

### vi 편집기

터미널 환경에서 쓸 수 있는 몇 안되는 편집기
- command mode : esc 누른 상태, 키보드로 입력 불가, 수정/삭제/복사/붙이기 등
- editor mode : command mode에서 i 또는 a 누른 상태, 키보드 입력 가능, 
- last line mode

```bash

$ vi

```

![image](https://user-images.githubusercontent.com/57997672/87758497-85b9c900-c847-11ea-8919-034c2b3b2191.png)

```bash

# 에디터에 코드 줄번호 표시
:set nu

# command mode에서 줄단위 잘라내기
dd 

# 붙여넣기
p

# 줄 끝으로 이동
shift 4 

# vi로 새 파일 생성한 경우, 파일이름 지정 후 저장하고 종료해야 함
w FILENAME

```

### 알아두면 좋은 Tool

- apt-get
- nohup : 터미널이 꺼지더라도 내 스크립트를 계속 실행시키고 싶을 때, & 과 함께 백그라운드 실행
- screen / tmux : nohup과 유사하지만, 세션 복원 가능

<br />

---

## 리눅스 이해

### 계정과 보안

```bash

drwxrwxr-x
drwxr-xr-x
-rw-rw-r--
-rw-rw-r--

```

권한 `rwx`
- owner 
- group
- other

```bash

chmod 400

```

- 7 : `rwx`
- 4 : `r--`

### `sudo`

root 권한 남발하지 않고, 프로그램 설치, 업데이트 등 필요한 경우에만 일시적으로 root 권한 위임

`sudo reboot` : root 권한 없으면 reboot도 불가능


### 환경변수 `$PATH`

프로그램 실행시 자동 참조하는 절대경로

현재 사용하는 환경변수 확인

- 왼쪽으로 갈수록 높은 우선순위

```bash

$ echo $PATH

/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin

```

- /bin : 기본 명령어
- /sbin : 시스템 관리 위한 명령어, root 권한 필요
- /usr/bin : /bin 에 없는 기본 명령어
- /usr/sbin : /sbin 에 없는 시스템 관리 명령어, root 권한 필요

#### `export`

환경 변수 추가

```bash

$ export
declare -x HOME="/home/ubuntu"
declare -x LANG="C.UTF-8"
declare -x LESSCLOSE="/usr/bin/lesspipe %s %s"
declare -x LESSOPEN="| /usr/bin/lesspipe %s"
declare -x LOGNAME="ubuntu"

```

<br />

---

## Shell Script

반복 작업을 자동화

### Shabang

해당 스크립트를 해석하는 인터프리터 지정

```bash

#!/bin/bash

#!/usr/bin/python3

```

```bash

$ vi hello

  #!/bin/bash

  echo "HELLO LINUX!"

# 이 경우는 bash를 특정하여 실행했기 때문에 셔뱅이 없어도 bash로 실행
$ bash hello

# hello를 실행가능 파일로 변경
# owner에게 rwx 권한 모두 부여
$ chmod 700 hello

$ cat hello

#!/bin/bash

echo "HELLO LINUX!"

$ hello

Command 'hello' not found, but can be installed with:

sudo apt install hello            
sudo apt install hello-traditional

$ ./hello

HELLO LINUX!

# 환경변수 등록된 위치로 이동
$ sudo mv hello /usr/bin

# 파일 이름만으로도 실행 가능
$ hello
HELLO LINUX!

```

### 변수 variable

- 선언 : `VAR= `
- 사용 : `$VAR`
- 특수한 경우 : `${VAR}`
- 매개변수 : `$0`, `$1` ... `$*`
- 산술 연산은 추가적인 처리가 필요

```bash

$ echo `expr 1+2`
1+2

$ echo `expr 1 + 2`
3

$ echo $((1+2))
3

$ echo $((1 + 2))
3

```

### 조건문, 비교 연산

`if ~ then ~ elif then ~ fi`

-z 

### 반복문

- while
- for
- break, continue, exit


### 유의사항

- space 필요한 곳은 확실히 넣어줘야 함
  - 변수 선언 시 띄어쓰기 하면 안됨
- 중간에 에러나도 계속 진행
- 엔터 잘 못 쳤다가 전부 날림
  - 특히 ***`rm`*** 사용시 길다고 엔터치면 전부 삭제 될수 있음

### 실습

- touch, for/while 사용해서 파일 30개 만들기
  
  ```bash

    #!/bin/bash

  count=30

  echo $count

  while [ $count -gt 0 ]
  do
          touch "ts_$count"
          echo $count
          count=$(( $count - 1 ))
  done

  ```

  ```bash

  $ vi test_repeat

  $ bash test_repeat

  $ ll

  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_1
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_10
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_11
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_12
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_13
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_14
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_15
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_16
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_17
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_18
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_19
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_2
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_20
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_21
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_22
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_23
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_24
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_25
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_26
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_27
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_28
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_29
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_3
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_30
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_4
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_5
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_6
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_7
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_8
  -rw-rw-r-- 1 ubuntu ubuntu    0 Jul 17 08:08 ts_9

  ```

- 1에서 만든 파일들 이름을 test1 ~ test30 로 변경

<br />

---

## Python 개발환경

가상환경

- 패키지 ***버전 관리***의 어려움
- 프로젝트 별로 파이썬, 패키지 경로가 완전히 독립적으로 구성된 환경

가상환경 툴

- virtualenv : 프로젝트 폴더 안에 새 환경 생성, 매우 간단하지만, 파이썬 버전 특정하기 어려움
- pyenv : 특정 파이썬 버전 및 다른 가상환경 툴을 쉽게 구성가능, 숙련되지 않으면 어려움
- Anaconda : 다 알아서 해줌, cuda 설치도 가능, 용량이 큼

### IDE를 활용한 원격 파이썬 코딩

#### Pycharm

- professional 버전만 가능

![image](https://user-images.githubusercontent.com/57997672/87764962-29a87200-c852-11ea-8014-c186aa6c4631.png)

#### VSCode

Remote-SSH extension 설치

- add New SSH Host

![image](https://user-images.githubusercontent.com/57997672/87766770-a3415f80-c854-11ea-8c02-ea33ac18dd35.png)

- Host 주소 입력 

`ssh -i 절대경로/PRIVATE_KEY.pem ubuntu@ec2-####.ap-northeast-2.compute.amazonaws.com`


- 좌측 하단 처럼 SSH 접속 주소가 뜨면 성공

![image](https://user-images.githubusercontent.com/57997672/87767042-029f6f80-c855-11ea-9d42-5e0d1f0c2800.png)

- Python Extension 설치
- 코딩~
