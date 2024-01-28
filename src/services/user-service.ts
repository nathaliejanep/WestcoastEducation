import { User } from '../models/User.js';
import EntityService from './entity-service.js';

export default class UserService extends EntityService<User> {
  constructor(url: string) {
    super(url);
  }

  async enrollCourse(userId: number, courseId: number): Promise<void> {
    const currentUser: User = await this.getEntity(userId);

    const updatedUser: User = {
      ...currentUser,
      courses: [...(currentUser.courses || []), courseId],
    };
    const courseExists = currentUser.courses?.some((existingCourse) => {
      return existingCourse === courseId;
    });

    if (courseExists) {
      console.log('course exist already');
    } else {
      await this.updateEntity(userId, updatedUser);
    }
  }
}
