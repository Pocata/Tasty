console.log("this is menupage");
const btn = document.querySelector(".ctHeader_ham");
const nav = document.querySelector(".ctHeader_nav");
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
const swiper1 = new Swiper(".swiper-photo", {
  // Optional parameters
  direction: "horizontal",

  centeredSlides: true, // ⭐中間對齊
  slidesPerView: "auto", // ⭐顯示前後
  spaceBetween: 0,

  effect: "slide",

  // Navigation arrows
  navigation: {
    addIcons: false,
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  history: {
    replaceState: true,
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
  },
});
