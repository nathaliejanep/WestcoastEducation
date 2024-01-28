import { User } from '../../models/User.js';
import UserService from '../../services/user-service.js';
import config from '../../utils/config.js';
import { navigateTo } from '../../utils/helpers.js';

const initPage = async () => {
  const userService = new UserService(
    `${config.BASE_URL}${config.COURSES_PATH}`
  );
  const studentList: User[] = await userService.getList();
  const root = document.getElementById('root') as HTMLDivElement;

  if (root) {
    const courseH: HTMLHeadingElement = document.createElement('h1');
    courseH.innerText = 'Students';

    root.appendChild(courseH);

    // Container for whole list
    const listContainer: HTMLDivElement = document.createElement('div');
    listContainer.classList.add('list-group', 'course-card'); // not sure wr need course-card

    studentList.forEach((student) => {
      const stringifiedId = student.id.toString();

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

      listItemLink.href = `src/pages/student-details.html?id=${student.id}`;

      if (window.location.pathname.includes('/dashboard.html')) {
        listItemLink.href = `./student-details.html?id=${student.id}`;
      }
      //   listItemLink.classList.add('list-group-item', 'list-group-item-action');
      listItemLink.setAttribute('course-id', stringifiedId);
      listItemLink.setAttribute('aria-current', 'true');

      // List item title
      const listItemTitle: HTMLHeadingElement = document.createElement('h5');
      listItemTitle.classList.add('mb-1');
      listItemTitle.textContent = student.name;

      const listItemDate = document.createElement('small');
      listItemDate.classList.add('ml-auto');
      listItemDate.textContent = `Start Date: ${student.role}`;
      listItemLink.appendChild(listItemTitle);
      listItemWrapper.append(listItemLink, listItemDate);

      // Edit for admin
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.setAttribute('data-id', stringifiedId);
      editBtn.classList.add('edit-btn', 'btn', 'btn-primary', 'ml-auto');
      editBtn.onclick = () =>
        navigateTo(`./edit-student.html?id=${student.id}`);

      // Delete for admin
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.setAttribute('data-id', stringifiedId);
      deleteBtn.classList.add('delete-btn', 'btn', 'btn-primary', 'ml-2');
      deleteBtn.onclick = async () => {
        await userService.deleteEntity(student.id);
        location.reload(); //TODO: change this
      };

      listItemWrapper.append(editBtn, deleteBtn);
      listContainer.append(listItemWrapper);
      root.appendChild(listContainer);
    });
  }
};

document.addEventListener('DOMContentLoaded', initPage);
