# 초보자를 위한 JavaScript

Nicolas

- Nomad Coders

Youtubes

- https://youtu.be/1fc0MHYb_DE
- https://youtu.be/u0BypNb0lEI

mkdate : 2020-07-18-Sat


## 01-04. VanillaJS

### VanillaJS 를 먼저 배워야 하는 이유

ReactJS 같은 library, framework를 쓸 줄 아는 사람들은 있지만, VanillaJS를 제대로 하는 사람은 거의 없다

- 사진 찍을 줄 모르는데, 포토샵만 할 줄 아는 사람과 같다
- 모든 JS의 베이스인 VanillaJS 를 제대로 알아야 다른 JS들을 다룰 때도 어렵지 않을 것

<br />

---

## 01-05. Hello World with JavaScript

첫 JS 코딩

Code Editor 선정
- Repl.it
- VSCode..

```html

<!DOCTYPE html>
<html>
  <head>
    <title>1st JS</title>
    <link rel="stylesheet" href="index.css" />
  </head>

  <body>
    <h1>This Works!</h1>

    <script src="index.js"></script>
  </body>

</html>

```

JavaScript 는 항상 html 제일 마지막에 추가

- 이유는 나중에..

<br />

---

## 01-06 Your fisrt JS Variables

간단한 변수

```javascript

a = 221
b = a - 5
console.log(b)

```

위의 코드는 좋은 코드가 아님
- JavaScript 는 좋은 문법이 아니라도 허용하는 경우가 있음

코드 개선
- 변수 생성 process 
  - Create
  - Initialize
  - Use
- 모든 expressions는 한 줄에 하나
- 마지막에 ` ; ` 세미콜론 

```javascript

let a = 221;
let b = a - 5;
a = 4;
console.log(b, a); 
// 216 4

```

<br />

---

## 01-07. let, const, var

변수 선언하는 3가지 방법

### `const`

상수

```javascript

const a = 221;

```

### `var`

let 과 유사

변할 수 있는 값에 사용

<br />

---

## 01-07. Data Types on JS

### Comments

```javascript

// to do : finish this

/*
FINISH THIS
FINISH THIS
FINISH THIS
FINISH THIS
FINISH THIS
*/

```

### String

작은 따옴표, 큰 따옴표 모두 가능

```javascript

// const what = 'THIS IS STRING!'
const what = "THIS IS STRING!"

```

### Boolean

소문자 true / false

```javascript

const tof = true; // == 1
const tof 2= false; // == 0

console.log(true == 1); // true
console.log(true === 1); // false

```

### Number

float

```javascript

const flfl = 3.253

```

<br />

---

## 01-09. Organizing Data with Arrays

서로 다른 datatype 저장 가능

> Python list와 유사

```javascript

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

console.log (daysOfWeek);
// [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ]

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", true, false, 123, 456.098];

console.log (daysOfWeek);
// [ 'Mon',  'Tue', 'Wed',  'Thu',  'Fri',  'Sat',  'Sun' , true, false,  123,  456.098 ]

console.log (daysOfWeek[3]); // Thu
console.log (daysOfWeek[-1]); //  undefined
// python 처럼 뒤에서 부터 세는 연산은 안됨

```

<br />

---

## 01-10. Organizing Data with Object

> Python dictionary 와 유사

Object 안에 Arrays/Objects 추가 가능

const 로 선언할 경우
- type 자체는 변경 불가
- 내부 내용은 변경 가능

```javascript

 const manInfo = {
     name : 'Petro',
     age : 53,
     gender : "Male",
     isRich : false
 };

 console.log(manInfo);
// { name: 'Petro', age: 53, gender: 'Male', isRich: false }
console.log(manInfo.gender); 
// Male
 console.log(manInfo.isRich);
// false

 manInfo.isRich = true;
manInfo.hasCars = ['BenzS500', 'AudiQR5', 'GenesisGV80']
manInfo.hasAPTs = [
    {
        name : 'HannamTheHill',
        loc : 'Hannam, Yongsan'
    },
    {
        name : 'BanpoXi',
        loc : 'Banpo, Seocho'
    }
];

console.log(manInfo);   
/*
{ 
    name: 'Petro',
    age: 53,
    gender: 'Male',
    isRich: true,
    hasCars: [ 'BenzS500', 'AudiQR5', 'GenesisGV80' ],
    hasAPTs: 
    [ { name: 'HannamTheHill', loc: 'Hannam, Yongsan' },
        { name: 'BanpoXi', loc: 'Banpo, Seocho' } ] 
}
*/

```