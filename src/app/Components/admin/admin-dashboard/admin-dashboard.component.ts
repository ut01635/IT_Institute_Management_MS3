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
  adminName: string = "Safeek";

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

}