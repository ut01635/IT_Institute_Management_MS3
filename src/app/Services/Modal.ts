export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode?: string;
  country?: string;
}

export interface Student {
  id: string;
  nic: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: Address;
  enrollments?: Enrollment[];  
  imagePath?: string;  
  isLocked?: boolean;  
}


export interface Course{
    id:string
    courseName:string
    level:string,
    duration:number,
    fees: number,
    imagePaths: string
  }

  export interface LoginRequest {
    nic: string;
    password: string;
  }

  export interface admin {
    nic:string;
    name:string;
    email:string;
    phone:string;
    image:string;
  }

  export interface enquiry{
    id:string;
    name:string;
    email:string;
    message:string;
    postdate:string;
  }