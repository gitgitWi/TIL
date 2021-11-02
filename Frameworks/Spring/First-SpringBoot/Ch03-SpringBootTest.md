# 처음 배우는 스프링 부트 2

- 김영재, 2018, 한빛미디어


# Ch02. 스프링 부트 테스트

- Class: Spring
- ClassName: 처음배우는스프링부트2
- Created: Jul 21, 2020
- Updated: Jul 21, 2020 
- https://github.com/gitgitWi/Lecture-Notes/blob/master/Spring/First-SpringBoot/Ch03-SpringBootTest.md


## 3.1. `@SpringBootTest`

통합테스트 제공하는 기본 Spring Boot Test Annotation, 만능

실제 구동되는 애플리케이션과 동일한 Application Context 로 테스트
- 설정된 Bean 을 모두 가져오기 때문에 규모가 클수록 느려짐
- 단위 테스트는 힘들어짐

검색 알고리즘 사용하여 `@SpringBootApplication` , `@SpringBootConfiguration` 검색
- 둘 중 하나 필수


### 기본 구조

```java

@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationTest {

	@Test
	public void contextLoads() {

	}
}

```

- `@RunWith(SpringRunner.class)` : JUnit 내장 Runner 대신  Annotation 에 정의된 Runner 사용
  - `SpringRunner.class` : `@SpringBootTest` 사용하려면 필수 ; `SpringJUnit4ClassRunner` 상속

### 예제

- @SpringBootTest property 중 value - property 동시 사용 불가, 아래 예제는 에러 발생
- `value` : 테스트 실행 전 적용할 property 주입 ; 기존 property 를 override
- `properties` : 테스트 실행 전 `key=value` 형식으로 property 추가
- `classes` ; application context 에 load할 class 지정, 따로 지정하지 않으면 `@SpringBootConfiguration` 찾아서 자동으로 지정
- `webEnvironment` : 기본값은 Mock Servlet

```java

@RunWith(SpringRunner.class)
@SpringBootTest (value = "value=test", properties = {"property.value=propertyTest"}, classes = {SpringBootTestApplication.class}, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class SpringBootTestApplicationTests {

	@Value("${value}")
	private String value;

	@Value("${property.value}")
	private String propertyValue;

	@Test
	public void contextLoads() {
		assertThat (value, is("test"));
		assertThat (propertyValue, is("propertyTest"));
	}
}

```

- `@ActiveProfiles( "PROFILE")` : Profile 마다 다른 DataSource 갖는 경우 ; ex. `@ActiveProfiles( "local")`
- `@Transactional` : 테스트에서 사용하는 경우 테스트 종료 후 데이터 자동으로 RollBack, 단 테스트가 서버의 다른 thread 에서 실행 중인 경우에는 WebEnvironment 의 RANDOM_PORT / DEFINED_PORT 사용하여 테스트 수행해도 RollBack 되지 않음

`spring-boot-test-autoconfigure` 사용하면 주제에 따라 테스트 가능
- 형식 : `@...Test`
- 해당 어노테이션 주제와 관련된 Bean 만 application-context 에 로드


## 3.2. @WebMvcTest

웹에서 테스트하기 힘든 Controller 테스트하는데 적합 ; Request-Response 테스트

Security, Filter 도 자동으로 테스트

MVC 관련된 부분만 가져와, `@SpringBootTest` 보다 가볍게 테스트 가능

- Annotations : `@Controller`, `@ControllerAdvice`, `@JsonComponent`
- Filters
- WebMvcConfigurer
- HandlerMethodArgumentResolver

### 예제

- `@WebMvcTest(BookController.class)` : 테스트 할 Controller 명시
- `given()` : `getBookList()`의 반환값 지정

`BookControllerTest.java`

```java

@RunWith(SpringRunner.class)
@WebMvcTest(BookController.class)
public class BookControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private BookService bookService;

    @Test
    public void Book_MVC_TEST() throws Exception {
        Book book = new Book("Spring Boot Book", LocalDateTime.now());

        given(bookService.getBookList()).willReturn(Collections.singletonList(book));

        mvc.perform(get("/books"))
                .andExpect(status().isOk())
                .andExpect(view().name("book"))
                .andExpect(model().attributeExists("bookList"))
                .andExpect(model().attribute("bookList", contains(book)));

    }
}

```

