import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentUpdateRequestDto } from '../../../Services/Modal';
import { StudentService } from '../../../Services/student.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-update-form',
  templateUrl: './student-update-form.component.html',
  styleUrl: './student-update-form.component.css'
})
export class StudentUpdateFormComponent implements OnInit {
  @Input() nic!: string; // Get NIC from the parent component

  studentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^\+?(\d{1,4})?[\s\-]?\(?\d{1,4}?\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}[\s\-]?\d{1,4}$/)
      ]],
      address: this.fb.group({
        addressLine1: ['', [Validators.required]],
        addressLine2: [''],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        postalCode: ['', [
          Validators.required,
          Validators.pattern(/^\d{5}(-\d{4})?$/)
        ]],
        country: ['', [Validators.required]]
      })
    });


    this.studentService.getStudentByNIC(this.nic).subscribe(data=>{
      this.studentForm.patchValue(data)
    })
  }

  // On form submission
  onSubmit(): void {
    if (this.studentForm.valid) {
      const updatedStudentData = this.studentForm.value;
      // Process the updated data, send it to your backend, etc.
      // alert(updatedStudentData)
      this.studentService.updatestudentDetails(this.nic,updatedStudentData).subscribe(data=>{
        alert('Personal details update successfully')
        this.activeModal.close();
      },error=>{
        alert('update failed')
      })
    }
  }
}