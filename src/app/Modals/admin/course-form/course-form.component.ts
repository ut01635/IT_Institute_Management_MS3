import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;

  levels: string[] = ['Beginner', 'Intermediate'];
  durations: number[] = [2, 6]; // Options for duration in months

  constructor(private fb: FormBuilder, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      courseName: ['', [Validators.required, Validators.maxLength(100)]],
      level: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      fees: ['', [Validators.required, Validators.min(0.01)]],
      images: ['', [Validators.required]],
      description: ['']
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      console.log('Form Submitted:', this.courseForm.value);
      // Send the data to the backend
    } else {
      console.log('Form is invalid');
    }
  }

  get f() { return this.courseForm.controls; }

}
