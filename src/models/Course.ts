export interface Course {
  readonly id: number;
  title: string;
  teacher: string;
  startDate: Date;
  courseLength: number;
  description: string;
  imageUrl: string;
  classroom: boolean;
  rating?: number;
  students?: number[];
}
