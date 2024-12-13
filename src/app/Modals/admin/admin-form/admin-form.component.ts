import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../../Services/admin.service';
import { HttpClient } from '@angular/common/http';
import { admin } from '../../../Services/Modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css'
})
export class AdminFormComponent {
  @Input() adminToEdit: admin | null = null;
  adminForm: FormGroup;
  imageFile: File | null = null;
  adminImagePreviewUrl: string | ArrayBuffer | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private adminService: AdminService,
    private http: HttpClient,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
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

  showSpinner(name: string) {
    this.spinner.show(name);
  }

  hideSpinner(name: string) {
    this.spinner.hide(name);
  }


  ngOnInit(): void {
    
    if (this.adminToEdit) {
      this.adminForm.patchValue(this.adminToEdit);
      if (this.adminToEdit.imagePath) {
        this.adminImagePreviewUrl = 'https://localhost:7055'+this.adminToEdit.imagePath;
      }
    }
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
          this.adminImagePreviewUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file (JPG, JPEG, PNG, GIF, SVG).');
        event.target.value = ''; 
      }
    }
  }

  onSubmit(): void {
    if (this.adminForm.valid) {
      this.showSpinner('admin')
      const formData = new FormData();
      Object.keys(this.adminForm.value).forEach(key => {
        formData.append(key, this.adminForm.value[key]);
      });

      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile.name);
      }

      if (this.adminToEdit) {

        const oldAdminNic = this.adminToEdit.nic; 
        const newAdminNic = this.adminForm.get('nic')?.value; 
  
        if (oldAdminNic !== newAdminNic){
          alert(`You cannot change the NIC. The original NIC was: ${oldAdminNic}`);
          return;
        }
       
        this.adminService.updateAdmin(this.adminToEdit.nic, formData).subscribe(
          response => {
            this.hideSpinner('admin')
            alert('Admin updated successfully!');
            this.adminService.refreshAdminList();
            this.activeModal.close();
          },
          error => {
            this.hideSpinner('admin')
            alert((error.error?.message || error.message));
          }
        );
      } else {
       
        this.adminService.addAdmin(formData).subscribe(
          response => {
            this.hideSpinner('admin')
            alert('Admin added successfully!');
            this.adminService.refreshAdminList();
            this.activeModal.close();
          },
          (error) => {
            this.hideSpinner('admin')
            alert((error.error?.message || error.message));
          }
        );
      }
    }
  }
}


