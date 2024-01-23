// import { Student } from './User';

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
  readonly id: number; // TODO: Check what type id should be
  title: string;
  teacher: string; // Skapa en ny interface av teacher?
  startDate: Date; // TODO: Fix date format
  courseLength: number;
  description: String;
  imageUrl: string;
  classroom: boolean;
  rating?: number;
  // students: Student[];
}
