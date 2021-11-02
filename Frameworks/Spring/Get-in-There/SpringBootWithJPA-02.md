# JPA

4강 - JPA란 무엇인가요?

- https://www.youtube.com/watch?v=ajZIPOv31yE

5강 - ORM이란 무엇인가요?

- https://www.youtube.com/watch?v=4CRpndN3tP0

6강 - 영속성 컨텍스트란 무엇인가요?

- https://www.youtube.com/watch?v=tXyDmqoMmKE

7강 - OOP 관점에서 모델링이란?

- https://www.youtube.com/watch?v=vRoZAMX95Mc

mkdate : 2020-06-21


## JPA 개요

### Java Persistence API

- 영속성 ; 하드디스크에 영구적으로 저장
	- 파일시스템, RDBMS 등 활용
	- RAM의 휘발성과 대조
- API 
	- Application
	- Programming
	- Interface
	- interface를 통한 프로그래밍
	- Protocol 과 Interface
		- 동등한 관계에서 약속 = protocol ; 인터넷
		- 서열 관계에서 약속 = interface

### ORM

- Object Relational Mapping
- JAVA의 datatype과 DB의 datatype이 다르기 때문에 Modeling해야 함

### 반복적인 CRUD 작업 생략

- connect - CRUD - disconnect 까지 반복 작업 대신

### 영속성 Context

- Context ; 정보를 저장
- DB data 와 영속성 Context data 를 동기화
- Java datatype 과 DB datatype을 일치시켜줌
- 변화가 있으면 자동으로 DB update query 실행

### DB-OOP 간 불일치성을 해결하기 위한 방법론 제공

- DB는 기본자료형만 가지고, Object를 가질 수 없음
- DB에서 Foreign Key 문제 - 다수의 `SELECT` 또는 `JOIN` ; 객체지향 프로그래밍에서 아주 쉽게 해결되는 문제
- JPA 가 자동 mapping을 통해 객체를 FK로 변환시켜 가져옴

### OOP 관점에서 모델링 가능

- 상속, Composition, 연관관계
- OOP의 클래스를 바탕으로 DB 테이블 생성

ex) 

```java
class Car extends EntityDate
{name, color, engineId}

class Engine extends EntityDate
{id, power, createdate, updatedate}

class EntityDate
{createdate, updatedate}
```

### 방언 Dialect 처리 용이

- Migration, 유지보수가 편리
- MySQL, Oracle, MSSQL, MariaDB..
- DB가 바뀌어도 코드는 거의 그대로

### 쉽지만 어려움

- 처음에 개념이 어려움
- 적응되면 쉽다
- 규모가 커지면 불필요한 쿼리들을 생성하면서 한번더 머리 아픈 시기가 옴
