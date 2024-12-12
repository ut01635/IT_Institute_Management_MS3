import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest, userDetails } from '../../../Services/Modal';
import { AuthService } from '../../../Services/auth.service';

import { jwtDecode } from 'jwt-decode';
import { AuthInterceptor } from '../../../interceptor/auth.interceptor';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  login: LoginRequest;
  message : string = ''
  

  constructor(private router: Router, private loginService: AuthService,private spinner: NgxSpinnerService) {
    this.login = { nic: '', password: '' };
  }

  ngOnInit(): void {
  }

  // This method will handle form submission
  onSubmit(): void {
    if (this.login.nic && this.login.password) {

      this.spinner.show();
      // Call the login service method
      this.loginService.login(this.login).subscribe(
        (response: string) => {
          this.spinner.hide();
          // Store the token in localStorage
          localStorage.setItem('Token', response);
          // this.authInterceptor.alertShown = false;

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
          this.spinner.hide();
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

