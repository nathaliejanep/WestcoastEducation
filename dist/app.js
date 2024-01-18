import EntityService from './services/entity-service.js';
const coursesUrl = 'http://localhost:3000/courses';
const courseService = new EntityService(coursesUrl);
courseService.getList();
courseService.getDetails(2);
const testBtn = document.getElementById('test-btn');
//# sourceMappingURL=app.js.map