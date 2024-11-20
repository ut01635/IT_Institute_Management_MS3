import { Component, OnInit } from '@angular/core';
import { Course } from '../../Services/Modal';
import { CourseService } from '../../Services/course.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  email: string = 'devhubinstitute@gmail.com';
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        alert('Course fetch failed');
      }
    );
  }

  // Method to chunk the courses into groups of 3
  chunkCourses(): Course[][] {
    const chunkSize = 3;
    const chunks: Course[][] = [];
    for (let i = 0; i < this.courses.length; i += chunkSize) {
      chunks.push(this.courses.slice(i, i + chunkSize));
    }
    return chunks;
  }
}

