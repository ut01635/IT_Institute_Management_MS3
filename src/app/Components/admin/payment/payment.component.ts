import { Component, OnInit } from '@angular/core';
import { Course, Enrollment } from '../../../Services/Modal';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { PaymentService } from '../../../Services/payment.service';
import { CourseService } from '../../../Services/course.service';

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
    amount : 0,
    enrollmentDate: 'N/A',
    enrollmentId: null // Ensure enrollmentId is part of the form data
  };



  courses: Enrollment[] = [];
  paymentDetails: any = {};
  message: string = '';
  isSuccess: boolean = false;
  isProcessing: boolean = false;

  constructor(
    private enrollmentService: EnrollmentService,
    private paymentService: PaymentService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.resetFormData(); // Initialize the form when the component loads
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
    this.formData.enrollmentId = null; // Reset enrollmentId when resetting the form
    this.paymentDetails = {};
    this.courses = [];
    this.message = '';
    this.isSuccess = false;
  }

  // Triggered when NIC is changed
  onNicChange(): void {
    this.resetFormData(); // Reset form data for new NIC

    if (this.formData.nic) {
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
    }
  }

  // Triggered when a course is selected
  onCourseSelect(): void {
    if (this.formData.nic && this.formData.course) {
      console.log("Selected courseId from form:", this.formData.course); // Log the selected courseId

      this.paymentService.getPaymentsByNic(this.formData.nic).subscribe(
        (payments) => {
          console.log("Payments:", payments); // Log the payment data

          // Debugging: Log both `this.formData.course` and `payment.enrollment.id`
          const selectedPayment = payments.find(payment => {
            console.log('Checking payment.enrollment.id:', payment.enrollment.id); // Log the enrollment.id of each payment
            console.log('Matching with selected course:', this.formData.course);
            return payment.enrollment.id === this.formData.course;
          });

          console.log("Selected payment:", selectedPayment); // Log the selected payment

          if (!selectedPayment) {
            this.showCourseDetails(); // If no payment exists, show course details
          } else {
            this.paymentDetails = selectedPayment; // Set the payment details
            this.updateCourseDetails(selectedPayment); // Update course details with payment details
          }
        },
        (error) => {
          console.error('Error fetching payment details:', error);
          this.message = 'Error fetching payment details.';
        }
      );
    } else {
      this.resetFormData(); // Reset form if NIC or course is not selected
    }
  }

  // Fetch and display course details using Enrollment ID
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
            this.formData.enrollmentDate = new Date(enrollment.enrollmentDate).toLocaleDateString();
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

  // Update course details when payment is found for the selected course
  updateCourseDetails(payment: any): void {
    const enrollmentId = payment.enrollment.id;
    this.formData.enrollmentId = enrollmentId; // Set enrollmentId

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
        console.log("amount" + payment.amount);
        this.formData.amount = 0;
        this.formData.totalPaidAmount = payment.totalPaidAmount || 0;

        if (enrollment.course && enrollment.course.courseName) {
          this.formData.courseName = enrollment.course.courseName;
        } else {
          this.formData.courseName = 'N/A';
        }
  
        if (enrollment.enrollmentDate) {
          this.formData.enrollmentDate = new Date(enrollment.enrollmentDate).toLocaleDateString();
        } else {
          this.formData.enrollmentDate = 'N/A';
        }

        if (payment.paymentDate) {
          this.formData.lastPaymentDate = new Date(payment.paymentDate).toLocaleDateString();
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

  // Triggered when the form is submitted
  onSubmit(): void {
    this.isProcessing = true;
    this.message = '';
    this.isSuccess = false;

    if (!this.formData.course) {
      this.isProcessing = false;
      this.message = 'Enrollment ID is missing. Please select a course and ensure all details are filled correctly.';
      return;
    }

    const paymentData = {
      amount: this.formData.amount,
      paymentDate: new Date().toISOString(),
      enrollmentId: this.formData.course // Pass the enrollmentId to the backend
    };

    this.paymentService.makePayment(paymentData).subscribe(
      (response) => {
        this.message = 'Payment Successful!';
        this.isProcessing = false;
        this.isSuccess = true;
        setTimeout(() => {
          this.message = '';
          this.isSuccess = false;
          this.resetFormData();
          this.formData.nic='';
        }, 5000);
        
       
      },
      (error) => {
        this.isProcessing = false;
        this.isSuccess = false;
        this.message = error.error.message || 'An error occurred during the payment process.';
        setTimeout(() => {
          this.message = '';
          this.isSuccess = false;
          this.resetFormData();
          this.formData.nic='';
        }, 5000);
        
      }
    );
  } 

}
