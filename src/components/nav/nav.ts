import AuthService from '../../services/auth-service.js';
import config from '../../utils/config.js';
import { constructPath, getAuthId, getUserRole } from '../../utils/helpers.js';

const initPage = () => {
  const currentPage = window.location.pathname;
  const authService = new AuthService(`${config.BASE_URL}${config.USERS_PATH}`);
  const nav = document.getElementById('nav') as HTMLDivElement;
  nav.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light');

  // ---------- West Coast Education "logo" and home link ---------- //
  const brandLink: HTMLAnchorElement = document.createElement('a');
  brandLink.classList.add('navbar-brand');
  brandLink.textContent = 'West Coast Education';
  brandLink.href = constructPath('index.html');

  const toggleBtn: HTMLButtonElement = document.createElement('button');
  toggleBtn.classList.add('navbar-toggler');
  toggleBtn.type = 'button';
  toggleBtn.setAttribute('data-toggle', 'collapse');
  toggleBtn.setAttribute('data-target', '#navbarNavDropdown');
  toggleBtn.setAttribute('aria-controls', 'navbarNavDropdown');
  toggleBtn.setAttribute('aria-expanded', 'false');
  toggleBtn.setAttribute('aria-label', 'Toggle navigation');

  const togglerIcon: HTMLSpanElement = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon');
  toggleBtn.appendChild(togglerIcon);

  const collapseContent: HTMLDivElement = document.createElement('div');
  collapseContent.classList.add('collapse', 'navbar-collapse');
  collapseContent.id = 'navbarNavDropdown';

  const ul: HTMLUListElement = document.createElement('ul');
  ul.classList.add('navbar-nav');

  // -------------------------- Log In -------------------------- //
  const loginLi: HTMLLIElement = document.createElement('li');
  loginLi.classList.add('nav-item');

  const loginLink: HTMLAnchorElement = document.createElement('a');
  loginLink.classList.add('nav-link');
  loginLink.classList.toggle('active', currentPage === '/src/pages/login.html');
  loginLink.href = constructPath('login.html');
  loginLink.textContent = 'Log In';
  loginLi.appendChild(loginLink);

  // Sign Up
  const signupLi: HTMLLIElement = document.createElement('li');
  signupLi.classList.add('nav-item');

  const signupLink: HTMLAnchorElement = document.createElement('a');
  signupLink.classList.add('nav-link');
  signupLink.classList.toggle(
    'active',
    currentPage === '/src/pages/sign-up.html'
  );
  signupLink.href = constructPath('sign-up.html');
  signupLink.textContent = 'Sign Up';
  collapseContent.appendChild(ul);
  signupLi.appendChild(signupLink);

  // Courses
  const coursesLi: HTMLLIElement = document.createElement('li');
  coursesLi.classList.add('nav-item');

  const coursesLink: HTMLAnchorElement = document.createElement('a');
  coursesLink.classList.add('nav-link');
  coursesLink.classList.toggle(
    'active',
    currentPage === '/src/pages/dashboard.html'
  );
  coursesLink.href = constructPath('dashboard.html');
  coursesLink.textContent = 'Courses';
  collapseContent.appendChild(ul);
  coursesLi.appendChild(coursesLink);

  if (!getAuthId()) ul.append(loginLi, signupLi);
  ul.appendChild(coursesLi);

  // Students
  const studentsLi: HTMLLIElement = document.createElement('li');
  coursesLi.classList.add('nav-item');

  const studentsLink: HTMLAnchorElement = document.createElement('a');
  studentsLink.classList.add('nav-link');
  studentsLink.classList.toggle(
    'active',
    currentPage === '/src/pages/student-list.html'
  );
  studentsLink.href = constructPath('student-list.html');
  studentsLink.textContent = 'Students';
  collapseContent.appendChild(ul);
  studentsLi.appendChild(studentsLink);

  // Add Course
  const addCourseLi: HTMLLIElement = document.createElement('li');
  addCourseLi.classList.add('nav-item');

  const addCourseLink: HTMLAnchorElement = document.createElement('a');
  addCourseLink.classList.add('nav-link');
  addCourseLink.classList.toggle(
    'active',
    currentPage === '/src/pages/add-course.html'
  );
  addCourseLink.href = constructPath('add-course.html');
  addCourseLink.textContent = 'Add Course';
  collapseContent.appendChild(ul);
  addCourseLi.appendChild(addCourseLink);

  // Log Out
  const logoutLi: HTMLLIElement = document.createElement('li');
  coursesLi.classList.add('nav-item');

  const logoutLink: HTMLAnchorElement = document.createElement('a');
  logoutLink.classList.add('nav-link');
  logoutLink.href = constructPath('index.html');
  logoutLink.textContent = 'Log Out';
  logoutLink.onclick = () => authService.logout();

  collapseContent.appendChild(ul);
  logoutLi.appendChild(logoutLink);

  // Dropdown li for user
  const dropdownUserLi = document.createElement('li');
  dropdownUserLi.classList.add('nav-item', 'dropdown');

  // Drop Down Name
  // const dropdownUserLink = document.createElement('a');
  // dropdownUserLink.classList.add('nav-link', 'dropdown-toggle');
  // dropdownUserLink.href = 'src/pages/my-courses.html';
  // dropdownUserLink.id = 'navbarDropdownMenuLink';
  // dropdownUserLink.setAttribute('data-toggle', 'dropdown');
  // dropdownUserLink.setAttribute('aria-haspopup', 'true');
  // dropdownUserLink.setAttribute('aria-expanded', 'false');
  // dropdownUserLink.textContent = 'Name';

  // const dropdownMenuDiv = document.createElement('div');
  // dropdownMenuDiv.classList.add('dropdown-menu');
  // dropdownMenuDiv.setAttribute('aria-labelledby', 'navbarDropdownMenuLink');

  // // My Courses
  // const dropdownItemMyCourses = document.createElement('a');
  // dropdownItemMyCourses.classList.add('dropdown-item');
  // dropdownItemMyCourses.href = 'src/pages/my-courses.html';
  // dropdownItemMyCourses.textContent = 'My Courses';

  // dropdownUserLi.appendChild(dropdownUserLink);
  // dropdownUserLi.appendChild(dropdownMenuDiv);

  if (getAuthId() && getUserRole() === 'admin') {
    ul.append(studentsLi, addCourseLi);
  }

  if (getAuthId() && getUserRole() === 'student') {
    ul.appendChild(dropdownUserLi);
    // dropdownMenuDiv.appendChild(dropdownItemMyCourses);
  }

  if (getAuthId()) {
    ul.appendChild(logoutLi);
  }

  nav.append(brandLink, toggleBtn, collapseContent);
};

document.addEventListener('DOMContentLoaded', initPage);
