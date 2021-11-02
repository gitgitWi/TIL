# Spring Boot 소개

- https://www.youtube.com/watch?v=26GuwzdB3iI&list=PL9mhQYIlKEhdjUeH15EBJvhdEgjMZa798&index=2&t=1316s
- mkdate : 2020-06-19


## 구성요소

- 빌드도구 :  Gradle vs. Maven
    - 최근 안드로이드 때문에 Gradle 많이 사용하는 추세
    - 이 강의에서도 Gradle 사용
- Spring Framework : 4.x vs.5.x
- Spring Boot : 1.5 vs. 2.0
    - 2.1 이후 리액티브 기능 강화
- Spring Boot Starter


## Spring initializer

- https://start.spring.io/

### Project Metadata

- Group
- Artifact

### Dependencies

- Web ; Tomcat, Spring MVC
- Lombok : Spring에서 거의 필수
- JPA : ORM - Hibernate가 가장 많이 쓰임
- H2 : DB


## Gradle vs Maven

### Gradle

#### `build.gradle`

script 형태로 설정 선언

```java
buildscript {
    ...
}
```

### Maven

#### `pom.xml`


## (Executable) jar/war vs. 고전적인 jar/war

컨테이너 안에서 마이크로서비스 실행 가능하도록 지원


## Annotation 기반 작동

- `@SpringBootApplication` (with SpringApplication)
- `@ComponentScan` : Component Scan 범위 설정
- `@EnableAutoConfiguration`
- `@Configuration`
- `@ConditionalOn~~` : 특정 조건에서 ~~ 활성화
- `@SpringBootConfiguration` (= `@Configuration`)
- `@EnableConfigurationProperties`
- `@ConfigurationProperties`


## Code

```java
@SpringBootApplication
public class BootSpringBootApplication {
    public static void main(String[] args) {
        SpringApplication.run(BootSpringBootApplication.class, args);
    }
}
```

## Spring Boot Starter

두 개의 module이 합쳐진 것
 
- `spring-boot-autoconfigure`
- `spring-boot-dependencies`

간결한 의존성 구성 지원
- 각 library에 대한 버전 명시 안해도 됨

Spring-projcect Repository에서 모든 공식 starter 확인 가능

- https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-starters
- mybatis starter : https://github.com/mybatis/spring-boot-starter

## Auto-Configuration
 
 - Spring Boot가 기술흐름에 따라 제공하는 관례적 conventional 구성
 - `spring-boot-autoconfigure`
 - 접미사 `~AutoConfiguration`

### 동작 선언

- `@EnableAutoConfiguration( in @SpringBootApplication)`
- `@Configuration`

### Annotations

- `@Configuration`
- `@ConditionOn`

## External Configuration

- 외부에서 application 속성 설정 가능

적용 우선순위

1. 실행인자
2. Spring_Application_Json
3. 환경변수
4. etc.
5. `application.yml` / `application.properties`
6. `application-{defaultprofiles}.yml` / `application-{defaultprofiles}.properties`

 ## Programming in Spring Environment
 
 스프링부트는 스프링을 좀더 편하게 쓸 수 있도록 도와주는 도구
 
 스프링부트를 잘 쓰려면 결국 스프링을 잘 알아야 한다
 
 - `@ComponentScan` 을 통해 ApplicationContext 적재
    - `@Repository`
    - `@Component`
    - `@Service`
    - `@Controller` & `@RestController`
    - `@Configuration`
        - `@Bean`
        - `@ConfigurationProperties`
- DI, IoC, `@Autowired`
- `@Value` vs. `@ConfigurationProperties`
- AOP
- etc..

위 개념들 잘 파악하고 있어야..

## Spring Framework 추천도서

- <토비의 스프링> ; 고전
- <스프링5 레시피>
- <초보 웹 개발자를 위한 스프링5 프로그래밍 입문>
- <자바 ORM 표준 JPA 프로그래밍>
