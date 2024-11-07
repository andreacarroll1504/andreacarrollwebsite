// Fetch the courses data from the courses.json file
fetch('courses.json')
  .then(response => response.json())
  .then(data => {
    const programData = data;
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
  })
  .catch(error => console.error('Error loading the course data:', error));
