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
    payments: Payment[] = []; 
    enrollments: Enrollment[] = []; 
    paymentDateFilter: any = null; 
    studentNameOrNicFilter: string = ''; 
    selectedCourse: string = ''; 
    courses: Course[] = []; 
    totalIncome: number = 0; 
    filteredPayments: Payment[] = []; 

    constructor(
      private paymentService: PaymentService,
      private enrollmentService: EnrollmentService,
      private courseService: CourseService
    ) {}

    ngOnInit(): void {
      
      this.paymentService.getAllPayments().subscribe(
        (data: Payment[]) => {
          this.payments = data;
          this.getEnrollmentsForPayments(); 
          this.filteredPayments = data;
          this.applyFilters(); 
        },
        (error) => {
          console.error('Error fetching payments:', error);
        }
      );

    
      this.courseService.getAllCourses(); 
      this.courseService.courses$.subscribe(courses => this.courses = courses); 

    
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

  
    onCourseChange(): void {
      this.applyFilters(); 
    }

    
    applyFilters(): void {
      this.filteredPayments = this.payments.filter(payment => {
        
        const matchesStudent = this.studentNameOrNicFilter ? 
          (payment.enrollment?.student?.firstName.toLowerCase().includes(this.studentNameOrNicFilter.toLowerCase()) || 
          payment.enrollment?.student?.lastName.toLowerCase().includes(this.studentNameOrNicFilter.toLowerCase()) ||
          payment.enrollment?.student?.nic.toLowerCase().includes(this.studentNameOrNicFilter.toLowerCase())) : true;
    
        
          const matchCourse = this.selectedCourse ? payment.enrollment.course.id === this.selectedCourse : true;
    
        
        const matchesDate = this.paymentDateFilter ? 
          new Date(payment.paymentDate).toLocaleDateString() === new Date(this.paymentDateFilter).toLocaleDateString() : true;
    
        return matchesStudent && matchCourse && matchesDate;
      });
    }
    
  }