import { Component, OnInit } from '@angular/core';
import { Course } from '../../Services/Modal';
import { CourseService } from '../../Services/course.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnquiryService } from '../../Services/enquiry.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  email: string = 'devhubinstitute@gmail.com';
  courses: Course[] = [];
  enquiryResults:string = ''
  contactForm: FormGroup;
  errorMessage!: string;

  constructor(
    private courseService: CourseService,
     private fb: FormBuilder,
    private enquiryService : EnquiryService ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    const enquiry = this.contactForm.value;
    if (this.contactForm.valid) {
      this.enquiryService.postEnquiry(enquiry)?.subscribe(
        data => {
          this.enquiryResults = 'Your message was sent successfully';
          console.log('Form Submitted', data);
          
          // Clear the message after 10 seconds
          setTimeout(() => {
            this.enquiryResults = '';
          }, 5000);
        },
        error => {
          this.enquiryResults = 'Your message failed to send';
          
          // Clear the message after 10 seconds
          setTimeout(() => {
            this.enquiryResults = '';
          }, 5000);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  
  ngOnInit(): void {
    this.courseService.getAllCourses();

   
    this.courseService.courses$.subscribe(
      (data: Course[]) => {
        this.courses = data;  
      },
      (error: any) => {
        this.errorMessage = 'Failed to load courses';  
        console.error('Error loading courses:', error);  
      }
    );
  }

  // Method to chunk the courses into groups of 3
  chunkCourses(): Course[][] {
    const chunkSize = 3;
    const chunks: Course[][] = [];
    for (let i = 0; i < this.courses.length; i += chunkSize) {
      chunks.push(this.courses.slice(i, i + chunkSize));
    }
    return chunks;
  }
  
}

