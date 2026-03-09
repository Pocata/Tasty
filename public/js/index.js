console.log("this is index page");
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
/*輪播圖片 */
const swiper1 = new Swiper(".swiper-photo", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  // Navigation arrows
  navigation: {
    addIcons: false,
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 5000,
  },
});
const swiper2 = new Swiper(".swiper-news", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  // Navigation arrows
  navigation: {
    addIcons: false,
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 6000,
  },
});
