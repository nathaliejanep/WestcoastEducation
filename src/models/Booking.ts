// TODO: Fix properties for user- and courseId
export interface Booking {
  id: number;
  userId: number; // ID of the user making the booking
  courseId: number; // ID of the course being booked
  date: Date; // Date and time of the booking
  status: 'pending' | 'confirmed' | 'canceled'; // Booking status
  userEmail: string; // Email of the user making the booking
  teacherEmail: string; // Email of the course teacher
  // For example: duration, payment details, special requests, etc.
}
