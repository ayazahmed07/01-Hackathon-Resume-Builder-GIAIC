const toggleSkillsBtn = document.getElementById("toggleSkills") as HTMLButtonElement;
const skillsSection = document.getElementById("skills") as HTMLElement;

toggleSkillsBtn.addEventListener("click", () => {
    if (skillsSection.style.display === "none") {
        skillsSection.style.display = "block";
      } else {
        skillsSection.style.display = "none";
      }
    });