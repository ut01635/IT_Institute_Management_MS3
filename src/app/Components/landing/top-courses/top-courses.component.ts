import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../Services/course.service';
import { Course } from '../../../Services/Modal';

@Component({
  selector: 'app-top-courses',
  templateUrl: './top-courses.component.html',
  styleUrl: './top-courses.component.css'
})
export class TopCoursesComponent implements OnInit {
  course:Course[]=[];

constructor(private courseService:CourseService)
{

}
  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(data=>{
      console.log(data);
      
      this.course = data
    })

    console.log(this.course);
  }


  
  
}
