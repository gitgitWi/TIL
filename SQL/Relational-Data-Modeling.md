# \[생활코딩\] 관계형 데이터 모델링

## 2. 전체 흐름

업무파악
- 요구사항 파악

개념적 데이터 모델링
- 해당 업무에 어떤 개념이 있고, 어떻게 상호작용하는가
- ER Diagram

논리적 데이터 모델링
- 개념을 RDBMS 패러다임에 맞는 표로 전환

물리적 데이터 모델링
- 어떤 DB 제품을 사용하고,
- 최적화된 Query를 사용할 것인가
- 실제 SQL Query를 작성


<br>

## 3. 업무파악

### 3.1. Intro

현실 문제 해결하려면

### 3.2. 기획

기획 - Kakao Oven 활용

어떤 서비스를 만들 것인가

<br>

## 4. 개념적 데이터 모델링 

### 4.1. 개념적 데이터 모델링 소개

개념적 모델링은 모델링의 극치

- 논리적-물리적 모델링 해보지 않은 사람이 개념적 모델링을 잘 할 수 없어
- 개념적 모델링이 잘 되면 논리적-물리적 모델링도 잘 된다

개념적 모델링의 효용

- 필터; 현실문제에서 개념 추출
- 언어

-> Entity Relationship Diagram; ERD

ERD는 현실을 3개의 관점에서 바라볼 수 있게하는 파인더를 제공

- 정보; 정보 발견 및 표현
- 그룹; 연관된 정보를 그룹지어 표현
- 관계; 정보 그룹 사이의 관계를 표현

### 4.2. 관계형 데이터베이스 다운 개념의 구조

'관계형' 데이터 베이스에 맞는 구조

- 표 안에 다른 표를 내포하는 경우 X; RDB는 내포관계를 허용하지 않음
- 데이터 사용을 최소화할 수 있는 구조; 중복을 최소화
- 따라서 주제에 따라 table을 쪼개야 함
- SQL `join` 사용할 수 있는 구조

### 4.3. ERD의 구성요소

Entity
- 개념
- 추후 table이 됨
- 사각형 `⬛` 으로 표현

Attribute
- Entity의 속성
- 추후 table의 columns
- 원 `⚫` 으로 표현

Relation, 관계
- Entity들 사이의 관계
- PK, FK
- `join`
- 마름모 `🔷` 로 표현 


### 4.4 엔티티 정의

User Interface와 Database
- 데이터 입력과 저장, 서로 상호작용하는 관계
- 각 쓰기 화면으로 분류되는 것들

### 4.5. 속성 정의

Entity 읽기/쓰기 화면에 나타나는 속성들
- 제목, 본문, 날짜 등


### 4.6. Identifier, 식별자 지정

후보키(candidate key) 중에서 유일한 값을 지정

- primary key 기본키
- Alternate key; Candidate key 중 PK가 아닌 키들

Composite key; 중복키

- 두 개의 키를 합쳐야 유일한 값으로 인식되는 경우
- ex. 직원 번호 + 부서 번호

각 Entity의 속성 중에 identifier가 될 수 있는 속성을 찾음
- 없는 경우, 대리키(임의의 PK)를 만듦; 글 id 등
- PK, identifier는 밑줄로 표시

### 4.7. 엔티티 간의 연결

Relationship
- Foreign key
- PK-FK의 연결
- 마름모꼴 도형에 동사로 연결

### 4.8. Cardinality

두 개의 entity 사이의 관계가 몇:몇인지

- 1:1
- 1:N
- N:M; 실제 RDS에서 구현하기 어려움, 연결 table을 별도로 생성해서 연결

### 4.9. Optionality

ex. '저자'는 '댓글'을 작성하지 않을 수도 있다

- 이때 댓글은 optional,
- 반대로 각 댓글은 반드시 저자가 있다; mandatory

### 4.10. ERD 완성

cardinality-optionality를 반영하여 ERD 완성

### 4.11. Entity Relationship Diagram Helper

> http://erd.yah.ac

<br>

## 5. 논리적 데이터 모델링

### 5.1. 논리적 데이터 모델링

Mapping Rule

