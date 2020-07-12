# Ch02. Env. Setting

Class: Spring
ClassName: 처음배우는스프링부트2
Created: Jul 12, 2020 8:48 PM

# 처음 배우는 스프링 부트 2

- 김영재, 2018, 한빛미디어

# Ch01. 스프링 부트 입문하기

- [https://github.com/gitgitWi/Lecture-Notes/blob/master/Spring/First-SpringBoot/Ch0](https://github.com/gitgitWi/Lecture-Notes/blob/master/Spring/First-SpringBoot/Ch01-Introduction.md)2-.md

## 2.1. JDK

JDK 1.8

## 2.2. IntelliJ

new project

- community  ver. : [https://start.spring.io](https://start.spring.io/)

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
- 공통 도메인, 유틸리티