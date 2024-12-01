import { Component, OnInit } from '@angular/core';
import { GreetingService } from '../../../Services/greeting.service';
import { CourseService } from '../../../Services/course.service';
import { Course, Enrollment, Student } from '../../../Services/Modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../../../Services/student.service';
import { PaymentPlanFormComponent } from '../../../Modals/student/payment-plan-form/payment-plan-form.component';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent implements OnInit {

  greeting: string = ''
  student: Student | undefined;
  nic: string = ""
  // Reactive form for payment plan
  selectedCourse!: Course;
   // Array of course objects to be rendered dynamically
   courses: Course[] = [];

  constructor(
    private greetinService: GreetingService,
    private courseService: CourseService,
    private studentService: StudentService,
    private enrollmentService:EnrollmentService,
    private modalService: NgbModal) { }


    ngOnInit(): void {
      this.nic = localStorage.getItem('NIC') || '';
      
      // Load student first to ensure we can use their information
      this.loadStudent(this.nic);
      
      this.loadCourses();
      
     
    }
    
    loadStudent(nic: string) {
      this.studentService.getStudentByNIC(this.nic).subscribe(data => {
        this.student = data;
        const StudentName: string = this.student.firstName + " " + this.student.lastName;
        this.greetinService.setGreeting(StudentName).subscribe((data) => {
          this.greeting = data;
        });
      }, error => {
        console.log(error); 
      });
    }
    
    loadCourses(): void {
      this.courseService.courses$.subscribe((courses) => {
        this.courses = courses;
      });
      this.courseService.getAllCourses();
    }
    
    openSocialMediaUpdateModal(id:string):void {
      const modalRef = this.modalService.open(PaymentPlanFormComponent);
      modalRef.componentInstance.studentNIC = this.student?.nic;
      modalRef.componentInstance.CourseId = id
    }
}
