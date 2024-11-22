import { Component, OnInit } from '@angular/core';
import { GreetingService } from '../../../Services/greeting.service';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent implements OnInit {

  greeting:string = ''
  adminName:string = "User"
  constructor(private greetinService : GreetingService){}


  ngOnInit(): void {
    this.greetinService.setGreeting(this.adminName).subscribe((data) => {
      this.greeting = data;
    });
  }
 
   handleProfile(): void {
     console.log('Go to view');
   }
 
   handleFollow(): void {
     console.log('Follow');
   }

}
