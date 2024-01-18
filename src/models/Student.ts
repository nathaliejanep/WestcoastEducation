import { Course } from './Course';

export interface User {
  name: string;
  address: string;
  mail: string;
  number: number;
}

export interface Student extends User {
  // Student name
  // Address
  // E-mail
  // Mobile nr
  enrolledCourses: Course[];
}

export interface Teacher extends User {
  isAdmin: boolean;
}
