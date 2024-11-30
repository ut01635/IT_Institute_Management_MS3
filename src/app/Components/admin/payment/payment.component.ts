import { Component, OnInit } from '@angular/core';
import { Course, Enrollment } from '../../../Services/Modal';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { PaymentService } from '../../../Services/payment.service';
import { CourseService } from '../../../Services/course.service';
import { StudentService } from '../../../Services/student.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  formData = {
    nic: '',
    course: '',
    courseName: 'N/A',
    totalFee: 0,
    paymentPlan: 'Payment Plan',
    dueAmount: 0,
    totalPaidAmount: 0,
    duration: '',
    lastPaymentDate: 'N/A',
    amount: 0,
    enrollmentDate: 'N/A',
    enrollmentId: null 
  };

 errors:any;
 

  courses: Enrollment[] = [];
  paymentDetails: any = {};
  message: string = '';
  isSuccess: boolean = false;
  isProcessing: boolean = false;

  constructor(
    private enrollmentService: EnrollmentService,
    private paymentService: PaymentService,
    private courseService: CourseService,
    private studentService:StudentService
  ) { }

  ngOnInit(): void {
    this.resetFormData(); 
  }

  resetFormData(): void {
    this.formData.dueAmount = 0;
    this.formData.paymentPlan = 'Payment Plan';
    this.formData.totalFee = 0;
    this.formData.amount = 0;
    this.formData.totalPaidAmount = 0;
    this.formData.duration = '';
    this.formData.lastPaymentDate = 'N/A';
    this.formData.course = '';
    this.formData.courseName = 'N/A';
    this.formData.enrollmentDate = 'N/A';
    this.formData.enrollmentId = null; 
    this.paymentDetails = {};
    this.courses = [];
    this.message = '';
    this.isSuccess = false;
  }


