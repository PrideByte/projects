const form = document.querySelector(".fbanalysis__form-wrapper");
const close = document.querySelector(".fbanalysis__form-close");
const arrow = document.querySelector(".fbanalysis__arrow");

arrow.addEventListener("click", () => {
  heightChange();
  arrow.classList.toggle("fbanalysis__arrow-active");
});

close.addEventListener("click", () => {
  heightChange();
  arrow.classList.toggle("fbanalysis__arrow-active");
});

function heightChange() {
  if (form.style.maxHeight){
    form.style.maxHeight = null;
  } else {
    form.style.maxHeight = form.scrollHeight + "px";
  }
}