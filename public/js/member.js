console.log("this is member page");
const btn = document.querySelector(".ctHeader_ham");
const nav = document.querySelector(".ctHeader_nav");

window.addEventListener("scroll", () => {
  const bgElement = document.querySelector(".fixBg");

  // 設定滾動超過多少像素 (px) 後換圖，例如 300px
  if (window.scrollY > 800) {
    bgElement.classList.add("scrolled");
  } else {
    bgElement.classList.remove("scrolled");
  }
});
/*ham*/
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
