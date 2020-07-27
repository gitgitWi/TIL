

# JavaScript 입문

## Ch02. 콘솔에 출력, script async 와 defer의 차이점 및 앞으로 자바스크립트 공부 방향

### HTML 에 JavaScript 를 포함하는 방법

일반적인 방법

- HTML 을 parsing 하는 도중 `script` 태그를 만나면 fetching - executing  거침
- js 파일 크기가 크거나 인터넷 속도가 느리면  page loading 이 오래 걸림
- js 의존도가 높은 페이지일수록 문제

```js

<script src="main.js"></script>

```

`async`

- HTML parsing  과 JS fetching - executing 과정을 병렬로 처리
- 순서 없음
- DOM 요소 조작하는 경우, 해당 DOM 요소가 parsing  되기 전 JS 실행되면 문제 발생

```js

<script async src="main.js"></script>

```

`defer`

- HTML parsing 과 JS fetching 을 동시에 진행 (async 와 동일)
- HTML parsing 모두 끝난 후 JS executing
- JS 간 순서 지정 가능
- 가장 효율적/안전한 방법

```js

<script defer src="main.js"></script>

```

### `"use strict";`

유연한 언어인 JS 를 엄격하게 만듦 
- ES 5 이상에서 가능
- 성능도 좀더 효율적

<br />

---

## Ch03. 데이터타입, data types, let vs var, hoisting

### Variables

#### 변수 선언

- `let` : ES6 에서 추가됨, 이전의 `var` 는 변수 선언 전에도 사용 가능 (undefined) 한 문제가 있음 (var hoisting ; 선언 위치와 상관없이 항상 파일 제일 위로 끌어 올림, block scope 으로 선언해도  global scope 으로 사용됨)
- block scope : `{  }` 안에 선언된 변수, 괄호 밖에서 접근 불가
- global scope : `{  }` 밖에 선언된 변수, 항상 메모리에 올려짐; 최소한으로 사용
- `const` : 상수 (immutable type), value 에 대한 pointer 가 잠김
  - 보안, 실수 방지
  - thread safety ; 효율성, 안전


#### types

primitive
- single item
- number ; dynamic 변수할당,  (-2 ** 53) ~ (2 ** 53)
  - bigInt

  ```js

  const count = 17;
  const size = 17.1;
  console.log(`value: ${count} type : ${typeof count}`); 
  // "value: 17 type : number"
  console.log(`value: ${size} type : ${typeof size}`);
  // "value: 17.1 type : number"

  const bigint = 12345678901234567890123456789099999999;
  console.log(`value: ${bigint} type : ${typeof bigint}`);
  Number.MAX_SAFE_INTEGER;
  // "value: 1.2345678901234568e+37 type : number"

  const infinity = 1 / 0;
  const negativeInfinity = -1 / 0;
  const nan = "not a number" / 2;
  console.log(infinity);
  // Infinity
  console.log(negativeInfinity);
  // -Infinity
  console.log(nan);
  // NaN

  ```

- string
  - template literals

  ```js

  const name = 'gitgitwi'
  const greeting = 'hello  ' + name
  console.log(`value: ${greeting}, type : ${typeof greeting} `)

  ```

- boolean
  - false : 0, null, undefined, NaN, ''
  
  ```js

  > console.log(`value: ${nothing}  type: ${typeof nothing}`)
  value: null  type: object

  ```

  - true : any other value

- symbol : 완전히 다른 unique identifiers

  ```js

  > const symbol1 = Symbol('id')
  > const symbol2 = Symbol('id')
  > console.log(symbol1 == symbol2)
  false
  > console.log(symbol1 === symbol2)
  false

  // String 에 대해 Symbol 만드는 경우
  > const gSymbol1 = Symbol.for('id')
  > const gSymbol2 = Symbol.for('id')
  > console.log(gSymbol1 === gSymbol2)
  true
  > console.log(gSymbol1 == gSymbol2)
  true

  > console.log(symbol1)
  Symbol(id)
  > console.log(symbol1.description)
  id
  > console.log(gSymbol1)
  Symbol(id)
  > console.log(gSymbol1.description)
  id

  ```

object
- box container ; single items 를 묶어서 한 박스로

function
- first-class function ; function 도 변수로 할당 가능 ; args로 활용 가능


#### Dynamic Typing

runtime 때 type 결정

- 자유도가 있고, 빠르게 prototyping 가능한 장점
- 실제 환경에서 에러가 나는 경우

```js

> let text = 'hello'
> console.log(`value : ${text}\t type : ${typeof text}`)
value : hello    type : string
> console.log(text.charAt(0))
h

> text = 1
> console.log(`value : ${text}\t type : ${typeof text}`)
value : 1        type : number

> text = '7' + 5
> console.log(`value : ${text}\t type : ${typeof text}`)
value : 75       type : string

> text = '8' / '2'
> console.log(`value : ${text}\t type : ${typeof text}`)
value : 4        type : number
> console.log(text.charAt(0))
Uncaught TypeError: text.charAt is not a function

```