import { Course } from '../models/Course.js';
import { convertForm } from '../utils/helpers.js';
import EntityService from './entity-service.js';

class CourseService extends EntityService<Course> {
  constructor(url: string) {
    super(url);
  }

  // Add student to course
  async enrollStudent(courseId: number, studentId: number): Promise<string> {
    const currentCourse: Course = await this.getEntity(courseId);
    // Destruct course.students and add student
    const updateStudents = [...(currentCourse.students || []), studentId];

    // Destruct course and add updated students
    const updatedCourse: Course = {
      ...currentCourse,
      students: updateStudents,
    };

    const studentExists = currentCourse.students?.some((existingUser) => {
      return existingUser === studentId;
    });

    if (studentExists) {
      return 'You are already enrolled in this class';
    } else {
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

    return topCourses;
  }

  async addCourse(form: HTMLFormElement) {
    const course = new FormData(form);
    const courseObj: Course = convertForm(course);

    await this.addEntity(courseObj);
  }
}
export default CourseService;
