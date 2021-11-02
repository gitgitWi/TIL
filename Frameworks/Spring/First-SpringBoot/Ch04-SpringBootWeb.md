# 처음 배우는 스프링 부트 2

- 김영재, 2018, 한빛미디어


# Ch04. 스프링 부트 웹

- Class: Spring
- ClassName: 처음배우는스프링부트2
- Created: Jul 22, 2020
- Updated: Jul 22, 2020 
- https://github.com/gitgitWi/Lecture-Notes/blob/master/Spring/First-SpringBoot/Ch03-SpringBootWeb.md
- https://github.com/gitgitWi/FirstSpringBoot_Comu

---

## 4.1. 커뮤니티 게시판 설계하기

Spring Boot Web : View page, Api 서비스 구현에 사용

여기서는 MVC 중 View 작성만 다룸

> 저자 Repo 참고 : https://github.com/young891221/Spring-Boot-Community-Web/tree/start-web

### 설계

- CRUD 기능만 있는 최소한의 게시판 ; 회원가입/로그인, 댓글 등 추후에
- 게시판 객체 : Board (idx, title, sub_title, content, board_type, created_date, updated_date, user_idx), User (idx, name, password, email, created_date, updated_date)

## 4.2. 커뮤니티 게시판 프로젝트 준비하기

dependencies

- Web
- Thymeleaf
- JPA
- Devtools
- Lombok
- H2

## 4.3. 커뮤니티 게시판 구현하기

개발 순서

1. 프로젝트 의존성 구성
2. Spring Boot Web Starter 살펴보기
3. Domain Mapping
4. Domain Test
5. CommandLineRunner 사용해 DB에 데이터 입력
6. 게시글 List 기능
7. Thymeleaf Java 8 날짜 포맷 라이브러리 추가
8. paging 처리
9. 작성 Form 만들기


### 4.3.1. 프로젝트 의존성 구성

`build.gradle`

- gradle 버전에 따라 작성법이 조금씩 다른 듯?

```groovy

buildscript {
	ext {
		springBootVersion = '2.3.1.RELEASE'
	}
	repositories {
		mavenCentral()
		jcenter()
	}
	dependencies {
		classpath ("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
	}
}

plugins {
	id 'java'
	id 'eclipse'
	id 'org.springframework.boot' version '2.3.1.RELEASE'
	id 'io.spring.dependency-management' version '1.0.9.RELEASE'
}

group = 'io.tuto'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '1.8'

repositories {
	mavenCentral()
	jcenter()
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	
    // Compile 시에만 실행, Runtime 시에는 실행 X
    compileOnly 'org.projectlombok:lombok'
	developmentOnly 'org.springframework.boot:spring-boot-devtools'
	
    // H2 는 runtime 시에만 실행되도록 설정
    runtimeOnly 'com.h2database:h2'
	annotationProcessor 'org.projectlombok:lombok'
	testImplementation('org.springframework.boot:spring-boot-starter-test')
}

```

### 4.3.2. 스프링 부트 웹 스타터 살펴보기

spring-boot-starter-web 의 의존성 설정

- spring-boot-starter
- spring-boot-starter-tomcat : 내장 Tomcat 사용
- hiberante-validator : Annotation 기반 표준화 제약조건, 유효성 검사 규칙 표현
- spring-boot-starter-json 
- spring-web : HTTP Integration, Servlet Filters, Spring HTTP invoker, HTTP core 포함
- spring-webmvc : request 전달하는 MVC, DispatcherServlet 기반 라이브러리


### 4.3.3. 도메인 매핑하기

***도메인 매핑*** :  JPA 를 이용해 DB - 클래스 연결

Domain Class 생성

- Board, User
- JPA Mapping 사용

`BoardType.java`

```java

public enum BoardType {
    notice("공지사항");
    free("자유게시판");
    
    private String value;

    BoardType(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}

```

`Board.java`

`@GeneratedValue (strategy = GenerationType.IDENTITY)`

- Primary Key 자동할당

`@Enumerated (EnumType.STRING)`

- Enum Type Mapping, Java의 Enum Type - DB data 변환 지원
- 여기서는 Java Enum -> DB String

`@OneToOne(fetch = FetchType.LAZY)`

- Domain Board - Board field의 Domain User 을 1:1 로 설정
- 실제로 DB 에 저장할 때 User 객체가 아닌 User PK 인 user_idx 값 저장
- FetchType
  - LAZY : User 객체를 실제로 사용할 때 조회
  - EAGER : 처음 Board 조회하는 즉시 User 객체를 함께 조회

