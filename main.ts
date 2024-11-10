// Define the structure of the form data
interface ResumeData {
    name: string;
    title: string;
    profile: string;
    contact: {
      phone: string;
      email: string;
      address: string;
      website: string;
    };
    education: {
      institution: string;
      year: string;
      degree: string;
      gpa: string;
    }[];
    skills: string[];
    languages: string[];
    experience: {
      company: string;
      role: string;
      year: string;
      responsibilities: string[];
    }[];
    references: {
      name: string;
      position: string;
      phone: string;
      email: string;
    }[];
    profileImage: string; // New field for profile image
  }
  
  // Function to get data from the form and generate the resume
  function generateResume() {
    // Collect user input from the form
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const profile = (document.getElementById("profile") as HTMLTextAreaElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLInputElement).value;
    const website = (document.getElementById("website") as HTMLInputElement).value;
  
    // Collect the profile image as a Base64 string
    const profileImageInput = document.getElementById("profile-image") as HTMLInputElement;
    let profileImage = "";
  
    // Collect education details
    const education = [
      {
        institution: (document.getElementById("institution1") as HTMLInputElement).value,
        year: (document.getElementById("year1") as HTMLInputElement).value,
        degree: (document.getElementById("degree1") as HTMLInputElement).value,
        gpa: (document.getElementById("gpa1") as HTMLInputElement).value,
      },
    ];
  
    // Collect skills and languages
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value.split(",").map(skill => skill.trim());
    const languages = (document.getElementById("languages") as HTMLTextAreaElement).value.split(",").map(lang => lang.trim());
  
    // Collect work experience
    const experience = [
      {
        company: (document.getElementById("company1") as HTMLInputElement).value,
        role: (document.getElementById("role1") as HTMLInputElement).value,
        year: (document.getElementById("yearExp1") as HTMLInputElement).value,
        responsibilities: (document.getElementById("responsibilities1") as HTMLTextAreaElement).value.split("\n").map(resp => resp.trim()),
      },
    ];
  
    // Collect references
    const references = [
      {
        name: (document.getElementById("refName1") as HTMLInputElement).value,
        position: (document.getElementById("refPosition1") as HTMLInputElement).value,
        phone: (document.getElementById("refPhone1") as HTMLInputElement).value,
        email: (document.getElementById("refEmail1") as HTMLInputElement).value,
      },
    ];
  
    // Construct the ResumeData object
    const resumeData: ResumeData = {
      name,
      title,
      profile,
      contact: { phone, email, address, website },
      education,
      skills,
      languages,
      experience,
      references,
      profileImage,
    };
  
    // Load and display the profile image
    if (profileImageInput.files && profileImageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        resumeData.profileImage = e.target?.result as string;
        displayResume(resumeData); // Call displayResume after loading the image
      };
      reader.readAsDataURL(profileImageInput.files[0]);
    } else {
      displayResume(resumeData); // Call displayResume immediately if no image is selected
    }
  }
  
  // Function to display the resume on the page
  function displayResume(resumeData: ResumeData) {
    const resumeDisplay = document.getElementById("resume-display");
    if (resumeDisplay) {
      resumeDisplay.innerHTML = `
        <div class="resume-container">
          <div class="left-section">
            ${resumeData.profileImage ? `<img src="${resumeData.profileImage}" alt="Profile Image" class="profile-image">` : ""}
            <h2>${resumeData.name}</h2>
            <h3>${resumeData.title}</h3>
            <h4>Contact Information</h4>
            <p>Phone: ${resumeData.contact.phone}</p>
            <p>Email: ${resumeData.contact.email}</p>
            <p>Address: ${resumeData.contact.address}</p>
            <p>Website: <a href="${resumeData.contact.website}" target="_blank">${resumeData.contact.website}</a></p>
            <h4>Skills</h4>
            <p>${resumeData.skills.join(", ")}</p>
            <h4>Languages</h4>
            <p>${resumeData.languages.join(", ")}</p>
          </div>
          <div class="right-section">
            <h4>Profile</h4>
            <p>${resumeData.profile}</p>
            <h4>Education</h4>
            ${resumeData.education
              .map(
                edu => `<p><strong>${edu.institution}</strong> (${edu.year})<br>Degree: ${edu.degree}, GPA: ${edu.gpa}</p>`
              )
              .join("")}
            <h4>Work Experience</h4>
            ${resumeData.experience
              .map(
                exp => `<p><strong>${exp.company}</strong> (${exp.year})<br>Role: ${exp.role}<ul>${exp.responsibilities
                  .map(resp => `<li>${resp}</li>`)
                  .join("")}</ul></p>`
              )
              .join("")}
            <h4>References</h4>
            ${resumeData.references
              .map(
                ref => `<p><strong>${ref.name}</strong><br>Position: ${ref.position}<br>Phone: ${ref.phone}<br>Email: ${ref.email}</p>`
              )
              .join("")}
          </div>
        </div>`;
    }
  }
  
  // Add event listener to the generate button
  document.getElementById("generate-button")?.addEventListener("click", generateResume);
  