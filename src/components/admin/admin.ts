import config from '../../utils/config.js';
import EntityService from '../../services/entity-service.js';
import { Course } from '../../models/Course.js';

const initPage = async () => {
  const courseService = new EntityService<Course>(
    `${config.BASE_URL}${config.COURSES_PATH}`
  );

  const root = document.getElementById('root') as HTMLElement;
  const courseList: Course[] = await courseService.getList();

  // TODO: Delete(if so fix loops below) or move to global file
  /**
   * Creates HTML with class
   * @param cardItem
   * @returns className for element
   * @param id
   * @returns details of entity
   */
  // const createCard = (cardItem: string, id: string) => {
  //   const card = document.createElement('div');
  //   card.classList.add(`${cardItem}-card`);
  //   card.setAttribute(`${cardItem}-id`, `${cardItem}.${id}`);

  //   card.innerHTML += `
  //    <h3>${card.title}</h3>
  //      <button>Edit</button>
  //      <button data-id="${card.id}" class="delete-btn">Delete</button>
  //      `;

  //   return card;
  // };

  // const renderList = (list: Course[], element: HTMLElement) => {
  //   list.forEach((cardItem) => {
  //     const card = createCard(cardItem, cardItem.id);

  //     element.appendChild(card);
  //   });
  // };

  courseList.forEach((course) => {
    const courseCard = document.createElement('div');

    courseCard.classList.add('course-card');
    courseCard.setAttribute('course-id', course.id.toString());
    root.appendChild(courseCard);

    console.log(typeof course.id);
    courseCard.innerHTML += `
    <h3>${course.title}</h3>
      <button data-id="${course.id}" class="edit-btn">Edit</button>
      <button data-id="${course.id}" class="delete-btn">Delete</button>
      `;
  });

  const deleteBtns = document.querySelectorAll('.delete-btn');
  const editBtns = document.querySelectorAll('.edit-btn');

  editBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const courseId = btn.getAttribute('data-id');
      if (courseId) {
        console.log('go to som');
        location.href = `./edit-course.html?id=${courseId}`;
      }
    });
  });

  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const courseId = btn.getAttribute('data-id');
      if (courseId) {
        courseService.deleteEntity(+courseId);
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', initPage);
