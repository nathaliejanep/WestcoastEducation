import { User } from '../../models/User.js';
import AuthService from '../../services/auth-service.js';
import config from '../../utils/config.js';
import { renderResultMessage } from '../../utils/dom-helpers.js';
import { convertForm } from '../../utils/helpers.js';

const initPage = () => {
  const authService = new AuthService(`${config.BASE_URL}${config.USERS_PATH}`);
  const form = document.getElementById('sign-up-form') as HTMLFormElement;
  const signupMsg = document.getElementById('signup-msg');

  const handleSignUp = async (e: Event) => {
    e.preventDefault();

    const user = new FormData(form);
    const userObj: User = convertForm(user);
    userObj.isAdmin = false;
    userObj.role = 'student';

    const emailExists = await authService.emailExists(userObj.email);

    if (emailExists) {
      if (signupMsg) renderResultMessage(signupMsg, 'Email exists already');
    } else {
      if (signupMsg) renderResultMessage(signupMsg, 'Signed up');
      await authService.signup(form);
    }
  };

  form.addEventListener('submit', handleSignUp);
};

document.addEventListener('DOMContentLoaded', initPage);
