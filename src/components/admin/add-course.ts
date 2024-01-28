import c from '../../utils/config.js';
import CourseService from '../../services/course-service.js';

const initPage = () => {
  const form = document.getElementById('add-course-form') as HTMLFormElement;
  const courseService = new CourseService(`${c.BASE_URL}${c.COURSES_PATH}`);

  const addCourse = async () => {
    await courseService.addCourse(form);
  };

  form.addEventListener('submit', addCourse);
};

document.addEventListener('DOMContentLoaded', initPage);
