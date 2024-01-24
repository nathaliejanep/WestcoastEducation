import { AuthenticatedUser, User } from '../models/User.js';
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
      // XXX Delete if not being used
      foundUser.isAuthenticated = true;
      this.authenticatedUser = foundUser;

      // FIXME: Should ID be optional??
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

  // XXX Delete if not being used
  isAuth(): boolean {
    return !!this.authenticatedUser;
  }

  // TODO: Create method for admin
  isAdmin(user: AuthenticatedUser) {
    // localStorage.setItem('userRole', 'isAdmin');
    return 'isAdmin' in user;
  }

  // XXX Delete if not being used
  getAuthUser(): AuthenticatedUser | null {
    return this.authenticatedUser;
  }

  async signup(user: User) {
    await this.addEntity(user);
  }

  logout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('userRole');

    // XXX Delete if not being used
    // if (this.authenticatedUser) {
    //   this.authenticatedUser.isAuthenticated = false;
    // } else {
    //   this.authenticatedUser = null;
    // }
  }
}
