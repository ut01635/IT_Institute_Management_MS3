import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { StudentService } from '../../Services/student.service';
import { Student } from '../../Services/Modal';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.css'
})
export class StudentPageComponent implements OnInit {
  baseUrl: string = 'https://localhost:7055';
  activeTab: string = 'home';
  nic:string=''
  student: Student | undefined;

  constructor(
    private router: Router,
    private authservice: AuthService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.nic = localStorage.getItem('NIC') || '';
    this.studentService.getStudentByNIC(this.nic).subscribe(data => {
      this.student = data;
      // const StudentName: string = this.student.firstName + " " + this.student.lastName;
    }, error => {
      console.log(error);  // Fix error logging
    });
  }


  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  logout() {
    this.authservice.logout()
  }

}
