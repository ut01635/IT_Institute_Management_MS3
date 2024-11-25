import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../../../Services/student.service';
import { HttpClient } from '@angular/common/http';
import { StudentListComponent } from '../../../Components/admin/student-list/student-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {
  studentForm: FormGroup;
  imageFile: File | null = null;

  constructor(public activeModal: NgbActiveModal, private studentService: StudentService, private http: HttpClient, private router: Router) {

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
  }


  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }


  onSubmit(): void {
    if (this.studentForm.valid) {
      const formData = new FormData();
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

      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile.name);
      }

      this.studentService.addStudent(formData).subscribe(
        (response) => {
          alert('Student added successfully');



          this.studentService.refreshStudentList();
          this.activeModal.close();



        },
        (error: any) => {
          console.error('Error adding student', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }


}
