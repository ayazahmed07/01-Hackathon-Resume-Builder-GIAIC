// Get references to the form and the resume container
const form = document.getElementById("resumeForm") as HTMLFormElement;
const resumeContainer = document.getElementById("resumeContainer") as HTMLElement;

let resumeData: {
  name: string;
  email: string;
  contact: number;
  education: string[];
  experience: string[];
  skills: string[];
} | null = null;

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission from refreshing the page

  // Gather form data
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const contactStr = (document.getElementById("contact") as HTMLInputElement).value;
  const educationText = (document.getElementById("education") as HTMLTextAreaElement).value;
  const experienceText = (document.getElementById("experience") as HTMLTextAreaElement).value;
  const skillsText = (document.getElementById("skills") as HTMLInputElement).value;

  // Convert contact to number
  const contact = parseInt(contactStr, 10);

  // Split textarea input into arrays
  const educationList = educationText.split("\n").map((item) => item.trim()).filter((item) => item !== "");
  const experienceList = experienceText.split("\n").map((item) => item.trim()).filter((item) => item !== "");
  const skillsList = skillsText.split(",").map((item) => item.trim()).filter((item) => item !== "");

  // Validate all fields are filled and contact is a valid number
  if (name && email && !isNaN(contact) && educationList.length > 0 && experienceList.length > 0 && skillsList.length >= 0) {
    // Store the resume data for later editing
    resumeData = {
      name,
      email,
      contact,
      education: educationList,
      experience: experienceList,
      skills: skillsList,
    };
    generateResume(name, email, contact, educationList, experienceList, skillsList);
  } else {
    alert("Please ensure all fields are filled correctly.");
  }
});

// Function to generate the resume dynamically (static view)
function generateResume(
  name: string,
  email: string,
  contact: number,
  education: string[],
  experience: string[],
  skills: string[]
): void {
  // Dynamically create resume content and inject it into the resumeContainer
  resumeContainer.innerHTML = `
    <div id="one">
      <section id="personal-info">
        <h1> RESUME </h1>
        <h2><i class="fa-solid fa-circle-info"></i> Personal Information</h2>
        <p><strong>Name:</strong> <span id="static-name">${name}</span></p>
        <p><strong>Email:</strong> <span id="static-email">${email}</span></p>
        <p><strong>Contact:</strong> <span id="static-contact">${contact}</span></p>

        <h2><i class="fa-solid fa-user-graduate"></i> Education</h2>
        <ul id="static-education">
          ${education.map((item) => `<li>${item}</li>`).join("")}
        </ul>

        <h2><i class="fa-solid fa-user-tie"></i> Work Experience</h2>
        <ul id="static-experience">
          ${experience.map((item) => `<li>${item}</li>`).join("")}
        </ul>

        <h2><i class="fa-solid fa-circle-down"></i> Skills</h2>
        <ul id="static-skills">
          ${skills.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>
      <button id="edit-btn">Edit Resume</button>
      <button id="share-btn">Share Resume</button>
      <button id="download-btn">Download Resume</button>
    </div>
  `;

  // Add event listener to the Edit button
  const editButton = document.getElementById("edit-btn") as HTMLButtonElement;
  editButton.addEventListener("click", editResume);

  // Add event listener to the Share button
  const shareButton = document.getElementById("share-btn") as HTMLButtonElement;
  shareButton.addEventListener("click", generateShareableURL);

  // Add event listener to the Download button
  const downloadButton = document.getElementById("download-btn") as HTMLButtonElement;

}

// Function to toggle resume to editable mode
function editResume(): void {
  if (resumeData) {
    resumeContainer.innerHTML = `
      <div id="one">
        <section id="personal-info">
          <h1> EDIT RESUME </h1>
          <h2><i class="fa-solid fa-circle-info"></i> Personal Information</h2>
          <p><strong>Name:</strong> <input type="text" id="edit-name" value="${resumeData.name}" /></p>
          <p><strong>Email:</strong> <input type="email" id="edit-email" value="${resumeData.email}" /></p>
          <p><strong>Contact:</strong> <input type="text" id="edit-contact" value="${resumeData.contact}" /></p>

          <h2><i class="fa-solid fa-user-graduate"></i> Education</h2>
          <textarea id="edit-education" rows="5">${resumeData.education.join("\n")}</textarea>

          <h2><i class="fa-solid fa-user-tie"></i> Work Experience</h2>
          <textarea id="edit-experience" rows="5">${resumeData.experience.join("\n")}</textarea>

          <h2><i class="fa-solid fa-circle-down"></i> Skills</h2>
          <input type="text" id="edit-skills" value="${resumeData.skills.join(", ")}" />
        </section>
        <button id="save-btn">Save Resume</button>
      </div>
    `;

    // Add event listener to the Save button
    const saveButton = document.getElementById("save-btn") as HTMLButtonElement;
    saveButton.addEventListener("click", saveResume);
  }
}

// Function to save the edited resume
function saveResume(): void {
  // Get the edited values from the input fields
  const editedName = (document.getElementById("edit-name") as HTMLInputElement).value;
  const editedEmail = (document.getElementById("edit-email") as HTMLInputElement).value;
  const editedContact = (document.getElementById("edit-contact") as HTMLInputElement).value;
  const editedEducation = (document.getElementById("edit-education") as HTMLTextAreaElement).value;
  const editedExperience = (document.getElementById("edit-experience") as HTMLTextAreaElement).value;
  const editedSkills = (document.getElementById("edit-skills") as HTMLInputElement).value;

  // Update the resumeData with new values
  resumeData = {
    name: editedName,
    email: editedEmail,
    contact: parseInt(editedContact, 10),
    education: editedEducation.split("\n").map((item) => item.trim()).filter((item) => item !== ""),
    experience: editedExperience.split("\n").map((item) => item.trim()).filter((item) => item !== ""),
    skills: editedSkills.split(",").map((item) => item.trim()).filter((item) => item !== ""),
  };

  // Regenerate the resume with updated information (static view)
  generateResume(
    resumeData.name,
    resumeData.email,
    resumeData.contact,
    resumeData.education,
    resumeData.experience,
    resumeData.skills
  );
}

// Function to generate a shareable URL
function generateShareableURL(): void {
  if (resumeData) {
    const encodedData = encodeURIComponent(JSON.stringify(resumeData));
    const shareableURL = `${window.location.origin}?data=${encodedData}`;
    prompt("Copy the shareable URL:", shareableURL);
  } else {
    alert("Please generate the resume first.");
  }
}
