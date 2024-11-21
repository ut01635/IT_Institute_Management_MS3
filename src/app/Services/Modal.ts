export interface Course{
 
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