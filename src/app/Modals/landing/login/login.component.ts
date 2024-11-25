import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../../Services/Modal';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login: LoginRequest;

  constructor(private router: Router, private loginService: AuthService) {
    this.login = { nic: '', password: '' };
  }

  // This method will handle form submission
  onSubmit(): void {
    if (this.login.nic && this.login.password) {
      // Perform login logic here, e.g., call API to authenticate
      console.log('Form Submitted:', this.login);
    } else {
      console.log('Form is invalid');
    }
  }
}