```java

@Getter
@NoArgsConstructor
@Entity
@Table
public class Board implements Serializable{
    
    @Id
    @Column
	@GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column
    private String title;

    @Column
    private String subTitle;

    @Column
    private String content;

    @Column
    @Enumerated (EnumType.STRING)
    private BoardType boardType;

    @Column
    private LocalDateTime createdDate;

    @Column
    private LocalDateTime updatedTime;

    @OneToOne(fetch = FetchType.LAZY)
    private User user;

    @Builder
    public Board(String title, String subTitle, String content, BoardType boardType, LocalDateTime createdDate, LocalDateTime updatedDate, User user) {
        this.title = title;
        this.content = content;
        this.subTitle = subTitle;
        this.boardType = boardType;
        this.createdDate = createdDate;
        this.updatedTime = updatedDate;
        this.user = user;
    }
}

```

`User.java`

```java

@Getter
@NoArgsConstructor
@Entity
@Table
public class User implements Serializable {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long idx;

    @Column
    private String name;

    @Column
    private String password;

    @Column
    private String email;

    @Column
    private LocalDateTime createdDate;

    @Column
    private LocalDateTime updatedDate;

    @Builder
    public User (String name, String password, String email, LocalDateTime createdDate, LocalDateTime updatedDate) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }
}

```

<br />

---

### 4.3.4. 도메인 테스트

`BoardRepository.java`

```java

public interface BoardRepository extends JpaRepository<Board, Long> {
    Board findByUser(User user);
}

```

`UserRepository.java`

```java

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}

```

`JpaMappingTest.java`

```java

@RunWith(SpringRunner.class)
@DataJpaTest
public class JpaMappingTest {

    private final String boardTestTitle = "테스트";
    private final String email = "test@gmail.com";

    @Autowired
    UserRepository userRepository;

    @Autowired
    BoardRepository boardRepository;

    @Before
    public void init() {
        User user = userRepository.save(User.builder()
            .name("havi")
            .password("test")
            .email(email)
            .createdDate(LocalDateTime.now())
            .build());

        boardRepository.save(Board.builder()
            .title(boardTestTitle)
            .subTitle("SubTitle")
            .content("Contents")
            .boardType(BoardType.free)
            .createdDate(LocalDateTime.now())
            .updatedDate(LocalDateTime.now())
            .user(user)
            .build()
        );
    }

    @Test
    public void is_it_real_TEST() {
        User user = userRepository.findByEmail(email);
        assertThat (user.getName(), is("havi"));
        assertThat(user.getPassword(), is("test"));
        assertThat(user.getEmail(), is(email));

        Board board = boardRepository.findByUser(user);
        assertThat(board.getTitle(), is(boardTestTitle));
        assertThat(board.getSubTitle(), is("SubTitle"));
        assertThat(board.getContent(), is("Contents"));
        assertThat(board.getBoardType(), is(BoardType.free));
    }
    
}

```

`BoardService.java`

```java

@Service
public class BoardService {

	private final BoardRepository boardRepository;

	public BoardService (BoardRepository boardRepository) {
		this.boardRepository = boardRepository;
	}

	public Page<Board> findBoardList (Pageable pageable) {
        // pageNumber 객체가 0 이하면 0으로 초기화
        // 기본 page 크기 10으로 새로운 PageRequest 객체 만들어 paging 처리된 게시글 리스트 return
		pageable = PageRequest.of(pageable.getPageNumber() <= 0? 0 : pageable.getPageNumber() - 1, pageable.getPageSize());
		return boardRepository.findAll(pageable);
	}

	public Board findBoardByIdx(Long idx) {
		return boardRepository.findById(idx).orElse(new Board());
	}
}

```

`BoardController.java`

```java

@Controller
@RequestMapping ("/board")
public class BoardController {

	@Autowired
	BoardService boardService;

    // {} 를 통해 여러개 받을 수 있음
	@GetMapping({"", "/"})
	public String board (@RequestParam (value = "idx", defaultValue = "0") Long idx, Model model ) {
		model.addAttribute("board", boardService.findBoardByIdx(idx));

		return "/board/form";
	}

	@GetMapping("/list")
	public String list (@PageableDefault Pageable pageable, Model model) {
		model.addAttribute("boardList", boardService.findBoardList(pageable));

		return "/board/list";
	}
}

```

### 4.3.5. CommandLineRunner를 사용해 DB 에 데이터 넣기

