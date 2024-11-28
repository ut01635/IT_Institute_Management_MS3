import { Component, OnInit, inject, } from '@angular/core';
import { PaymentService } from '../../../../Services/payment.service';
import { Course, Enrollment, Payment } from '../../../../Services/Modal';
import { EnrollmentService } from '../../../../Services/enrollment.service';
import { CourseService } from '../../../../Services/course.service';

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrl: './payment-report.component.css'
})
export class PaymentReportComponent implements OnInit {
  payments: Payment[] = []; // Array to hold payment data
  enrollments: Enrollment[] = []; // Array to hold enrollment data
  paymentDateFilter: any = null; // Store filter value
  studentNameOrNicFilter: string = ''; // Filter by student name or NIC
  selectedCourse: string = ''; // Selected course filter
  courses: Course[] = []; // Array of course objects
  totalIncome: number = 0; // Total income value
  filteredPayments: Payment[] = []; // Payments after applying filters

  constructor(
    private paymentService: PaymentService,
    private enrollmentService: EnrollmentService,
    private courseService: CourseService // Inject CourseService to get courses
  ) {}

  ngOnInit(): void {
    // Fetch payments data
    this.paymentService.getAllPayments().subscribe(
      (data: Payment[]) => {
        this.payments = data;
        this.getEnrollmentsForPayments(); // Fetch enrollments for payments
        this.filteredPayments = data; // Initially, show all payments
        this.applyFilters(); // Apply filters when data is fetched
      },
      (error) => {
        console.error('Error fetching payments:', error);
      }
    );

    // Fetch course data
    this.courseService.getAllCourses(); // Get all courses when component initializes
    this.courseService.courses$.subscribe(courses => this.courses = courses); // Update courses array when available

    // Fetch total income from the API
    this.paymentService.getTotalIncome().subscribe(
      (response: any) => {
        this.totalIncome = response.totalIncome;
      },
      (error) => {
        console.error('Error fetching total income:', error);
      }
    );
  }

  getEnrollmentsForPayments(): void {
    this.payments.forEach((payment) => {
      this.enrollmentService.getEnrollmentById(payment.enrollmentId).subscribe(
        (enrollment: Enrollment) => {
          const paymentData = this.payments.find(p => p.enrollmentId === payment.enrollmentId);
          if (paymentData) {
            paymentData.enrollment = enrollment;
          }
        },
        (error) => {
          console.error('Error fetching enrollment for payment:', error);
        }
      );
    });
  }

  // Triggered when the course filter changes
  onCourseChange(): void {
    this.applyFilters(); // Apply all filters when any filter changes
  }

  // Apply all filters
  applyFilters(): void {
    this.filteredPayments = this.payments.filter(payment => {
      // Filter by student name or NIC
      const matchesStudent = this.studentNameOrNicFilter ? 
        (payment.enrollment?.student?.firstName.toLowerCase().includes(this.studentNameOrNicFilter.toLowerCase()) || 
        payment.enrollment?.student?.lastName.toLowerCase().includes(this.studentNameOrNicFilter.toLowerCase()) ||
        payment.enrollment?.student?.nic.toLowerCase().includes(this.studentNameOrNicFilter.toLowerCase())) : true;
  
      // Filter by selected course (Ensure correct comparison with courseId)
      const matchesCourse = this.selectedCourse ? 
        payment.enrollment?.course?.courseId === parseInt(this.selectedCourse) : true; // Convert selectedCourse to integer
  
      // Filter by payment date
      const matchesDate = this.paymentDateFilter ? 
        new Date(payment.paymentDate).toLocaleDateString() === new Date(this.paymentDateFilter).toLocaleDateString() : true;
  
      return matchesStudent && matchesCourse && matchesDate;
    });
  }
  
}