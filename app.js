// JSON Data for Program Courses (with Prerequisites)
const programData = {
  "program_credit_requirements": {
    "technical_electives": 44,
    "general_education": 36,
    "program_specific_courses": 48,
    "total_credits": 128
  },
  "program_specific_courses": [
    { "course_id": "COP3530", "course_name": "Data Structures", "credits": 3, "prerequisites": [] },
    { "course_id": "COP4610", "course_name": "Operating Systems", "credits": 3, "prerequisites": [] },
    { "course_id": "CNT3104", "course_name": "Introduction to Telecommunications", "credits": 2, "prerequisites": [] },
    { "course_id": "CIS4250", "course_name": "Ethical Issues in IT", "credits": 1, "prerequisites": [] },
    { "course_id": "CNT4007", "course_name": "Data and Computer Communications", "credits": 3, "prerequisites": [] },
    { "course_id": "CIS4360", "course_name": "Applied Cybersecurity", "credits": 3, "prerequisites": [] },
    { "course_id": "COP4813", "course_name": "Web Systems I", "credits": 3, "prerequisites": [] },
    { "course_id": "CDA4101", "course_name": "Computer Organization and Design", "credits": 3, "prerequisites": [] },
    { "course_id": "CNT4703", "course_name": "Voice and Data Network Design", "credits": 3, "prerequisites": [] },
    { "course_id": "COP4708", "course_name": "Applied Database I", "credits": 3, "prerequisites": [] },
    { "course_id": "CEN4010", "course_name": "Software Engineering", "credits": 3, "prerequisites": [] },
    { "course_id": "CEN4801", "course_name": "Systems Integration", "credits": 3, "prerequisites": [] },
    { "course_id": "CEN3722", "course_name": "Human Computer Interfaces", "credits": 3, "prerequisites": [] },
    { "course_id": "CIS4510", "course_name": "IT Project Management", "credits": 3, "prerequisites": [] }
  ]
};

let selectedCourses = [];

// Function to generate the course list dynamically
function generateCourseList() {
  const courseListDiv = document.getElementById('course-list');
  const courses = programData.program_specific_courses;

  courses.forEach(course => {
    const courseItem = document.createElement('div');
    courseItem.classList.add('course-item');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = course.course_id;
    checkbox.value = course.course_id;
    checkbox.disabled = !arePrerequisitesMet(course);

    const label = document.createElement('label');
    label.setAttribute('for', course.course_id);
    label.textContent = `${course.course_name} (${course.credits} credits)`;

    checkbox.addEventListener('change', function() {
      if (checkbox.checked) {
        selectedCourses.push(course.course_id);
      } else {
        selectedCourses = selectedCourses.filter(courseId => courseId !== course.course_id);
      }
      updateCreditTotal();
      checkPrerequisites();
    });

    courseItem.appendChild(checkbox);
    courseItem.appendChild(label);
    courseListDiv.appendChild(courseItem);
  });
}

// Function to check if the prerequisites for a course are met
function arePrerequisitesMet(course) {
  return course.prerequisites.every(prerequisite => selectedCourses.includes(prerequisite));
}

// Function to check and update prerequisites based on selected courses
function checkPrerequisites() {
  const courses = programData.program_specific_courses;

  courses.forEach(course => {
    const checkbox = document.getElementById(course.course_id);
    if (checkbox) {
      if (arePrerequisitesMet(course)) {
        checkbox.disabled = false;
      } else {
        checkbox.disabled = true;
        checkbox.checked = false;
      }
    }
  });
}

// Function to update the total credit count
function updateCreditTotal() {
  let totalCredits = 0;
  const checkboxes = document.querySelectorAll('#course-list input[type="checkbox"]:checked');
  checkboxes.forEach(checkbox => {
    totalCredits += parseInt(checkbox.nextSibling.textContent.split('(')[1]);
  });

  const creditInfo = document.getElementById('program-info');
  let totalCreditText = creditInfo.innerHTML.split("<p>Total Credits:")[0];
  totalCreditText += `<p>Total Credits: ${totalCredits}</p>`;
  creditInfo.innerHTML = totalCreditText;
}

// Initialize the course list and prerequisites when the page loads
window.onload = function() {
  generateCourseList();
  checkPrerequisites(); // Initial check to disable courses based on prerequisites
};

