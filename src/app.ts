//  camelCase for variable and function names.
//  PascalCase for class names and interface names.
//  camelCase for interface members.
//  PascalCase for type names and enum names.
//  Name files with camelCase (for example, ebsVolumes.tsx or storage.tsb)

import { Course } from './models/Course';
import HttpClient from './utils/HttpClient.js';

async function displayCourses(id: number) {
  const url = 'http://localhost:3000/courses/' + id;
  const http = new HttpClient(url);
  const course = await http.get();
  console.log(course);
}

displayCourses(1);
