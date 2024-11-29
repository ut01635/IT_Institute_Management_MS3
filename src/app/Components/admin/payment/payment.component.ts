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
    totalFee: 0,
    paymentPlan: 'Payment Plan',
    dueAmount: 0,
    totalPaidAmount: 0,
    duration: '',
    amount: 0,
    lastPaymentDate: 'N/A',
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
    this.formData.enrollmentId = null; // Reset enrollmentId when resetting the form
    this.paymentDetails = {};
    this.courses = [];
    this.message = '';
    this.isSuccess = false;
  }

  // Triggered when NIC is changed
  onNicChange(): void {
    this.resetFormData();

    if (this.formData.nic) {
      this.enrollmentService.getReadingEnrollments(this.formData.nic).subscribe(
        (enrollments) => {
          this.courses = enrollments
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
  
          // Iterate through payments and log the courseId comparison
          const selectedPayment = payments.find(payment => {
            console.log("Comparing payment courseId:", payment.enrollment.courseId); // Log each payment's courseId
            return payment.enrollment.courseId === this.formData.course; // Compare the courseId
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
  
  
  
  
  // Fetch and display course details if no payment found
  showCourseDetails(): void {
    if (this.formData.course) {
      this.courseService.getCourseById(this.formData.course).subscribe(
        (course: Course) => {
          if (course.fees) {
            this.formData.totalFee = course.fees;
          } else {
            this.formData.totalFee = 0;
          }

          if (course.duration) {
            this.formData.duration = String(course.duration);
          } else {
            this.formData.duration = '';
          }

          this.formData.paymentPlan = 'Payment Plan';
          this.formData.dueAmount = this.formData.totalFee;
          this.formData.amount = 0;
          this.formData.totalPaidAmount = 0;
          this.formData.lastPaymentDate = 'N/A';
        },
        (error) => {
          console.error('Error fetching course details:', error);
          this.message = 'Error fetching course details.';
        }
      );
    }
  }

  // Update course details when payment is found for the selected course
  updateCourseDetails(payment: any): void {
    const courseId = payment.enrollment.courseId;
    this.formData.enrollmentId = payment.enrollmentId; // Ensure enrollmentId is set

    console.log("aaa"+courseId)
    console.log("bbb"+this.formData.enrollmentId)

    this.courseService.getCourseById(courseId).subscribe(
      (course: Course) => {
        if (course.fees) {
          this.formData.totalFee = course.fees;
        } else {
          this.formData.totalFee = 0;
        }

        if (course.duration) {
          this.formData.duration = String(course.duration);
        } else {
          this.formData.duration = '';
        }
      },
      (error) => {
        console.error('Error fetching course details:', error);
        this.message = 'Error fetching course details.';
      }
    );

    this.formData.paymentPlan = payment.enrollment.paymentPlan;
    this.formData.dueAmount = payment.dueAmount;
    this.formData.amount = payment.amount;
    this.formData.totalPaidAmount = payment.totalPaidAmount || 0;

    if (payment.paymentDate) {
      this.formData.lastPaymentDate = new Date(payment.paymentDate).toLocaleDateString();
    } else {
      this.formData.lastPaymentDate = 'N/A';
    }
  }

  // Triggered when the form is submitted
  onSubmit(): void {
    this.isProcessing = true;
    this.message = '';
    this.isSuccess = false;
    console.log(this.formData.enrollmentId);
    // Ensure that the enrollmentId is set before proceeding with the payment
    if (!this.formData.enrollmentId) {
      this.isProcessing = false;
      this.message = 'Enrollment ID is missing. Please select a course and ensure all details are filled correctly.';
      return;
    }

    const paymentData = {
      amount: this.formData.amount,
      paymentDate: new Date().toISOString(),
      enrollmentId: this.formData.enrollmentId // Pass the enrollmentId to the backend
    };

    this.paymentService.makePayment(paymentData).subscribe(
      (response) => {
        this.isProcessing = false;
        this.isSuccess = true;
        this.message = 'Payment Successful!';
        this.resetFormData(); // Reset form data after successful payment
      },
      (error) => {
        this.isProcessing = false;
        this.isSuccess = false;
        this.message = error.error.message || 'An error occurred during the payment process.';
      }
    );
  }

}
