const courseContainer = document.querySelector('#course-cards');
const creditTotal = document.querySelector('#credit-total');
const filterButtons = document.querySelectorAll('.filter-btn');

function displayCourses(courseList) {
    courseContainer.innerHTML = '';

    courseList.forEach((course) => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        if (course.completed) {
            card.classList.add('course-card--completed');
        }

        card.innerHTML = `
            ${course.completed ? '<span class="stamp">Completed</span>' : ''}
            <div class="course-card__header">
                <span class="course-card__code">${course.subject} ${course.number}</span>
                <span class="course-card__credits">${course.credits} credits</span>
            </div>
            <p class="course-card__title">${course.title}</p>
            <p class="course-card__desc">${course.description}</p>
            <p class="course-card__tech">Tecnologias: ${course.technology.join(', ')}</p>
        `;

        courseContainer.appendChild(card);
    });

    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    creditTotal.textContent = `The total credits for course listed above is ${totalCredits}`;
}

function filterCourses(subject) {
    if (subject === 'all') {
        displayCourses(courses);
        return;
    }
    const filtered = courses.filter((course) => course.subject === subject);
    displayCourses(filtered);
}

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        filterCourses(button.dataset.filter);
    });
});

displayCourses(courses);
