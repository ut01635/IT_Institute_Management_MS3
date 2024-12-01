import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from './PasswordValidator';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../../../Services/student.service';

@Component({
  selector: 'app-password-rest-form',
  templateUrl: './password-rest-form.component.html',
  styleUrl: './password-rest-form.component.css'
})
export class PasswordRestFormComponent implements OnInit {
  nic: string = ''
  passwordResetForm!: FormGroup;
  message = ''

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private studentService: StudentService) { }

  ngOnInit(): void {
    this.nic = localStorage.getItem('NIC') || ''
    this.passwordResetForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/
          )
        ]
      ],
      confirmNewPassword: ['', [Validators.required, PasswordValidator.match('newPassword')]]
    });
  }

  onSubmit() {
    if (this.passwordResetForm.valid) {
      const formdata = this.passwordResetForm.value

      this.studentService.resetPassword(this.nic,formdata).subscribe(data=>{
        alert('Your password updated')
        this.activeModal.close();
      },error=>{
        alert(error.error)
        this.message=error.error

        setTimeout(() => {
          this.message = '';
        }, 4000);
      })
    }
  }
}
