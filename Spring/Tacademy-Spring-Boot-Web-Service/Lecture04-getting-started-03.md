# Spring Boot Project 만들기 3

- https://www.youtube.com/watch?v=62Dh9AWAp58&list=PL9mhQYIlKEhdjUeH15EBJvhdEgjMZa798&index=4
- mkdate : 2020-06-20

## `@Service`

```java
@Service
@Transactional
public class BookServiceImpl implements BookService {
    private final BookRepository repository;
    
    // 생성자 주입
    public BookServiceImpl(BookRepository repository) {
        this.repository = repository;
    }

    // BookService class의 메소드를 Override
    @Override
    public Optional<Book> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<Book> findAll(OffSetPageRequest request) {
        return repository.findAll(request.getPageRequest()).getContent();
    }
}
```

- `@Transactional` 관리영역
    - 조회만 할 때는 선언 안 해도 됨
- 서로 다른 도메인 연계(DI, `@Autowired`) 작업 영역
- `@Controller` = `@Repository` 의 중계 역할

### Unit Test

```java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class BookServiceTest {

    // 자동 주입
    @Autowired
    BookService bookService;

    @Test(expected = RuntimeException.class)
    public void testFindById() {
        Long id = 1L;
        Book book = bookService.findById(id).orElseThrow(() -> new RuntimeException("Not Found"));
    }
}

```

---

## `@Controller`

```java
@RestController
@RequestMapping(value = "/books")
public class BookController {
    private final BookService service;
    public BookController(BookService service) {
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<List<RequestMethod>> options() {
        return ResponseEntity.ok().allow(HttpMethod.OPTIONS, HttpMethod.HEAD, HttpMethod.GET).build();
    }
}
```

sample

```java
@RestController
@RequestMapping(value = "/books")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping("/{bookId}")
    public ResponseEntity<Book> findById(Long bookID) {
        Book book = bookService.findById(bookID)
                .orElseThrow(() -> new RuntimeException("Not found" + bookID));
        return ResponseEntity.ok(book);
    }
}
```

- DispatcherServlet 에 등록된 `@RequestMapping` 호출
- 템플릿 엔진이 렌더링할 뷰 페이지 지정
- 호출된 API에서 처리한 응답 반환

### 예외처리 Exception Handler

```java
@ControllerAdvice(annotations = {RestController.class})
@ResponseBody
public class GlobalRestControllerAdvice {
    @ExceptionHandler(BookNotFoundException.class)
    public ApiResponse<Void> handleException(Exception e) {
        log.error("Occurred Exception : {}", e);
        return ApiResponse.error(e.getMessage());
    }
}
```

---

## REST API

- https://www.restapitutorial.com/
- 시스템 자원Resource에 대한 접근 및 제어 제공하는 API
    - GET
    - POST
    - PUT
    - DELETE
- Spring 에서는 요청에 따라 등록된 `HttpMessageConverter` 를 통해 응답 데이터 반환

### Spring API Docs


## `@Profile`

- 속성 정의 ; Bean 객체가 실행되는 환경 지정

```java
@Configuration
public class LocalApiConfig {
    @Autowired
    private RestTemplateBuilder restTemplateBuilder;
    
    // local 활성화 된 경우 실행
    @Profile("local")    
    @Bean
    public RestTemplate restTemplate() {
        return restTemplateBuilder.build();
    }

    // local 비활성화 된 경우 실행
    @Profile("!local")    
    @Bean
    public RestTemplate restTemplate() {
        return restTemplateBuilder.rootUri("https://www....").build();
    }
}
```

application yml과 결합하는 예시

- application-datasource.yml = @Profile("datasource")
- application-api.yml = @Profile("api")
- application.yml


## 속성 정의

1. 테스트 속성정의
2. 실행인자 지정
3. 운영체제 환경변수 지정
4. 속성파일 지정
    - `application.yml` 또는 `application.properties`
    - `@EnableConfigurationProperties`
    - `@ConfigurationProperties`
5. 프로그래밍적 코드 구현

## 계층화된 테스트

- `@SpringBootTest`
- `@WebMvcTest`
- `@WebFluxTest`
- `@DataJpaTest`
- `@JdbcTest`
- etc
