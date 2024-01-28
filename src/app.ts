//  camelCase for variable and function names.
//  PascalCase for class names and interface names.
//  camelCase for interface members.
//  PascalCase for type names and enum names.
//  Name files with camelCase (for example, ebsVolumes.tsx or storage.tsb)

import { Course } from './models/Course.js';
import EntityService from './services/entity-service.js';
import config from './utils/config.js';

const initPage = async () => {
  const courseService = new EntityService<Course>(
    `${config.BASE_URL}${config.COURSES_PATH}`
  );

  console.log(await courseService.getList());
  // courseService.getEntity(2);
  // courseService.deleteCourse(27);

  // XXX Delete very redundant
  // const logout = document.getElementById('logout');
  // if (logout) {
  //   logout.addEventListener('click', (e) => {
  //     console.log('click');
  //   });
  // }
};
document.addEventListener('DOMContentLoaded', initPage);