`Book.java`

```java

@NoArgsConstructor
@Getter
public class Book {

    private Integer idx;
    private String title;
    private LocalDateTime   publishedAt;

    @Builder
    public Book (String title, LocalDateTime publishedAt) {
        this.title = title;
        this.publishedAt = publishedAt;
    }
}

```

`BookController.java`

```java

@Controller
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/books")
    public String getBookList(Model model) {
        model.addAttribute("bookList", bookService.getBookList());
        return "book";
    }
}

```

`BookService.java`

- 구현 객체를 만들지 않아도, 테스트에서 MockBean 을 주입하기 때문에 테스트 통과
- 애초에 Service 는 MVC 테스트 대상이 아님

```java

public interface BookService {
    List<Book> getBookList();
}

```

<br />

---

## 3.3. `@DataJpaTest`

JPA 관련 테스트
- DataSource 설정 정상 여부
- JPA 를 사용한 CRUD 테스트
- 내장형 DB 를 테스트 DB 로 사용해 테스트 ; in-memory embedded database
- 테스트 끝나면 자동 RollBack
- `@Entity` 스캔 -> Spring Data JPA Repository 구성
- 별도의 DataSource 사용 가능
  - `AutoConfigureTestDatabase` : default == `Replace.Any`, `Replace.None` 으로 설정시  `@ActiveProfiles` 에 설정된 DataSource 사용
  - 또는 `application.yml` 에서 정의 : `spring.test.database.replace : NONE`

	```java

	@RunWith(SpringRunner.class)
	@DataJpaTest
	@ActiveProfiles("...")
	@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
	public class JpaTest{
		...
	}

	```

- 테스트 DB 선택
  - H2, Derby, HSQL 등
  - Properties 설정 방식

	```yml
	spring.test.database.connection: H2
	```
  - Annotation 설정 방식
	
	```java
	@AutoConfigureTestDatabase(connection = H2)
	```

TestEntityManager

- EntityManager 의 대체제
- `persist`, `flush`, `find` 등 기본적인 JPA 테스트 가능

### 예제

`Book.java` 수정

- add JPA Annotation

```java

@NoArgsConstructor
@Getter
@Entity
@Table
public class Book {

    @Id
    @GeneratedValue
    private Integer idx;

    @Column
    private String title;

    @Column
    private LocalDateTime   publishedAt;

	...

}

```

`BookRepository.java`

```java

public interface BookRepository extends JpaRepository<Book, Integer> {
}

```

`BookJpaTest.java`

```java

@RunWith(SpringRunner.class)
@DataJpaTest
public class BookJpaTest {

    private final static String BOOT_TEST_TITLE = "Spring Boot Test Book";

	// TestEntityManager 사용
    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private BookRepository bookRepository;

    @Test
    public void Book_Save_TEST() {
        Book book = Book.builder().title(BOOT_TEST_TITLE).publishedAt(LocalDateTime.now()).build();

        testEntityManager.persist(book);

        assertThat (bookRepository.getOne(book.getIdx()), is(book));
    }

    @Test
    public void BookList_Save_Search_TEST() {
        Book book1 = Book.builder().title(BOOT_TEST_TITLE + "1").publishedAt(LocalDateTime.now()).build();
        testEntityManager.persist(book1);

        Book book2 = Book.builder().title(BOOT_TEST_TITLE + "2").publishedAt(LocalDateTime.now()).build();
        testEntityManager.persist(book2);

        Book book3 = Book.builder().title(BOOT_TEST_TITLE + "3").publishedAt(LocalDateTime.now()).build();
        testEntityManager.persist(book3);

        List<Book> bookList = bookRepository.findAll();
        assertThat(bookList, hasSize(3));
        assertThat(bookList, contains(book1, book2, book3));
    }

    @Test
    public void BookList_Save_Delete_TEST() {
        Book book1 = Book.builder().title(BOOT_TEST_TITLE + "1").publishedAt(LocalDateTime.now()).build();
        testEntityManager.persist(book1);

        Book book2 = Book.builder().title(BOOT_TEST_TITLE + "2").publishedAt(LocalDateTime.now()).build();
        testEntityManager.persist(book2);

        bookRepository.deleteAll();
        assertThat(bookRepository.findAll(), IsEmptyCollection.empty());
    }
}

```

