import { AuthenticatedUser, User } from '../models/User.js';
import EntityService from './entity-service.js';

export default class AuthService extends EntityService<AuthenticatedUser> {
  private authenticatedUser: AuthenticatedUser | null = null;

  constructor(url: string) {
    super(url);
  }

  async authenticate(username: string, password: string): Promise<boolean> {
    const users = await this.getList();
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      // XXX Delete if not being used
      foundUser.isAuthenticated = true;
      this.authenticatedUser = foundUser;

      const userId = foundUser.id.toString();
      const userRole = foundUser.role.toString();

      localStorage.setItem('auth', userId);
      localStorage.setItem('userRole', userRole);

      return true;
    } else {
      return false;
    }
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
