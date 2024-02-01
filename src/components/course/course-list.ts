import {
  createBtn,
  createHeading,
  createListContainer,
  createListItem,
} from '../../utils/dom-helpers.js';
import {
  deleteCourse,
  getCourseList,
  updateUIAfterDelete,
} from '../../utils/event-helpers.js';
import { constructPath, getUserRole, navigateTo } from '../../utils/helpers.js';

const root = document.getElementById('root') as HTMLDivElement;

const initPage = async () => {
  const courseHeading = createHeading('Courses');
  root.appendChild(courseHeading);

  // Container for whole list
  const listContainer = createListContainer();

  const courseList = await getCourseList();
  courseList.forEach((course) => {
    const stringifiedId = course.id.toString();
    const stringifiedStartDate = course.startDate.toString();

    const listItem = createListItem(
      'course-id',
      stringifiedId,
      course.title,
      `course-details.html?id=${course.id}`
    );

    // Small text with Start Date
    const listItemDate = document.createElement('small');
    // TODO fix margin
    // listItemDate.classList.add('ml-1');
    listItemDate.textContent = `Start Date: ${stringifiedStartDate}`;
    listItem.append(listItemDate);

    const editBtn = createBtn('Edit');
    editBtn.classList.add('ml-auto');

    const deleteBtn = createBtn('Delete');
    deleteBtn.classList.add('ml-2');

    if (getUserRole() === 'admin') {
      listItem.append(editBtn, deleteBtn);
    }

    editBtn.addEventListener('click', () => {
      const editPath = constructPath(`edit-course.html?id=${course.id}`);
      navigateTo(editPath);
    });

    deleteBtn.addEventListener('click', () => {
      deleteCourse(course.id);
      updateUIAfterDelete('course-id', course.id);
    });

    listContainer.append(listItem);
  });
  root.appendChild(listContainer);
};

document.addEventListener('DOMContentLoaded', initPage);
