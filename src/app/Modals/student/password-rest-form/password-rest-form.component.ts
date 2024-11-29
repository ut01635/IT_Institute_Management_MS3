import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from './PasswordValidator';

@Component({
  selector: 'app-password-rest-form',
  templateUrl: './password-rest-form.component.html',
  styleUrl: './password-rest-form.component.css'
})
export class PasswordRestFormComponent implements OnInit {

  passwordResetForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
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
      const { currentPassword, newPassword } = this.passwordResetForm.value;
      console.log('Password reset data:', { currentPassword, newPassword });
      // Call your service to reset the password here
    }
  }
}
