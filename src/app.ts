//  camelCase for variable and function names.
//  PascalCase for class names and interface names.
//  camelCase for interface members.
//  PascalCase for type names and enum names.
//  Name files with camelCase (for example, ebsVolumes.tsx or storage.tsb)

import { Course } from './models/Course.js';
import CourseService from './services/course-service.js';
import EntityService from './services/entity-service.js';
// import ApiService from './services/api-service.js';

// async function displayCourseDetails(id: number) {
//   const url = 'http://localhost:3000/courses/' + id;
//   const http = new HttpClient(url);
//   const course = await http.get();
//   console.log(course);
// }

// displayCourseDetails(1);
// displayCourseDetails(1);
// displayCourseList();
const coursesUrl = 'http://localhost:3000/courses';
const courseService = new EntityService<Course>(coursesUrl);
courseService.getList();
courseService.getDetails(2);
// courseService.deleteCourse(27);
const testBtn = document.getElementById('test-btn');
