import c from '../../utils/config.js';
import CourseService from '../../services/course-service.js';
import { renderResultMessage } from '../../utils/dom-helpers.js';

const initPage = () => {
  const form = document.getElementById('add-course-form') as HTMLFormElement;
  const courseService = new CourseService(`${c.BASE_URL}${c.COURSES_PATH}`);
  const addCourseMsg = document.getElementById('add-course-msg');

  const addCourse = async (e: Event) => {
    e.preventDefault();
    await courseService.addCourse(form);
    if (addCourseMsg) {
      renderResultMessage(addCourseMsg, 'Course successfully added');
    }
  };

  form.addEventListener('submit', addCourse);
};

document.addEventListener('DOMContentLoaded', initPage);
