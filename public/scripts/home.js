// NPM Command Copy
const npm = document.querySelector(".npm-command");
const npmTooltip = document.querySelector(".npm-command .tooltip");
let copyNpmLock = false;
npm.addEventListener("click", () => {
    if (copyNpmLock) return false;
    copyNpmLock = true;

    navigator.clipboard.writeText("npm install potatodb").then(() => {
        npmTooltip.classList.add("active");
        copyNpmLock = false;
        setTimeout(() => {
            npmTooltip.classList.remove("active");
        }, 1000);
    });
});

// Article Links
const articleLinks = document.querySelectorAll(".section-content a");
articleLinks.forEach((a) => {
    a.innerHTML += ' <i class="fa-solid fa-arrow-up-right-from-square"></i>';
});
