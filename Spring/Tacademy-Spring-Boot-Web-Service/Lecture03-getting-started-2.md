# Spring Boot Project 만들기 2

- https://www.youtube.com/watch?v=TNV3HSI-Npc&list=PL9mhQYIlKEhdjUeH15EBJvhdEgjMZa798&index=3
- mkdate : 2020-06-19

## Layered Spring Application 애플리케이션 계층

계층 Layer - `@Component`

- 표현 Presentation : `@Controller`
- 서비스 Service : `@Service`
- 영속화 Persistence : `@Repository`, 여기서부터 윗방향으로 순서대로 개발, 계층 완성

## Spring Data JPA

### ORM

- Object-Relational Mapping
- 객체로 RDBMS 관리

### JPA

- Java Persistence API
- Java 객체 정보를 영속화하는 중간 과정 처리
- Entity 객체 저장/변경/삭제 시 그에 대응하는 Query 생성 및 실행
- Hibernate, OpenJPA 등

### 객체 모델링 저장

```java
// Object - DB Mapping
@Entity
class Book {
    Long id;
    String isbn13;
    String isbn10;
}

// insert into book(id, isbn13, isbn10) values(...);

// JPA Repository Interface
public interface BookRepository extends JpaRepository <Book, Long> {
    List<Book> findByNameLike(String name);
}
```

### Service (Java Class) to Persistence Layer (DB)

Application Modules
- Repository
- Repository Implements

Object-Relational Mapper
- Spring Data JPA
- Hibernate

JDBC Interfaces
- JDBC Basic APIs
- DataSource; Configuration for Connect

JDBC Implementations
- JDBC Driver

Persistence Layer
- Database ; MySQL, Oracle, PostgreSQL..

### 업무 (비즈니스 로직) 구현에만 집중할 수 있도록!

- 영속화 계층 (`@Repository`)에서는 Entity 관리만
- 비즈니스 로직 구현은 도메인 영역에서
- 서로 다른 도메인 사이 연계는 서비스 계층 (`@Service`) 에서
- 외부요청에 대한 처리는 컨트롤러 계층 (`@Controller`) 에서
- DDD ; Domain-Driven Design
