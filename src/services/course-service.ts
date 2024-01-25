import { Course } from '../models/Course.js';
import EntityService from './entity-service.js';

// FIXME: make sure all exports are done the same
// TODO: move user methods to here
/** //
 * Gets details
 * @param id
 * @returns details of entity
 */
export default class CourseService extends EntityService<Course> {
  constructor(url: string) {
    super(url);
  }

  // Add student to course
  async enrollStudent(courseId: number, studentId: number): Promise<void> {
    // Get course
    const currentCourse: Course = await this.getEntity(courseId);
    // Destruct course.students and add student
    const updateStudents = [...(currentCourse.students || []), studentId];
    console.log(updateStudents);
    // Destruct course and add updated students
    const updatedCourse: Course = {
      ...currentCourse,
      students: updateStudents,
    };
    console.log(currentCourse.students);

    const studentExists = currentCourse.students?.some((existingUser) => {
      return existingUser === studentId;
    });

    if (studentExists) {
      console.log('Student exist already');
    } else {
      console.log('push student');
      await this.updateEntity(courseId, updatedCourse);
    }
  }
}
