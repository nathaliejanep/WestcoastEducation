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

// Container for whole list
const createListContainer = () => {
  const listContainer: HTMLDivElement = document.createElement('div');
  listContainer.classList.add('list-group');
  return listContainer;
};

/**
 * Function to find element by attribute=id and remove from UI
 * @param id - set custom attribute name
 * @param title - title text of item
 * @param path - path to item e.g `course-details.html?id=${course.id}`
 * @returns listItem 'div'
 */
const createListItem = (
  attributeId: string,
  id: string,
  title: string,
  path: string
) => {
  const listItem: HTMLDivElement = document.createElement('div');
  listItem.setAttribute(attributeId, id);
  listItem.classList.add(
    'd-flex',
    'w-100',
    'align-items-center',
    'list-group-item',
    'list-group-item-action'
  );

  // Link container for list item title
  const listItemLink: HTMLAnchorElement = document.createElement('a');
  listItemLink.href = constructPath(path);
  listItemLink.setAttribute('aria-current', 'true');

  const listItemTitle: HTMLHeadingElement = document.createElement('h5');
  listItemTitle.classList.add('mb-1');
  listItemTitle.textContent = title;

  listItemLink.appendChild(listItemTitle);
  listItem.append(listItemLink);

  return listItem;
};

// -------------------- BUTTONS -------------------- //
// TODO make delete red and change classes to else w ml-2
const createBtn = (btnText: string) => {
  const button: HTMLButtonElement = document.createElement('button');
  button.textContent = btnText;
  button.classList.add('btn', 'btn-primary');

  return button;
};

const createDetailImg = (imageUrl: string) => {
  const image: HTMLImageElement = document.createElement('img');
  image.style.height = '500px';
  image.src = `../../src/assets/images/${imageUrl}`;
  return image;
};

const createTextP = (textContent: string) => {
  const p = document.createElement('p');
  p.classList.add('text-center');
  p.textContent = textContent;
  return p;
};
export {
  renderResultMessage,
  createHeading,
  createListContainer,
  createListItem,
  createBtn,
  createDetailImg,
  createTextP,
};
