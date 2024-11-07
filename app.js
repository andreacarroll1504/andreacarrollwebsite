document.addEventListener('DOMContentLoaded', function () {
    let totalCredits = 0;  // Track total credits selected by the user

    fetch('courses.json')
        .then(response => response.json())
        .then(data => {
            loadCourses(data.courses);
            loadSpecializations(data.specializations);
            displayProgramRequirements(data.programRequirements);
        });

    function loadCourses(courses) {
        let courseContainer = document.getElementById('course-list');
        courses.forEach(course => {
            let courseDiv = document.createElement('div');
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = course.id;
            checkbox.dataset.prereqs = JSON.stringify(course.prerequisites);
            checkbox.dataset.credits = course.credits;
            let label = document.createElement('label');
            label.setAttribute('for', course.id);
            label.textContent = `${course.name} (${course.credits} credits)`;

            courseDiv.appendChild(checkbox);
            courseDiv.appendChild(label);
            courseContainer.appendChild(courseDiv);

            checkbox.addEventListener('change', function () {
                updateTotalCredits(course.credits, checkbox.checked);
                displayPrerequisites(course.id);
            });
        });
    }

    function loadSpecializations(specializations) {
        let specializationContainer = document.getElementById('specializations');
        specializations.forEach(spec => {
            let specDiv = document.createElement('div');
            let title = document.createElement('h3');
            title.textContent = spec.name;
            specDiv.appendChild(title);

            spec.courses.forEach(course => {
                let specCourse = document.createElement('p');
                specCourse.textContent = `${course.name} (${course.credits} credits)`;
                specDiv.appendChild(specCourse);
            });

            specializationContainer.appendChild(specDiv);
        });
    }

    function displayProgramRequirements(requirements) {
        let requirementsContainer = document.getElementById('program-requirements');
        requirementsContainer.innerHTML = `
            <p>Total Technical Electives: ${requirements.technicalElectives}</p>
            <p>Total General Education: ${requirements.generalEducation}</p>
            <p>Total Program Specific Courses: ${requirements.programSpecificCourses}</p>
            <p>Total Credits Required: ${requirements.totalCredits}</p>
        `;
    }

    function updateTotalCredits(courseCredits, isChecked) {
        if (isChecked) {
            totalCredits += courseCredits;
        } else {
            totalCredits -= courseCredits;
        }
        document.getElementById('total-credits').textContent = `Total Credits Selected: ${totalCredits}`;
    }

    function displayPrerequisites(courseId) {
        let course = document.getElementById(courseId);
        let prereqs = JSON.parse(course.dataset.prereqs);
        if (prereqs.length > 0) {
            alert(`Prerequisites for ${courseId}: ${prereqs.join(', ')}`);
        } else {
            alert(`No prerequisites for ${courseId}`);
        }
    }

    // Add the resetSelection function here to reset selections
    window.resetSelection = function () {
        let checkboxes = document.querySelectorAll('#course-list input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = false);
        totalCredits = 0;
        document.getElementById('total-credits').textContent = `Total Credits Selected: ${totalCredits}`;
    };
});
