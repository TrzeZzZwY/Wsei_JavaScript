const btnNext = document.querySelector("#next");
const btnPrev = document.querySelector("#prev");
const btnPause = document.querySelector("#pause");
const controlButtons = Array.from(document.querySelector("#controlPanel").querySelectorAll("button"));

const slider = document.querySelector(".slider");
const slides = Array.from(document.querySelectorAll(".slide"));

let index = 0
let autoSlideInterval;
let backToAutoSladeTimeout;
let isPaused = false;

btnNext.addEventListener("click",skipToRight);
btnPrev.addEventListener("click",skipToLeft);
btnPause.addEventListener("click",pauseAutoSlide);
setUpControlPanel();

autoSlide();

function autoSlide(){
    autoSlideInterval = setInterval(() => slideRight(++index),2000);
}

function pauseAutoSlide(){
    isPaused = !isPaused;
    if(isPaused){
        clear();
        btnPause.innerHTML = "Start";
    }else{
        clear();
        autoSlide();
        btnPause.innerHTML = "Stop";
    }
}

function slideRight(){
    if(index >= slides.length){
        index = 0;
    } 
    slider.style.transform = `translate(-${index * 100}%)`
}

function slideCustom(newIndex){
    clear();
    index = newIndex;
    slideRight();
    if(!isPaused){
        backToAutoSladeTimeout = setTimeout(autoSlide,3000);
    }
}

function skipToRight(){
    clear();
    slideRight(++index);
    if(!isPaused){
        backToAutoSladeTimeout = setTimeout(autoSlide,3000);
    }
}
function skipToLeft(){
    clear();
    slideRight(--index);
    if(!isPaused){
        backToAutoSladeTimeout = setTimeout(autoSlide,3000);
    }
}

function clear(){
    clearInterval(autoSlideInterval);
    clearTimeout(backToAutoSladeTimeout)
}

function setUpControlPanel(){
    controlButtons.forEach((item,index) => item.addEventListener("click",() => slideCustom(index)));
}


