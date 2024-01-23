import { Course } from './Course';

export interface User {
  name: string;
  address: string;
  mail: string;
  phone: number;
  readonly id: number;
  isAuthenticated?: boolean;
  username: string;
  password: string;
  role: 'student' | 'teacher' | 'admin';
  enrolledCourses?: Course[];
  isAdmin: boolean;
}

// export interface Student extends User {
//   // Student name
//   // Address
//   // E-mail
//   // Mobile nr
//   enrolledCourses: Course[];
// }

// export interface Teacher extends User {
//   isAdmin: boolean;
// }

export interface AuthenticatedUser extends User {
  username: string;
  password: string;
}