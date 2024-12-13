import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { GreetingService } from '../../../Services/greeting.service';
import { StudentService } from '../../../Services/student.service';
import { CourseService } from '../../../Services/course.service';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { PaymentService } from '../../../Services/payment.service';
import { AdminService } from '../../../Services/admin.service';
import { CurrencyPipe } from '@angular/common';
import { SummaryService } from '../../../Services/summary.service';
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
  monthlyRevenue: { name: string, value: number }[] = [];
  progressLevel: string = '';
  progressLevelClass: string = '';



  calculateCompletedEnrollmentPercentage(): number {
    if (this.totalEnrollments === 0) return 0;
    return (this.completedEnrollments / this.totalEnrollments) * 100;
  }

  calculateReadingEnrollmentPercentage(): number {
    if (this.totalEnrollments === 0) return 0;
    return (this.readingEnrollments / this.totalEnrollments) * 100;
  }


  updateProgressLevel(): void {
    const percentage = this.calculateReadingEnrollmentPercentage();
  
    if (percentage < 50) {
      this.progressLevel = 'Needs Improvement !';
      this.progressLevelClass = 'progress-poor';
    } else if (percentage >= 50 && percentage < 70) {
      this.progressLevel = 'Average !';
      this.progressLevelClass = 'progress-average';
    } else if (percentage >= 70 && percentage < 90) {
      this.progressLevel = 'Good !';
      this.progressLevelClass = 'progress-good';
    } else {
      this.progressLevel = 'Excellent !';
      this.progressLevelClass = 'progress-excellent';
    }
  }



  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private paymentService: PaymentService,
    private adminService: AdminService,
    private summaryService: SummaryService
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

    this.summaryService.getSummary().subscribe((summary: any) => {
      this.totalStudents = summary.totalStudents;
      this.totalCourses = summary.totalCourses;
    });

    this.summaryService.GetEnrollmentSummary().subscribe((enrollmentSummary: any) => {
      this.totalEnrollments = enrollmentSummary.totalEnrollments;
      this.completedEnrollments = enrollmentSummary.completeEnrollments;
      this.readingEnrollments = enrollmentSummary.readingEnrollments;
      this.updateProgressLevel();
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