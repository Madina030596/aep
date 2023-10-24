const headerBurger = document.querySelector(".header__burger");
const headerMenu = document.querySelector(".header__menu");

console.log(headerBurger, headerMenu)

headerBurger.addEventListener("click", ()=> {
    headerBurger.classList.toggle("active");
    headerMenu.classList.toggle("active");

    document.querySelector("body").classList.toggle("lock"); //чтобы контент при открытом меню не прокручивался
})
