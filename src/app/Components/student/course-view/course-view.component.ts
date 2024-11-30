import { Component, OnInit } from '@angular/core';
import { GreetingService } from '../../../Services/greeting.service';
import { CourseService } from '../../../Services/course.service';
import { Course, Enrollment, Student } from '../../../Services/Modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../../../Services/student.service';

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
  paymentForm!: FormGroup;
  selectedCourse!: Course;
   // Array of course objects to be rendered dynamically
   courses: Course[] = [];

  constructor(
    private greetinService: GreetingService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private studentService: StudentService) { }


    ngOnInit(): void {
      this.nic = localStorage.getItem('NIC') || '';
      
      // Load student first to ensure we can use their information
      this.loadStudent(this.nic);
      
      this.loadCourses();
      
      this.paymentForm = this.fb.group({
        paymentPlan: ['', Validators.required]
      });
    }
    
    loadStudent(nic: string) {
      this.studentService.getStudentByNIC(this.nic).subscribe(data => {
        this.student = data;
        const StudentName: string = this.student.firstName + " " + this.student.lastName;
        this.greetinService.setGreeting(StudentName).subscribe((data) => {
          this.greeting = data;
        });
      }, error => {
        console.log(error);  // Fix error logging
      });
    }
    
    loadCourses(): void {
      this.courseService.courses$.subscribe((courses) => {
        this.courses = courses;
      });
      this.courseService.getAllCourses();
    }
    





  //  Submit Payment Plan
  submitPaymentPlan(Id: string): void {
    const enrolmentData = {
      paymentPlan: this.paymentForm.get('paymentPlan')?.value,
      studentNic: this.nic,
      courseId: Id
    }
    if (this.paymentForm.valid) {
      this.enrollmentService.createEnrollment(enrolmentData).subscribe(data => {
        this.paymentForm.reset();
        alert("You have sucessfully enroll")
        this.modalService.dismissAll();
      }, error => {
        this.modalService.dismissAll();
        alert(error.error)
      })

    }
  }
}
