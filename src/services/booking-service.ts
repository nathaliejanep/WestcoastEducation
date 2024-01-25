import { Course } from '../models/Course.js';
import { User } from '../models/User.js';
import EntityService from './entity-service.js';

interface Enrollment {
  userId: number;
  courseId: number;
}

// TODO: delete this file if not using
export default class BookingService extends EntityService<Enrollment> {
  constructor(url: string) {
    super(url);
  }

  async enrollCourse(userId: number, courseId: number) {
    const enrollment: Enrollment = { userId, courseId };
    const enrollments: Enrollment[] = await this.getList();

    const existingEnrollment = enrollments.find((enrolled) => {
      enrolled.userId === userId && enrolled.courseId === courseId;
    });

    if (existingEnrollment) {
      console.log('enrolled already');
    } else {
      console.log('enrolled and push to course');
    }
  }
}
