import { Course } from '../../models/Course.js';
import EntityService from '../../services/entity-service.js';
import config from '../../utils/config.js';
import { renderResultMessage } from '../../utils/dom-helpers.js';
import { convertForm } from '../../utils/helpers.js';

const initPage = async () => {
  const form = document.getElementById('edit-course-form') as HTMLFormElement;
  const editCourseMsg = document.getElementById('edit-course-msg');
  let courseId = location.search.split('=')[1];

  const courseService = new EntityService<any>(
    `${config.BASE_URL}${config.COURSES_PATH}`
  );

  const getCourse = await courseService.getEntity(parseInt(courseId));
  const entries = new URLSearchParams(getCourse).entries();
  const enrolledStudents: number[] = getCourse.students;

  for (let [key, value] of entries) {
    if (key !== 'id' && key !== 'students') {
      const input = form.elements.namedItem(key) as HTMLInputElement;
      input.value = value;
    }
  }

  const editCourse = (e: Event) => {
    e.preventDefault();

    const course = new FormData(form);
    const courseObj: Course = convertForm(course);
    courseObj.students = enrolledStudents;
    courseService.updateEntity(parseInt(courseId), courseObj);

    // TODO: change color to text-success
    if (editCourseMsg) renderResultMessage(editCourseMsg, 'Course Updated');
  };

  form.addEventListener('submit', editCourse);
};

document.addEventListener('DOMContentLoaded', initPage);
