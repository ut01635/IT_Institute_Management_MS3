import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../../../Services/Modal';
import { CourseService } from '../../../Services/course.service';
import { CourseFormComponent } from '../../../Modals/admin/course-form/course-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  @ViewChild(CourseFormComponent) courseFormComponent!: CourseFormComponent;

  searchText: string = '';
  courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private modalService: NgbModal
  ) { }

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

  // Method to open the modal from this component
  // openModal() {
  //   // Accessing the open method from the course form component
  //   if (this.courseFormComponent) {
  //     this.courseFormComponent.open('content');
  //   }
  // }

  openModal() {
    
    const modalRef = this.modalService.open(CourseFormComponent, {
      size: 'lg'
    });

    
    modalRef.result.then(
      (result: any) => {
        console.log('Modal closed', result);
      },
      (reason: any) => {
        console.log('Modal dismissed', reason);
      }
    );
  }

}
