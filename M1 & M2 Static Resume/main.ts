// Select the skills section and the toggle button
const toggleSkillsButton = document.getElementById(
  "toggle-skils"
) as HTMLButtonElement;
const skillsSection = document.getElementById("skills") as HTMLElement;

// Add a click event listener to the button
toggleSkillsButton.addEventListener("click", () => {
  // Toggle the display of the skills section
  if (skillsSection.style.display === "none") {
    skillsSection.style.display = "block";
  } else {
    skillsSection.style.display = "none";
  }
});
