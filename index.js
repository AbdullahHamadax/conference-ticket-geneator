const form = document.querySelector("form");

document.addEventListener("DOMContentLoaded", () => {
  const userAvatar = document.getElementById("user-avatar");

  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("dropzone-file");
  const maxImageSize = 500 * 1024;

  fileInput.addEventListener("change", () => handleFiles(fileInput.files));

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("bg-opacity-50");
  });

  dropzone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropzone.classList.remove("bg-opacity-50");
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("bg-opacity-50");
    handleFiles(e.dataTransfer.files);
  });

  function handleFiles(files) {
    const photoFeedback = document.getElementById("photo-feedback");
    if (!files || files.length === 0) return;
    const file = files[0];

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      photoFeedback.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4 mr-1 text-[#e16151]" fill="none" viewBox="0 0 16 16" stroke="currentColor">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/>
      <path fill="currentColor" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/>
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/>
    </svg>
    Please upload your image in PNG or JPEG format.
  `;
      photoFeedback.classList.replace("text-[#d2d1d6]", "text-[#e16151]");
      photoFeedback.classList.add("animate-pulse", "transition");
      return;
    }

    if (file.size > maxImageSize) {
      photoFeedback.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4 mr-1 text-[#e16151]" fill="none" viewBox="0 0 16 16" stroke="currentColor">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/>
      <path fill="currentColor" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/>
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/>
    </svg>
    File too large. Please upload a photo under 500KB.
  `;
      photoFeedback.classList.replace("text-[#d2d1d6]", "text-[#e16151]");
      photoFeedback.classList.add("animate-pulse", "transition");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dropzoneContent = dropzone.querySelector("div");
      dropzone.removeChild(dropzoneContent);

      const previewContainer = document.createElement("div");
      previewContainer.className =
        "flex flex-col items-center justify-center w-full py-8";

      const preview = document.createElement("img");
      preview.className = "object-cover mb-4 rounded-md size-32";
      preview.src = e.target.result;
      userAvatar.src = e.target.result; // Replacing the ticket image placeholder with the image the user uploads

      const fileLabel = document.createElement("p");
      fileLabel.className = "text-xl text-[#d2d1d6]";
      fileLabel.textContent = "Image uploaded successfully!";

      previewContainer.appendChild(preview);
      previewContainer.appendChild(fileLabel);

      dropzone.appendChild(previewContainer);
    };
    reader.readAsDataURL(file);
  }
});

/* Email and Full name regular expressions */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const fullName = formData.get("fullName");
  const githubUsername = formData.get("githubUsername");
  const email = formData.get("email");
  const emailFeedback = document.getElementById("email-feedback");
  const fullNameFeedback = document.getElementById("full-name-feedback");
  const userForm = document.getElementById("user-form");

  /* Here I am just validating the data with if conditions */

  if (!emailRegex.test(email)) {
    emailFeedback.classList.remove("hidden");
    return;
  } else {
    emailFeedback.classList.add("hidden");
  }

  if (!nameRegex.test(fullName)) {
    fullNameFeedback.classList.remove("hidden");
    return;
  } else {
    fullNameFeedback.classList.add("hidden");
  }

  const ticket = document.getElementById("ticket");
  const submittedEmail = document.getElementById("submitted-email");
  const submittedName = document.getElementById("submitted-name");
  const ticketName = document.getElementById("ticket-name");
  const ticketGithubName = document.getElementById("ticket-github-username");
  const ticketId = document.getElementById("ticket-id");

  ticket.classList.remove("hidden");
  userForm.classList.add("hidden");

  submittedEmail.textContent = email;
  submittedName.textContent = fullName;

  ticketName.textContent = fullName;
  ticketGithubName.textContent = githubUsername;

  ticketId.textContent = `#` + Math.floor(Math.random() * 1000) + 100;
});
