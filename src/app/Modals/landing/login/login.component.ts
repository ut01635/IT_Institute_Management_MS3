import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../../Services/Modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   // Declare the model to bind the form inputs
   login = {
    nic: '',          // NIC input field
    password: '',     // Password input field
    rememberMe: false // Remember me checkbox (optional)
  };

  ngOnInit(): void {
    // You can initialize any values here, for example:
    // this.login.nic = 'initial NIC value'; 
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

