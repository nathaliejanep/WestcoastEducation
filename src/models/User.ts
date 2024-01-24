import { Course } from './Course';

export interface User {
  name: string;
  address?: string;
  email: string;
  phone?: number;
  readonly id?: number;
  isAuthenticated?: boolean;
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
  email: string;
  password: string;
}
