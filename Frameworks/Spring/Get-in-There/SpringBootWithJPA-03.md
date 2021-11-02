# Spring Boot 동작 원리

8강 - HTTP가 무엇인지 궁금해요!

- https://www.youtube.com/watch?v=pifmwZWWbuY&list=PL93mKxaRDidG_OIfRQ4nztPQ13y74lCYg&index=8

9강 - 톰켓이란?

- https://www.youtube.com/watch?v=fBcL6hPckyA&list=PL93mKxaRDidG_OIfRQ4nztPQ13y74lCYg&index=9

10강 - 서블릿 객체의 생명주기를 알려줘요!

- https://www.youtube.com/watch?v=wc-K2QurjSk&list=PL93mKxaRDidG_OIfRQ4nztPQ13y74lCYg&index=10

11강 - web.xml은 무엇인가요?

- https://www.youtube.com/watch?v=Q_c-1-cq6YA&list=PL93mKxaRDidG_OIfRQ4nztPQ13y74lCYg&index=11

12강 - DispatcherServlet은 무엇인가요?

- https://www.youtube.com/watch?v=fZv9rkwSO3g&list=PL93mKxaRDidG_OIfRQ4nztPQ13y74lCYg&index=12

13강 - ApplicationContext가 무엇인가요?

- https://www.youtube.com/watch?v=YRdS7qcZ8AY&list=PL93mKxaRDidG_OIfRQ4nztPQ13y74lCYg&index=14

14강(마지막) - 응답(Response)하는 방법

- https://www.youtube.com/watch?v=GCx65TdiA44&list=PL93mKxaRDidG_OIfRQ4nztPQ13y74lCYg&index=13


mkdate : 2020-07-19


## Http 통신과 Tomcat 서버

Spring Boot는 톰켓 별도 설치 필요없이 바로 실행 가능

Socket 통신

- Socket은 OS 에 내장
- 지속적인 연결; 네트워크 부하발생 가능하지만 현재 접속중인 사용자가 누구인지 알 수 있음
- 다수의 request에 대응하기 위해 thread 사용

Http 통신

- thread 없이 response 이후 바로 연결 끊음
- Http 통신에서 server는 request client에 대해 IP 주소를 알 필요 없음, 그냥 req에 대한 res 만 하면 됨
  - req 가 없으면 res 도 할 수 없음
- Socket 통신은 Server-Client 가 계속 연결되어 있으므로, req 없어도 res 가능
  - Server 가 원하는 시점에 client 들에게 전달가능
  - a Client 에 대한 res 를 b, c에도 전달하고 싶은 경우 등

### Tomcat - Web Server

일반적인 Web Server (Apache..)

- static 자원들에 대한 응답
- JSP 등 코드가 포함 된 파일에 대해서는 응답 불가

Tomcat

- Web Server가 이해하지 못한 JSP 등 파일 넘겨받아 코드 compile - html 에 덮어씌워서 Web Server에 반환


## Servlet Container

Client 의 요청을 받아서 최초 요청인지 아닌지 판단해 응답

- Tomcat
- 최초 요청인 경우 메모리 로딩 - 객체 생성 - init() - Response
- 최초 요청 아닌 경우 기존 생성된 객체 반환

Tomcat 은 정적 파일에 대한 요청이 오는 경우 처리하지 않음, Apache 에서 먼저 처리해서 응답

그러나 Spring 에서 이런 경우는 없음

- URL : 자원 주소 location 를 통한 접근 요청 ; `http://exe.com/a.png`
- URI : 식별자 identifier 를 통한 접근 요청 ; `http://exe.com/picture/a`
- Spring 은 URL 접근을 모두 막아놨기 때문에 URI 접근만 가능, 특정한 파일 요청 불가, 무조건 Java를 거쳐야 함

Java로 특정 request 가 오는 경우 Process
- Servlet Container (Tomcat) 에서 thread 생성
  - 동시에 다수의 request가 오는 경우 각각의 request에 대한 thread 생성
  - 최대 thread 수는 미리 지정
  - 최대 thread 수를 초과하는 경우 앞의 thread 에서 response 될때까지 대기
- Thread 가 Servlet 객체 생성 ; HttpServletRequest, HttpServletResponse
- response 작업 끝난 thread 는 사라지지않고 남아서 다음 request 에 할당되어 바로 응답
  - 빠르게 응답 가능한 이유..


