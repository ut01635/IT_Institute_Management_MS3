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
 public pieChartType: ChartType = 'pie';
 public pieChartData: ChartConfiguration<'pie'>['data'] = {
   labels: ['Completed', 'Reading'],
   datasets: [
     {
       data: [30, 20],
       backgroundColor: ['#36A2EB', '#FF6384']
     }
   ]
 };

 // Bar Chart Configuration
 public barChartType: ChartType = 'bar';
 public barChartData: ChartConfiguration<'bar'>['data'] = {
   labels: ['January', 'February', 'March', 'April'],
   datasets: [
     {
       label: 'Revenue',
       data: [3000, 4000, 5000, 6000],
       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
     }
   ]
 };
  ngOnInit(): void {}
}