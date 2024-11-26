import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../../../Services/student.service';
import { HttpClient } from '@angular/common/http';
import { StudentListComponent } from '../../../Components/admin/student-list/student-list.component';
import { Router } from '@angular/router';
import { Student } from '../../../Services/Modal';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {
  @Input() isEditMode: boolean = false;
  @Input() studentData: Student | null = null;
  studentForm: FormGroup;
  imageFile: File | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private studentService: StudentService
  ) {
    // Initialize form with validation rules
    this.studentForm = new FormGroup({
      NIC: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{9}[vxzVXZ]$|^\d{12}$/),
      ]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^\+?(\d{1,4})?[\s\-]?\(?\d{1,4}?\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}[\s\-]?\d{1,4}$/
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/
        ),
      ]),
      image: new FormControl(null),
      address: new FormGroup({
        addressLine1: new FormControl('', [Validators.required]),
        addressLine2: new FormControl(''),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        postalCode: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{5}(-\d{4})?$/),
        ]),
        country: new FormControl('', [Validators.required]),
      }),
    });

    // If it's an edit mode, patch the form with existing student data
    if (this.isEditMode && this.studentData) {
      console.log(this.studentData.nic);
      this.studentForm.patchValue({
        NIC: this.studentData.nic,
        firstName: this.studentData.firstName,
        lastName: this.studentData.lastName,
        email: this.studentData.email,
        phone: this.studentData.phone,
        password: '', // Ideally, password should be left empty when editing, or handled in another way.
        address: {
          addressLine1: this.studentData.address?.addressLine1 || '',
          addressLine2: this.studentData.address?.addressLine2 || '',
          city: this.studentData.address?.city || '',
          state: this.studentData.address?.state || '',
          postalCode: this.studentData.address?.postalCode || '',
          country: this.studentData.address?.country || '',
        }
      });
    }
  }

  // Handle image file change
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  // Submit form data
  onSubmit(): void {
    if (this.studentForm.valid) {
      const formData = new FormData();

      // Append form controls' values
      Object.keys(this.studentForm.value).forEach(key => {
        if (key !== 'image' && this.studentForm.value[key]) {
          if (key === 'address') {
            const address = this.studentForm.get('address')?.value;
            Object.keys(address).forEach(addressKey => {
              formData.append(`address.${addressKey}`, address[addressKey]);
            });
          } else {
            formData.append(key, this.studentForm.value[key]);
          }
        }
      });

      // Append the image file
      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile.name);
      }

      // Add or update student based on the mode
      if (this.isEditMode && this.studentData) {
        this.studentService.updateStudent(this.studentData.nic, formData).subscribe(
          (response) => {
            alert('Student updated successfully!');
            this.activeModal.close('Updated');
          },
          (error) => {
            console.error('Error updating student:', error);
            alert('An error occurred while updating the student.');
          }
        );
      } else {
        this.studentService.addStudent(formData).subscribe(
          (response) => {
            alert('Student added successfully!');
            this.activeModal.close('Added');
          },
          (error) => {
            console.error('Error adding student:', error);
            alert('An error occurred while adding the student.');
          }
        );
      }
    } else {
      alert('Please fill in all the required fields correctly.');
    }
  }

  // Utility method to check for field validity
  get f() {
    return this.studentForm.controls;
  }

  // Check if a field has error after being touched
  isFieldInvalid(fieldName: string): boolean {
    const field = this.f[fieldName];
    return field?.invalid && (field?.touched || field?.dirty);
  }


}
