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

  // Circular Progress Bar Data
  totalToComplete: number = 0;
  totalToReading: number = 0;

  // Line Chart Data
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
    // Get total students
    this.studentService.students$.subscribe((allStudents) => {
      console.log(allStudents);
      this.totalStudents = allStudents.length;  // Set total students count
      console.log(this.totalStudents); // Log the number of students
      this.studentService.getStudents();
    });
    

    // Get total courses
    this.courseService.courses$.subscribe((courses) => {
      this.totalCourses = courses.length; // Get the total number of courses
      this.courseService.getAllCourses();
    });

    // Get total enrollments
    this.enrollmentService.getallEnrollement().subscribe(enrollments => {
      this.totalEnrollments = enrollments.length;
    });

    // Get completed enrollments
    this.enrollmentService.getAllCompleted().subscribe(completed => {
      this.completedEnrollments = completed.length;
    });

    // Get reading enrollments
    this.enrollmentService.getAllReading().subscribe(reading => {
      this.readingEnrollments = reading.length;
    });

    // Get total revenue
    this.paymentService.getTotalIncome().subscribe(
      (response: any) => {
        this.totalRevenue = response.totalIncome;
      },
      (error) => {
        console.error('Error fetching total income:', error);
      }
    );

    // Get current year revenue
    const currentYear = new Date().getFullYear();
    this.paymentService.getAllPayments().subscribe(payments => {
      this.currentYearRevenue = payments.filter(payment => new Date(payment.paymentDate).getFullYear() === currentYear)
                                         .reduce((total, payment) => total + payment.amount, 0);
    });

    // Get current month revenue
    const currentMonth = new Date().getMonth();
    this.paymentService.getAllPayments().subscribe(payments => {
      this.currentMonthRevenue = payments.filter(payment => new Date(payment.paymentDate).getMonth() === currentMonth)
                                           .reduce((total, payment) => total + payment.amount, 0);
    });

    // Get total to complete in percentage
    this.enrollmentService.getAllCompleted().subscribe(completed => {
      const totalEnrollments = completed.length + this.readingEnrollments;
      this.totalToComplete = totalEnrollments > 0 ? Math.round((completed.length / totalEnrollments) * 100) : 0;
    });

    // Get total to reading in percentage
    this.enrollmentService.getAllReading().subscribe(reading => {
      const totalEnrollments = reading.length + this.completedEnrollments;
      this.totalToReading = totalEnrollments > 0 ? Math.round((reading.length / totalEnrollments) * 100) : 0;
    });
    
    // Get dynamic line chart data
    this.setLineChartData();
  }

  setLineChartData() {
    const currentMonth = new Date().getMonth(); // Get current month (0-11)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Get last 4 months, including current month
    const labels = [
      months[(currentMonth - 3 + 12) % 12],
      months[(currentMonth - 2 + 12) % 12],
      months[(currentMonth - 1 + 12) % 12],
      months[currentMonth]
    ];
  
    // Prepare an array to hold the revenue data for the last 4 months
    const revenueData: number[] = [];
  
    // Get the total revenue data for these months dynamically
    this.paymentService.getAllPayments().subscribe(payments => {
      // Iterate over the last 4 months and calculate the total revenue for each month
      labels.forEach((month, index) => {
        const monthIndex = (currentMonth - 3 + index + 12) % 12; // Get the month index
  
        // Filter payments for the specific month and calculate the sum
        const monthRevenue = payments.filter(payment => {
          const paymentMonth = new Date(payment.paymentDate).getMonth(); // Get month index from paymentDate
          return paymentMonth === monthIndex;
        }).reduce((total, payment) => total + payment.amount, 0); // Sum the payments for the month
  
        revenueData.push(monthRevenue); // Add the calculated revenue to the data array
      });
  
      // Now set the chart data dynamically
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