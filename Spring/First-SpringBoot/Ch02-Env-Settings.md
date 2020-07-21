# 처음 배우는 스프링 부트 2

- 김영재, 2018, 한빛미디어


# Ch02. Env. Setting

- Class: Spring
- ClassName: 처음배우는스프링부트2
- Created: Jul 12, 2020 8:48 PM
- Updated: Jul 21, 2020 
- https://github.com/gitgitWi/Lecture-Notes/blob/master/Spring/First-SpringBoot/Ch02-Env-Settings.md


## 2.1. JDK

JDK 1.8

## 2.2. IntelliJ

new project

- community  ver. : [https://start.spring.io](https://start.spring.io/)

> SpringBoot v2.3.1 - Gradle v6.4.1로 설정
> 책에는 v2.0.3 - Gradle v4.8.1 로 진행

## 2.3.  Gradle

- 규칙 기반 빌드
- Groovy 기반 : JVM 환경 언어
- Task 사용 시 빌드 순서 제어 가능
- Multi-Project 구성 시 설정 주입 방식; 상속 구조(Maven) 보다 훨씬 유연

### 2.3.1. Gradle Wrapper

Gradle 설치

- https://gradle.org/install
- Spring Initializr 로 프로젝트 생성시 별도의 설치 없어도 프로젝트에 설치됨

Gradle 설정 파일 구조

- `gradlew` : unix 계열 shell script
- `gradlew.bat` : 윈도우용 batch script
- gradle / wrapper
    - `gradle-wrapper.jar` : wrapper JAR
    - `gradle-wrapper.properties` : Gradle 설정 정보 (version..)

프로젝트의 Gradle 버전이 변경

- `gradle-wrapper.properties` 에서 distributionUrl 수정
- 수정 후 `gradlew` 실행
- unix계열 OS에서 권한 오류 시 `chmod 755 gradlew`
- 또는 `./gradlew wrapper —gradle-version 4.8.1`
- 버전 확인 : `./gradlew -v` 

### 2.3.2 Gradle Multi-Project

여러 프로젝트를 하나의 프로젝트처럼 사용

- 공통 코드를 하나의 프로젝트로 분리하고 재사용할 경우 유용
- 공통 도메인, 유틸리티는 중복 코드가 되므로..

#### Create Multi-Modules  

***IntelliJ  기준***

- New > Module
- Gradle - Java
- ArtifactId : demo-web, demo-domain
- build.gradle 만 존재하는 모듈 생성됨
  - new directory >> main.java, main.resources, test.java, test.resources
- settings.gradle 확인 : 모듈 include 확인

```groovy

rootProject.name = 'demo'

include 'demo-web'
include 'demo-domain'

```

***VSCode 등 다른 IDE 에서 모듈 추가하는 경우***

- [ Spring Initializr : New Gradle Project ]  로 rootProject 안에 프로젝트 생성
- build.gradle 제외한 나머지 모든 설정 파일 삭제
- build.gradle 수정

```groovy

plugins {
	id 'java'
}


repositories {
	mavenCentral()
}

dependencies {
	testCompile group: 'junit', name: 'junit', version: '4.12'
}

```

<br />

---

## 2.4. application properties

`properties` -> `yml`

- Spring-boot-starter 에 SnakeYAML 라이브러리 내장되어 별도의 설정 없이 YAML 사용 가능
  - 모든 설정을 YAML 기반으로 진행
  - `properties` 와 `yml` 둘다 있는 경우 `yml` 만 오버라이드되어 적용됨

### 2.4.1. 프로파일에 따른 환경 구성 분리

Local DB - Dev. DB - Real. DB

```yaml

server:
  port: 80

---

spring:
  profiles: local
server:
  port: 8080

---

spring:
  profiles: dev
server:
  port: 8081

---

spring:
  profiles: real
server:
  port: 8082

```

profiles 로 나눈 부분은 파일 자체를 나눌 수 있음
- `application-{profiles}.yml`

application 실행 시 빌드 옵션을 주어서 원하는 profile로 실행
- `java -jar .... -D spring.profile.active=dev`


### 2.4.2. YAML 파일 매핑하기

YAML 은 indent 에 따라 관계를 구분짓기 때문에 List/Set/Map 등 다양한 바인딩형 Mapping 이 훨씬 간편함

2가지 Mapping 방식

- `@Value`
  -  SpEL 평가 : Spring Expression Language=runtime에 객체 참조에 대해 질의하고 조작하는 기능을 지원하는 언어, method 호출 및 기본 문자열 템플릿 기능 등

- `@ConfigurationProperties`
  - 유연한 바인딩 ; property value 를 객체에 바인딩 할 경우 field를 낙타표기법으로 선언, property key 는 케밥/소문자 등 다양한 표기법으로 선언해 바인딩
  - 메타데이터 지원  ; property key 에 대한 정보를 JSON 으로 제공, key name/type/설명/default 등 key 에 대한 metadata

#### `@Value`

property key 를 사용해 특정 값 호출 가능

값이 없을 경우 대비해 예외 처리 필요


***예제***

`application.yml` 에 Key 값 등록

```yaml

property:
  test:
    name: property depth test
propertyTest: test
propertyTestList: a,b,c

```


`AutoconfigurationApplicationTest.java`

```java

@RunWith(SpringRunner.class)
@SpringBootTest
public class AutoconfigurationApplicationTest {

    @Value("${property.test.name}")
    private String propertyTestName;

    @Value("${propertyTest}")
    private String propertyTest;

    //  key 값이 존재하지 않는 경우 default 값 mapping
    @Value("${noKey:default value}")
    private String defaultValue;

    //  여러 값 나열하는 경우 Array type으로 
    @Value("${propertyTestList}")
    private String[] propertyTestArray;

    // SpEL 사용, List type으로 mapping
    // 주로 단일 field 값 가져올 때 사용
    @Value("#{'${propertyTestList}'.split(',')}")
    private List<String> propertyTestList;

    @Test
    public void testValue() {
        assertThat (propertyTestName, is("property depth test"));
        assertThat (propertyTest, is("test"));
        assertThat (defaultValue, is("default value"));

        assertThat (propertyTestArray[0], is("a"));
        assertThat (propertyTestArray[1], is("b"));
        assertThat (propertyTestArray[2], is("c"));

        assertThat (propertyTestList.get(0), is("a"));
        assertThat (propertyTestList.get(1), is("b"));
        assertThat (propertyTestList.get(2), is("c"));
    }
}

```

#### `ConfigurationProperties`

기본적으로 root prefix 사용하여 binding

`@Value` 보다 더 객체 지향적 mapping

***예제***

prefix == fruit

datatype == list 

```yaml

fruit:
  list:
    - name: banana
      color: yellow
    - name: apple
      color: red
    - name: water melon
      color: green

```


`Fruit.java`

POJO class

- `List<Map>` 타입으로 생성해도 되지만, ***POJO*** 타입으로 생성하는 것이 더 직관적이고 더 명확하게 객체 구성 가능

```java

@Data
public class Fruit {
    private String name;
    private String color;
}

```

`FruitProperty.java`

- `@ConfigurationProperties`  사용 위해 `@Componet` 필수
- prefix 가 fruit 인 properties 값을 가져와서 field 에 mapping

```java

@Data
@Component
@ConfigurationProperties("fruit")
public class FruitProperty {
    // private List<Map> list;
    private List<POJO> list;
}

```


`PropertyTest.java`

```java

@RunWith(SpringRunner.class)
@SpringBootTest
public class PropertyTest {

    @Autowired
    FruitProperty fruitProperty;

    @Test
    public void test() {
        List<Fruit> fruitData = fruitProperty.getList();

        assertThat(fruitData.get(0).getName(), is("banana"));
        assertThat(fruitData.get(0).getColor(), is("yellow"));

        assertThat(fruitData.get(1).getName(), is("apple"));
        assertThat(fruitData.get(1).getColor(), is("red"));

        assertThat(fruitData.get(2).getName(), is("water melon"));
        assertThat(fruitData.get(2).getColor(), is("green"));

        // List<Map> fruitData = fruitProperty.getList();

        // assertThat(fruitData.get(0).get("name"), is("banana"));
        // assertThat(fruitData.get(0).get("color"), is("yellow"));

        // assertThat(fruitData.get(1).get("name"), is("apple"));
        // assertThat(fruitData.get(1).get("color"), is("red"));

        // assertThat(fruitData.get(2).get("name"), is("water melon"));
        // assertThat(fruitData.get(2).get("color"), is("green"));

    }
}

```

<br />

---

## 2.5. 자동 환경 설정 이해하기

Spring Boot Auto-Configuration 은 Web, H2, JDBC 등 100여 개 자동 설정 제공

- (`@EnableAutoConfiguration` + `@Configuration`), `@SpringBootApplication` 중 하나 사용
- `@SpringBootApplication` == `@SpringBootConfiguration` + `@EnableAutoConfiguration` + `@ComponentScan`; Spring Boot 에서 필수적

### 2.5.1. 자동 환경 설정 어노테이션

기존 Spring 에서는 각종 의존성을 `Bean` 으로 설정

Spring Boot 는 starter 묶음으로 제공

### 2.5.2. `@EnableAutoConfiguration` 

`AutoConfigurationImportSelector`  class 를 import

`spring-configuration-metadata.json` 에 주요 properties 에 대한 정보 저장

> https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html#common-application-properties
> 위 링크에서 자세한 내용 확인 가능

`application.yml` 에서 property 값 변경 가능

ex. 
```yaml

spring:
    h2:
        console:
            path: /h2-test

```


### 2.5.3. 자동 설정 어노테이션 살펴보기

조건 Annotation

- `@ConditionalOnBean` : 해당하는 Bean class 나 이름이 미리 Bean Factory 에 포함된 경우
- `@ConditionalOnClass`
- `@ConditionalOnCloudPlatform`
- `@ConditionalOnExpression` : SpEL 에 의존하는 경우
- `@ConditionalOnJava` : JVM 버전 일치하는 경우
- `@ConditionalOnJndi`
- `@ConditionalOnMissingBean`
- `@ConditionalOnMissingClass`
- `@ConditionalOnWebApplication`
- `@ConditionalOnNotWebApplication`
- `@ConditionalOnProperty` : 특정 property 가 지정한 값을 찾는 경우
- `@ConditionalOnResource`
- `@ConditionalOnSingleCandidate` : 지정한 Bean class 가 이미 BeanFactory 에 포함되어 있고 단일 후보자로 지정 가능한 경우

순서 Annotation

- `AutoConfigureAfter`
- `AutoConfigureBefore`
- `AutoConfigureOrder` : 기존 설정 class 에 영향을 주지 않고 자동 설정 class 들 간 순서만 지정


ex. `H2ConsoleAutoConfiguration`

```java

@Configuration(
    proxyBeanMethods = false
)

//  다음 3가지 조건에 부합할 때 적용
// 웹 어플리케이션일 때
@ConditionalOnWebApplication(
    type = Type.SERVLET
)
// WebServlet.class 가 Class 경로에 있을 때
@ConditionalOnClass({WebServlet.class})
// spring.h2.console.enabled 값이 true 일 때
@ConditionalOnProperty(
    prefix = "spring.h2.console",
    name = {"enabled"},
    havingValue = "true",
    matchIfMissing = false
)
@AutoConfigureAfter({DataSourceAutoConfiguration.class})
// 위 조건에 부합하여 자동 설정 property 가 적용될 때 H2ConsoleProperties.class type으로 H2 관련 property 값 mapping 하여 사용
@EnableConfigurationProperties({H2ConsoleProperties.class})
public class H2ConsoleAutoConfiguration { ... }

```

### 2.5.4. H2 Console 자동 설정 적용하기

Spring Boot 답게 설정하기 - 설정 Property 값만 바꾸면 된다

Default H2 Console Property

```properties

spring.h2.console.enabled=false

spring.h2.console.path=/h2-console

spring.h2.console.settings.trace=false

spring.h2.console.settings.web-allow-others=false

```

H2 Console 을 사용하려면 `spring.h2.console.enabled=true` 만 바꿔주면 됨
- Config class 를 만들어서 Bean 주입할 필요 전혀 없음
- application.yml 아래와 같이 변경

    ```yaml

    datasource:
    url: jdbc:h2:mem:testdb

    spring:
    h2:
        console:
        enabled: true

    ```

- H2 DB 는 보통 테스트 용으로만 쓰이므로, runtime 시점에만 의존하도록 `build.gradle` 변경
  - H2 는 메모리 데이터베이스

```groovy

dependencies {
    runtime ('com.h2database:h2')
}

```
