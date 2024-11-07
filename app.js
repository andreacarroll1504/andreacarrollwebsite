fetch('courses.json')
  .then(response => response.json())
  .then(data => {
    const programData = data;
    const selectedCourses = [];

    // Displaying Program Credit Requirements
    function displayProgramInfo() {
      const programInfoDiv = document.getElementById('program-info');
      const programCreditHTML = `
        <h2>Program Credit Requirements</h2>
        <ul>
          <li>Technical Electives: ${programData.program_credit_requirements.technical_electives} credits</li>
          <li>General Education Requirements: ${programData.program_credit_requirements.general_education} credits</li>
          <li>Program Specific Courses: ${programData.program_credit_requirements.program_specific_courses} credits</li>
          <li><strong>Total Credits: ${programData.program_credit_requirements.total_credits}</strong></li>
        </ul>
        <p><strong>Note:</strong> ${programData.program_credit_requirements.note}</p>
      `;
      programInfoDiv.innerHTML = programCreditHTML;
    }

    // Displaying Courses
    function displayCourses() {
      const courseListDiv = document.getElementById('course-list');
      programData.program_specific_courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.classList.add('course-item');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = course.course_id;
        checkbox.value = course.course_id;

        const label = document.createElement('label');
        label.setAttribute('for', course.course_id);
        label.textContent = `${course.course_id}: ${course.course_name} (${course.credits} credits)`;

        checkbox.addEventListener('change', function() {
          if (checkbox.checked) {
            selectedCourses.push(course.course_id);
          } else {
            const index = selectedCourses.indexOf(course.course_id);
            if (index > -1) {
              selectedCourses.splice(index, 1);
            }
          }
          updateCreditTotal();
        });

        courseItem.appendChild(checkbox);
        courseItem.appendChild(label);
        courseListDiv.appendChild(courseItem);
      });
    }

    // Displaying Specializations
    function displaySpecializations() {
      const specializationDiv = document.getElementById('specializations');
      const webSystems = programData.specializations.web_systems_programming;
      const cybersecurity = programData.specializations.cybersecurity_and_cyberforensics;

      let specializationHTML = `<h2>Specializations</h2><h3>Web Systems Programming</h3><ul>`;
      webSystems.forEach(course => {
        specializationHTML += `<li>${course.course_id}: ${course.course_name} (${course.credits} credits)</li>`;
      });
      specializationHTML += `</ul><h3>Cybersecurity and Cyberforensics</h3><ul>`;
      cybersecurity.forEach(course => {
        specializationHTML += `<li>${course.course_id}: ${course.course_name} (${course.credits} credits)</li>`;
      });
      specializationHTML += `</ul>`;
      specializationDiv.innerHTML = specializationHTML;
    }

    // Displaying Sample Program of Study
    function displaySampleProgram() {
      const sampleDiv = document.getElementById('sample-program');
      const sampleHTML = `
        <h2>Sample Program of Study</h2>
        <div id="semester-1">
          <h3>Semester 1</h3>
          <ul>
            ${programData.sample_program_of_study.semester_1.map(course => `
              <li>${course.course_id}: ${course.course_name} (${course.credits} credits)</li>
            `).join('')}
          </ul>
        </div>
        <div id="semester-2">
          <h3>Semester 2</h3>
          <ul>
            ${programData.sample_program_of_study.semester_2.map(course => `
              <li>${course.course_id}: ${course.course_name} (${course.credits} credits)</li>
            `).join('')}
          </ul>
        </div>
        <div id="semester-3">
          <h3>Semester 3</h3>
          <ul>
            ${programData.sample_program_of_study.semester_3.map(course => `
              <li>${course.course_id}: ${course.course_name} (${course.credits} credits)</li>
            `).join('')}
          </ul>
        </div>
      `;
      sampleDiv.innerHTML = sampleHTML;
    }

    // Update Total Credits Selected
    function updateCreditTotal() {
      let totalCredits = 0;
      selectedCourses.forEach(courseId => {
        const course = programData.program_specific_courses.find(c => c.course_id === courseId);
        if (course) {
          totalCredits += course.credits;
        }
      });
      document.getElementById('total-credits').textContent = `Total Credits Selected: ${totalCredits}`;
    }

    displayProgramInfo();
    displayCourses();
    displaySpecializations();
    displaySampleProgram();
  })
  .catch(error => {
    console.error('Error loading course data:', error);
  });
