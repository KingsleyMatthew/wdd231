const courses = [

  {
    subject: "WDD",
    number: 130,
    credits: 2,
    completed: true
  },

  {
    subject: "WDD",
    number: 131,
    credits: 2,
    completed: true
  },

  {
    subject: "WDD",
    number: 231,
    credits: 2,
    completed: false
  },

  {
    subject: "CSE",
    number: 110,
    credits: 2,
    completed: true
  },

  {
    subject: "CSE",
    number: 111,
    credits: 2,
    completed: false
  }

];

const container = document.querySelector("#courses-container");
const credits = document.querySelector("#credits");

function displayCourses(courseList) {

  container.innerHTML = "";

  courseList.forEach(course => {

    const div = document.createElement("div");

    div.classList.add("course-card");

    if (course.completed) {
      div.classList.add("completed");
    }

    div.textContent =
      `${course.subject} ${course.number}`;

    container.appendChild(div);
  });

  const totalCredits = courseList.reduce(
    (sum, course) => sum + course.credits,
    0
  );

  credits.textContent =
    `The total credits for course listed above is ${totalCredits}`;
}

displayCourses(courses);

/* FILTERS */

document.querySelector("#allBtn")
.addEventListener("click", () => {
  displayCourses(courses);
});

document.querySelector("#cseBtn")
.addEventListener("click", () => {

  const cseCourses = courses.filter(
    course => course.subject === "CSE"
  );

  displayCourses(cseCourses);
});

document.querySelector("#wddBtn")
.addEventListener("click", () => {

  const wddCourses = courses.filter(
    course => course.subject === "WDD"
  );

  displayCourses(wddCourses);
});