onNicChange(): void {
  this.resetFormData(); 

  if (this.formData.nic) {
    
    this.studentService.getStudentByNIC(this.formData.nic).subscribe(
      (student) => {
        console.log(student)
        
        if (student) {
         
          this.enrollmentService.getReadingEnrollments(this.formData.nic).subscribe(
            (enrollments) => {
              this.courses = enrollments;
              if (this.courses.length === 0) {
                this.formData.course = '';
                this.message = 'No courses found for this NIC.';
              }
            },
            (error) => {
              console.error('Error fetching enrollments for NIC:', error);
              this.courses = [];
            }
          );
        } else {
          
          this.courses = [];
          this.message = 'Student not found for the given NIC.';
        }
      },
      (error) => {
        console.error('Error fetching student data:', error);
        this.courses = [];
        this.message = 'Student not found for the given NIC.';
      }
    );
  }
}


  
  onCourseSelect(): void {
    if (this.formData.nic && this.formData.course) {

      this.paymentService.getPaymentsByNic(this.formData.nic).subscribe(
        (payments) => {
          

         
          const selectedPayment = payments.find(payment => {
            
            return payment.enrollment.id === this.formData.course;
          });

          

          if (!selectedPayment) {
            this.showCourseDetails(); 
          } else {
            this.paymentDetails = selectedPayment; 
            this.updateCourseDetails(selectedPayment);
          }
        },
        (error) => {
          
          this.message = 'Error fetching payment details.';
        }
      );
    } else {
      this.resetFormData(); 
    }
  }

  
  showCourseDetails(): void {
    if (this.formData.course) {
      this.enrollmentService.getEnrollmentById(this.formData.course).subscribe(
        (enrollment: Enrollment) => {
          if (enrollment.course && enrollment.course.fees) {
            this.formData.totalFee = enrollment.course.fees;
          } else {
            this.formData.totalFee = 0;
          }

          if (enrollment.course && enrollment.course.duration) {
            this.formData.duration = String(enrollment.course.duration);
          } else {
            this.formData.duration = '';
          }

          this.formData.paymentPlan = enrollment.paymentPlan;
          this.formData.dueAmount = this.formData.totalFee;
          this.formData.amount = 0;
          this.formData.totalPaidAmount = 0;
          this.formData.lastPaymentDate = 'N/A';

          if (enrollment.course && enrollment.course.courseName) {
            this.formData.courseName = enrollment.course.courseName;
          } else {
            this.formData.courseName = 'N/A';
          }

          if (enrollment.enrollmentDate) {
            const date = new Date(enrollment.enrollmentDate);
            const day = String(date.getDate()).padStart(2, '0'); 
            const month = String(date.getMonth() + 1).padStart(2, '0'); 
            const year = date.getFullYear();

            this.formData.enrollmentDate = `${day}-${month}-${year}`;


          } else {
            this.formData.enrollmentDate = 'N/A';
          }
        },
        (error) => {
          console.error('Error fetching enrollment details:', error);
          this.message = 'Error fetching course details.';
        }
      );
    }
  }

 
  updateCourseDetails(payment: any): void {
    const enrollmentId = payment.enrollment.id;
    this.formData.enrollmentId = enrollmentId; 

    this.enrollmentService.getEnrollmentById(enrollmentId).subscribe(
      (enrollment: Enrollment) => {
        if (enrollment.course && enrollment.course.fees) {
          this.formData.totalFee = enrollment.course.fees;
        } else {
          this.formData.totalFee = 0;
        }

        if (enrollment.course && enrollment.course.duration) {
          this.formData.duration = String(enrollment.course.duration);
        } else {
          this.formData.duration = '';
        }

        this.formData.paymentPlan = enrollment.paymentPlan;
        this.formData.dueAmount = payment.dueAmount;
        
        this.formData.amount = 0;
        this.formData.totalPaidAmount = payment.totalPaidAmount || 0;

        if (enrollment.course && enrollment.course.courseName) {
          this.formData.courseName = enrollment.course.courseName;
        } else {
          this.formData.courseName = 'N/A';
        }

        if (enrollment.enrollmentDate) {
          const date = new Date(enrollment.enrollmentDate);
          const day = String(date.getDate()).padStart(2, '0'); 
          const month = String(date.getMonth() + 1).padStart(2, '0'); 
          const year = date.getFullYear();

          this.formData.enrollmentDate = `${day}-${month}-${year}`;
        } else {
          this.formData.enrollmentDate = 'N/A';
        }

        if (payment.paymentDate) {
          const date = new Date(payment.paymentDate);
          const day = String(date.getDate()).padStart(2, '0'); 
          const month = String(date.getMonth() + 1).padStart(2, '0'); 
          const year = date.getFullYear();

          this.formData.lastPaymentDate = `${day}-${month}-${year}`;

        } else {
          this.formData.lastPaymentDate = 'N/A';
        }
      },
      (error) => {
        console.error('Error fetching enrollment details:', error);
        this.message = 'Error fetching course details.';
      }
    );
  }

  
  onSubmit(): void {
    this.isProcessing = true;
    this.message = '';
    this.isSuccess = false;

    if (!this.formData.course) {
      this.isProcessing = false;
      this.message = 'Enrollment ID is missing. Please select a course and ensure all details are filled correctly.';
      return;
    }

    if (!this.formData.amount || this.formData.amount <= 0) {
      this.isProcessing = false;
      this.message = 'Please enter a valid amount greater than LKR 0.00 !';
      return;
    }

    const paymentData = {
      amount: this.formData.amount,
      paymentDate: new Date().toISOString(),
      enrollmentId: this.formData.course 
    };

    this.paymentService.makePayment(paymentData).subscribe(
      (response) => {
        this.message = 'Payment has been successfully processed. Thank you for your payment!';
        this.isProcessing = false;
        this.isSuccess = true;
        


      },
      (error) => {
        this.isProcessing = false;
        this.isSuccess = false;
        this.message = error.error.message || 'An error occurred during the payment process.';
       

      }
    );
  }

}
