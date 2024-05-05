// Set Current Page
const currentPage = document.documentElement.className;
document.querySelector(`.nav-${currentPage}`).classList.add("current");

// Scroll Up
const scrollUpBtn = document.querySelector(".scroll-up-btn");
window.addEventListener("scroll", () => {
    const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 0) {
        scrollUpBtn.classList.add("active");
    } else {
        scrollUpBtn.classList.remove("active");
    }
});
scrollUpBtn.addEventListener("click", () => {
    window.scrollTo(0, 0);
});
