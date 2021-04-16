let section = [];
section.push(document.querySelector("header"));

document.querySelectorAll("section").forEach((element) => {
  section.push(element);
});
section.push(document.querySelector("footer"));

let percentage = window.innerHeight / 20;

let menu = document.querySelector(".hero__menu");

let items = menu.querySelectorAll(".hero__menu-item");

let currentSection = debounce(
  function () {
    section.forEach((el) => {
      if (
        window.scrollY >= el.offsetTop - percentage &&
        window.scrollY <= el.offsetTop + el.scrollHeight - percentage
      ) {
        let currentClass = el.className;
        items.forEach((el) => {
          let link = el.querySelector(".hero__menu-link");
          if (currentClass == "banner" || currentClass == "header") {
            currentClass = "hero"
          }
          if (currentClass == "fbanalysis" || currentClass == "getin" || currentClass == "footer") {
            currentClass = "ourwork";
          }
          link.classList.remove("hero__menu-link--active");
          if (link.dataset.section == currentClass) {
            link.classList.add("hero__menu-link--active");
          }
        })
        console.log(`Current section is ${el.className}`);
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

window.addEventListener("scroll", currentSection);
