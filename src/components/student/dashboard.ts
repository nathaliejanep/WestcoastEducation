import { Course } from '../../models/Course.js';
import CourseService from '../../services/course-service.js';
import UserService from '../../services/user-service.js';
import c from '../../utils/config.js';
import { navigateTo } from '../../utils/helpers.js';

const userService = new UserService(`${c.BASE_URL}${c.USERS_PATH}`);

const initPage = async () => {
  const courseService = new CourseService(`${c.BASE_URL}${c.COURSES_PATH}`);

  const root = document.getElementById('root') as HTMLElement;
  const courseList: Course[] = await courseService.getList();

  courseList.forEach((course) => {
    const courseCard = document.createElement('div');

    courseCard.setAttribute('course-id', course.id.toString());
    root.appendChild(courseCard);

    console.log(typeof course.id);
    courseCard.innerHTML += `
    <h3>${course.title}</h3>
      <button data-id="${course.id}" class="course-details-btn">Details</button>
      <button data-id="${course.id}" class="book-btn">Book</button>
      `;
  });

  const courseDetailsBtn = document.querySelectorAll('.course-details-btn');
  const bookBtns = document.querySelectorAll('.book-btn');

  courseDetailsBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      const courseId = btn.getAttribute('data-id');
      if (courseId) {
        navigateTo(`./course-details.html?id=${courseId}`);
      }
    });
  });

  bookBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const courseId = btn.getAttribute('data-id');
      const authUserId = localStorage.getItem('auth');

      // Add student to course
      if (courseId && authUserId) {
        courseService.enrollStudent(+courseId, +authUserId);
        userService.enrollCourse(+authUserId, +courseId);
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', initPage);
