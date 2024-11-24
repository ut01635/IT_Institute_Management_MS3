import { Component, OnInit } from '@angular/core';
import { GreetingService } from '../../../Services/greeting.service';
import { CourseService } from '../../../Services/course.service';
import { Course } from '../../../Services/Modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent implements OnInit {

  greeting:string = ''
  adminName:string = "User"
  // Reactive form for payment plan
  paymentForm!: FormGroup ;
  selectedCourse: any;
  
  constructor(private greetinService : GreetingService, private courseService:CourseService, private fb: FormBuilder){}


  ngOnInit(): void {
    this.greetinService.setGreeting(this.adminName).subscribe((data) => {
      this.greeting = data;
    });

    this.courseService.getAllCourses().subscribe(data=>{
      this.courses = data
    })

    this.paymentForm = this.fb.group({
      paymentPlan: ['', Validators.required]
    });
  }
  // Array of course objects to be rendered dynamically
  courses:Course[] = [];


   
 
   
 
  
  //  Submit Payment Plan
   submitPaymentPlan(): void {
     if (this.paymentForm.valid) {
       const selectedPlan = this.paymentForm.get('paymentPlan')?.value;
       alert(`You have selected the ${selectedPlan} payment plan for the course ${this.selectedCourse.courseName}`);
       this.paymentForm.reset();
     }
   }
}
