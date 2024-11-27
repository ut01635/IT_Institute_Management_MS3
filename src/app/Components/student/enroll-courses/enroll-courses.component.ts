import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { Course } from '../../../Services/Modal';

@Component({
  selector: 'app-enroll-courses',
  templateUrl: './enroll-courses.component.html',
  styleUrl: './enroll-courses.component.css'
})
export class EnrollCoursesComponent implements OnInit {
  courses:Course[] = [];

  constructor(private enrollmentService:EnrollmentService){}

  ngOnInit(): void {
    this.enrollmentService.getallEnrollement();
  }
  handleViewCourse(course: any) {
    console.log('Viewing course:', course.title);
  }

  handleFollowCourse(course: any) {
    console.log('Following course:', course.title);
  }
}
