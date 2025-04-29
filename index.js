const form = document.querySelector("form");
const fullName = document.querySelector("#fullName").value;
const email = document.querySelector("#email").value;
const username = document.querySelector("#githubUsername").value;
const avatar = document.querySelector("#userAvatar").value;
const generateButton = document.querySelector("button");

form.addEventListener("submit", function (e) {
  e.preventDefault();
});

generateButton.addEventListener("click", function () {
  console.log(fullName, email, username, avatar);
});
