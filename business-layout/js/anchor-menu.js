let section = [];
section.push(document.querySelector("header"));

document.querySelectorAll("section").forEach((element) => {
  section.push(element);
});
section.push(document.querySelector("footer"));

let percentage = window.innerHeight / 20;

let header = document.querySelector("header");
let hero = document.querySelector(".hero");

let menu = document.querySelector(".hero__menu");

let items = menu.querySelectorAll(".hero__menu-item");

function heroPos() {
  if (window.scrollY >= header.clientHeight) {
    header.style.marginBottom = hero.clientHeight + "px";
    hero.style.position = "fixed";
  } else if (
    window.scrollY <=
    +header.clientHeight +
      parseInt(
        window.getComputedStyle(header, null).getPropertyValue("margin-bottom"),
        10
      )
  ) {
    header.style.marginBottom = "0";
    hero.style.position = "relative";
  }
}

let currentSection = debounce(
  function () {
    section.forEach((el) => {
      if (
        window.scrollY + hero.clientHeight >= el.offsetTop - percentage &&
        window.scrollY + hero.clientHeight <=
          el.offsetTop + el.scrollHeight - percentage
      ) {
        let currentClass = el.className;
        items.forEach((el) => {
          let link = el.querySelector(".hero__menu-link");
          if (currentClass == "banner" || currentClass == "header" || currentClass == "hero") {
            currentClass = "header";
          }
          if (
            currentClass == "fbanalysis" ||
            currentClass == "getin" ||
            currentClass == "footer"
          ) {
            currentClass = "ourwork";
          }
          link.classList.remove("hero__menu-link--active");
          if (link.dataset.section == currentClass) {
            link.classList.add("hero__menu-link--active");
          }
        });
        // console.log(`Current section is ${el.className}`);
      }
    });
  },
  50,
  false
);

currentSection;

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function scrollTo() {
  items.forEach((el) => {
    // el.addEventListener("click", (event) => {
    //   event.preventDefault();
    //   let link = el.querySelector(".hero__menu-link");
    //   document.querySelector(`.${link.dataset.section}`).scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //     inline: "nearest",
    //   });
    // });
    el.addEventListener("click", (event) => {
      event.preventDefault();
      let link = el.querySelector(".hero__menu-link");
      let offset = document.querySelector(`.${link.dataset.section}`).offsetTop;
      // console.log(offset);
      window.scroll({
        top: offset <= 0 ? offset : offset - hero.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    });
  });
}

scrollTo();

window.addEventListener("scroll", (e) => {
  currentSection();
  heroPos();
});
