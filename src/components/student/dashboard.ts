import { Course } from '../../models/Course.js';
import { User } from '../../models/User.js';
import BookingService from '../../services/booking-service.js';
import CourseService from '../../services/course-service.js';
import EntityService from '../../services/entity-service.js';
import UserService from '../../services/user-service.js';
import config from '../../utils/config.js';

const userService = new UserService(`${config.BASE_URL}${config.USERS_PATH}`);
// TODO: move needed code and then delete
const getUserDetails = async (userId: number): Promise<User> => {
  const user = await userService.getEntity(userId);
  return user;
};
const initPage = async () => {
  const courseService = new CourseService(
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
        location.href = `./course-details.html?id=${courseId}`;
      }
    });
  });

  bookBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      // Make the callback function async
      const courseId = btn.getAttribute('data-id');
      const authUserId = localStorage.getItem('auth');

      if (courseId && authUserId) {
        // TODO delete?
        // const course = await courseService.getEntity(parseInt(courseId));
        // const user = await userService.getEntity(parseInt(authUserId));

        // Add student to course
        // courseService.enrollStudent(parseInt(courseId), user);
        courseService.enrollStudent(+courseId, +authUserId);
        userService.enrollCourse(+authUserId, +courseId);
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', initPage);
