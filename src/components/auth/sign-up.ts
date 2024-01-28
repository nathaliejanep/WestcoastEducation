import { User } from '../../models/User.js';
import AuthService from '../../services/auth-service.js';
import config from '../../utils/config.js';
import { convertForm } from '../../utils/helpers.js';

const initPage = () => {
  const authService = new AuthService(`${config.BASE_URL}${config.USERS_PATH}`);

  const form = document.getElementById('sign-up-form') as HTMLFormElement;

  const handleSignUp = async (e: Event) => {
    e.preventDefault();

    // FIXME: Global function for signup- and/or forms?
    const user = new FormData(form);
    const userObj: User = convertForm(user);
    userObj.isAdmin = false;
    userObj.role = 'student';

    const emailExists = await authService.emailExists(userObj.email);

    if (emailExists) {
      //TODO: Message in UI
      console.log('Email exists already try different');
    } else {
      // await authService.addEntity(userObj);
      await authService.signup(form);
    }
  };

  form.addEventListener('submit', handleSignUp);
};

document.addEventListener('DOMContentLoaded', initPage);
