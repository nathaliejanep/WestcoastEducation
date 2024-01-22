import config from '../../utils/config.js';
import EntityService from '../../services/entity-service.js';
import { Course } from '../../models/Course.js';

const initPage = async () => {
  const courseService = new EntityService<Course>(
    `${config.BASE_URL}${config.COURSES_PATH}`
  );

  const root = document.getElementById('root') as HTMLElement;
  const courseList: Course[] = await courseService.getList();

  courseList.forEach((course) => {
    const courseCard = document.createElement('div');

    courseCard.classList.add('course-card');
    courseCard.setAttribute('course-id', course.id.toString());
    root.appendChild(courseCard);

    console.log(typeof course.id);
    courseCard.innerHTML += `
    <h3>${course.title}</h3>
      <button>Edit</button>
      <button data-id="${course.id}" class="delete-btn">Delete</button>
      `;
  });

  const deleteBtns = document.querySelectorAll('.delete-btn');
  const courseCards = document.querySelectorAll('.course-card');

  courseCards.forEach((course) => {
    course.addEventListener('click', () => {
      const courseId = course.getAttribute('course-id');
      if (courseId) {
        console.log('go to som');
        location.href = `./edit-course.html?id=${courseId}`;
      }
    });
  });

  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const courseId = btn.getAttribute('data-id');
      if (courseId) {
        courseService.deleteEntity(courseId);
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', initPage);
