import { Course } from '../models/Course.js';
import ApiService from './api-service.js';

/** // TODO: delete this file since we have entity
 * Gets details
 * @param id
 * @returns details of entity
 */
export default class CourseService {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }
  getCourseList = async (): Promise<Course[]> => {
    const http = new ApiService(`${this.url}/courses/`);
    const courses: Course[] = await http.get<Course[]>();
    console.log(courses);
    return courses;
  };

  getCourseDetails = async (id: number): Promise<Course> => {
    const http = new ApiService(`${this.url}/courses/${id}`);
    const course: Course = await http.get<Course>();
    console.log(course);
    return course;
  };

  addCourse = async (course: Course) => {
    const http = new ApiService(`${this.url}/courses/`);
    await http.add<Course>(course);
  };

  deleteCourse = async (id: number) => {
    const http = new ApiService(`${this.url}/courses/${id}`);
    await http.delete();
  };

  updateCourse = async (id: number, updatedCourse: Course) => {
    const http = new ApiService(`${this.url}/courses/${id}`);
    await http.edit(updatedCourse);
  };
}

// courseService.getCourseList();

// export const displayCourseList = async (): Promise<Course[]> => {
//   const http = new ApiService(`${url}/courses/`);
//   const courses: Course[] = await http.get<Course[]>();
//   console.log(courses);
//   return courses;
// };

// export const displayCourseDetails = async (id: number): Promise<Course> => {
//   const http = new ApiService(`${url}/courses/${id}`);
//   const course: Course = await http.get<Course>();
//   console.log(typeof course);

//   return course;
// };

// export const addCourse = async (course: Course) => {
//   const http = new ApiService(`${url}/courses/`);

//   await http.add<Course>(course);
// };

// // OBS! ändra till id som parameter
// export const deleteCourse = async () => {
//   const http = new ApiService(`${url}/courses/28`);
//   await http.delete();
// };

// // OBS! ändra till id som parameter
// export const editCourse = async (id: number) => {
//   const http = new ApiService(`${url}/courses/${id}`);
//   await http.edit({
//     title: 'string',
//     id: 100,
//     course_length: 10,
//     classroom: true,
//     image_url: 'string',
//     start_date: new Date(),
//     teacher: 'string',
//   });
// };

// // editCourse(31);
// const testBtn = document.getElementById('test-btn');

// testBtn?.addEventListener('click', deleteCourse);

// // kalla när form fylld
// // addCourse({
// //   title: 'string',
// //   id: 100,
// //   course_length: 10,
// //   classroom: true,
// //   image_url: 'string',
// //   start_date: new Date(),
// //   teacher: 'string',
// //   rating: 1,
// // });
