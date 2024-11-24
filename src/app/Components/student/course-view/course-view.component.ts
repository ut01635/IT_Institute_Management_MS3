import { Component, OnInit } from '@angular/core';
import { GreetingService } from '../../../Services/greeting.service';
import { CourseService } from '../../../Services/course.service';
import { Course } from '../../../Services/Modal';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent implements OnInit {

  greeting:string = ''
  adminName:string = "User"
  constructor(private greetinService : GreetingService, private courseService:CourseService){}


  ngOnInit(): void {
    this.greetinService.setGreeting(this.adminName).subscribe((data) => {
      this.greeting = data;
    });

    this.courseService.getAllCourses().subscribe(data=>{
      this.courses = data
    })
  }
  // Array of course objects to be rendered dynamically
  courses:Course[] = [
    // {
    //   title: 'HTML',
    //   subtitle: 'Basic HTML5',
    //   level: 'Beginner',
    //   duration: '3 months',
    //   description: 'This Intermediate-level HTML course at DevHub Institute is designed for individuals new to web development.',
    //   price: 'LKR 15000.00',
    //   imageUrl: '/html.jpg',
    //   border: false
    // },
    // {
    //   title: 'CSS',
    //   subtitle: 'Advanced CSS',
    //   level: 'Intermediate',
    //   duration: '4 months',
    //   description: 'This course is designed for those who already have a basic understanding of CSS and want to enhance their skills.',
    //   price: 'LKR 20000.00',
    //   imageUrl: '/html.jpg',
    //   border: true
    // },
    // {
    //   title: 'JavaScript',
    //   subtitle: 'JavaScript for Beginners',
    //   level: 'Beginner',
    //   duration: '2 months',
    //   description: 'Learn JavaScript from scratch and build interactive web applications.',
    //   price: 'LKR 18000.00',
    //   imageUrl: '/html.jpg',
    //   border: false
    // }
    // Add more courses as needed
  ];

  handleProfile(course: any) {
    // Handle profile view action here
    console.log('Viewing profile for: ', course.title);
  }

  handleFollow(course: any) {
    // Handle follow action here
    console.log('Following course: ', course.title);
  }
}
