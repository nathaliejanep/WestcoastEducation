import { Course } from '../../models/Course.js';
import CourseService from '../../services/course-service.js';
import c from '../../utils/config.js';
import {
  createBtn,
  createEditBtn,
  createHeading,
  createListItem,
} from '../../utils/dom-helpers.js';
import {
  deleteCourse,
  updateUIAfterDelete,
} from '../../utils/event-helpers.js';
import { constructPath, getUserRole, navigateTo } from '../../utils/helpers.js';

const courseService = new CourseService(`${c.BASE_URL}${c.COURSES_PATH}`);
const root = document.getElementById('root') as HTMLDivElement;

const initPage = async () => {
  const courseList: Course[] = await courseService.getList();

  const courseHeading = createHeading('Courses');
  root.appendChild(courseHeading);

  // Container for whole list
  const listContainer: HTMLDivElement = document.createElement('div');
  listContainer.classList.add('list-group');

  courseList.forEach((course) => {
    const stringifiedId = course.id.toString();
    const stringifiedStartDate = course.startDate.toString();
    const listItem = createListItem(
      stringifiedId,
      course.title,
      `course-details.html?id=${course.id}`
    );
    // // Wrapper for list item (link) and (buttons)
    // const listItemWrapper = document.createElement('div');
    // listItemWrapper.setAttribute('course-id', stringifiedId);

    // listItemWrapper.classList.add(
    //   'd-flex',
    //   'w-100',
    //   'align-items-center',
    //   'list-group-item',
    //   'list-group-item-action'
    // );

    // // Link container for list item title
    // const listItemLink: HTMLAnchorElement = document.createElement('a');
    // listItemLink.href = constructPath(`course-details.html?id=${course.id}`);

    // // listItemLink.setAttribute('course-id', stringifiedId);
    // listItemLink.setAttribute('aria-current', 'true');

    // // List item title
    // const listItemTitle: HTMLHeadingElement = document.createElement('h5');
    // listItemTitle.classList.add('mb-1');
    // listItemTitle.textContent = course.title;

    const listItemDate = document.createElement('small');
    listItemDate.classList.add('ml-auto');
    listItemDate.textContent = `Start Date: ${stringifiedStartDate}`;
    // listItemLink.appendChild(listItemTitle);
    listItem.append(listItemDate);

    // Edit for admin
    const editBtn = createEditBtn(course.id);
    editBtn.classList.add('ml-auto');

    // Delete for admin
    const deleteBtn = createBtn('Delete');
    deleteBtn.classList.add('ml-2');

    deleteBtn.addEventListener('click', () => {
      deleteCourse(course.id);
      updateUIAfterDelete('course-id', course.id);
    });

    if (getUserRole() === 'admin') {
      listItem.append(editBtn, deleteBtn);
    }

    listContainer.append(listItem);
  });
  root.appendChild(listContainer);
};

document.addEventListener('DOMContentLoaded', initPage);
