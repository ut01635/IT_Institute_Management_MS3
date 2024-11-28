import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { Course, Enrollment } from '../../../Services/Modal';

@Component({
  selector: 'app-enroll-courses',
  templateUrl: './enroll-courses.component.html',
  styleUrl: './enroll-courses.component.css'
})
export class EnrollCoursesComponent implements OnInit {
  enrollments:Enrollment[] = [];

  constructor(private enrollmentService:EnrollmentService){}

  ngOnInit(): void {
    this.enrollmentService.getallEnrollement().subscribe(data=>{
      this.enrollments = data
    }, erorr=>{
      console.log(erorr.erorr);
      
    });
  }
  handleViewCourse(course: any) {
    console.log('Viewing course:', course.title);
  }

  handleFollowCourse(course: any) {
    console.log('Following course:', course.title);
  }
}
