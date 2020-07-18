// alert ('Im JavaScript, Im Woring!');
// console.log ('Im JavaScript, Im Woring!');

// const stocks = prompt("How many do you have Naver stocks?");

// if (stocks >= 100 && stocks <= 300 ) {
// 	console.log("Cheer up! You may want to have more stocks.");
// } else if  (stocks > 300) {
// 	console.log ("Wow! You are Rich!");
// } else {
// 	console.log ("What a pity! You are Poor..");
// }

const title = document.querySelector("#title");

// const BASE_COLOR = "rgb(52, 73, 94)";
// const OTHER_COLOR = "#e74c3c";
const CLICKED_CLASS = "clicked";

// function handleClick () {
// 	const currentColor = title.style.color;
// 	// console.log (currentColor);
// 	if (currentColor === BASE_COLOR) {
// 		title.style.color = OTHER_COLOR;
// 	} else {
// 		title.style.color = BASE_COLOR;
// 	}
// }

function handleClick() {
	// const currentClass = title.className;
	// console.log(currentClass);
	// const hasClass = title.classList.contains(CLICKED_CLASS);
	
	// if (currentClass !== CLICKED_CLASS) {
	// 		title.className = CLICKED_CLASS;
	// }
	// else {
		// title.className = "";
	// }

	// if  (hasClass ) {
	// 	title.classList.remove(CLICKED_CLASS)
	// }
	// else {
	// 	title.classList.add(CLICKED_CLASS);
	// }

	title.classList.toggle(CLICKED_CLASS);
}

function init() {
	// title.style.color = BASE_COLOR;
	// title.addEventListener("click", handleClick );
	title.addEventListener("mouseenter", handleClick);
}

init();

// function handleOffline () {
// 	console.log  ("Bye Bye");
// }

// function handleOnline() {
// 	console.log ("Welcome Back");
// }

// window.addEventListener("offline", handleOffline);
// window.addEventListener("online", handleOnline);

