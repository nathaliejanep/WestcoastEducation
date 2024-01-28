import { Course } from '../../models/Course.js';
import CourseService from '../../services/course-service.js';
import config from '../../utils/config.js';
import { constructPath, getUserRole, navigateTo } from '../../utils/helpers.js';

const initPage = async () => {
  const courseService = new CourseService(
    `${config.BASE_URL}${config.COURSES_PATH}`
  );
  const courseList: Course[] = await courseService.getList();
  const root = document.getElementById('root') as HTMLDivElement;

  const courseH: HTMLHeadingElement = document.createElement('h1');
  courseH.innerText = 'Courses';

  root.appendChild(courseH);

  // Container for whole list
  const listContainer: HTMLDivElement = document.createElement('div');
  listContainer.classList.add('list-group');

  courseList.forEach((course) => {
    const stringifiedId = course.id.toString();

    // Wrapper for list item (link) and (buttons)
    const listItemWrapper = document.createElement('div');
    listItemWrapper.classList.add(
      'd-flex',
      'w-100',
      'align-items-center',
      'list-group-item',
      'list-group-item-action'
    );

    // Link container for list item title
    const listItemLink: HTMLAnchorElement = document.createElement('a');
    listItemLink.href = constructPath(`course-details.html?id=${course.id}`);

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

    // Edit for admin
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.setAttribute('data-id', stringifiedId);
    editBtn.classList.add('edit-btn', 'btn', 'btn-primary', 'ml-2');
    editBtn.onclick = () => navigateTo(`./edit-course.html?id=${course.id}`);

    // Delete for admin
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('data-id', stringifiedId);
    deleteBtn.classList.add('delete-btn', 'btn', 'btn-primary', 'ml-2');
    deleteBtn.onclick = async () => {
      await courseService.deleteEntity(course.id);
      location.reload();
    };

    if (getUserRole() === 'admin') {
      listItemWrapper.append(editBtn, deleteBtn);
    }

    listContainer.append(listItemWrapper);
    root.appendChild(listContainer);
  });
};

document.addEventListener('DOMContentLoaded', initPage);
