console.log("this is index page");
const btn = document.querySelector(".ctHeader_ham");
const nav = document.querySelector(".ctHeader_nav");
if (btn && nav) {
  btn.addEventListener("click", () => {
    console.log("click");
    btn.classList.toggle("active");
    nav.classList.toggle("hamOpen");
    document.body.classList.toggle("lock-scroll");
  });
} else {
  console.error("找不到");
}
