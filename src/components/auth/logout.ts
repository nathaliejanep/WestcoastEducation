// TODO: probably delete because we handle it from class
// import AuthService from '../../services/auth-service.js';
// import config from '../../utils/config.js';

// const initPage = () => {
//   const authService = new AuthService(`${config.BASE_URL}${config.USERS_PATH}`);

//   const logout = document.getElementById('logout');
//   console.log(authService.getAuthUser());

//   const handleLogout = (e: Event) => {
//     authService.logout();
//     e.preventDefault();
//     window.location.replace('/index.html');
//   };
//   if (logout) {
//     logout.addEventListener('click', handleLogout);
//   }
// };
// document.addEventListener('DOMContentLoaded', initPage);
