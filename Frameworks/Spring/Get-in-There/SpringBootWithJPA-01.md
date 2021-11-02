# 스프링 개요

1강 - 스프링의 핵심은 무엇인가요?

- https://www.youtube.com/watch?v=XBG6CUtVCIg

2강 - 필터란 무엇인가요?

- https://www.youtube.com/watch?v=mAFLNA9MYg8

3강 - MessageConverter가 궁금해요!

- https://www.youtube.com/watch?v=-5r52dt2HcU


## 스프링이란?

### framework

- 틀에 맞춰 개발하기만 하면 됨
	
### open-sources

- 스프링의 내부를 뜯어고칠 수 있음
- 무료

### IoC Container

- 스프링의 핵심
- Inversion of Controll
- 주도권이 스프링에 있음
- Class : 설계도 - 가구
- Object : 실체화가 가능한 것 - 의자, 침대
- Instance : 실체화가 된 것 - 실제 의자, 실제 침대
- 수많은 Object들을 개발자가 아닌 스프링이 관리
	- heap memory 영역

### DI

- Dependency Injection
- IoC를 통해 생성된 Object를 여러 영역에서 동일하게 사용
- Singletone pattern

### Filter

- web.xml : Tomcat 의 필터
- Intercepter : Spring Container 의 필터
- AOP 개념
- 권한 체크

### Annotations

- Compile Checking : annotation 은 compiler 에게 힌트를 주는 주석
- Reflection
	- 객체 생성 annotation : `@Component`, `@Bean`, `@Autowired` ...
	- 이렇게 생성된 객체를 분석하는 기법 : 존재 여부, action 설정, DI

### Message Converter

- 대표적으로 JSON, xml
- 서로 다른 프로그램 언어 사이에서 둘 다 이해할 수 있는 언어로 소통하는 것
- Jackson

### BufferedReader, BufferedWriter을 쉽게 사용

- 일반적인 네트워크 전송 byte stream ; 알파벳 1글자 단위
- InputStreamReader ; 문자 하나씩 수신, 최대 수신 용량을 정하고 수신하는데 용량이 적은 데이터를 받는 경우가 많으면 낭비가 커짐
- `BufferedReader` : 가변길이 문자 수신 가능, `request.getReader()`, `@RequestBody`
- `PrintWriter` : `BufferedWriter` 보다 많이 쓰임, `@ResponseBody`

### 계속 발전 중

- 스프링 부트 이후로 스프링 사용이 좀더 쉬워짐
