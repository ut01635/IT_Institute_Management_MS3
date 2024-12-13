import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../../../Services/student.service';
import { HttpClient } from '@angular/common/http';
import { StudentListComponent } from '../../../Components/admin/student-list/student-list.component';
import { Router } from '@angular/router';
import { Student } from '../../../Services/Modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css',
})
export class StudentFormComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  @Input() studentToEdit: Student | null = null;
  studentForm: FormGroup;
  imageFile: File | null = null;
  imagePreviewUrl: string | ArrayBuffer | null = null;
addIcon:string=`<i class="bi bi-person-plus"></i>`
  constructor(
    public activeModal: NgbActiveModal,
    private studentService: StudentService,
    private spinner: NgxSpinnerService
  ) {
   
    this.studentForm = new FormGroup({
      nic: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{9}[vxzVXZ]$|^\d{12}$/),
      ]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^\+?(\d{1,4})?[\s\-]?\(?\d{1,4}?\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}[\s\-]?\d{1,4}$/
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/),
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

  ngOnInit(): void {
    if (this.studentToEdit) {
      this.studentForm.patchValue(this.studentToEdit);
      if (this.studentToEdit.imagePath) {
        this.imagePreviewUrl = 'https://localhost:7055'+this.studentToEdit.imagePath;
      }
    }
  }

  showSpinner(name: string) {
    this.spinner.show(name);
  }

  hideSpinner(name: string) {
    this.spinner.hide(name);
  }


  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/gif',
        'image/svg+xml',
      ];

     
      if (allowedTypes.includes(file.type)) {
        this.imageFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviewUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file (JPG, JPEG, PNG, GIF, SVG).');
        event.target.value = ''; 
      }
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const formData = new FormData();
      this.showSpinner('student')

      Object.keys(this.studentForm.value).forEach((key) => {
        if (key !== 'image' && this.studentForm.value[key]) {
          if (key === 'address') {
            const address = this.studentForm.get('address')?.value;
            Object.keys(address).forEach((addressKey) => {
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

      if (this.studentToEdit) {
        const oldNic = this.studentToEdit.nic; 
        const newNic = this.studentForm.get('nic')?.value; 
  
        if (oldNic !== newNic){
          alert(`You cannot change the NIC. The original NIC was: ${oldNic}`);
          return;
        }
       
        this.studentService.updateStudent(this.studentToEdit.nic, formData).subscribe(
          response => {
            this.hideSpinner('student')
            alert('Student updated successfully!');
            this.studentService.refreshStudentList();
            this.activeModal.close();
          },
          error => {
            this.hideSpinner('student')
            alert((error.error?.message || error.message));
          }
        );
      } else {
        this.studentService.addStudent(formData).subscribe(
          (response) => {
            this.hideSpinner('student')
            alert('Student added successfully!');
            this.studentService.refreshStudentList();
            this.activeModal.close();
          },
          (error) => {
            this.hideSpinner('student')
            alert((error.error?.message || error.message));
          }
        );
      }
    } else {
      alert('Please fill in all the required fields correctly.');
    }
  }

  get f() {
    return this.studentForm.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.f[fieldName];
    return field?.invalid && (field?.touched || field?.dirty);
  }
}
