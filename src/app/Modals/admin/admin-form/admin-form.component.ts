import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../../Services/admin.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css'
})
export class AdminFormComponent {

  adminForm: FormGroup;
  imageFile: File | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private adminService: AdminService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.adminForm = this.fb.group({
      nic: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{9}[vxzVXZ]$|^\d{12}$/),
      ]),
      name: new FormControl('', [Validators.required]),
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
      image: new FormControl(null)

    });
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  onSubmit(): void {
    if (this.adminForm.valid) {
      const formData = new FormData();
      Object.keys(this.adminForm.value).forEach(key => {
        formData.append(key, this.adminForm.value[key]);
      });
      
      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile.name);
      }

      this.adminService.addAdmin(formData).subscribe(
        response => {
          alert('Admin added successfully!');
          this.adminService.refreshAdminList(); 
          this.activeModal.close();
        },
        error => {
          console.error('Error adding admin:', error);
        }
      );
    }
  }

}
