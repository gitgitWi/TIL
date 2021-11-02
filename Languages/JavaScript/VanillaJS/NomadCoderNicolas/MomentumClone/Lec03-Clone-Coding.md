# 초보자를 위한 JavaScript

Nicolas

- Nomad Coders

Youtubes

- https://www.youtube.com/watch?v=f0nBj0YMBUI&list=PL7jH19IHhOLM8YwJMTa3UkXZN-LldYnyK&index=22

mkdate : 2020-07-18-Sat

## 03-01, 02. Making a JS Clock

- `Date` 활용
- `setInterval ()` : miliseconds 단위로 새로고침
- 삼함연산자 : 10 이하 수 앞에 0 붙이기

```javascript

const clockContainer = document.querySelector(".js-clock"),
	clockTitle = clockContainer.querySelector("h1");

function getTime() {
	const date = new Date();
	const minutes = date.getMinutes();
	const hours = date.getHours();
	const seconds = date.getSeconds();
	clockTitle.innerText = `${
		hours < 10 ? `0${hours}` : hours}:${
		minutes < 10 ? `0${minutes}`: minutes}:${
		seconds  < 10  ? `0${seconds}` : seconds}`;
}

function init() {
	getTime();
	setInterval(getTime, 1000);
}

init();

```

<br />

---

## 03-03, 04 Saving the User Name

greetings.js

```javascript

const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser", SHOWING_ON = "showing";

function saveName (text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit (event) {
    // form 태그의 default 동작인 redirection을 막고, 원하는 동작 지정
    event.preventDefault();
    // input 태그에 입력된 value 가져옴
    const currentValue = input.value;
    // console.log(currentValue);
    paintGreeting(currentValue);
    // localStorage에 현재 사용자 이름 저장
    saveName(currentValue);
}

function askForName () {
    // askForName 함수가 실행될 때, 이름 입력하는 form 태그 보이게
    form.classList.add(SHOWING_ON);

    // form 태그 실행시 submit 되도록
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting (text) {
    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    // localStorage 에 있는  "currentUser" 내용 가져옴
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();

```

<br />

---

## 03-05, 06, 07 Making a To Do List

todo.js

```javascript

const toDoForm = document.querySelector(".js-toDoForm"),
        toDoInput = toDoForm.querySelector("input"),
        toDoList = document.querySelector(".js-toDoList");

const TODOS_LS= "toDos";
let toDos = [];

function deleteToDO (event) {
    // console.log(event.target.parentNode.id);
    const btn = event.target;
    // delete btn의 부모 노드를 찾고, 부모 노드의 자식 노드를 제거하는 방식으로 항목 제거
    const li = btn.parentNode;
    toDoList.removeChild(li);
    
    // filter 함수 사용
    // 모든 element 중 함수에 해당하는 것을 array로 반환
    // 아래의 경우, 제거되는 li의 id와  toDos의 각 elemenet의 id를 비교하여 같지 않은 것만 반환
    // == 제거되는 것 이외 나머지를 array로 반환
    const cleanToDos = toDos.filter( function (toDo) {
        return toDo.id !== parseInt(li.id);
    } ) ;

    // console.log(cleanToDos);
    
    //나머지만 toDos에 저장하고, localStorage에 저장
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos  () {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// 새로운 toDo 생성
function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
    // deleteBtn 클릭할 경우 실행할 event 지정
    delBtn.addEventListener("click", deleteToDO);

    const span = document.createElement("span");
    span.innerHTML = `${text}  `;
    const newId = toDos.length + 1;    
    
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    
    // toDoList 클래스에  li (새로운 toDo) 추가
    toDoList.appendChild(li);

    // localStorage에 저장
    const toDoObj = {
        text : text,
        id : newId,
    }
    toDos.push(toDoObj);
    saveToDos();
}

// toDoForm 에서 submit 이벤트 발생하는 경우
// redirect 막고
// input에 입력된 value를 저장
// input form의 string 초기화
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

// localStorage 에 저장된 toDos 호출
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if  (loadedToDos !== null ) {
        const parsedToDos = JSON.parse(loadedToDos);
        // console.log(parsedToDos);
        parsedToDos.forEach(function (toDo) {
            // console.log(toDo.text);
            paintToDo(toDo.text);
        })
    } 
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit );
}

init();

```

<br />

---

## 03-08. Image Background

> free-usable imgs  : https://unsplash.com/

bg.js

```javascript

const body = document.querySelector("body");

const IMG_NUMBER = 6;

function handleImgLoad() {
    console.log('finished loading img')
}

function paintImg(imgNumber) {
    // img 객체 생성
    const img = new Image();
    // img src 지정
    img.src = `./imgs/${imgNumber + 1}.jpg`;
    // body.appendChild(img);

    // img에 class 지정 - CSS 지정
    img.classList.add("bgimg");
    // body의 첫 자식 노드로 삽입
    body.prepend(img);
    // img.addEventListener("loadedend", handleImgLoad);
}

function getRandom () {
    // JS 내장 모듈인 Math 활용
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init () {
    const randomNumber = getRandom();
    paintImg(randomNumber);
}

init();

```

index.css 추가

```css

@keyframes fadeIn {
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
}

.bgimg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*  이미지를 맨 뒤로 보냄 - 배경 이미지로 지정 */
  z-index: -1; 
  /* 로딩 될 때 fadeIn 효과 */
  animation: fadeIn .5s linear;
}

```

<br />

---

## 03-09, 10 Getting the Weather

```javascript

const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "...";

function getWeather (lat, long) {
    // fetch ; 해당 url의 내용 가져옴
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
    // 모든 내용 가져온 후 json으로 리턴
    .then( function (response) {
        return response.json();
    // json 에서 온도, 지역 정보 추출 후 
    // weather 위치에 text로 삽입
    }) .then(function (json) {
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp}℃ @ ${place}`;
    });
}

function  saveCoords (coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError () {
    console.log("Can't Access to Geolocation");
}

// 내장 모듈 navigator를 통해 위치 정보 추출
function askForCoords () {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);

    if  (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        // console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();

```

나머지 CSS는 알아서~
