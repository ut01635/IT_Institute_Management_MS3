import { Component } from '@angular/core';
import { Student } from '../../../Services/Modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  // For demo purposes, we'll use some static data
  userProfile :Student = {
    firstName: 'John',
    lastName: 'Doe',
    nic: '123456789',
    phone: '+1234567890',
    email: 'john.doe@example.com',
    address:{
      addressLine1: '1234 Elm St',
      addressLine2: 'Apt 101',
      city: 'Springfield',
      state: 'IL',
      postalCode: '62701',
      country: 'USA'
    }
   
  };

  handleLogout() {
    // Add your logout logic here
    console.log('User logged out');
  }

  handleEditInfo() {
    // Handle edit info functionality here
    console.log('Editing personal information');
  }

  handleUpdatePassword() {
    // Handle update password functionality here
    console.log('Updating password');
  }

  handleEditAddress() {
    // Handle edit address functionality here
    console.log('Editing address');
  }

}
