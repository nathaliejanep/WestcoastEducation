import EntityService from '../../services/entity-service.js';
import config from '../../utils/config.js';

const initPage = async () => {
  console.log('initPage');
  let courseId = location.search.split('=')[1];

  const courseService = new EntityService<any>(
    `${config.BASE_URL}${config.COURSES_PATH}`
  );
  const getCourse = await courseService.getEntity(parseInt(courseId));
  console.log(getCourse);
};

document.addEventListener('DOMContentLoaded', initPage);
