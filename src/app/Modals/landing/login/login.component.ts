import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;  // Declare form group for login

  constructor(private fb: FormBuilder) {
    // Initialize form with form controls and validation
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email field with validation
      password: ['', [Validators.required, Validators.minLength(6)]]  // Password field with validation
    });
  }

  // Submit handler
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);  // Here you can handle form submission
    } else {
      console.log('Form is invalid');
    }
  }

}
