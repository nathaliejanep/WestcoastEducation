import { constructPath } from '../../utils/helpers.js';

const initPage = () => {
  const authUser = localStorage.getItem('auth');

  const nav = document.getElementById('nav') as HTMLDivElement;
  nav.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light');

  const brandLink: HTMLAnchorElement = document.createElement('a');
  brandLink.classList.add('navbar-brand');
  brandLink.textContent = 'West Coast Education';
  brandLink.href = './'; // right href?

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

  const loginLi: HTMLLIElement = document.createElement('li');
  loginLi.classList.add('nav-item');

  const loginLink: HTMLAnchorElement = document.createElement('a');
  loginLink.classList.add('nav-link');
  loginLink.href = './login.html';
  loginLink.textContent = 'Log In';
  loginLi.appendChild(loginLink);

  const coursesLi: HTMLLIElement = document.createElement('li');
  coursesLi.classList.add('nav-item');

  const coursesLink: HTMLAnchorElement = document.createElement('a');
  coursesLink.classList.add('nav-link');
  coursesLink.href = constructPath('dashboard.html');
  coursesLink.textContent = 'Courses';
  collapseContent.appendChild(ul);
  coursesLi.appendChild(coursesLink);
  ul.append(loginLi, coursesLi);

  // Dropdown li for user
  const dropdownUserLi = document.createElement('li');
  dropdownUserLi.classList.add('nav-item', 'dropdown');

  const dropdownUserLink = document.createElement('a');
  dropdownUserLink.classList.add('nav-link', 'dropdown-toggle');
  dropdownUserLink.href = 'src/pages/my-courses.html';
  dropdownUserLink.id = 'navbarDropdownMenuLink';
  dropdownUserLink.setAttribute('data-toggle', 'dropdown');
  dropdownUserLink.setAttribute('aria-haspopup', 'true');
  dropdownUserLink.setAttribute('aria-expanded', 'false');
  dropdownUserLink.textContent = 'Name';

  const dropdownMenuDiv = document.createElement('div');
  dropdownMenuDiv.classList.add('dropdown-menu');
  dropdownMenuDiv.setAttribute('aria-labelledby', 'navbarDropdownMenuLink');

  const dropdownItemLogin = document.createElement('a');
  dropdownItemLogin.classList.add('dropdown-item');
  dropdownItemLogin.href = 'src/pages/login.html';
  dropdownItemLogin.textContent = 'Log In';

  const dropdownItemSignUp = document.createElement('a');
  dropdownItemSignUp.classList.add('dropdown-item');
  dropdownItemSignUp.href = 'src/pages/sign-up.html';
  dropdownItemSignUp.textContent = 'Sign Up';

  dropdownUserLi.appendChild(dropdownUserLink);
  dropdownUserLi.appendChild(dropdownMenuDiv);
  dropdownMenuDiv.appendChild(dropdownItemLogin);
  dropdownMenuDiv.appendChild(dropdownItemSignUp);

  if (authUser) {
    ul.appendChild(dropdownUserLi);
  }

  nav.append(brandLink, toggleBtn, collapseContent);
};

document.addEventListener('DOMContentLoaded', initPage);
