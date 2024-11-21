import { Component, OnInit } from '@angular/core';
import { GreetingService } from '../../../Services/greeting.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
 
  greeting:string = ''
  adminName:string = "User"
  constructor(private greetinService : GreetingService){}


  ngOnInit(): void {
    this.greetinService.setGreeting(this.adminName).subscribe((data) => {
      this.greeting = data;
    });
  }

}
