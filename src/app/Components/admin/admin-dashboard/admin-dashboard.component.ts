import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GreetingService } from '../../../Services/greeting.service';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
// import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
// Dashboard data
totalStudents = 100;
totalCourses = 10;
totalEnrollments = 50;
completedEnrollments = 30;
readingEnrollments = 20;
totalRevenue = 10000;
currentYearRevenue = 5000;
currentMonthRevenue = 1000;

 // Pie Chart Configuration
  // Data for circular progress bars
  totalToComplete: number = 60; // Percentage
  totalToReading: number = 40; // Percentage

// Line Graph Configuration
public lineChartType: ChartType = 'line';
public lineChartData: ChartConfiguration<'line'>['data'] = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'Revenue',
      data: [4000, 2500, 5000, 3000],
      borderColor: '#36A2EB',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      pointBackgroundColor: '#36A2EB',
      pointBorderColor: '#fff',
      fill: true,
      tension: 0.4 // For smoother curves
    }
  ]
};
  ngOnInit(): void {}
}