import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '../../../Services/course.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  imageFiles: File[] = [];  // Array to hold multiple files

  constructor(
    public activeModal: NgbActiveModal,
    private courseService: CourseService,  // Assuming you have a CourseService
    private http: HttpClient
  ) {
    this.courseForm = new FormGroup({
      courseName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      level: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),  // Duration can be 2 or 6 months
      fees: new FormControl('', [Validators.required, Validators.min(0.01)]),
      images: new FormControl([], [Validators.required]),  // For handling multiple images
      description: new FormControl(''),
    });
  }

  ngOnInit(): void {
    // No further setup is needed as form is already initialized in the constructor
  }

  // Handle image file input change (multiple images)
  onImageChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.imageFiles = Array.from(files);  // Convert FileList to array
      this.courseForm.patchValue({ images: this.imageFiles });
    }
  }

  // Handle form submission
  onSubmit(): void {
    if (this.courseForm.valid) {
      const formData = new FormData();

      // Append all form data, excluding the images for now
      Object.keys(this.courseForm.value).forEach(key => {
        if (key !== 'images' && this.courseForm.value[key]) {
          formData.append(key, this.courseForm.value[key]);
        }
      });

      // Append the image files
      if (this.imageFiles.length > 0) {
        this.imageFiles.forEach(file => {
          formData.append('images', file, file.name);
        });
      }

      // Send the form data to the service for backend processing
      this.courseService.addCourse(formData).subscribe(
        (response) => {
          console.log('Course added successfully', response);
          this.activeModal.close();  // Close the modal after submission
        },
        (error) => {
          console.error('Error adding course', error);
        }
      );
    } else {
      console.log('Form is invalid');
      this.courseForm.markAllAsTouched();  // Mark all fields as touched to trigger validation
    }
  }

  // Getter for form controls in the template
  get f() {
    return this.courseForm.controls;
  }
}
