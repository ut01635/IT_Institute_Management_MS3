import { Component, OnInit } from '@angular/core';
import { Student, StudentProfileDto } from '../../../Services/Modal';
import { StudentService } from '../../../Services/student.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  studentProfile!: StudentProfileDto;

  constructor(private studentService: StudentService, private authservice:AuthService) {}

  ngOnInit(): void {
    const nic = localStorage.getItem('NIC')|| ''
    this.studentService.getStudentProfile(nic).subscribe(
      (data) => {
        this.studentProfile = data;
        console.log(this.studentProfile);
      },
      (error) => {
        console.error('Error fetching student profile', error);
      }
    );
  }

  handleLogout() {
    this.authservice.logout()
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
