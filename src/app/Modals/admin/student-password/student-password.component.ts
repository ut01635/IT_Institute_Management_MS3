import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../Services/student.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-student-password',
  templateUrl: './student-password.component.html',
  styleUrl: './student-password.component.css'
})
export class StudentPasswordComponent {
  passwordForm!: FormGroup;
  studentNic: any | undefined; 

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService
  ) {}

  showSpinner(name: string) {
    this.spinner.show(name);
  }

  hideSpinner(name: string) {
    this.spinner.hide(name);
  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ), 
        ],
      ],
    });
  }

 

 
  onSubmit(): void {
    if (this.passwordForm.valid) {
      this.showSpinner('passwordresett');
      const newPassword = this.passwordForm.value.newPassword;
      this.studentService
        .updatePassword(this.studentNic, newPassword)
        .subscribe(
          (response) => {
            this.hideSpinner('passwordresett');
            alert('Password updated successfully!');
            this.activeModal.close();
           
          },
          (error) => {
            this.hideSpinner('passwordresett');
            alert('An error occurred while updating the password.');
            console.error(error);
          }
        );
    }
  }

}
