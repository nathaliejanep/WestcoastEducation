import {
  createBtn,
  createDetailImg,
  createHeading,
  createTextP,
  renderResultMessage,
} from '../../utils/dom-helpers.js';
import {
  deleteCourse,
  enrollCourse,
  getCourse,
  getEnrolledStudents,
} from '../../utils/event-helpers.js';
import { constructPath, getUserRole, navigateTo } from '../../utils/helpers.js';

const authUserId = localStorage.getItem('auth');

const initPage = async () => {
  let courseId = +location.search.split('=')[1];
  const course = await getCourse(courseId);
  const enrolledStudents = await getEnrolledStudents(course.students ?? []);
  const root = document.getElementById('root') as HTMLDivElement;

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
    const courseImg = createDetailImg(course.imageUrl);

    // Course Description
    const courseDescription = createTextP(course.description);

    // Course Classroom or Remote
    const courseClassroom = document.createElement('p');
    courseClassroom.classList.add('text-center');
    courseClassroom.textContent = `Location: ${
      course.classroom ? 'Gothenburg' : 'Remote'
    }`;

    // Course Start Date
    const courseStartDate = createTextP(`Start Date: ${course.startDate}`);

    const courseTeacher = createTextP(`Teacher: ${course.teacher}`);

    // Enrolled students
    const enrolledStudentsP = createTextP('Enrolled students:');

    if (enrolledStudents.length === 0) {
      enrolledStudentsP.textContent = 'No enrolled students';
    }

    const courseStudentsUl = document.createElement('ul');
    courseStudentsUl.classList.add('text-center', 'list-unstyled');

    enrolledStudents.forEach((student) => {
      const courseStudentsLi = document.createElement('li');
      courseStudentsLi.textContent = student.name;
      courseStudentsUl.appendChild(courseStudentsLi);
    });

    const bookBtn = createBtn('Book');

    const editBtn = createBtn('Edit');

    const deleteBtn = createBtn('Delete');
    const deletePath = constructPath('dashboard.html');
    deleteBtn.classList.add('ml-2');

    bookBtn.addEventListener('click', async () => {
      if (authUserId) {
        enrollCourse(courseId, +authUserId);
        const resultMessage = await enrollCourse(courseId, +authUserId);
        renderResultMessage(messageContainer, resultMessage);
      }
    });

    editBtn.addEventListener('click', () => {
      const editPath = constructPath(`edit-course.html?id=${course.id}`);
      navigateTo(editPath);
    });

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
        enrolledStudentsP,
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
