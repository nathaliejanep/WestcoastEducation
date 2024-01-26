import CourseService from '../../services/course-service.js';
import EntityService from '../../services/entity-service.js';
import UserService from '../../services/user-service.js';
import config from '../../utils/config.js';
import { renderResultMessage } from '../../utils/dom-helpers.js';
import { getUserRole, navigateTo } from '../../utils/helpers.js';

const initPage = async () => {
  const courseService = new CourseService(
    `${config.BASE_URL}${config.COURSES_PATH}`
  );
  const userService = new UserService(`${config.BASE_URL}${config.USERS_PATH}`);

  let courseId = +location.search.split('=')[1];
  const getCourse = await courseService.getEntity(courseId);

  const root = document.getElementById('root');

  if (root) {
    const courseContainer = document.createElement('div');
    courseContainer.classList.add(
      'd-flex',
      'flex-column',
      'align-items-center'
    );

    const courseTitle = document.createElement('h1');
    // courseTitle.classList.add('title');
    courseTitle.textContent = getCourse.title;

    const courseImg = document.createElement('img');
    courseImg.classList.add('w-100');
    courseImg.src = `../../src/assets/images/${getCourse.imageUrl}`;

    const courseDescription = document.createElement('p');
    courseDescription.classList.add('text-center');
    courseDescription.textContent = getCourse.description;

    const courseClassroom = document.createElement('p');
    courseClassroom.classList.add('text-center');
    courseClassroom.textContent = `Location: ${
      getCourse.classroom ? 'Gothenburg' : 'Remote'
    }`;

    const courseStartDate = document.createElement('p');
    courseStartDate.classList.add('text-center');
    courseStartDate.textContent = `Start Date: ${getCourse.startDate}`;

    const courseTeacher = document.createElement('p');
    courseTeacher.classList.add('text-center');
    courseTeacher.textContent = `Teacher: ${getCourse.teacher}`;

    // Book for student
    const bookBtn = document.createElement('button');
    bookBtn.textContent = 'Book';
    // bookBtn.setAttribute('data-id', courseId);
    bookBtn.classList.add('book-btn', 'btn', 'btn-primary');

    bookBtn.onclick = async () => {
      const authUserId = localStorage.getItem('auth');
      if (authUserId) {
        courseService.enrollStudent(+courseId, +authUserId);
        userService.enrollCourse(+authUserId, +courseId);

        const resultMessage = await courseService.enrollStudent(
          courseId,
          +authUserId
        );

        renderResultMessage(messageContainer, resultMessage);
      }
      console.log('first');
    };

    // Edit for admin
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    // editBtn.setAttribute('data-id', courseId);
    editBtn.classList.add('edit-btn', 'btn', 'btn-primary');
    editBtn.onclick = () => navigateTo(`./edit-course.html?id=${courseId}`);

    // Delete for admin
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    // deleteBtn.setAttribute('data-id', courseId);
    deleteBtn.classList.add('delete-btn', 'btn', 'btn-primary');

    deleteBtn.onclick = () => {
      courseService.deleteEntity(courseId);
      navigateTo('./dashboard.html');
    };

    const messageContainer = document.createElement('div');

    courseContainer.append(
      courseTitle,
      courseImg,
      courseDescription,
      courseClassroom,
      courseStartDate,
      courseTeacher
    );

    if (getUserRole() === 'student') {
      courseContainer.appendChild(bookBtn);
    }
    if (getUserRole() === 'admin') {
      courseContainer.append(editBtn, deleteBtn);
    }
    courseContainer.appendChild(messageContainer);
    root.appendChild(courseContainer);
  }
};

document.addEventListener('DOMContentLoaded', initPage);
