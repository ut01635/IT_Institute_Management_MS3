import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GreetingService } from '../../../Services/greeting.service';
// import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  greeting: string = '';
  adminName: string = "User";

  constructor(private greetinService: GreetingService) { }

  ngOnInit(): void {
    this.greetinService.setGreeting(this.adminName).subscribe((data) => {
      this.greeting = data;
    });
  }

  // Implement AfterViewInit lifecycle hook
  ngAfterViewInit(): void {
    // Render charts only after the view is initialized
    // this.renderIncomeChart();
    // this.renderEnrollmentChart();
  }

  ////////////////////////////////////////////
  // Dashboard Data
  totalStudents: number = 120; // Replace with dynamic data
  totalEnrollments: number = 80;
  totalCourses: number = 15;
  totalIncome: number = 50000; // Replace with backend value
  runningEnrollments: number = 50;
  completedEnrollments: number = 30;
  successfulStudents: number = 70;

  // Current Month Data
  currentMonth: string = new Date().toLocaleString('default', { month: 'long' });
  currentIncome: number = 12000; // Replace with backend logic for current month


  // renderIncomeChart() {
  //   new Chart('incomeChart', {
  //     type: 'bar',
  //     data: {
  //       labels: [this.currentMonth],
  //       datasets: [
  //         {
  //           label: 'Income (in USD)',
  //           data: [this.currentIncome],
  //           backgroundColor: ['rgba(0, 123, 255, 0.8)'],
  //           borderColor: ['rgba(0, 123, 255, 1)'],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: { display: true, position: 'top' },
  //       },
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //           title: { display: true, text: 'Income (USD)' },
  //         },
  //       },
  //     },
  //   });
  // }

  // renderEnrollmentChart() {
  //   new Chart('enrollmentChart', {
  //     type: 'doughnut',
  //     data: {
  //       labels: ['Running', 'Completed'],
  //       datasets: [
  //         {
  //           label: 'Enrollments',
  //           data: [this.runningEnrollments, this.completedEnrollments],
  //           backgroundColor: ['#007bff', '#28a745'],
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: { display: true, position: 'top' },
  //       },
  //     },
  //   });
  // }
}
