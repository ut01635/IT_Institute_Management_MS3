import { Component, OnInit } from '@angular/core';
import { Course } from '../../../Services/Modal';
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
    installmentAmount: 0,
    lastPaymentDate: 'N/A' // Added lastPaymentDate property
  };

  courses: Course[] = [];
  paymentDetails: any = {}; // Holds the payment details for the selected course

  constructor(
    private enrollmentService: EnrollmentService,
    private paymentService: PaymentService,
    private courseService: CourseService // Inject course service
  ) { }

  ngOnInit(): void {
    this.formData.dueAmount = 0;
    this.formData.paymentPlan = 'Payment Plan';
    this.formData.totalFee = 0;
    this.formData.installmentAmount = 0;
    this.formData.totalPaidAmount = 0;
    this.formData.duration = '';
    this.formData.lastPaymentDate = 'N/A'; // Initialize the lastPaymentDate
  }

  // Method to handle NIC change and fetch courses for that NIC
  onNicChange(): void {
    if (this.formData.nic) {
      this.enrollmentService.getEnrollments(this.formData.nic).subscribe(
        (enrollments) => {
          this.courses = enrollments.map(enrollment => enrollment.course);
          if (this.courses.length === 0) {
            this.formData.course = ''; // Reset course field if no courses
          }
        },
        (error) => {
          console.error('Error fetching enrollments for NIC:', error);
          this.courses = []; // Reset courses on error
        }
      );
    } else {
      this.courses = []; // Clear courses if NIC is empty
    }
  }

  onCourseSelect(): void {
    if (this.formData.nic && this.formData.course) {
      this.paymentService.getPaymentsByNic(this.formData.nic).subscribe(
        (payments) => {
          console.log('Payments:', payments);

          // Find the payment for the selected course
          const selectedPayment = payments.find(payment =>
            payment.enrollment.courseId === this.formData.course);

          if (selectedPayment) {
            this.paymentDetails = selectedPayment;
            console.log('Selected Payment:', JSON.stringify(this.paymentDetails));

            // Retrieve course details
            const courseId = selectedPayment.enrollment.courseId;
            this.courseService.getCourseById(courseId).subscribe(
              (course: Course) => {
                console.log('Course Details:', JSON.stringify(course));

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
              }
            );

            this.formData.paymentPlan = selectedPayment.enrollment.paymentPlan;
            this.formData.dueAmount = selectedPayment.dueAmount;
            this.formData.installmentAmount = selectedPayment.amount;
            this.formData.totalPaidAmount = selectedPayment.totalPaidAmount || 0;

            // Extract last payment date
            if (selectedPayment.paymentDate) {
              this.formData.lastPaymentDate = new Date(selectedPayment.paymentDate).toLocaleDateString();
            } else {
              this.formData.lastPaymentDate = 'N/A';
            }
          } else {
            this.formData.totalFee = 0;
            this.formData.duration = '';
            this.formData.totalPaidAmount = 0;
            this.formData.lastPaymentDate = 'N/A';
          }
        },
        (error) => {
          console.error('Error fetching payment details:', error);
        }
      );
    } else {
      this.formData.totalFee = 0;
      this.formData.duration = '';
      this.formData.totalPaidAmount = 0;
      this.formData.lastPaymentDate = 'N/A';
    }
  }

  onSubmit(): void {
    if (this.formData.installmentAmount > 0) {
      alert('Payment successful!');
    } else {
      alert('Please enter a valid installment amount.');
    }
  }


}
