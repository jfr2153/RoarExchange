//Dropdown for navbar
const profileIcon = document.getElementById("profileIcon");
const dropdown = document.querySelector(".dropdown");

// Toggle dropdown visibility on click
profileIcon.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent click from bubbling up
  dropdown.classList.toggle("active");
});

// Hide the dropdown when clicking outside or navigating
document.addEventListener("click", () => {
  dropdown.classList.remove("active");
});

// Hide the dropdown when navigating to another page
const dropdownLinks = document.querySelectorAll(".dropdown-menu a");
dropdownLinks.forEach(link => {
  link.addEventListener("click", () => {
    dropdown.classList.remove("active");
  });
});
