var _a;
// Function to get data from the form and generate the resume
function generateResume() {
    // Collect user input from the form
    var name = document.getElementById("name").value;
    var title = document.getElementById("title").value;
    var profile = document.getElementById("profile").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var website = document.getElementById("website").value;
    // Collect the profile image as a Base64 string
    var profileImageInput = document.getElementById("profile-image");
    var profileImage = "";
    // Collect education details
    var education = [
        {
            institution: document.getElementById("institution1").value,
            year: document.getElementById("year1").value,
            degree: document.getElementById("degree1").value,
            gpa: document.getElementById("gpa1").value,
        },
    ];
    // Collect skills and languages
    var skills = document.getElementById("skills").value.split(",").map(function (skill) { return skill.trim(); });
    var languages = document.getElementById("languages").value.split(",").map(function (lang) { return lang.trim(); });
    // Collect work experience
    var experience = [
        {
            company: document.getElementById("company1").value,
            role: document.getElementById("role1").value,
            year: document.getElementById("yearExp1").value,
            responsibilities: document.getElementById("responsibilities1").value.split("\n").map(function (resp) { return resp.trim(); }),
        },
    ];
    // Collect references
    var references = [
        {
            name: document.getElementById("refName1").value,
            position: document.getElementById("refPosition1").value,
            phone: document.getElementById("refPhone1").value,
            email: document.getElementById("refEmail1").value,
        },
    ];
    // Construct the ResumeData object
    var resumeData = {
        name: name,
        title: title,
        profile: profile,
        contact: { phone: phone, email: email, address: address, website: website },
        education: education,
        skills: skills,
        languages: languages,
        experience: experience,
        references: references,
        profileImage: profileImage,
    };
    // Load and display the profile image
    if (profileImageInput.files && profileImageInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            resumeData.profileImage = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            displayResume(resumeData); // Call displayResume after loading the image
        };
        reader.readAsDataURL(profileImageInput.files[0]);
    }
    else {
        displayResume(resumeData); // Call displayResume immediately if no image is selected
    }
}
// Function to display the resume on the page
function displayResume(resumeData) {
    var resumeDisplay = document.getElementById("resume-display");
    if (resumeDisplay) {
        resumeDisplay.innerHTML = "\n        <div class=\"resume-container\">\n          <div class=\"left-section\">\n            ".concat(resumeData.profileImage ? "<img src=\"".concat(resumeData.profileImage, "\" alt=\"Profile Image\" class=\"profile-image\">") : "", "\n            <h2>").concat(resumeData.name, "</h2>\n            <h3>").concat(resumeData.title, "</h3>\n            <h4>Contact Information</h4>\n            <p>Phone: ").concat(resumeData.contact.phone, "</p>\n            <p>Email: ").concat(resumeData.contact.email, "</p>\n            <p>Address: ").concat(resumeData.contact.address, "</p>\n            <p>Website: <a href=\"").concat(resumeData.contact.website, "\" target=\"_blank\">").concat(resumeData.contact.website, "</a></p>\n            <h4>Skills</h4>\n            <p>").concat(resumeData.skills.join(", "), "</p>\n            <h4>Languages</h4>\n            <p>").concat(resumeData.languages.join(", "), "</p>\n          </div>\n          <div class=\"right-section\">\n            <h4>Profile</h4>\n            <p>").concat(resumeData.profile, "</p>\n            <h4>Education</h4>\n            ").concat(resumeData.education
            .map(function (edu) { return "<p><strong>".concat(edu.institution, "</strong> (").concat(edu.year, ")<br>Degree: ").concat(edu.degree, ", GPA: ").concat(edu.gpa, "</p>"); })
            .join(""), "\n            <h4>Work Experience</h4>\n            ").concat(resumeData.experience
            .map(function (exp) { return "<p><strong>".concat(exp.company, "</strong> (").concat(exp.year, ")<br>Role: ").concat(exp.role, "<ul>").concat(exp.responsibilities
            .map(function (resp) { return "<li>".concat(resp, "</li>"); })
            .join(""), "</ul></p>"); })
            .join(""), "\n            <h4>References</h4>\n            ").concat(resumeData.references
            .map(function (ref) { return "<p><strong>".concat(ref.name, "</strong><br>Position: ").concat(ref.position, "<br>Phone: ").concat(ref.phone, "<br>Email: ").concat(ref.email, "</p>"); })
            .join(""), "\n          </div>\n        </div>");
    }
}
// Add event listener to the generate button
(_a = document.getElementById("generate-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", generateResume);
