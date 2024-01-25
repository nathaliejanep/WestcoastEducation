import { AuthenticatedUser, User } from '../../models/User.js';
import AuthService from '../../services/auth-service.js';
import config from '../../utils/config.js';
import { convertForm } from '../../utils/helpers.js';
console.log('fddd');

const initPage = async () => {
  const authService = new AuthService(`${config.BASE_URL}${config.USERS_PATH}`);

  const loginForm = document.getElementById('login-form') as HTMLFormElement;

  const authUser = async (e: Event) => {
    e.preventDefault();
    const user = new FormData(loginForm);
    let userObj: User = convertForm(user);

    const { email, password } = userObj;

    console.log(email);

    const isAuth = await authService.authenticate(email, password);

    // TODO fix login func
    // if admin go to admin

    if (isAuth) {
      // redirect to student dash
      const authenticatedUser = authService.getAuthUser();

      if (authenticatedUser) {
        console.log('Authentication successful');

        if (authService.isAdmin(authenticatedUser)) {
          console.log('admin');
          // window.location.replace('/src/pages/admin.html');
          location.href = `./admin.html`;
        } else {
          // window.location.replace('/src/pages/dashboard.html');
          location.href = `./dashboard.html`;

          console.log('not admin');
        }
      }
    } else {
      console.log('Authentication failed');
    }
  };
  loginForm.addEventListener('submit', authUser);
};
document.addEventListener('DOMContentLoaded', initPage);
