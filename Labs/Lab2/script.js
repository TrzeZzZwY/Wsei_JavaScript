const btnNext = document.querySelector("#next");
btnNext.addEventListener("click",function(){
    const sliders = Array.from(document.querySelectorAll("slide"));
    const timeOut1 = setTimeout(
        () => {
            sliders.forEach((el) => {
                el.classList.add("test");
            })
        },
        2000
    )
})
