# Tucker의 GoLang 프로그래밍
## 컴맹을 위한 프로그래밍 기초 강좌

---

[Youtube Playlist](https://www.youtube.com/playlist?list=PLy-g2fnSzUTAaDcLW7hpq0e8Jlt7Zfgd6)

---

# 08. Go 로 만든 Hello 월드

HelloWorld 기본 구조

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello World!")
}
```

### `Package`
- library : 프로그램 만드는데 필요한 기능들 묶어놓은 것
- module : 기능 묶음, library 보다 좀더 focusing
- framework : 기능과 절차 묶음
- engine : 기능에 tool 까지 묶음
- package

#### `package main` 
: 이 `package`의 이름이 `main`임을 선언  
: `main`은 지정된 것, 실행파일 package

#### `import "fmt"`

- import packages
- 표준/기본 packages
- 외부 packages
- import multiple packages : `import ( "a" "b" ...)`

#### `func main()`
- main function 

#### `fmt.Println("Hello World!")` 
- call function `Println` in package `fmt`
- with input "Hello World!"

----

# 09~10. Go 의 변수

```go
package main

import "fmt"

func main() {
	var a int
	var b int
	a = 3
	b = 4
	fmt.Println(a + b)
}
```

## 변수의 속성

- name
- value
- memory pointer : 메모리 주소의 시작점
- size
- type :  include size


## Types of Variables

### int
- int : 32 or 64 bytes, 요즘은 거의 64 bytes 컴퓨터이므로 64bytes
- int8 (-128~127) / int16 (-32768 ~ 32767) / int 32 (-21억 ~ 21억) / int64 (-42억 ~ 42억)
    - 맨 앞자리는 부호표시 때문에 한 자리수가 줄어듦
- uint8 (0~2^8-1) / uint16 (0~65535) / uint32 (~42억)
- 금융권에서는 여러 숫자 type 조합하는 알고리즘 필요

### float
- 숫자 부분 (digit, 정밀도) + 지수 부분
- float32 : 4bytes, 숫자부 7개 표현
- float64 : 8bytes, 숫자부 15개 표현


#### 왜 여러 개의 type으로 나누는가?
- memory 절약
    - winOS에서 메모리 부족 시 HDD Swapping : 속도 크게 느려짐
- Network
    - 전송 데이터 (패킷) 최소화

### String
- GoLang은 기본적으로 UTF-8로 문자열 저장
- rune : 각 글자를 저장하는 type, 1~3 byte, string = []rune

---
# 11. Go언어의 연산자 operator

## 종류
- 이항 연산자 : 사칙연산 등
- 단항 연산자 : 음수 부호 표시 등

[Golang > Operators](https://golang.org/ref/spec#Operators)

```go
binary_op  = "||" | "&&" | rel_op | add_op | mul_op .
rel_op     = "==" | "!=" | "<" | "<=" | ">" | ">=" .
add_op     = "+" | "-" | "|" | "^" .
mul_op     = "*" | "/" | "%" | "<<" | ">>" | "&" | "&^" .

unary_op   = "+" | "-" | "!" | "^" | "*" | "&" | "<-" .
```

- 산술연산자
- 비트연산자
    - 4 `&` 2 : 0100 & 0010 == 0000 == 0
    - 4 `|` 2 : 0100 | 0010 == 0110 == 6
    - 4 `^` 2 (XOR): 0100 ^ 0010 == 0110 == 6
- 논리(비교)연산자
- 그 외
 - `&^(`and not) : 4&^4 : 0100 & ^0100 == 0100 & 1011 == 0000
 - shift (`<<`, `>>`) : 
    - a:=4; a<<1 : 0100<<1 == 1000 == 8 : *2한 결과, 곱하기 보다는 빠르다
    - a:=4; a>>1 : 0100>>1 == 0010 == 2 : /2한 결과

---

# 12. 조건연산자와 조건문