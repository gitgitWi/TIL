# 초보자를 위한 JavaScript

Nicolas

- Nomad Coders

Youtubes

- https://www.youtube.com/watch?v=Q0S6l_gkpeU&list=PL7jH19IHhOLM8YwJMTa3UkXZN-LldYnyK&index=14
- 
- https://www.youtube.com/watch?v=LnuLDGO5848&list=PL7jH19IHhOLM8YwJMTa3UkXZN-LldYnyK&index=18

mkdate : 2020-07-18-Sat

## 02-01. Your First JS Function

Objects
- 01-10강에서 만든 `manInfo.hasAPTs`와 `console.log`의 유사점
- `.log`는 `console`의 `key`이면서 함수

```javascript

console.log(manInfo.hasAPTs[1].loc);

console.log (console);
/*
t {
    log: [Function],
    error: [Function],
    info: [Function],
    warn: [Function],
    dir: [Function],
    time: [Function],
    timeEnd: [Function],
    trace: [Function],
    assert: [Function],
    clear: [Function],
    stdout: { [Function] clear: [Function] },
_times: {} 
}
*/

```

`console.log` 에는 arguments 무한정 들어갈 수 있음

```javascript

function sayHello(name, age) {
    console.log('Hello!', name, ". You have", age, "years of age.");
}

sayHello("SUE", 30);

```

` `` ` : String을 좀더 보기 좋게 사용하는 방법

> Python 3.6 이상에서 `f" {name} "` 과 유사

```javascript

function sayHello(name, age) {
    // console.log('Hello!', name, ". You have", age, "years of age.");
    console.log (`Hello ${name}! You are ${age} years old..`)
}

sayHello("SUE", 30);
// Hello SUE! You are 30 years old..

```

`console.log` 를 `return` 으로 바꿔서 좀더 함수 다운 함수로

```javascript

function sayHello(name, age) {
    return (`Hello ${name}! You are ${age} years old..`)
}

const greetSUE = sayHello("SUE", 30);

console.log (greetSUE);

```

calculator

```javascript

const calculator = {
    plus : function (a, b) {
        return a + b;
    },

    subs : function (a, b) {
        return a - b;
    },

    multi : function (a, b) {
        return a * b;
    },

    div : function (a, b) {
        return a / b;
    }
}

const plus = calculator.plus(5, 5);
const subs = calculator.subs (10 , 5);
const multi = calculator.multi (3, 6);
const div = calculator.div (15, 6);

console.log (plus); // 10
console.log (subs); // 5
console.log (multi); // 18
console.log (div); // 2.5

```

<br >

---

## 02-02. JS DOM Functions

JavaScript 에서 HTML DOM 객체 다루기
- DOM == Document Object Module
- document 안의 모든 것은 object

`document` : HTML 전체

```javascript

console.log(document);

```

![image](https://user-images.githubusercontent.com/57997672/87841760-aedb6780-c8e2-11ea-87fd-50673a5bf05f.png)

`.getElementById( )`

```javascript

const title = document.getElementById("title");
console.log(title);
// <h1 id="title">This Works!</h1>

```

<br />

---

## 02-03. Modifying the DOM with JS

객체의 속성 확인

```javascript

console.dir(document)
console.dir(title);

```

Object 속성 변경

```javascript

title.innerHTML = "Hi! It's Hacked! ㅋㅋ";
title.style.color = "red";
document.title = "It's Hacked by Wi!!!"

```

다양하게 DOM elements 속성 가져올 수 있음

```javascript

document.getElementById()
document.getElementsByClassName()
document.getElementsByName()
document.getElementsByTagName()
document.getElementsByTagNameNS()

document.querySelector()
document.querySelectorAll()

```
`document.querySelector()`
- 노드의 첫번째 자식 선택

```javascript

document.querySelector("title");
// <title>​It's Hacked by Wi!!!​</title>​

document.querySelector("#title")
// <h1 id=​"title" style=​"color:​ grey;​">​Hi! It's Hacked! ㅋㅋ​</h1>​

```

<br>

---

## 02-04. Events and Event Handlers

window resize event 발생마다 handleResize 함수 불러와서, console에 "RESIZED" 출력

```javascript

function handleResize() {
	console.log("RESIZED");
}

window.addEventListener("resize", handleResize);

```

resize event 마다 event에 대한 정보 출력하는 함수로 수정

```javascript

function handleResize(event) {
	console.log(event);
}

window.addEventListener("resize", handleResize );

```

![image](https://user-images.githubusercontent.com/57997672/87842633-b6057400-c8e8-11ea-8417-273037e459b8.png)

title click event >> 빨간색으로 변경

```javascript

const title = document.querySelector("#title");

function handleClick () {
	title.style.color = "red";
}

title.addEventListener("click", handleClick );

```

<br >

---

## 02-05. Conditional Statement; `if, else, and, or`

```javascript

const stocks = prompt("How many do you have Naver stocks?");

if (stocks >= 100 && stocks <= 300 ) {
	console.log("Cheer up! You may want to have more stocks.");
} else if  (stocks > 300) {
	console.log ("Wow! You are Rich!");
} else {
	console.log ("What a pity! You are Poor..");
}

```
## 02-06 ~ 07. DOM if else Function practice

> UI Color 추천 : https://flatuicolors.com

> MDN :  다양한 DOM events 에 대해 나와있으니 꼭 참고

title 색상 바꾸기

```javascript

const title = document.querySelector("#title");

const BASE_COLOR = "rgb(52, 73, 94)";
const OTHER_COLOR = "#e74c3c";

function handleClick () {
	const currentColor = title.style.color;
	// console.log (currentColor);
	if (currentColor === BASE_COLOR) {
		title.style.color = OTHER_COLOR;
	} else {
		title.style.color = BASE_COLOR;
	}
}

function init() {
	title.style.color = BASE_COLOR;
	// title.addEventListener("click", handleClick );
	title.addEventListener("mouseenter", handleClick);
}

init();

```

on/offline

```javascript

function handleOffline () {
	console.log  ("Bye Bye");
}

function handleOnline() {
	console.log ("Welcome Back");
}

window.addEventListener("offline", handleOffline);
window.addEventListener("online", handleOnline);

```

위에서 title color 작업 내용 중 CSS 관련 부분은 CSS 로 분리

```css

h1 {
  color: #2c3e50;
  transition: color .5s ease-in-out;
}

.clicked {
  color: #e74c3c;
}

```

if-else 로 현재 Class 확인

```javascript

const CLICKED_CLASS = "clicked";

function handleClick() {

	const currentClass = title.className;
	
	if (currentClass !== CLICKED_CLASS) {
			title.className = CLICKED_CLASS;
	}
	else {
		title.className = "";
	}
}

```

위의 방식은 class를 아예 없애는 방식,

여러 개 class를 사용하는 경우 문제 발생

`classList` 에 추가/삭제 하는 방식으로 변경

```javascript

function handleClick() {

    const currentClass = title.className;

	const hasClass = title.classList.contains(CLICKED_CLASS);

	if  (hasClass ) {
		title.classList.remove(CLICKED_CLASS);
	}
	else {
		title.classList.add(CLICKED_CLASS);
	}
}

```

`toggle` remove/add 를 한번에 해주는 함수

```javascript

function handleClick() {
    
    title.classList.toggle(CLICKED_CLASS);
    
}

```
