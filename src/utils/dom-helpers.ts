import { constructPath, navigateTo } from './helpers.js';

const renderResultMessage = (
  messageContainer: HTMLElement,
  message: string
) => {
  messageContainer.innerHTML = '';

  const messageElement: HTMLParagraphElement = document.createElement('p');
  messageElement.textContent = message;
  messageElement.classList.add('text-danger');

  messageContainer.appendChild(messageElement);
};

// -------------------- CREATE ELEMENTS -------------------- //
// TODO maybe add ml-2
const createHeading = (headingText: string) => {
  const heading: HTMLHeadingElement = document.createElement('h1');
  heading.innerText = headingText;
  return heading;
};

const createListItem = (id: string, title: string,path:string) => {
  const listItem = document.createElement('div');
  // TODO coruse-id needs to be global param
  listItem.setAttribute('course-id', id);

  listItem.classList.add(
    'd-flex',
    'w-100',
    'align-items-center',
    'list-group-item',
    'list-group-item-action'
  );

  // Link container for list item title
  const listItemLink: HTMLAnchorElement = document.createElement('a');
  // TODO needs to be gloval path
  listItemLink.href = constructPath(path);

  listItemLink.setAttribute('aria-current', 'true');

  const listItemTitle: HTMLHeadingElement = document.createElement('h5');
  listItemTitle.classList.add('mb-1');
  listItemTitle.textContent = title;

  listItemLink.appendChild(listItemTitle);
  listItem.append(listItemLink);

  return listItem;
};

// TODO make delete red and change classes to else w ml-2
const createBtn = (btnText: string) => {
  const button = document.createElement('button');
  button.textContent = btnText;
  button.classList.add('btn', 'btn-primary');

  return button;
};

// TODO decide if event here or not
const createEditBtn = (id: number) => {
  const editBtn = createBtn('Edit');
  const editPath = constructPath(`edit-course.html?id=${id}`);
  editBtn.addEventListener('click', () => navigateTo(editPath));

  return editBtn;
};

export {
  renderResultMessage,
  createHeading,
  createListItem,
  createBtn,
  createEditBtn,
};