<br />

---

## 3.4. `@RestClientTest`

REST 통신의 datatype 인 JSON type 이 예상대로 응답 반환하는지 등 테스트

`BookRestController.java`

- REST data return 에 대해서는 6장에서 자세히 다룸
- 원래 반환 타입은 Book 객체이지만, `@RestController` 에 의해 JSON type String 으로 반환

```java

@RestController
public class BookRestController {

    @Autowired
    private BookRestService bookRestService;

    @GetMapping(path = "/rest/test", produces = MediaType.APPLICATION_JSON_VALUE)
    public Book getRestBooks() {
        return bookRestService.getRestBook();
    }
}

```

`BookRestService.java`

- `getForObject("/rest/test", Book.class)`
  - `"/rest/test"` 에 Get Method Request 보내서
  - Book 객체로 Response 받아옴

```java

@Service
public class BookRestService {

    private final RestTemplate restTemplate;

    public BookRestService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.rootUri("/rest/test").build();
    }

    public Book getRestBook() {
        return this.restTemplate.getForObject("/rest/test", Book.class);
    }
}

```

`BookRestTest.java`

- `@Rule` : 하나의 method 끝날 때마다 정의한 값으로 초기화, @Before / @After 상관없이
- `MockRestServiceServer` : client - server 사이 REST 테스트 객체, 실제 통신 이뤄지게 할수도 있음
- `rest_error_TEST()` : 에러 발생한 경우 테스트, `getRestBook()` 에서 에러 발생
- `HttpServerErrorException` : HTTP 500 error

```java

@RunWith(SpringRunner.class)
@RestClientTest(BookRestService.class)
public class BookRestTest {

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Autowired
    private BookRestService bookRestService;

    @Autowired
    private MockRestServiceServer server;

    @Test
    public void rest_TEST() {
        this.server.expect(requestTo ("/rest/test"))
                .andRespond(withSuccess(new ClassPathResource("/test.json", getClass()), MediaType.APPLICATION_JSON));
        Book book = this.bookRestService.getRestBook();
        assertThat (book.getTitle()).isEqualTo("테스트");
    }

    @Test
    public void rest_error_TEST() {
        this.server.expect(requestTo("/rest/test"))
                .andRespond(withServerError());
        this.thrown.expect(HttpServerErrorException.class);
        this.bookRestService.getRestBook();
    }
}

```

`test.json`
- test/resources/

```json

{
  "idx": null,
  "title" : "테스트",
  "publishedAt" : null
}

```

<br />

---

## 3.5. `@JsonTest`

Gson, Jackson API 의 테스트 제공

- `GsonTester`, `JacksonTester`
- 직렬화 serialization, 역직렬화 deserialization 수행 라이브러리

JsonTest 의 테스트 방식

- 문자열 JSON 데이터 -> 객체로 변환
- 객체 -> 문자열 JSON 데이터

### 예제

`BookJsonTest.java`

- 앞서 만든 `test.json` 활용
- JSON 에서 parsing 한 내용과 일치하는지 테스트
- 기존 데이터 객체 내용이 JSON 과 일치하는지 테스트
  - `isEqualToJson` : 내용일치 여부
  - `hasJsonPathStringValue` : 값이 있는지 여부
  - `extractingJsonPathStringValue` : 값이 일치하는지 여부

```java

@RunWith(SpringRunner.class)
@JsonTest
public class BookJsonTest {

    @Autowired
    private JacksonTester<Book> json;

    @Test
    public void json_TEST () throws Exception {
        Book book = Book.builder().title("테스트").build();
        String content = "{\"title\" : \"테스트\"}";

        assertThat (this.json.parseObject(content).getTitle()).isEqualTo(book.getTitle());
        assertThat (this.json.parseObject(content).getPublishedAt()).isNull();

        assertThat (this.json.write(book)).isEqualToJson("/test.json");
        assertThat (this.json.write(book)).hasJsonPathStringValue("title");
        assertThat (this.json.write(book)).extractingJsonPathStringValue("title").isEqualTo("테스트");
    }
}

```

<br />

---

## Outro

모든 테스트를 사용할 필요는 없고, 각 Annotation 의 용도를 정확히 이해하고 적재적소에 사용하는 것이 중요