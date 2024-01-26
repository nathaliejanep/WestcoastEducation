import { Course } from '../../models/Course.js';
import CourseService from '../../services/course-service.js';
import config from '../../utils/config.js';

// src/assets/images/laughter_yoga.jpeg
const initPage = async () => {
  const courseService = new CourseService(
    `${config.BASE_URL}${config.COURSES_PATH}`
  );
  const courseList: Course[] = await courseService.getList();
  // Get from LS
  //   const loggedInStudent = true;
  const loggedInStudent = false;
  const loggedInAdmin = false;

  const root = document.getElementById('root');
  if (root) {
    const courseH = document.createElement('h2');
    courseH.innerText = 'Courses';

    root.appendChild(courseH);

    // Container for whole list
    const listContainer: HTMLDivElement = document.createElement('div');
    listContainer.classList.add('list-group', 'course-card'); // not sure wr need course-card

    courseList.forEach((course) => {
      const stringifiedId = course.id.toString();

      // Wrapper for list item (link) and (buttons)
      const listItemWrapper = document.createElement('div');
      listItemWrapper.classList.add(
        'd-flex',
        'w-100',
        // 'justify-content-between',
        'align-items-center',
        // 'justify-content-center',
        'list-group-item',
        'list-group-item-action'
      );

      // Link container for list item title
      const listItemLink: HTMLAnchorElement = document.createElement('a');
      listItemLink.href = `src/pages/course-details.html?id=${course.id}`;

      //   listItemLink.classList.add('list-group-item', 'list-group-item-action');
      listItemLink.setAttribute('course-id', stringifiedId);
      listItemLink.setAttribute('aria-current', 'true');

      // List item title
      const listItemTitle: HTMLHeadingElement = document.createElement('h5');
      listItemTitle.classList.add('mb-1');
      listItemTitle.textContent = course.title;

      const listItemDate = document.createElement('small');
      listItemDate.classList.add('ml-auto');
      listItemDate.textContent = `Start Date: ${course.startDate.toString()}`;
      listItemLink.appendChild(listItemTitle);
      listItemWrapper.append(listItemLink, listItemDate);

      // Book for student
      const bookBtn = document.createElement('button');
      bookBtn.textContent = 'Book';
      bookBtn.setAttribute('data-id', stringifiedId);
      bookBtn.classList.add('book-btn', 'btn', 'btn-primary', 'ml-2');

      // Edit for admin
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.setAttribute('data-id', stringifiedId);
      editBtn.classList.add('edit-btn', 'btn', 'btn-primary', 'ml-auto');

      // Delete for admin
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.setAttribute('data-id', stringifiedId);
      deleteBtn.classList.add('delete-btn', 'btn', 'btn-primary', 'ml-2');

      if (loggedInStudent) {
        listItemWrapper.appendChild(bookBtn);
      }
      if (loggedInAdmin) {
        listItemWrapper.append(editBtn, deleteBtn);
      }

      listContainer.append(listItemWrapper);
      root.appendChild(listContainer);
    });
  }
};

document.addEventListener('DOMContentLoaded', initPage);
