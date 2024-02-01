import CourseService from '../services/course-service.js';
import config from './config.js';

const courseService = new CourseService(
  `${config.BASE_URL}${config.COURSES_PATH}`
);

const deleteCourse = async (courseId: number) => {
  await courseService.deleteEntity(courseId);
};

/**
 * Function to find element by attribute=id and remove from UI
 * @param attribute - custom attribute name
 * @param id - id of item to find which element to remove
 */
const updateUIAfterDelete = (attribute: string, id: number) => {
  const deletedElement = document.querySelector(`[${attribute}="${id}"]`);
  if (deletedElement) {
    deletedElement.remove();
  }
};

export { deleteCourse, updateUIAfterDelete };
