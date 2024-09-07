// Select the skills section and the toggle button
var toggleSkillsButton = document.getElementById('toggle-skils');
var skillsSection = document.getElementById('skills');
// Add a click event listener to the button
toggleSkillsButton.addEventListener('click', function () {
    // Toggle the display of the skills section
    if (skillsSection.style.display === 'none') {
        skillsSection.style.display = 'block';
    }
    else {
        skillsSection.style.display = 'none';
    }
});