- ERD에서 표현한 내용을 RDS에 맞게 다듬는 방법
- Entity -> Table
- Attribute -> Column
- Relation -> PK, FK

### 5.2. 테이블과 컬럼 생성

> http://ermaster.sourceforge.net
> - eclipse 확장 프로그램

Mapping Rule에 따라 Tables, Columns 생성

- FK 없는 Table부터
- Physical Name; table/column name
- Logical Name; Physical Name에 대한 설명
- Type, Length, NotNull...; 해당 데이터에 대한 도메인


### 5.3. 1:1 관계의 처리

가장 단순한 관계인 1:1 관계부터 처리

누가 FK를 갖고 있는가?
- 종속 관계 확인
- 종속 당하는 entity, 자식 table에 FK

### 5.4. 1:N 관계의 처리



### 5.5. N:M 관계의 처리

가장 어려움

한 column에 여러 id가 들어가는 경우에는 `join`을 쓸 수 없음

Mapping Table, 연결 테이블 필요
- table들을 연결했을 때 발생하는 추가 정보 입력 가능


<br>

## 6. 정규화

### 6.1. 정규화 소개

Normalization
- 정제되지 않은 table을 RDS에 어울리는 table로 바꿀 수 있는 작업

Unnormalized form
- 정규화되지 않은 정보
- 모든 정보들 한번에 표시
- PK를 제외하고, 중복되는 부분들 표시

1st~3rd Normal Form
- 중복되어 별도로 분리할 수 있는 부분들 분리

### 6.2. 제1정규화

First Normal Form

**Atomic Columns**
- 각 column의 값들은 모두 atomic 해야 함
- 값을 하나만 가져야 함
- 값을 2개 이상 갖고 있는 경우 table 분리하고 Mapping Table 생성

### 6.3. 제2정규화

Second Normal Form

**No Partial Dependencies**

- table 상 부분 종속성 없어야
- PK 중 중복키 있는 부분에 대한 작업
- 중복키 분리하여 별도의 table; 부분 종속 정보와 전체 종속 정보 분리


### 6.4. 제3정규화

Third Normal Form

**No Transitive Dependencies**

- 이행적 종속성 제거
- row 내부 종속성 갖는 columns 별도로 table 생성



<br>

## 7. 물리적 데이터 모델링, 역정규화

### 7.1. 물리적 데이터 모델링

RDS 제품에 맞는, 성능 최적화가 중요

`slow query`를 찾는 방법; 제품마다 다름

denormalization; 역정규화
- 예상보다 비용이 클 수 있음
- 시스템 복잡도가 늘어나고, 수정 비용 증가
- 불가피한 경우에 한해 최후의 수단으로 사용

역정규화를 하기 전, 최대한 성능 개선할 수 있는 방법 찾아야 함
- index 사용
- appliaction 영역에서 cache 사용

### 7.2. 역정규화 소개

정규화를 통해 만든 table을 성능 개선을 위해 다시 조작하는 것

정규화를 하다보면 대체로 쓰기 성능 향상을 위해 읽기 성능을 희생
- `join`은 비용이 비싼 작업
- 그런데 DB를 통해 가장 많이 이뤄지는 작업은 읽기 작업이므로 역정규화

정규화를 먼저 진행 후 성능 개선을 위해 역정규화 작업 진행해야

### 7.3. 역정규화; 컬럼 조작해 `join` 줄이기

동일한 `join`이 자주 발생한다면, 차라리 한 table에 합치기

### 7.4. 역정규화; 컬럼 조작해 계산 줄이기

ex. `group by`, `count()` 가 자주 사용되는 경우

파생 column 생성해 계산 줄이기


### 7.5. 역정규화; Table 분리

column 기준으로 분리하는 경우

- ex. 글 상세 내용 크기가 매우 큰데, title만 조회하는 query가 자주 사용되는 경우
- 샤딩; 특정 column만 별도 table로 분리

row 기준으로 분리하는 경우

- 데이터 양이 매우 커지는 경우
- row number에 따라 분리


### 7.6. 역정규화; 관계의 역정규화

FK를 이용해`join` 줄이기

다중 `join` query에서 일부 정보만 사용되는 경우, 차라리 일부 table을 합쳐서 `join` 최소화


---
