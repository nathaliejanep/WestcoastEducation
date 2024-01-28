import { AuthenticatedUser, User } from '../models/User.js';
import { convertForm } from '../utils/helpers.js';
import EntityService from './entity-service.js';

export default class AuthService extends EntityService<User> {
  private authenticatedUser: AuthenticatedUser | null = null;

  constructor(url: string) {
    super(url);
  }

  async authenticate(email: string, password: string): Promise<boolean> {
    const users = await this.getList();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      foundUser.isAuthenticated = true;
      this.authenticatedUser = foundUser;

      if (foundUser.id) {
        const userId = foundUser.id.toString();
        const userRole = foundUser.role.toString();

        localStorage.setItem('auth', userId);
        localStorage.setItem('userRole', userRole);
      }

      return true;
    } else {
      return false;
    }
  }

  async emailExists(email: string): Promise<boolean> {
    const users = await this.getList();
    return users.some((user) => user.email === email);
  }

  getAuthUser(): AuthenticatedUser | null {
    return this.authenticatedUser;
  }

  async signup(form: HTMLFormElement) {
    const user = new FormData(form);
    const userObj: User = convertForm(user);
    await this.addEntity(userObj);
  }

  logout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('userRole');
  }
}
