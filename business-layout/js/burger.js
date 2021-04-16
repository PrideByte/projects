const burger = document.querySelector(".hero__nav-burger");
const navigation = document.querySelector(".hero__nav");

burger.addEventListener("click", () => {
    navigation.classList.toggle("hero__nav-active");
});