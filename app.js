document.addEventListener("DOMContentLoaded", () => {
  const courseData = { "courses.json" };
  
  const completedCourses = new Set(); // Set to track completed courses
  const completedSelect = document.getElementById("completedSelect");
  const coursesList = document.getElementById("coursesList");
  const notesDiv = document.getElementById("notes");

  // Populate the completed courses select menu
  courseData.programSpecificCourses.forEach(course => {
    const option = document.createElement("option");
    option.value = course.courseCode;
    option.textContent = `${course.courseCode} - ${course.courseName}`;
    completedSelect.appendChild(option);
  });

  // Function to update available courses based on completed courses
  function updateAvailableCourses() {
    coursesList.innerHTML = ''; // Clear previous courses
    notesDiv.innerHTML = ''; // Clear notes

    // Iterate through all courses and check if prerequisites are met
    courseData.programSpecificCourses.forEach(course => {
      const prerequisitesMet = course.prerequisites.every(prerequisite => completedCourses.has(prerequisite));

      const div = document.createElement("div");
      div.classList.add("course");

      const courseLabel = document.createElement("label");
      courseLabel.textContent = `${course.courseCode} - ${course.courseName}`;
      
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = course.courseCode;
      checkbox.disabled = !prerequisitesMet; // Disable checkbox if prerequisites are not met
      checkbox.classList.add('course-checkbox');
      
      // Change the checkbox appearance when checked
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          completedCourses.add(course.courseCode);
        } else {
          completedCourses.delete(course.courseCode);
        }
        updateAvailableCourses();
      });

      div.appendChild(courseLabel);
      div.appendChild(checkbox);
      coursesList.appendChild(div);

      // Add advising notes if the course has "OR" prerequisites
      if (course.prerequisites.length > 1) {
        const note = document.createElement("p");
        note.textContent = `Note: Choose one of the following prerequisites: ${course.prerequisites.join(" or ")}`;
        notesDiv.appendChild(note);
      }
    });
  }

  // Event listener for completed courses selection
  completedSelect.addEventListener("change", () => {
    completedCourses.clear();
    Array.from(completedSelect.selectedOptions).forEach(option => {
      completedCourses.add(option.value);
    });
    updateAvailableCourses();
  });

  // Initialize the available courses
  updateAvailableCourses();
});
