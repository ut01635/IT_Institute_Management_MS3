import { Component, OnInit } from '@angular/core';
import { GreetingService } from '../../../Services/greeting.service';
import { CourseService } from '../../../Services/course.service';
import { Course, Enrollment } from '../../../Services/Modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent implements OnInit {

  greeting:string = ''
  adminName:string = "User"
  nic:string = ""
  // Reactive form for payment plan
  paymentForm!: FormGroup ;
  selectedCourse!: Course;
  
  constructor(
    private greetinService : GreetingService, 
    private courseService:CourseService, 
    private enrollmentService:EnrollmentService,
    private fb: FormBuilder,
    private modalService: NgbModal){}


  ngOnInit(): void {
    this.greetinService.setGreeting(this.adminName).subscribe((data) => {
      this.greeting = data;
    });

    this.loadCourses()

    this.nic = localStorage.getItem('NIC') || '';
    this.paymentForm = this.fb.group({
      paymentPlan: ['', Validators.required]
    });
  }
  // Array of course objects to be rendered dynamically
  courses:Course[] = [];

  loadCourses(): void {
    this.courseService.courses$.subscribe((courses) => {
      this.courses = courses;
    });
    this.courseService.getAllCourses();
  }
   
 
   
 
  
  //  Submit Payment Plan
   submitPaymentPlan(Id : string): void {
         const enrolmentData={
            paymentPlan : this.paymentForm.get('paymentPlan')?.value,
            studentNic : this.nic,
            courseId : Id
          }
     if (this.paymentForm.valid) {
      this.enrollmentService.createEnrollment(enrolmentData).subscribe(data=>{
        this.paymentForm.reset();
        alert("You have sucessfully enroll")
        this.modalService.dismissAll();
      },error=>{
        this.modalService.dismissAll();
        alert(error.error)
      })
       
     }
   }
}
