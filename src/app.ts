//  camelCase for variable and function names.
//  PascalCase for class names and interface names.
//  camelCase for interface members.
//  PascalCase for type names and enum names.
//  Name files with camelCase (for example, ebsVolumes.tsx or storage.tsb)

import { Course } from './models/Course.js';
import EntityService from './services/entity-service.js';

const coursesUrl = 'http://localhost:3000/courses';
const courseService = new EntityService<Course>(coursesUrl);
courseService.getList();
courseService.getDetails(2);
// courseService.deleteCourse(27);
const testBtn = document.getElementById('test-btn');
