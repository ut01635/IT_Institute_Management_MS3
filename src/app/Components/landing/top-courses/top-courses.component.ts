import { Component } from '@angular/core';
import { CourseService } from '../../../Services/course.service';

@Component({
  selector: 'app-top-courses',
  templateUrl: './top-courses.component.html',
  styleUrl: './top-courses.component.css'
})
export class TopCoursesComponent {
  course:any[]=[];
constructor(private courseService:CourseService)
{

}
ngOnInIt():void{
  this.courseService.getAllCourses().subscribe(data=>{
    this.course=data
  })
}
}
