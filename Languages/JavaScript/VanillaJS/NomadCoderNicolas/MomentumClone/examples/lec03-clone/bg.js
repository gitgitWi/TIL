const body = document.querySelector("body");

const IMG_NUMBER = 6;

function handleImgLoad() {
    console.log('finished loading img')
}

function paintImg(imgNumber) {
    const img = new Image();
    img.src = `./imgs/${imgNumber + 1}.jpg`;
    // body.appendChild(img);
    img.classList.add("bgimg");
    body.prepend(img);
    // img.addEventListener("loadedend", handleImgLoad);
}

function getRandom () {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init () {
    const randomNumber = getRandom();
    paintImg(randomNumber);
}

init();