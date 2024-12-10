export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country?: string;
}

export interface Student {
  course: any;
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
  dueAmount: number;
  paymentPlan: string;
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
  enrollmentDate: Date;
  isComplete: boolean;
  paymentPlan: string;
  studentNIC:string;
  courseId:string;
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
  paymentDate: string;
  courseName: string;
  amount: number;
  dueAmount: number;
  totalPaidAmount: number;
  student:Student;
  enrollmentId:string;
  enrollment:Enrollment;
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
  student:Student
}

export interface StudentProfileDto {
  nic: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isLocked: boolean;
  failedLoginAttempts: number;
  imagePath: string;
  address: Address;
  socialMediaLinks: SocialMediaLinks;
  enrollments: Enrollment[];
}



//Request modals
export interface SocialMediaLinks {
  id: string;
  linkedIn?: string;
  instagram?: string;
  facebook?: string;
  gitHub?: string;
  whatsApp?: string;
  studentNic?: string;
}
export interface EnrollmentRequest{
  studentNIC:string,
  courseId:string,
  paymentPlan:string
}
export interface EmailRequest{
  email:string,
  subject:string,
  body:string
}
export interface AnnouncementRequest{
  title: string;
  body: string;
  date: Date;
}
export interface MessageRequest{
  message: string;
  studentNIC: string;
  date: Date;
}
export interface AdminMessageRequest{
    message:string,
    studentNIC:string
}
export interface resetPassword{
  currentPassword:string,
  newPassword:string,
  confirmNewPassword:string
}
export interface AddressRequestDto {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
export interface StudentUpdateRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: AddressRequestDto;
}
export interface StudentPassword {
  nic: string;
  newPassword: string;
}


// Summary Response Modals
export interface SummaryResponse{
  totalCourses:number;
  totalStudents:number;
}

export interface RevenueSummaryResponseDto{
  totalRevenue:number;
  currentYearRevenue:number;
  currentMonthRevenue:number;
}

export interface EnrollmentSummaryResponseDto{
  totalEnrollments:number;
  completeEnrollments:number;
  readingEnrollments:number
}
