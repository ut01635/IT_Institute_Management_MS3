import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../Services/Modal';

@Pipe({
  name: 'courseSearch'
})
export class CourseSearchPipe implements PipeTransform {

 
  transform(courses: Course[], searchText: string): Course[] {
    if (!courses || !searchText) {
      return courses;  
    }

    searchText = searchText.toLowerCase();  

    return courses.filter(course =>
      course.courseName.toLowerCase().includes(searchText) 
    );
  }

}
