# 스프링부트와 AWS로 혼자 구현하는 웹서비스

mkdate : 2020-07-09-Thu

## Ch07. AWS RDS

대규모 서비스가 아닌 이상, 백엔드 개발자도 일정 수준 이상으로 DB를 다룰 줄 알아야 함

직접 DB를 설치해서 사용하는 경우, 모니터링, 알람, 백업, HA, Hardware Provisioning, Patch, 구성 등 모두 필요

클라우드 기반 관계형 데이터베이스 활용하면, 자동화된 운영 작업으로 개발에만 집중 가능

### RDS 인스턴스 생성

#### DB

![image](https://user-images.githubusercontent.com/57997672/87008200-5a5b2c80-c1fe-11ea-9813-fcca9a935feb.png)

***MariaDB 추천***

라이센스 비용
- Oracle/MSSQL 등 상용 DB는 오픈소스 DB에 비해 동일한 사용량 대비 가격이 더 높음

Amazon Aurora 교체 용이성
- MySQL/PostgreSQL을 AWS에 맞게 재구성한 DB
- RDS MySQL/PostgreSQL 대비 3~5배 성능
- 다만 최저 월 10만원 이상이므로 서비스 규모가 커지면 이전

동일 하드웨어 사양으로 MySQL 보다 향상된 성능

좀더 활성화된 커뮤니티

다양한 스토리 엔진 등

#### DB 인스턴스 식별자, 마스터 사용자 설정

![image](https://user-images.githubusercontent.com/57997672/87008357-91c9d900-c1fe-11ea-90da-38d85dfdda4b.png)

#### 네트워크, 보안 설정

![image](https://user-images.githubusercontent.com/57997672/87008489-c8075880-c1fe-11ea-94df-d39cc548b5ca.png)

- 퍼블릭 액세스 가능하도록 설정 후, 보안 그룹에서 지정 IP만 접속 가능하도록 설정
- 접속 포트 확인

#### 추가설정

![image](https://user-images.githubusercontent.com/57997672/87008823-4663fa80-c1ff-11ea-8c2b-7aef0f376e7e.png)

#### 생성 완료

![image](https://user-images.githubusercontent.com/57997672/87008976-7ad7b680-c1ff-11ea-9022-c13c5c4e8f11.png)

몇 분 걸림

<br />

---

### 파라미터 설정

#### 파라미터 그룹 생성

![image](https://user-images.githubusercontent.com/57997672/87009272-e6218880-c1ff-11ea-90b1-c0366892227e.png)

파라미터 그룹 패밀리 : 생성한 DB 버전과 동일하게 

#### 파라미터 편집

![image](https://user-images.githubusercontent.com/57997672/87009496-33055f00-c200-11ea-9266-79a6e5365d13.png)

#### time_zone

![image](https://user-images.githubusercontent.com/57997672/87009654-71028300-c200-11ea-8fc7-82a6540b1e87.png)

#### Character Set

![image](https://user-images.githubusercontent.com/57997672/87009759-97c0b980-c200-11ea-86b6-8162194c2aa0.png)

character_set_ *

- utf8mb4 : 이모지 저장 가능

![image](https://user-images.githubusercontent.com/57997672/87010134-161d5b80-c201-11ea-9799-6f164ad954dc.png)

collation_ *

- utf8mb4_bin

#### max_connections

![image](https://user-images.githubusercontent.com/57997672/87010265-4664fa00-c201-11ea-9710-c078efa339bb.png)

인스턴스에 따라 자동으로 정해짐, 프리티어에서는 약 60개만 가능,

#### DB에 파라미터 그룹 연결

![image](https://user-images.githubusercontent.com/57997672/87010516-9d6acf00-c201-11ea-8138-7de3e9626ea9.png)

데이터베이스 수정 > 데이터베이스 옵션 > DB 파라미터 그룹

#### 재부팅

![image](https://user-images.githubusercontent.com/57997672/87010677-e1f66a80-c201-11ea-8c3d-72f8f8c066d5.png)

수정 중

![image](https://user-images.githubusercontent.com/57997672/87010745-f89cc180-c201-11ea-8179-d16249f61b1a.png)

사용가능 뜨면

![image](https://user-images.githubusercontent.com/57997672/87010795-0eaa8200-c202-11ea-97c8-e7c365382a80.png)

재부팅으로 설정 완료

<br />

---

### 로컬PC에서 RDS 접속

#### RDS-EC2 port 설정

![image](https://user-images.githubusercontent.com/57997672/87011124-7791fa00-c202-11ea-94ee-87a56b69cb79.png)

데이터베이스 상세보기 > 연결&보안 > VPC 보안그룹

![image](https://user-images.githubusercontent.com/57997672/87012201-ec196880-c203-11ea-91be-347d34f72103.png)

![image](https://user-images.githubusercontent.com/57997672/87012297-09e6cd80-c204-11ea-856f-8018ca8ab460.png)

인바운드 규칙 편집

![image](https://user-images.githubusercontent.com/57997672/87011990-99d84780-c203-11ea-8e9c-7e87419f0059.png)

유형 - MYSQL/Aurora 선택; 자동으로 3306 포트 설정

EC2 보안그룹 ID, 내 IP 선택/입력

#### IntelliJ DB 플러그인 설치

![image](https://user-images.githubusercontent.com/57997672/87012761-a0b38a00-c204-11ea-801f-113d276d896d.png)

RDS MariaDB 엔드포인트(접속주소) 확인

![image](https://user-images.githubusercontent.com/57997672/87012945-e2443500-c204-11ea-826d-3dd093f04aaa.png)

##### IntelliJ Ultimate 인 경우 내장 Database 에서 MariaDB 선택

- 필요한 DB 라이브러리 자동으로 다운로드

![image](https://user-images.githubusercontent.com/57997672/87014483-2d5f4780-c207-11ea-8879-a1aea81549ce.png)

Host, Port, User, Password, Database(MySQL) 입력 후 Test Connection

![image](https://user-images.githubusercontent.com/57997672/87013493-b4132500-c205-11ea-8fd9-4a3ee39e690c.png)

스키마, 사용자 확인

##### IntelliJ Community 인 경우, Database Navigator 플러그인 설치하여 MySQL로 선택

![image](https://user-images.githubusercontent.com/57997672/87014173-b033d280-c206-11ea-8693-2cfe518f8135.png)

![image](https://user-images.githubusercontent.com/57997672/87014336-f721c800-c206-11ea-85c4-ecb3340a32d7.png)

![image](https://user-images.githubusercontent.com/57997672/87014612-58499b80-c207-11ea-9cce-54b58e8f8895.png)

<br />

#### New Console

콘솔창 생성 후 사용할 Database 선택

```sql

use SpringBoot0709;

```

![image](https://user-images.githubusercontent.com/57997672/87015162-00f7fb00-c208-11ea-95e9-767076923fe3.png)

쿼리 실행 성공 메시지

```sql

SpringBoot0709> show variables like 'c%'
[2020-07-09 17:17:57] 20 rows retrieved starting from 1 in 624 ms (execution: 24 ms, fetching: 600 ms)

```

![image](https://user-images.githubusercontent.com/57997672/87015402-53391c00-c208-11ea-98d2-f558ecba00e0.png)

character_set, collation 설정 확인

character_set_database, collation_connection 은 latin으로 설정되어 있어 변경해야 함

```sql

SpringBoot0709> alter database SpringBoot0709
                character set ='utf8mb4'
                collate = 'utf8mb4_general_ci'
[2020-07-09 17:21:33] 1 row affected in 23 ms

-- 변경 결과 확인
SpringBoot0709> show variables like 'c%'

```

```sql

SpringBoot0709> select @@time_zone, now()
[2020-07-09 17:24:26] 1 row retrieved starting from 1 in 194 ms (execution: 38 ms, fetching: 156 ms)

```

![image](https://user-images.githubusercontent.com/57997672/87016029-220d1b80-c209-11ea-86d2-fa96bb5f82e4.png)

Timezone 확인

```sql

SpringBoot0709> create table test (
                    id bigint(20) not null auto_increment,
                    content varchar(255) default null,
                    primary key (id)
                ) engine = innodb
[2020-07-09 17:26:42] completed in 42 ms

SpringBoot0709> insert into test(content) values ('테스트테스트테스트')
[2020-07-09 17:27:17] 1 row affected in 19 ms

SpringBoot0709> select * from test
[2020-07-09 17:27:30] 1 row retrieved starting from 1 in 169 ms (execution: 31 ms, fetching: 138 ms)

```

![image](https://user-images.githubusercontent.com/57997672/87016343-8d56ed80-c209-11ea-8539-f5f6689efac0.png)

한글 입력 테스트

<br />

---

### EC2 - RDS 접속 확인

EC2에 SSH 접속

```bash

[ec2-user@gitgitwi-spring ~]$ sudo yum install mysql

```

EC2에서 MySQL 접근 테스트를 위해 MySQL CLI 설치

```bash

[ec2-user@gitgitwi-spring ~]$ mysql -u gitgitwi -p -h springboot-0709.cgcwwzekltsf.ap-northeast-2.rds.amazonaws.com
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 36
Server version: 5.5.5-10.3.13-MariaDB Source distribution

Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 

```

계정, host url 사용하여 접속 확인

```sql

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| SpringBoot0709     |
| information_schema |
| innodb             |
| mysql              |
| performance_schema |
+--------------------+
5 rows in set (0.00 sec)

```

database 확인