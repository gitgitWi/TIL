# Spring Boot Project 만들기

- https://www.youtube.com/watch?v=MCgvlTdZGBw&list=PL9mhQYIlKEhdjUeH15EBJvhdEgjMZa798&index=2
- mkdate : 2020-06-19

## IDE

### STS, Eclipse

- Spring Project 제작한 Pivotal에서 제작, 무료
- Gradle build extension 설치 필요

### IntelliJ IDEA

훨씬 편하지만, 유료..


## Spring Initializer

- https://start.spring.io/


## Lombok

- 자바 프로젝트 필수 라이브러리
- 클래스에서 필수적으로 작성해야 하는 getter/setter, `toString`, equalsAndHashCode, Constructor 등 작성하지 않아도 됨
- 간결한 코드
- 배포버전 확인하고, 결함이 있는지 확인해야 함 ; 간혹 업데이트 이후 compile error 발생
- 기타 주의사항

## H2Database

- in-momory, file, TCP 지원 DB
- JDBC url 설정으로 DB 작동방식 지정가능
- SpringBoot 자동구성으로 /h2-console h2 webconsole 제공
- 로컬에서 별도의 DB 설치 없이 빠른 prototyping 지원
    - 이후 JPA를 통해 MariaDB 등 연결
- 필요에 따라 운영가능한 수준의 DB 활용 가능

## 기본 구조

```
├── build.gradle
├── gradle
│   └── wrapper
│       ├── *gradle-wrapper.jar*
│       └── gradle-wrapper.properties
├── *gradlew*
├── gradlew.bat
├── settings.gradle
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── example
    │   │           └── demo
    │   │               └── *DemoApplication.java*
    │   └── resources
    │       ├── *application.properties* (또는 application.yml)
    │       ├── static
    │       └── templates
    └── test
        └── java
            └── com
                └── example
                    └── demo
                        └── DemoApplicationTests.java

```

- 강사 개인적으로 application.properties 보다 application.yml 선호, 프로젝트 시작하면서 바로 변경


## `settings.gradle`

```
rootProject.name = 'demo'
```

- 멀티 프로젝트 구성시 사용
- 프로젝트 이름
- 하위 프로젝트 정의
- 하위 프로젝트 설명 (optional, comment)


## `gradle-wrapper`

자동으로 Gradle build


## Create New Project

- Group : 서비스하는 웹 url
- dependencies
    - Web
    - Lombock
    - H2
    - JPA

- STS나 IntelliJ나 생성된 url 통해 다운로드 후 자동으로 unpackaging

## WAS

- 기본적으로 내장 Tomcat
- port 8080

## `application.yml`

```yml
spring:
  main:
    web-application-type: servlet # None, servlet, reactive
```

## Build & Unpackaging

`application.yml` 설정 이후 gradle build

- Mac/Linux

```
$ ./gradlew build
```

test까지 거친 후 `build/libs` 폴더 아래 jar 파일 생성

- Fat Jar
- 프로젝트에 사용되는 모든 라이브러리, static 파일들 포함
- `application.yml` 파일 위치가 최상위에 있지 않으면 정상적인 실행 안될 수 있음


```
$ cd build/libs
$ java -jar {FILENAME.jar}
```

## `@Component`

### `@Controller`

`@Bean` vs `@Component`
- `@Bean` : lifecycle 관리, 외부 라이브러리 등록시 주로 사용
- `@Component` : transaction (DB 작업) 필요 없는 경우, 개발자가 만든 Component Class 에서 주로 사용

- `@Service`
- `@Repository`


의존성 주입 (Dependency Injection)

- Framework와 library의 차이점
- 인스턴스 객체 생성 불필요
- `@Autowired`
- 방법
    - 생성자 주입 (가장 권장) ; 확장성
        `private final BookRepository Repository;`
    - Setter 주입
    - `@Autowired`
