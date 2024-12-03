import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GreetingService } from '../../../Services/greeting.service';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { StudentService } from '../../../Services/student.service';
import { CourseService } from '../../../Services/course.service';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { PaymentService } from '../../../Services/payment.service';
// import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
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

 
  public lineChartType: ChartType = 'line';
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Revenue',
        data: [],
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointBackgroundColor: '#36A2EB',
        pointBorderColor: '#fff',
        fill: true,
        tension: 0.4
      }
    ]
  };

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    
    this.studentService.students$.subscribe((allStudents) => {
      // console.log(allStudents);
      this.totalStudents = allStudents.length; 
      // console.log(this.totalStudents);
      this.studentService.getStudents();
    });
    

    
    this.courseService.courses$.subscribe((courses) => {
      this.totalCourses = courses.length; 
      this.courseService.getAllCourses();
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

    
    this.paymentService.getTotalIncome().subscribe(
      (response: any) => {
        this.totalRevenue = response.totalIncome;
      },
      (error) => {
        console.error('Error fetching total income:', error);
      }
    );

    
    const currentYear = new Date().getFullYear();
    this.paymentService.getAllPayments().subscribe(payments => {
      this.currentYearRevenue = payments.filter(payment => new Date(payment.paymentDate).getFullYear() === currentYear)
                                         .reduce((total, payment) => total + payment.amount, 0);
    });

    
    const currentMonth = new Date().getMonth();
    this.paymentService.getAllPayments().subscribe(payments => {
      this.currentMonthRevenue = payments.filter(payment => new Date(payment.paymentDate).getMonth() === currentMonth)
                                           .reduce((total, payment) => total + payment.amount, 0);
    });

   
    this.enrollmentService.getAllCompleted().subscribe(completed => {
      const totalEnrollments = completed.length + this.readingEnrollments;
      this.totalToComplete = totalEnrollments > 0 ? Math.round((completed.length / totalEnrollments) * 100) : 0;
    });

   
    this.enrollmentService.getAllReading().subscribe(reading => {
      const totalEnrollments = reading.length + this.completedEnrollments;
      this.totalToReading = totalEnrollments > 0 ? Math.round((reading.length / totalEnrollments) * 100) : 0;
    });
    
    
    this.setLineChartData();
  }

  setLineChartData() {
    const currentMonth = new Date().getMonth(); 
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
  
    const labels = [
      months[(currentMonth - 3 + 12) % 12],
      months[(currentMonth - 2 + 12) % 12],
      months[(currentMonth - 1 + 12) % 12],
      months[currentMonth]
    ];
  
    
    const revenueData: number[] = [];
  
   
    this.paymentService.getAllPayments().subscribe(payments => {
     
      labels.forEach((month, index) => {
        const monthIndex = (currentMonth - 3 + index + 12) % 12; 
  
       
        const monthRevenue = payments.filter(payment => {
          const paymentMonth = new Date(payment.paymentDate).getMonth(); 
          return paymentMonth === monthIndex;
        }).reduce((total, payment) => total + payment.amount, 0); 
  
        revenueData.push(monthRevenue); 
      });
  
     
      this.lineChartData = {
        labels: labels,
        datasets: [{
          label: 'Revenue',
          data: revenueData,
          borderColor: '#36A2EB',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          pointBackgroundColor: '#36A2EB',
          pointBorderColor: '#fff',
          fill: true,
          tension: 0.4
        }]
      };
    });
  }
  
}