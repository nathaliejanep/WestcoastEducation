export interface User {
  name: string;
  address?: string;
  email: string;
  phone?: number;
  readonly id: number;
  isAuthenticated?: boolean;
  password: string;
  role: 'student' | 'teacher' | 'admin';
  courses?: number[];
  isAdmin: boolean;
}

export interface AuthenticatedUser extends User {
  email: string;
  password: string;
}
