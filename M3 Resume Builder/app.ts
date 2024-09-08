// Get references to the form and the resume container
const form = document.getElementById("resumeForm") as HTMLFormElement;
const resumeContainer = document.getElementById(
  "resumeContainer"
) as HTMLElement;

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission from refreshing the page

  // Gather form data
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const contactStr = (document.getElementById("contact") as HTMLInputElement)
    .value;
  const educationText = (
    document.getElementById("education") as HTMLTextAreaElement
  ).value;
  const experienceText = (
    document.getElementById("experience") as HTMLTextAreaElement
  ).value;
  const skillsText = (document.getElementById("skills") as HTMLInputElement)
    .value;

  // Convert contact to number
  const contact = parseInt(contactStr, 10);

  // Split textarea input into arrays
  const educationList = educationText
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item !== "");
  const experienceList = experienceText
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item !== "");
  const skillsList = skillsText
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "");

  // Validate all fields are filled and contact is a valid number
  if (
    name &&
    email &&
    !isNaN(contact) &&
    educationList.length > 0 &&
    experienceList.length > 0 &&
    skillsList.length >= 0
  ) {
    generateResume(
      name,
      email,
      contact,
      educationList,
      experienceList,
      skillsList
    );
  } else {
    alert("Please ensure all fields are filled correctly.");
  }
});

// Function to generate the resume dynamically
function generateResume(
  name: string,
  email: string,
  contact: number,
  education: string[],
  experience: string[],
  skills: string[]
): void {
  // Dynamically create resume content and inject it into the resumeContainer
  const resumecont = document.getElementById("resume-container");

  resumeContainer.innerHTML = `
  <div id="one">
  
  <section id="personal-info">
  <h1> RESUME </h1>
  <h2> <i class="fa-solid fa-circle-info"></i> Personal Information</h2>
      <p><strong> Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Contact:</strong> ${contact}</p>

      <h2><i class="fa-solid fa-user-graduate"></i> Education</h2> <hr style="border: 2px solid black; width: 90%;">
      <ul>
        ${education.map((item) => `<li>${item}</li>`).join("")}
      </ul>

      <h2><i class="fa-solid fa-user-tie"> </i> Work Experience</h2> <hr style="border: 2px solid black; width: 90%;">
      <ul>
        ${experience.map((item) => `<li>${item}</li>`).join("")}
      </ul>
  
      <h2> <i class="fa-solid fa-circle-down"></i> Skills</h2> <hr style="border: 2px solid black; width: 90%;">
      <ul>
        ${skills.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section> </div>
  `;
}
