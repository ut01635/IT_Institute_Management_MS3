import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest, userDetails } from '../../../Services/Modal';
import { AuthService } from '../../../Services/auth.service';

import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login: LoginRequest;
  message : string = ''

  constructor(private router: Router, private loginService: AuthService) {
    this.login = { nic: '', password: '' };
  }

  // This method will handle form submission
  onSubmit(): void {
    if (this.login.nic && this.login.password) {
      // Call the login service method
      this.loginService.login(this.login).subscribe(
        (response: string) => {
          // Store the token in localStorage
          localStorage.setItem('Token', response);

          // Decode the JWT token to get user details (including the Role)
          const userDetails: userDetails = jwtDecode(response);

          localStorage.setItem('Role',userDetails.Role );
          localStorage.setItem('NIC',userDetails.nic );
          // Check the Role value directly and navigate accordingly
          if (userDetails.Role === 'Admin') {
            // Navigate to Admin Dashboard
            this.router.navigate(['/admin']);
          } else if (userDetails.Role === 'Student') {
            // Navigate to Student Dashboard
            this.router.navigate(['/student']);
          } else if (userDetails.Role === 'MasterAdmin') {
            // Navigate to MasterAdmin Dashboard
            this.router.navigate(['/admin']);
          } else {
            // Handle unexpected role
            console.error('Unrecognized role');
            alert('Role is unrecognized or missing.');
          }
        },
        (error) => {
          console.error('Login failed:', error);
          // alert(error.error);
          this.message = error.error

          setTimeout(() => {
            this.message = '';
          }, 4000);
        }
      );
    } else {
      console.log('Form is invalid');
      alert('Please enter both NIC and password.');
    }
  }
}

