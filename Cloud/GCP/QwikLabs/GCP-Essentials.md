# GCP Essentials

- https://google.qwiklabs.com/quests/23
- mkdate : 2020-07-06-Mon

<br />

---

## GSP001 가상머신 만들기

### Google Cloud Shell 활성화

Cloud Shell

- accounts list

	```bash
	gcloud auth list

	```
	
- Project ID list

	```bash
	gcloud config list project
	```
![image](https://gitlab.com/ezerwi/spring_tutorial/uploads/60d938248eaf797187c57e8c7bad8625/image.png)
	
### Region - Zone

한 Region 리전 안에 여러개의 Zone 영역

- Region : us-central1
- Zones
	- us-central1-a
	- us-central1-b
	- us-central1-c 

### Create New Instance

Compute Engine > VM Instances < Create

- name
- region, zone
- machine type
- booting disk
- firewall ; Http traffic allow - 80번 포트에서 HTTP 트래픽 허용하기 위한 방화벽 규칙 자동 생성

### NGINX web server

SSH Connect

```bash
# root access
$ sudo su -

$ apt-get update

$ apt-get install nginx -y

# nginx 실행 중인지 확인
$ ps auwx | grep nginx

root      1937  0.0  0.0  69736  1716 ?        Ss   09:22   0:00 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
www-data  1938  0.0  0.1  84784 11436 ?        S    09:22   0:00 nginx: worker process
www-data  1939  0.0  0.1  84784 11436 ?        S    09:22   0:00 nginx: worker process
root      1975  0.0  0.0   4836   884 pts/0    S+   09:23   0:00 grep nginx

```

External IP 접속으로 확인

![](https://gitlab.com/ezerwi/spring_tutorial/uploads/27642840593d5da24652dd3c0190300f/image.png)

### Create New Instances using Cloud Shell

![](https://gitlab.com/ezerwi/spring_tutorial/uploads/73dc26f0f12bdc64686aa06acfc9ad3b/image.png)

```bash
$ gcloud compute instances create gcelab2 --machine-type n1-standard-2 --zone us-central1-c
```

기본값 확인 방법

```bash
$ gcloud compute instances create --help
```



#### SSH Connection

![](https://gitlab.com/ezerwi/spring_tutorial/uploads/35f0dfb46af946baa008595f5dd71ec7/image.png)

```bash
$ gcloud compute ssh gcelab2 --zone us-central1-c
```

<br />

---

## GSP002. Cloud Shell 및 gcloud 시작하기

default region, zone 설정, 확인

```bash
$ google-compute-default-region
$ google-compute-default-zone

$ gcloud compute project-info describe --project <Your-Project-ID>
```

### Cloud SDK 초기화

시스템에 SDK 다운로드-설치한 경우 초기화 필요

```bash
$ gcloud init
```

### 환경 변수 설정

```bash
# 설정
$ export PROJECT_ID=<Your_Project_ID>
$ export ZONE=<Your_Zone>

# 확인
$ echo $PROJECT_ID
$ echo $ZONE
```

### gcloud 사용해 가상 머신 만들기

```bash
$ gcloud compute instances create gcelab2 --machine-type n1-standard-2 --zone $ZONE
```
`--zone`을 생략할 경우 기본 속성 기준으로 설정

### gcloud 명령어 사용

```bash
$ gcloud -h

$ gcloud config --help

$ gcloud help config
```

도움말 확인


```bash
$ gcloud config list # setting 된 것만

$ gcloud config list --all # unset 까지 모두

$ gcloud components list
```

환경 설정 구성 목록

### 자동 완성

gcloud interactive mode

![image](https://user-images.githubusercontent.com/57997672/86582738-19280a00-bfbd-11ea-8136-b3402f67d4e5.png)

![image](https://user-images.githubusercontent.com/57997672/86582873-4f658980-bfbd-11ea-9146-1628da199340.png)

```bash
$ sudo apt-get install google-cloud-sdk

$ gcloud beta interactive
```

### VM Instance 에서 SSH 사용

```bash
$ gcloud compute ssh gcelab2 --zone $ZONE
```

### HOME directory 사용

```bash
$ cd $HOME
```

<br />

---

## GSP100: Kubernetes Engine: Qwik Start


```bash

```


```bash

```


```bash

```

```bash

```


```bash

```


```bash

```


```bash

```


```bash

```


```bash

```

```bash

```


```bash

```


```bash

```


```bash

```


```bash

```


```bash

```

