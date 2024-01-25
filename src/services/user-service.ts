// Register student
// Get future or active courses (status)
// Get hisory of courses
// Edit student
// TODO: move user methods to here
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
      // TODO: implement logic
      console.log('course exist alreadt');
    } else {
      console.log('push course');
      await this.updateEntity(userId, updatedUser);
    }
  }
}
