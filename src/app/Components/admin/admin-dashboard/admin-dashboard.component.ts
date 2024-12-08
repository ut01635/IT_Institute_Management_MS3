import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { GreetingService } from '../../../Services/greeting.service';
import { StudentService } from '../../../Services/student.service';
import { CourseService } from '../../../Services/course.service';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { PaymentService } from '../../../Services/payment.service';
import { AdminService } from '../../../Services/admin.service';
import { CurrencyPipe } from '@angular/common';
// import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  adminName: string = '';
  totalStudents: number = 0;
  totalCourses: number = 0;
  totalEnrollments: number = 0;
  completedEnrollments: number = 0;
  readingEnrollments: number = 0;
  totalRevenue: number = 0;
  currentYearRevenue: number = 0;
  currentMonthRevenue: number = 0;
  totalToComplete: number = 0;
  totalToReading: number = 0;
  monthlyRevenue: { name: string, value: number}[] = [];


  
  calculateCompletedEnrollmentPercentage(): number {
    if (this.totalEnrollments === 0) return 0;  
    return (this.completedEnrollments / this.totalEnrollments) * 100;
  }
  
  calculateReadingEnrollmentPercentage(): number {
    if (this.totalEnrollments === 0) return 0; 
    return (this.readingEnrollments / this.totalEnrollments) * 100;
  }
  

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private paymentService: PaymentService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.loadAdminName();
    this.loadDashboardData();


    setTimeout(() => {
      this.completedEnrollment = 20;  
    }, 2000);

    // this.updateChartSize();

  }

  loadAdminName(): void {
    const adminNic = localStorage.getItem('NIC');
    if (adminNic) {
      this.adminService.getAdminByNic(adminNic).subscribe(admin => {
        this.adminName = admin.name;
      }, error => {
        console.error('Error fetching admin data:', error);
      });
    }
  }


  loadDashboardData(): void {

    this.studentService.getStudents();
    this.studentService.students$.subscribe((allStudents) => {
      this.totalStudents = allStudents.length;
    });


    this.courseService.getAllCourses();
    this.courseService.courses$.subscribe((courses) => {
      this.totalCourses = courses.length;
    });


    this.enrollmentService.getallEnrollement().subscribe(enrollments => {
      this.totalEnrollments = enrollments.length;
    });

    this.enrollmentService.getAllCompleted().subscribe(completed => {
      this.completedEnrollments = completed.length;
    });

    this.enrollmentService.getAllReading().subscribe(reading => {
      this.readingEnrollments = reading.length;
    });


    this.paymentService.getTotalIncome().subscribe((response: any) => {
      this.totalRevenue = response.totalIncome;
    }, error => {
      console.error('Error fetching total income:', error);
    });

    const currentYear = new Date().getFullYear();
    this.paymentService.getAllPayments().subscribe(payments => {
      this.currentYearRevenue = payments.filter(payment => new Date(payment.paymentDate).getFullYear() === currentYear)
        .reduce((total, payment) => total + payment.amount, 0);
      
      
      const currentMonth = new Date().getMonth();
      this.currentMonthRevenue = payments.filter(payment => new Date(payment.paymentDate).getMonth() === currentMonth)
        .reduce((total, payment) => total + payment.amount, 0);

      
      this.calculateMonthlyRevenue(payments);
    });


    this.enrollmentService.getAllCompleted().subscribe(completed => {
      const totalEnrollments = completed.length + this.readingEnrollments;
      this.totalToComplete = totalEnrollments > 0 ? Math.round((completed.length / totalEnrollments) * 100) : 0;
    });

    this.enrollmentService.getAllReading().subscribe(reading => {
      const totalEnrollments = reading.length + this.completedEnrollments;
      this.totalToReading = totalEnrollments > 0 ? Math.round((reading.length / totalEnrollments) * 100) : 0;
    });

    
  }

  

  calculateMonthlyRevenue(payments: any[]): void {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    
    this.monthlyRevenue = months.map((month, index) => ({
      name: month,
      value: payments.filter(payment => new Date(payment.paymentDate).getMonth() === index)
        .reduce((total, payment) => total + payment.amount, 0)
    }));
  }

 
  // view: [number, number] = [600,300];  
  showXAxis: boolean = true;  
  showYAxis: boolean = true; 
  showGridLines: boolean = true; 
  showLabels: boolean = true;  

 
  colorScheme: string = 'cool';  

  currentYear(): number {
    return new Date().getFullYear();
  }


  
  
  completedEnrollment: number = 0;  
  totalEnrollment: number = 0;     


  
  getStrokeDasharray(completed: boolean): string {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const percentage = completed ? this.calculateCompletedEnrollmentPercentage() : this.calculateReadingEnrollmentPercentage();
    const progress = (percentage / 100) * circumference;
    return `${progress} ${circumference}`;
  }
  

  getStrokeColor(completed: boolean): string {
    const percentage = completed ? this.calculateCompletedEnrollmentPercentage() : this.calculateReadingEnrollmentPercentage();
  
    if (percentage < 50) {
      return 'red';  
    } else if (percentage < 80) {
      return 'orange';  
    } else {
      return '#4caf50';  
    }
  }
  

 
  // @HostListener('window:resize', ['$event'])
  // onResize(event: any): void {
  //   this.updateChartSize();
  // }

  
  // updateChartSize(): void {
  //   const width = window.innerWidth;

    
  //   if (width <= 576) { 
  //     this.view = [width - 50, 200]; 
  //   } else if (width <= 768) { 
  //     this.view = [width - 100, 300]; 
  //   } else if (width <= 992) { 
  //     this.view = [width - 200, 350]; 
  //   } else { 
  //     this.view = [700, 400]; 
  //   }
  // }

}