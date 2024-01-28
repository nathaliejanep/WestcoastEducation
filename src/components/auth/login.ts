import { User } from '../../models/User.js';
import AuthService from '../../services/auth-service.js';
import config from '../../utils/config.js';
import { renderResultMessage } from '../../utils/dom-helpers.js';
import { constructPath, convertForm, navigateTo } from '../../utils/helpers.js';

const initPage = async () => {
  const authService = new AuthService(`${config.BASE_URL}${config.USERS_PATH}`);

  const loginForm = document.getElementById('login-form') as HTMLFormElement;

  const authUser = async (e: Event) => {
    e.preventDefault();
    const user = new FormData(loginForm);
    let userObj: User = convertForm(user);

    const { email, password } = userObj;
    const loginMsg = document.getElementById('login-msg');
    const isAuth = await authService.authenticate(email, password);

    if (isAuth) {
      const authenticatedUser = authService.getAuthUser();

      if (authenticatedUser) {
        const path = constructPath('dashboard.html');
        navigateTo(path);
      }
    } else {
      if (loginMsg) renderResultMessage(loginMsg, 'Wrong username or password');
    }
  };
  loginForm.addEventListener('submit', authUser);
};
document.addEventListener('DOMContentLoaded', initPage);
