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
  selectedCourse: Course | null = null;

  constructor(
    private courseService: CourseService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.courses$.subscribe((courses) => {
      this.courses = courses;
    });
    this.courseService.getAllCourses();
  }


  
  onEdit(courseId: string): void {
    const courseToEdit = this.courses.find(course => course.id === courseId);
    if (courseToEdit) {
      const modalRef = this.modalService.open(CourseFormComponent, {
        size: 'lg'
      });
      modalRef.componentInstance.courseToEdit = courseToEdit; 
    }
  }
  

  onDelete(courseId: string) {
    
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    
    if (confirmDelete) {
      
      this.courseService.deleteCourse(courseId).subscribe(
        (response) => {
          console.log("Course deleted successfully", response);
          alert("Course deleted successfully");
       
          this.courseService.getAllCourses();  
        },
        (error) => {
          console.error("Error deleting course", error);
          alert("An error occurred while deleting the course.");
        }
      );
    }
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
