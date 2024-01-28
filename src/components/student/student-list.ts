import { User } from '../../models/User.js';
import UserService from '../../services/user-service.js';
import config from '../../utils/config.js';
import { constructPath, navigateTo } from '../../utils/helpers.js';

const initPage = async () => {
  const userService = new UserService(`${config.BASE_URL}${config.USERS_PATH}`);
  const studentList: User[] = await userService.getList();
  const root = document.getElementById('root') as HTMLDivElement;

  if (root) {
    const courseH: HTMLHeadingElement = document.createElement('h1');
    courseH.innerText = 'Students';

    root.appendChild(courseH);

    // Container for whole list
    const listContainer: HTMLDivElement = document.createElement('div');
    listContainer.classList.add('list-group');

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

      // List item title
      const listItemTitle: HTMLHeadingElement = document.createElement('h5');
      listItemTitle.classList.add('mb-1');
      listItemTitle.textContent = student.name;
      listItemLink.appendChild(listItemTitle);
      listItemWrapper.appendChild(listItemLink);

      // Append
      listContainer.append(listItemWrapper);
      root.appendChild(listContainer);
    });
  }
};

document.addEventListener('DOMContentLoaded', initPage);
