# 초보자를 위한 JavaScript 2, PaintJS

> Nicolas, Nomad Coders
> Youtube : https://www.youtube.com/playlist?list=PL7jH19IHhOLNtwXhfYrbrqM6-CYrVkUWy
> mkdate : 2020-07-18-Sat

## index.html

```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf8" />
    <meta name="viewport"  content="width=device-width, initial-scale=1.0"  />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <title>PaintJS of gitgitWi</title>
</head>

<body>
    <canvas id="jsCanvas" class="canvas"></canvas>
    <div class="controls">
        <div class="controls_range">
            <input type="range" id="jsRange"  min="0.1" max="5.0" value="2.5" step="0.1" />
        </div>
        <div class="controls_btns">
            <button id="jsMode">Fill</button>
            <button id="jsSave">Save</button>
        </div>

        <div class="controls_colors" id="jsColors">
            <div class="controls_color jsColor"  style="background-color:  #2c2c2c;"></div>
            <div class="controls_color jsColor" style="background-color:  white;"></div>
            <div class="controls_color jsColor" style="background-color:  #FF3B30;"></div>
            <div class="controls_color jsColor" style="background-color:  #FF9500;"></div>
            <div class="controls_color jsColor" style="background-color:  #FFCC00;"></div>
            <div class="controls_color jsColor" style="background-color:  #4CD963;"></div>
            <div class="controls_color jsColor" style="background-color:  #5AC8FA;"></div>
            <div class="controls_color jsColor" style="background-color:  #0579FF;"></div>
            <div class="controls_color jsColor" style="background-color:  #5856d6;"></div>
        </div>
    </div>

    <script src="app.js"></script>
</body>

</html>

```

## reset.css

> http://meyerweb.com/eric/tools/css/reset/ 

CSS 초기 세팅

```css

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

```

## style.css

```css

@import "reset.css";

body {
    background-color: #f6f9fc;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
    padding: 50px 0px;
}

.canvas {
    width: 700px;
    height: 700px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(50, 50, 93, 0.11);
}

.controls {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.controls .controls_btns {
    margin-bottom: 30px;
}

.controls_btns button {
    all: unset;
    cursor: pointer;
    background-color: white;
    padding: 5px 0px;
    width: 80px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    border: 2px solid rgba(0, 0, 0, 0.2);
    color: rgba(0, 0, 0, 0.8);
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
}

.controls_btns button:active {
    transform: scale(0.98);
}

.controls .controls_colors {
    display: flex;
}

.controls_colors .controls_color {
width: 50px;
height: 50px;
border-radius: 25px;
box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.controls .controls_range {
    margin-bottom: 30px;
}

```

## app.js

기능별로 순서대로
- 선 그리기 - 브러쉬 크기 - 채우기/선 모드 - 저장

```javascript

const canvas = document.getElementById("jsCanvas");
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const INIT_COLOR = "#2c2c2c";

const ctx = canvas.getContext("2d");
ctx.strokeStyle = INIT_COLOR;
ctx.lineWidth = 2.5;

const colors  = document.getElementsByClassName("jsColor");

const range = document.getElementById("jsRange");

const mode = document.getElementById("jsMode");
ctx.fillStyle = INIT_COLOR;

let painting = false;

let filling = false;

const saveBtn = document.getElementById("jsSave");

function stopPainting () {
    painting = false;
}

function startPainting () {
    painting = true;
}

function onMouseMove (event) {
    // console.log(event);
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x, y);

    // mouse 움직일 때마다 아래 시작-끝이 계속 바뀌면서 선 이어감
    // painting 시작점
    if (!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);

    // painting 마지막점
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleCanvasClick () {
    if (filling ) {
        // 사각형 채우기 (x, y, width, height)
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM (event) {
    // console.log(event);

    // 우클릭 방지
    event.preventDefault();
}

function handleColorClick (event) {
    const color = event.target.style.backgroundColor;
    // console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// 모든 color  elements에 대해서 click 이벤트 리스너 생성
Array.from (colors).forEach(color => color.addEventListener("click", handleColorClick));

function handleRangeChange (event) {
    // console.log(event.target.value);
    const size =  event.target.value;
    ctx.lineWidth = size;
}

if (range) {
    range.addEventListener("input", handleRangeChange);
}

function handleModeClick (event) {
    if  (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
} 

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

function handleSaveClick () {
    const img = canvas.toDataURL();
    const link = document.createElement("a");
    
    // img 주소
    link.href = img;
    // download할 파일 명 지정
    link.download = "YourART.jpg";
    
    link.click();
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick );
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

```