import { Component, OnInit } from '@angular/core';
import { Course } from '../../../Services/Modal';
import { CourseService } from '../../../Services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  searchText: string = '';
  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
    });
  }

  onEdit(courseId: string) {
    console.log("Edit course with ID: ", courseId);
  }

  onDelete(courseId: string) {
    console.log("Delete course with ID: ", courseId);
  }

}
