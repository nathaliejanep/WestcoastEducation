import { Course } from '../models/Course.js';
import { convertForm } from '../utils/helpers.js';
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
  async enrollStudent(courseId: number, studentId: number): Promise<string> {
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
      return 'You are already enrolled in this class';
    } else {
      console.log('push student');
      await this.updateEntity(courseId, updatedCourse);
      return 'Successfully enrolled, thanks for registering to this course';
    }
  }

  // 4 most popular courses
  async findPopularCourses() {
    const courses = await this.getList();

    const sortedCourses = courses.sort(
      (a, b) => (b.students?.length ?? 0) - (a.students?.length ?? 0)
    );

    const topCourses = sortedCourses.slice(0, 4);
    console.log(topCourses);
    return topCourses;
  }

  // const addCourse = async (e: Event) => {
  //   e.preventDefault();

  //   const course = new FormData(form);
  //   const courseObj: Course = convertForm(course);

  //   await courseService.addEntity(courseObj);
  // };

  // TODO: maybe move this to entity service and make global?
  async addCourse(form: HTMLFormElement) {
    const course = new FormData(form);
    const courseObj: Course = convertForm(course);

    await this.addEntity(courseObj);
  }
}
