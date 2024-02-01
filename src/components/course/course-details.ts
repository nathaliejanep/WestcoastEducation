import CourseService from '../../services/course-service.js';
import UserService from '../../services/user-service.js';
import c from '../../utils/config.js';
import {
  createBtn,
  createEditBtn,
  createHeading,
  renderResultMessage,
} from '../../utils/dom-helpers.js';
import { deleteCourse } from '../../utils/event-helpers.js';
import { constructPath, getUserRole, navigateTo } from '../../utils/helpers.js';

const courseService = new CourseService(`${c.BASE_URL}${c.COURSES_PATH}`);
const userService = new UserService(`${c.BASE_URL}${c.USERS_PATH}`);

const initPage = async () => {
  let courseId = +location.search.split('=')[1];
  const course = await courseService.getEntity(courseId);
  const studentIds = course.students;
  const enrolledStudents = await userService.getEntitiesById(studentIds ?? []);
  const root = document.getElementById('root');

  if (root) {
    const courseContainer = document.createElement('div');
    courseContainer.classList.add(
      'd-flex',
      'flex-column',
      'align-items-center'
    );

    // Course Title
    const courseTitleHeading = createHeading(course.title);

    // Course Image
    const courseImg = document.createElement('img');
    courseImg.classList.add('w-100');
    courseImg.src = `../../src/assets/images/${course.imageUrl}`;

    // Course Description
    const courseDescription = document.createElement('p');
    courseDescription.classList.add('text-center');
    courseDescription.textContent = course.description;

    // Course Classroom or Remote
    const courseClassroom = document.createElement('p');
    courseClassroom.classList.add('text-center');
    courseClassroom.textContent = `Location: ${
      course.classroom ? 'Gothenburg' : 'Remote'
    }`;

    // Course Start Date
    const courseStartDate = document.createElement('p');
    courseStartDate.classList.add('text-center');
    courseStartDate.textContent = `Start Date: ${course.startDate}`;

    const courseTeacher = document.createElement('p');
    courseTeacher.classList.add('text-center');
    courseTeacher.textContent = `Teacher: ${course.teacher}`;

    // Enrolled students
    const courseStudentTitle = document.createElement('p');
    courseStudentTitle.textContent = 'Enrolled students:';
    if (enrolledStudents.length === 0) {
      courseStudentTitle.textContent = 'No enrolled students';
    }

    const courseStudentsUl = document.createElement('ul');
    courseStudentsUl.classList.add('text-center', 'list-unstyled');

    enrolledStudents.forEach((student) => {
      const courseStudentsLi = document.createElement('li');
      courseStudentsLi.textContent = student.name;
      courseStudentsUl.appendChild(courseStudentsLi);
    });

    // Book for student
    const bookBtn = createBtn('Book');
    bookBtn.addEventListener('click', async () => {
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
    });

    // Edit for admin
    const editBtn = createEditBtn(course.id);
    // createBtn('Edit');
    // const editPath = constructPath(`edit-course.html?id=${course.id}`);
    // editBtn.addEventListener('click', () => navigateTo(editPath));

    const deleteBtn = createBtn('Delete');
    const deletePath = constructPath('dashboard.html');
    deleteBtn.classList.add('ml-2');
    deleteBtn.addEventListener('click', () => {
      deleteCourse(course.id);
      navigateTo(deletePath);
    });

    const messageContainer = document.createElement('div');

    courseContainer.append(
      courseTitleHeading,
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
      courseContainer.append(
        courseStudentTitle,
        courseStudentsUl,
        editBtn,
        deleteBtn
      );
    }
    courseContainer.appendChild(messageContainer);
    root.appendChild(courseContainer);
  }
};

document.addEventListener('DOMContentLoaded', initPage);
