// Docs Menu
const docsMenu = document.querySelector(".docs-menu");
const allTitles = document.querySelectorAll(
    ".docs-content h2, .docs-content h4"
);

allTitles.forEach((title) => {
    // Make title a link
    const anchor = document.createElement("a");
    anchor.href = "#" + title.id;
    anchor.innerText = title.innerText.trim() + " #";

    const newTitle = document.createElement(title.tagName);
    newTitle.appendChild(anchor);
    newTitle.id = title.id;

    title.replaceWith(newTitle);

    // Add menu list item
    const listItem = document.createElement("a");
    listItem.href = "#" + title.id;
    listItem.innerText = title.innerText.trim();
    listItem.classList.add(
        title.tagName.toLowerCase() === "h2" ? "category" : "topic"
    );

    docsMenu.appendChild(listItem);
});
