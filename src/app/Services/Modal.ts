export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country?: string;
}

export interface Student {
  nic: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: Address;
  enrollments?: Enrollment[];
  imagePath?: string;
  isLocked?: boolean;
  enrollingCount?: number;
  completedCount?: number;
}

export interface Course {
  id: string;
  courseName: string;
  level: string;
  duration: number;
  fees: number;
  imagePaths: string[];
  description: string;
}

export interface Enrollment {
  id: string;
  student: Student;
  course: Course;
  enrollmentDate: string;
  isComplete: boolean;
  paymentPlan: string;
}

export interface LoginRequest {
  nic: string;
  password: string;
}

export interface userDetails {
  nic: string;
  Role: string;
}

export interface admin {
  nic: string;
  name: string;
  email: string;
  phone: string;
  imagePath: string;
}

export interface enquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

export interface Payment {
  date: string;
  courseName: string;
  amount: number;
  dueAmount: number;
  totalAmount: number;
  student:Student;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: Date;
}

export interface Message {
  id: string;
  message: string;
  studentNIC: string;
  date: Date;
}
