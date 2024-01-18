import { Student } from './Student';

export interface Course {
  // Course Title
  // Course Number
  // Course length (days)
  // Classroom or Remote Classroom
  // Course Image
  // Start date
  // Teacher
  // Booking possibility?
  // List students enrolled
  title: string;
  id: number;
  course_length: number;
  classroom: boolean;
  image_url: string;
  start_date: Date;
  teacher: string; // Skapa en ny interface av teacher?
  rating?: number;
  students: Student[];
}
