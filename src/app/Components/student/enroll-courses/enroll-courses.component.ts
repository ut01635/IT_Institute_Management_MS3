import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { Course, Enrollment, Payment } from '../../../Services/Modal';
import { PaymentService } from '../../../Services/payment.service';

@Component({
  selector: 'app-enroll-courses',
  templateUrl: './enroll-courses.component.html',
  styleUrl: './enroll-courses.component.css'
})
export class EnrollCoursesComponent implements OnInit {
  enrollments: Enrollment[] = [];
  nic: string = '';
  payments: Payment[] = [];

  constructor(private enrollmentService: EnrollmentService, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.nic = localStorage.getItem('NIC') || '';
    this.loadEnrollments();
    this.loadPayments();

  }

  loadEnrollments(): void {
    this.enrollmentService.getReadingEnrollments(this.nic).subscribe(
      data => {
        this.enrollments = data;
      },
      error => {
        console.error('Error loading enrollments:', error);
      }
    );
  }



  loadPayments(): void {
    this.paymentService.getPaymentsByNic(this.nic).subscribe(
      data => {
        this.payments = data;
      },
      error => {
        console.error('Error loading payments:', error);
      }
    );
  }

  
  calculateProgress(enrollmentDate: Date, duration: number): number {
    const enrollmentStart = new Date(enrollmentDate);
    const now = new Date();
    const totalDays = duration * 30; 
    const elapsedDays = Math.min(
      Math.max(0, (now.getTime() - enrollmentStart.getTime()) / (1000 * 60 * 60 * 24)),
      totalDays
    );
    return Math.round((elapsedDays / totalDays) * 100);
  }

  
  calculateEndDate(enrollmentDate: Date, duration: number): Date {
    const endDate = new Date(enrollmentDate);
    endDate.setMonth(endDate.getMonth() + duration);
    return endDate;
  }

  
  shouldShowUnfollow(enrollmentDate: Date): boolean {
    const threeDaysAfter = new Date(enrollmentDate);
    threeDaysAfter.setDate(threeDaysAfter.getDate() + 4); 
    return new Date() <= threeDaysAfter;
  }


  getLastPaymentDate(enrollmentId: string): string {
    const paymentForEnrollment = this.payments.filter(payment => payment.enrollmentId === enrollmentId);

    if (paymentForEnrollment.length === 0) {
      return 'N/A'; 
    }

   
    const latestPayment = paymentForEnrollment.sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())[0];

   
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    };

    return new Date(latestPayment.paymentDate).toLocaleDateString('en-US', options);
  }


  confirmDelete(id: string) {
    if (window.confirm('Are you sure you want to Unfollow this Course?')) {
      this.onDelete(id);
    }
  }

  onDelete(id: string) {
    this.enrollmentService.deleteEnrollment(id).subscribe(
      (response) => {
        alert('Course Unfollow successfully');
        this.loadEnrollments();


      },
      (error) => {
        console.error('Error Unfollow Course:', error);
      }
    );
  }
}

