import { Component } from '@angular/core';
import { Course } from '../../../Services/Modal';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  searchText: string = '';

  courses: Course[] =[];


  onDelete(arg0: any) {
    throw new Error('Method not implemented.');
  }

  
  onEdit(arg0: any) {
    throw new Error('Method not implemented.');
  }


}
