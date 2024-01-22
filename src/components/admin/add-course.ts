import { Course } from '../../models/Course.js';
import EntityService from '../../services/entity-service.js';
import { convertForm } from '../../utils/helpers.js';
import config from '../../utils/config.js';

const initPage = () => {
  const form = document.getElementById('add-course-form') as HTMLFormElement;
  console.log(config.BASE_URL);

  const courseService = new EntityService<Course>(
    `${config.BASE_URL}${config.COURSES_PATH}`
  );

  const addCourse = async (e: Event) => {
    e.preventDefault();

    const course = new FormData(form);
    const courseObj: Course = convertForm(course);

    await courseService.addEntity(courseObj);
  };

  form.addEventListener('submit', addCourse);
};

document.addEventListener('DOMContentLoaded', initPage);
