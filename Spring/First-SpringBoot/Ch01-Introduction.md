# Ch01. 스프링부트입문하기

Class: Spring
ClassName: 처음배우는스프링부트2
Created: Jul 12, 2020 6:29 PM

# 처음 배우는 스프링 부트 2

- 김영재, 2018, 한빛미디어
- mkdate : 2020-07-12-SUN
- [https://github.com/gitgitWi/Lecture-Notes/blob/master/Spring/First-SpringBoot/Ch01-Introduction.md](https://github.com/gitgitWi/Lecture-Notes/blob/master/Spring/First-SpringBoot/Ch01-Introduction.md)

## Ch01. 스프링 부트 입문하기

### 1.4.5. 이 책에서 다룰 스타터

- `spring-boot-starter` : auto-configuration, logging, yaml
- `spring-boot-starter-aop`
- `spring-boot-starter-batch`
- `spring-boot-starter-data-jpa` : JPA, Hibernate
- `spring-boot-starter-data-redis` : Redis - Jedis
- `spring-boot-starter-data-rest`
- `spring-boot-starter-thymeleaf`
- `spring-boot-starter-jdbc`
- `spring-boot-starter-security`
- `spring-boot-starter-oauth2`
- `spring-boot-starter-validation` : Java Bean Validation
- `spring-boot-starter-web`

### 1.4.6. 스프링 부트의 장단점

#### 장점

- 안정적인 의존성 버전 호환성
- 특정 라이브러리의 버그를 스프링 팀에서 픽스한 버전을 받기 편리
- 간단한 annotation, properties 설정으로 세부설정 없이 원하는 기능을 빠르게 적용가능
- 별도의 외장 Tomcat 불필요

#### 단점

- 설정을 customizing 할 경우 기존 스프링 프레임워크와 동일한 불편함
- 특정 설정 개인화 또는 설정 자체 변경할 경우 내부 설정 코드를 살펴봐야 하는 불편함