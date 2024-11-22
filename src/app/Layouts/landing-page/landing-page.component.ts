import { Component, OnInit } from '@angular/core';
import { Course } from '../../Services/Modal';
import { CourseService } from '../../Services/course.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  email: string = 'devhubinstitute@gmail.com';
  courses: Course[] = [];

  contactForm: FormGroup;

  constructor(private courseService: CourseService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
      // Handle form submission logic
    } else {
      console.log('Form is invalid');
    }
  }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        alert('Course fetch failed');
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

