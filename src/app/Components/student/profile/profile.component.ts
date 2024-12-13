import { Component, OnInit } from '@angular/core';
import { Enrollment, Student, StudentProfileDto } from '../../../Services/Modal';
import { StudentService } from '../../../Services/student.service';
import { AuthService } from '../../../Services/auth.service';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentMessageFormComponent } from '../../../Modals/student/student-message-form/student-message-form.component';
import { PasswordRestFormComponent } from '../../../Modals/student/password-rest-form/password-rest-form.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SocialMediaFormComponent } from '../../../Modals/student/social-media-form/social-media-form.component';
import { StudentUpdateFormComponent } from '../../../Modals/student/student-update-form/student-update-form.component';
import { ProfileUpdateFormComponent } from '../../../Modals/student/profile-update-form/profile-update-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  whatasppBaseURl:string = 'https://wa.me/'
  studentProfile!: StudentProfileDto;
  completeEnrollment:Enrollment[]=[];
  ReadingEnrollolment:Enrollment[]=[];

  constructor(
    private studentService: StudentService,
    private authservice:AuthService,
    private enrollmentService:EnrollmentService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    
    const nic = localStorage.getItem('NIC') || '';
  
   
    this.loadStudentProfile(nic);
  
   
    this.loadCompletedEnrollments(nic);
  
   
    this.loadReadingEnrollments(nic);
  }
  
 
  loadStudentProfile(nic: string): void {
    if (nic) {
      this.studentService.getStudentProfile(nic).subscribe(
        (data) => {
          this.studentProfile = data;
          console.log('Student profile loaded successfully', this.studentProfile);
        },
        (error) => {
          console.error('Error fetching student profile', error);
        }
      );
    } else {
      console.error('No NIC found in localStorage');
    }
  }
  
 
  loadCompletedEnrollments(nic: string): void {
    if (nic) {
      this.enrollmentService.getCompletedEnrollments(nic).subscribe(
        (data) => {
          this.completeEnrollment = data;
          console.log('Completed enrollments loaded successfully', this.completeEnrollment);
        },
        (error) => {
          console.error('Error fetching completed enrollments', error);
        }
      );
    }
  }
  
  
  loadReadingEnrollments(nic: string): void {
    if (nic) {
      this.enrollmentService.getReadingEnrollments(nic).subscribe(
        (data) => {
          this.ReadingEnrollolment = data;
          console.log('Reading enrollments loaded successfully', this.ReadingEnrollolment);
        },
        (error) => {
          console.error('Error fetching reading enrollments', error);
        }
      );
    }
  }
  
  handleLogout() {
    this.authservice.logout()
    console.log('User logged out');
  }

  openHelpModal(): void {
    const modalRef = this.modalService.open(StudentMessageFormComponent); 
  }

  openResetPasswordModal():void{
    const modalRef = this.modalService.open(PasswordRestFormComponent); 
  }

  openSocialMediaUpdateModal(id:string,studentNIC: string):void {
    const modalRef = this.modalService.open(SocialMediaFormComponent, {
      
    });
    modalRef.componentInstance.studentNIC = studentNIC;
    modalRef.componentInstance.id = id
  }
  
  openStudentUpdateModal(nic: string): void {
    const modalRef = this.modalService.open(StudentUpdateFormComponent);
    modalRef.componentInstance.nic = nic; // Passing NIC to the modal
  }


 
 // Function to calculate the width of the progress bar (in percentage)
getProgressBarWidth(enrollmentDate: Date, durationInMonths: number): string {
  const currentDate = new Date();
  
  // Calculate the number of milliseconds for the current time and the enrollment date
  const elapsedTime = currentDate.getTime() - new Date(enrollmentDate).getTime();

  // Convert duration in months to milliseconds (assuming 30 days per month)
  const totalDuration = durationInMonths * 30 * 24 * 60 * 60 * 1000;

  // Calculate the progress as a percentage of total duration
  const progress = (elapsedTime / totalDuration) * 100;

  // Return the width of the progress bar, ensuring it does not exceed 100%
  return `${Math.min(progress, 100)}%`;
}

// Function to calculate the percentage for aria-valuenow (used for accessibility)
getProgressBarPercentage(enrollmentDate: Date, durationInMonths: number): number {
  const currentDate = new Date();
  
  // Calculate the number of milliseconds for the current time and the enrollment date
  const elapsedTime = currentDate.getTime() - new Date(enrollmentDate).getTime();

  // Convert duration in months to milliseconds (assuming 30 days per month)
  const totalDuration = durationInMonths * 30 * 24 * 60 * 60 * 1000;

  // Calculate the percentage of the elapsed time compared to the total duration
  const percentage = (elapsedTime / totalDuration) * 100;

  // Return the percentage, ensuring it does not exceed 100%
  return Math.min(percentage, 100);
}

  


  editProfileImage() {
    const modalRef = this.modalService.open(ProfileUpdateFormComponent, { centered: true });
    modalRef.componentInstance.nic = this.studentProfile.nic;
    modalRef.componentInstance.imageUpdated.subscribe((newImagePath: string) => {
     
      this.studentProfile.imagePath = newImagePath;
      this.loadStudentProfile(this.studentProfile.nic);
    });
  }
}
