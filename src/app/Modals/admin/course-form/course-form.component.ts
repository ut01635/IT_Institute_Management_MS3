import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '../../../Services/course.service';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../../Services/Modal';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {
  @Input() course: Course | null = null;
  courseForm: FormGroup;
  imageFiles: File[] = [];  

  constructor(
    public activeModal: NgbActiveModal,
    private courseService: CourseService,  
    private http: HttpClient
  ) {
    this.courseForm = new FormGroup({
      courseName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      level: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),  
      fees: new FormControl('', [Validators.required, Validators.min(0.01)]),
      images: new FormControl([], [Validators.required]),  
      description: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if (this.course) {
      this.courseForm.patchValue(this.course);  // Populate the form for editing
    }
  }
 
  onImageChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.imageFiles = Array.from(files);  
      this.courseForm.patchValue({ images: this.imageFiles });
    }
  }


  onSubmit(): void {
    if (this.courseForm.valid) {
      const formData = new FormData();

     
      Object.keys(this.courseForm.value).forEach(key => {
        if (key !== 'images' && this.courseForm.value[key]) {
          formData.append(key, this.courseForm.value[key]);
        }
      });

     
      if (this.imageFiles.length > 0) {
        this.imageFiles.forEach(file => {
          formData.append('images', file, file.name);
        });
      }

      if (this.course) {
        // Update the existing course
        this.courseService.updateCourse(this.course.id, formData).subscribe(
          (response) => {
            alert('Course updated successfully');
            this.courseService.refreshCourseList();
            this.activeModal.close();
            
          },
          (error) => {
            alert('Error updating course , ' +error);
          }
        );
      }
      else{
        this.courseService.addCourse(formData).subscribe(
          (response) => {
            alert('Course added successfully');
            this.courseService.refreshCourseList();  
            this.activeModal.close(); 
          },
          (error) => {
            alert('Error adding course , '+ error);
          }
        );
      }
      
    
    }  
    
  }

  
  get f() {
    return this.courseForm.controls;
  }
}
