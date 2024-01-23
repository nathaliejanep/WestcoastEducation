import { Course } from '../../models/Course.js';
import EntityService from '../../services/entity-service.js';
import config from '../../utils/config.js';
import { convertForm } from '../../utils/helpers.js';

const initPage = async () => {
  const form = document.getElementById('edit-course-form') as HTMLFormElement;
  let courseId = location.search.split('=')[1];

  const courseService = new EntityService<any>(
    `${config.BASE_URL}${config.COURSES_PATH}`
  );

  const getCourse = await courseService.getEntity(parseInt(courseId));
  const entries = new URLSearchParams(getCourse).entries();

  for (let [key, value] of entries) {
    console.log('key', key, 'value', value);

    if (key !== 'id') {
      const input = form.elements.namedItem(key) as HTMLInputElement;
      input.value = value;
    }
  }

  const editCourse = (e: Event) => {
    e.preventDefault();

    const course = new FormData(form);
    const courseObj: Course = convertForm(course);
    courseService.updateEntity(parseInt(courseId), courseObj);
    console.log(courseObj);
  };

  form.addEventListener('submit', editCourse);
};

document.addEventListener('DOMContentLoaded', initPage);