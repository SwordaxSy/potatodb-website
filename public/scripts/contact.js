import dateFormatter from "./dateFormatter.js";

// Commenting Mechanism
const commentInput = document.querySelector(".comment-input textarea");
const commentBtn = document.querySelector(".comment-input button");
const commentUsernameBox = document.querySelector(".comment-username-popup");
const commentUsernameInput = document.querySelector(".comment-username-input");
const publishBtn = document.querySelector(".comment-username-popup .confirm");
const cancelBtn = document.querySelector(".comment-username-popup .disprove");
const noComments = document.querySelector(".no-comments");

// Comment Publish Button
commentBtn.addEventListener("click", openUsernameInput);

// Open Comment Username Input
function openUsernameInput() {
    commentUsernameBox.classList.add("active");
    commentUsernameInput.focus();
}

// Close Comment Username Popup
commentUsernameBox.addEventListener("click", (e) => {
    if (!e.target.classList.contains("comment-username-popup")) return false;
    commentUsernameBox.classList.remove("active");
});

// Publish Comment
let commentLock = false;
publishBtn.addEventListener("click", publishComment);

commentUsernameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") publishComment();
});

function publishComment() {
    if (commentLock) return false;
    commentLock = true;

    const comment = commentInput.value.trim();
    const commenter = commentUsernameInput.value.trim();

    const fetchOptions = {
        method: "POST",
        body: JSON.stringify({
            comment,
            commenter,
        }),
        headers: { "Content-Type": "application/json" },
    };

    fetch("/comment", fetchOptions)
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                constructComment(
                    data.comment.comment,
                    data.comment.commenter,
                    data.comment.createdAt
                );
            }
        })
        .catch((err) => console.error(err))
        .finally(() => (commentLock = false));

    closeUsernameInput();
}

// Cancel Publishing
cancelBtn.addEventListener("click", closeUsernameInput);

function closeUsernameInput() {
    commentUsernameInput.value = "";
    commentInput.value = "";
    commentUsernameBox.classList.remove("active");
}

// Insert Dates in Comments
const comments = document.querySelectorAll(".comments .comment");
comments.forEach((comment) => {
    const dateElement = comment.querySelector(".publish-date");
    dateElement.innerText = dateFormatter(dateElement.dataset.date);
});

// Comment Constructor
const commentsContainer = document.querySelector(".comments");
function constructComment(comment, commenter, commentedAt) {
    // create elements
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    const commentHeader = document.createElement("div");
    commentHeader.classList.add("comment-header");

    const commentContent = document.createElement("div");
    commentContent.classList.add("comment-content");

    const commentContent_p = document.createElement("p");
    commentContent_p.innerText = comment;

    const commentAvatar = document.createElement("img");
    commentAvatar.src = "./images/user-avatar.png";
    commentAvatar.alt = "User Avatar";
    commentAvatar.classList.add("user-avatar");

    const commentHeaderText = document.createElement("div");
    commentHeaderText.classList.add("comment-header-text");

    const username = document.createElement("p");
    username.classList.add("username");
    username.innerText = commenter;

    const publishDate = document.createElement("p");
    publishDate.classList.add("publish-date");
    publishDate.setAttribute("data-date", commentedAt);
    publishDate.innerText = dateFormatter(commentedAt);

    // append element
    commentsContainer.insertAdjacentElement("afterbegin", commentDiv);

    commentDiv.appendChild(commentHeader);
    commentDiv.appendChild(commentContent);

    commentHeader.appendChild(commentAvatar);
    commentHeader.appendChild(commentHeaderText);

    commentHeaderText.appendChild(username);
    commentHeaderText.appendChild(publishDate);

    commentContent.appendChild(commentContent_p);

    noComments.classList.remove("active");
}
