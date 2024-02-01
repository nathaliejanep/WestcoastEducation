import { Course } from '../models/Course.js';
import CourseService from '../services/course-service.js';
import UserService from '../services/user-service.js';
import config from './config.js';

const courseService = new CourseService(
  `${config.BASE_URL}${config.COURSES_PATH}`
);
const userService = new UserService(`${config.BASE_URL}${config.USERS_PATH}`);

const getCourseList = async () => {
  const courseList: Course[] = await courseService.getList();
  return courseList;
};

const getCourse = async (id: number) => {
  const course = await courseService.getEntity(id);
  return course;
};

const getEnrolledStudents = async (studentIds: number[]) => {
  return await userService.getEntitiesById(studentIds);
};
const enrollCourse = async (courseId: number, authUserId: number) => {
  courseService.enrollStudent(courseId, authUserId);
  userService.enrollCourse(authUserId, courseId);

  const resultMessage = await courseService.enrollStudent(courseId, authUserId);

  return resultMessage;
};
const deleteCourse = async (courseId: number) => {
  await courseService.deleteEntity(courseId);
};

/**
 * Function to find element by attribute=id and remove from UI
 * @param attribute - get custom attribute name
 * @param id - id of item to find specific element to remove
 */
const updateUIAfterDelete = (attribute: string, id: number) => {
  const deletedElement = document.querySelector(`[${attribute}="${id}"]`);
  if (deletedElement) {
    deletedElement.remove();
  }
};

export {
  getCourseList,
  getCourse,
  getEnrolledStudents,
  enrollCourse,
  deleteCourse,
  updateUIAfterDelete,
};
