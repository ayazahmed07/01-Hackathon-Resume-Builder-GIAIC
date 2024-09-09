// Get references to the form and the resume container
const form = document.getElementById("resumeForm") as HTMLFormElement;
const resumeContainer = document.getElementById("resumeContainer") as HTMLElement;

let resumeData: {
  name: string;
  email: string;
  contact: number;
 } 

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission from refreshing the page

  // Gather form data
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const contactStr = (document.getElementById("contact") as HTMLInputElement).value;
  
})

 
