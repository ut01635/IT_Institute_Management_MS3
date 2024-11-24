import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../../../Services/student.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {
  studentForm: FormGroup;
  imageFile: File | null = null;

  constructor(public activeModal: NgbActiveModal, private studentService: StudentService, private http: HttpClient) {
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
      addressLine1: new FormControl('', [Validators.required]),
      addressLine2: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{5}(-\d{4})?$/),
      ]),
      country: new FormControl('', [Validators.required]),
    });
  }

  // Method to handle image file upload
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

 onSubmit(): void {
  if (this.studentForm.valid) {
    const formData = new FormData();

    // Append each form field to FormData
    Object.keys(this.studentForm.value).forEach(key => {
      // Exclude the 'image' field because it's handled separately
      if (key !== 'image' && this.studentForm.value[key]) {
        formData.append(key, this.studentForm.value[key]);
      }
    });

    // Append the image if it exists
    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    }

    // Construct the Address object and append it to FormData as JSON
    const address = {
      addressLine1: this.studentForm.get('addressLine1')?.value,
      addressLine2: this.studentForm.get('addressLine2')?.value || '',
      city: this.studentForm.get('city')?.value,
      state: this.studentForm.get('state')?.value,
      postalCode: this.studentForm.get('postalCode')?.value || '',
      country: this.studentForm.get('country')?.value || '',
    };

    // Send the Address as a JSON string
    formData.append('address', JSON.stringify(address));

    // Call the service to add the student
    this.studentService.addStudent(formData).subscribe(
      (response) => {
        console.log('Student added successfully');
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