## web.xml

### 역할

ServletContext 의 초기 parameter

- 암구호 같은 역할, 서버 내부 어디서나 동작

Session 의 유효시간 설정

- 인증에 대한 유효시간

Servlet/JSP 에 대한 정의, Servlet/JSP Mapping

- Request 에 대한 Mapping 

Mime Type Mapping

- Request 의 data type
- 데이터를 저장하는 경우, 데이터를 저장할 위치를 정하고 가공해야 하므로 Mime type 을 알아야 함
- cf) GET : 단순히 보기만 하는 경우, SELECT

Welcome File List

- 특별한 Request 없이 오는 경우에 대한 처리

Error Pages 처리

- 404

Listener/Filter 설정

- Filter : 부적절한 접근 방지
- Listener : 특정 request 에 대해서만 별도의 response 처리

Security


## FrontController Pattern

최초 request 에 대해 필요한 class 로 넘겨줌
- web.xml에 모든 것을 정의할 수 없음
- URI 또는 Java File request 가 오면 Tomcat 이 받아서 처리
- 특정 주소 request에 대해서는 FrontController가 받아서 처리 ; prefix / suffix
- 이때 내부적으로 새로운 request 생기면서 request - response 가 초기화될 수 있으므로, 보관해뒀다가 사용하기 위해 RequestDispatcher 필요


## RequestDispatcher

필요한 Class에 대한 Request 가 왔을 때, FrontController 에 도착한 request - response 를 그대로 유지시킴

- Request를 계속 유지시켜, 페이지 간 데이터 이동 가능하도록


## DispatcherServlet

FrontController + RequestDispatcher
- Spring 내부에 있기 때문에, 직접 위 두개를 구현할 필요가 없어짐

DispatcherServlet 이 자동생성되면서 수많은 객체들이 자동 생성됨 (IoC)
- 보통 Filters ; 기본적인 것들은 자동 등록, 이 외에 필요한 것들은 직접 등록 가능


## Spring Container

DispatcherServlet 에 의해 생성되는 수많은 객체들을 관리하는 Container

DispatcherServlet 에 의해 주소로 이동하려면, 그에 해당하는 Java Classes가 미리 메모리 상에 올려져야 함

- static 은 main method 실행 전부터 메모리에 올려짐
- Java 객체들은 그때그때 생성되었다가 사라짐
- Spring Boot 는  DispatcherServlet을 통해 모든  Java Classes 를 스캔해서, 필요한 객체들을 미리 메모리에 올림
  - IoC를 위해
  -` @Controller`, `@RestController`, `@Configuration`, `@Component`, `@Service`, `@Repository` 등 Annotaion으로 판단

### ContextLoaderListener

Request 를 통해 만들어지는 Threads는 모두 서로 독립적, 충돌나지 않음

그러나 DB Connection 등 일부 기능은 모든 요청에서 공통이므로 ContextLoaderListner 가 DispatcherServlet 보다 우선해서 메모리에 올림

***root-context.xml (applicationContext.xml)*** 파일로 공통 사용할 기능 판단

### ApplicationContext

IoC 를 위해 필요한 객체들이 등록되는 곳

- DispatcherServlet 이 Component Scan 하면서 Annotation 에 따라 등록

> 어떤 Annotation 을 붙여야 IoC 를 위해 등록되는 지 공부해야 함

-  필요한 곳에서 ApplicationContext에 접근하여 필요한 객체를 DI

#### 종류

- root-applicationContext : @Service, @Repository 스캔, DB 관련 객체 생성, ContextLoaderListener 에 의해 실행됨, ContextLoaderListener 는 web.xml 이 실행하므로 먼저 실행됨
- servlet-applicationContext : ViewResolver, Interceptor, MultipartResolver 객체 생성, @Controller, @RestController 스캔, DispatcherServlet 에 의해 실행됨


### Bean Factory

`@Bean` 을 통해 Bean Factory 에 객체 등록

초기에 스캔되지 않고, 필요할 때 `getBean()` 을 통해 메모리에 로드 되어 DI ; ***lazy-loading***


### Handler Mapping

Request 주소에 맞는 Controller 의 함수 요청


### Response

HTML 파일 응답 - Data 응답 결정

- HTML : ViewResolver 가 수행
- Data : MessageConverter 가 수행, 기본적으로 json 으로 converting

