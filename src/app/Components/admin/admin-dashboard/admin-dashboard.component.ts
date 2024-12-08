import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GreetingService } from '../../../Services/greeting.service';
import { StudentService } from '../../../Services/student.service';
import { CourseService } from '../../../Services/course.service';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { PaymentService } from '../../../Services/payment.service';
import { AdminService } from '../../../Services/admin.service';
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

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private paymentService: PaymentService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadAdminName();
    this.loadDashboardData();

    
    setTimeout(() => {
      this.completedEnrollment = 20;  // Example: Update progress to 80%
    }, 2000);
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

  setLineChartData(): void {
    // const currentMonth = new Date().getMonth();
    // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // const labels = [
    //   months[(currentMonth - 3 + 12) % 12],
    //   months[(currentMonth - 2 + 12) % 12],
    //   months[(currentMonth - 1 + 12) % 12],
    //   months[currentMonth]
    // ];

    // const revenueData: number[] = [];

    // this.paymentService.getAllPayments().subscribe(payments => {
    //   labels.forEach((month, index) => {
    //     const monthIndex = (currentMonth - 3 + index + 12) % 12;

    //     const monthRevenue = payments.filter(payment => {
    //       const paymentMonth = new Date(payment.paymentDate).getMonth();
    //       return paymentMonth === monthIndex;
    //     }).reduce((total, payment) => total + payment.amount, 0);

    //     revenueData.push(monthRevenue);
    //   });

    //   this.lineChartData = {
    //     labels: labels,
    //     datasets: [{
    //       label: 'Revenue',
    //       data: revenueData,
    //       borderColor: '#36A2EB',
    //       backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //       pointBackgroundColor: '#36A2EB',
    //       pointBorderColor: '#fff',
    //       fill: true,
    //       tension: 0.4
    //     }]
    //   };
    // });
  }
  
  // circleDashArray(percentage: number): string {
  //   const radius = 50;
  //   const circumference = 2 * Math.PI * radius;  // Circumference of the circle
  //   const dashArray = (percentage / 100) * circumference;  // Calculate stroke-dasharray
  //   return `${dashArray} ${circumference}`;  // The second value is the remaining length
  // }






  ///////////////////////////GRAPH CODES//////////////////////////////
   // Monthly revenue data for the current year
   monthlyRevenue = [
    { name: 'January', value: 5000 },
    { name: 'February', value: 7000 },
    { name: 'March', value: 6500 },
    { name: 'April', value: 8000 },
    { name: 'May', value: 9500 },
    { name: 'June', value: 10000 },
    { name: 'July', value: 8500 },
    { name: 'August', value: 9000 },
    { name: 'September', value: 7500 },
    { name: 'October', value: 11000 },
    { name: 'November', value: 12000 },
    { name: 'December', value: 13000 }
  ];

  // Chart settings
  view: [number, number] = [700, 400];  // Chart size (width, height)
  showXAxis: boolean = true;  // Show X-axis
  showYAxis: boolean = true;  // Show Y-axis
  showGridLines: boolean = true;  // Show grid lines
  showLabels: boolean = true;  // Show data labels

  // Color scheme for the line chart
  colorScheme: string = 'cool';  // Using a predefined color scheme

  currentYear(): number {
    return new Date().getFullYear();
  }


  ////////////////////////////////////PROGRESS BAR///////////////////////////////////////////
  // Enrollment data
  completedEnrollment: number = 20;  // Percentage of completed enrollment
  totalEnrollment: number = 100;     // Total enrollment (100%)


  // Function to calculate the stroke-dasharray for the circle's progress
  getStrokeDasharray(): string {
    const radius = 50; // Circle radius
    const circumference = 2 * Math.PI * radius;
    const progress = (this.completedEnrollment / this.totalEnrollment) * circumference;
    return `${progress} ${circumference}`;
  }

  getStrokeColor(): string {
    if (this.completedEnrollment < 50) {
      return 'red';  // Red for low progress
    } else if (this.completedEnrollment < 80) {
      return 'orange';  // Orange for medium progress
    }
    return '#4caf50';  // Green for high progress
  }
  
}