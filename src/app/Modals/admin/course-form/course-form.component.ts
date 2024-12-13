import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '../../../Services/course.service';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../../Services/Modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {
  @Input() courseToEdit: Course | null = null;
  courseForm: FormGroup;
  imageFiles: File[] = []; 
  courseImagePreviewUrl: string | ArrayBuffer | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private courseService: CourseService,  
    private http: HttpClient,
    private spinner: NgxSpinnerService
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

  showSpinner(name: string) {
    this.spinner.show(name);
  }

  hideSpinner(name: string) {
    this.spinner.hide(name);
  }


  ngOnInit(): void {
    if (this.courseToEdit) {
      this.courseForm.patchValue(this.courseToEdit);
      if (this.courseToEdit.imagePaths) {
        this.courseImagePreviewUrl = 'https://localhost:7055'+this.courseToEdit.imagePaths;
      }
    }
  }
 
  onImageChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.imageFiles = Array.from(files);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.courseImagePreviewUrl = e.target.result;
      };
      reader.readAsDataURL(files[0]);
      this.courseForm.patchValue({ images: this.imageFiles });
    }
  }


  onSubmit(): void {
    if (this.courseForm.valid) {
      const formData = new FormData();
      this.showSpinner('course')

     
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

      if (this.courseToEdit) {
        
        this.courseService.updateCourse(this.courseToEdit.id, formData).subscribe(
          (response) => {
            this.hideSpinner('course')
            alert('Course updated successfully');
            this.courseService.refreshCourseList();
            this.activeModal.close();
            
          },
          (error) => {
            this.hideSpinner('course')
            alert('Error updating course , ' + error.message);
          }
        );
      }
      else{
        this.courseService.addCourse(formData).subscribe(
          (response) => {
            this.hideSpinner('course')
            alert('Course added successfully');
            this.courseService.refreshCourseList();  
            this.activeModal.close(); 
          },
          (error) => {
            this.hideSpinner('course')
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
