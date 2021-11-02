# Spring Boot 이용한 Web Service 만들기

- https://www.youtube.com/watch?v=hQaQp1gEcjc&list=PL9mhQYIlKEhdjUeH15EBJvhdEgjMZa798&index=5
- mkdate : 2020-06-20

## "BookStore24" 서비스 만들기

- https://github.com/ihoneymon/tacademy-spring-boot

### 모듈 구성

- common : 공통으로 사용하는 utilities, exceptions
- core (domain) : 프로젝트 도메인 (@Entity, @Repository)
- api : 외부에 정보 제공하는 REST API module
- admin : 서비스를 관리하기 위한 back-office
- batch : 정기적으로 실행된 batch programm 모음
- message : 알림톡, SMS, 메일 발송 등

## 프로젝트 구성시 필수조건

- README 작성
- 실행절차 설명
- 실행절차에 따라 빌드, 실행
- commit & push 는 테스트 및 빌드가 성공했을 때
- Coding Convetion은 팀원들과 함께 만들어야

## 서비스 기획 ~ 운영 절차

- 서비스 기획 : 일을 줄이려면 개발자도 기획회의에 적극 참여해야 한다
- 기능분석 및 설계
    - 플랫폼 : 웹, iOS, Android
    - 언어 
    - 개발툴
    - 빌드도구 : Gradle, Maven
    - 개발플랫폼 : Spring Boot
    - 운영플랫폼 : AWS, IDC(개인정보보호법 때문에 AWS에 개인정보 올릴 수 없음)
    - 필요기능
    - Git
        - https://www.toptal.com/developers/gitignore
    - 빌드배포 시스템 : Jenkins, AWS CodeDeploy
    - Log, Mailing, App Push, SMS, DB
    - DevOps ; local - test - dev - beta - produce
- 구현
- 빌드
- 배포
- 운영

## 개발 방법론

Agile

잦은 출시를 해야하는 이유 : 요구사항이 쏟아져 나옴

## 프로파일 구성

### local

- 개발자 로컬 실행환경
- 개발자가 자유롭게 초기화 및 구성

### test

- 통합 테스트 환경 (주로 빌드 전 실행)
- 테스트 실행때 마다 초기화

### dev

- 개발서버 실행환경, 운영서버와 동일한 환경
- 개발 기능 확인하는 용도

### beta

- 준 운영서버 실행환경
- 큰 배포에 앞서, 운영 서버의 데이터 복제하여 정상 동작 확인

### prod

- 운영서버 실행환경
- 가급적 손대지 않아야 할 환경


### application-api.yml 예시

```yml
google :
    map : 
        api-key : 0000-0000-0000
---
spring.profile : dev
google :
    map : 
        api-key : 1234-2345-3456
---
spring.profile : beta
google :
    map : 
        api-key : 9876-8765-7654
---
spring.profile : prod
google :
    map : 
        api-key : 4567-7890-0123
```

---

## 배포

### CI / CD

코드를 푸시하면 배포가 일어난다

1. 기능 정의하고 이를 관리하기 위한 이슈 발급
2. 기능 개발하고 리뷰 받고 develop branch에 푸시
3. 개발 서버에 배포
4. 개발 서버에서 기능 확인
5. 베타 서버 배포
6. 베타 서버에서 기능관련자(기획자)의 기능 확인
7. develop branch 코드를 master에 merge 하고 푸시
8. 운영 서버 배포
9. 운영 서버 적용

### 배포와 운영

클라우드라고 반드시 싼 건 아니다

- Cloud Platform
- IDC (Internet Data Center) ; 사내 데이터 센터 구축


--- 

## 본격적인 코딩

### 개발순서

1. Domain Layer 
    - `@Repository`
    - `@Entity`
2. Service Layer
    - 도메인 간 서로 연계되는 부분 있는 경우
    - `@Service`
    - `@Transaction`
3. Controller Layer
    - `@Controller`, `@RestController`, `@ViewController`
    - `@RequestMapping`
    - `@ModelAndView`
