import { Course } from '../../models/Course.js';
import CourseService from '../../services/course-service.js';
import c from '../../utils/config.js';

const initPage = async () => {
  const courseService = new CourseService(`${c.BASE_URL}${c.COURSES_PATH}`);
  const popularCourses = await courseService.findPopularCourses();

  const root = document.getElementById('root') as HTMLDivElement;
  console.log(popularCourses);

  const generateCarousel = (courses: Course[]): string => {
    // Indicators/arrows
    const indicators = courses
      .map(
        (_, index) =>
          `<li data-target="#carouselExampleIndicators" data-slide-to="${index}"${
            index === 0 ? ' class="active"' : ''
          }></li>`
      )
      .join('');

    // Image/text
    const items = courses
      .map(
        (course, index) => `
      <div class="carousel-item${index === 0 ? ' active' : ''}" 
      style="height: 550px;">
        <img 
        class="d-block w-100" src="./src/assets/images/${course.imageUrl}" 
        alt="${course.title} slide" 
        style="object-fit:cover; min-height: 550px;">
        <div class="carousel-caption d-none d-md-block p-10">
          <h5>${course.title}</h5>
          <p>${course.description || '...'}</p>
        </div>
      </div>
    `
      )
      .join('');

    // Combine everything into the complete carousel HTML
    const carouselHtml = `
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          ${indicators}
        </ol>
        <div class="carousel-inner">
          ${items}
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    `;

    return carouselHtml;
  };

  // Generate and append the carousel HTML to the root element
  if (root) {
    root.innerHTML = generateCarousel(popularCourses);
  }
};
document.addEventListener('DOMContentLoaded', initPage);
