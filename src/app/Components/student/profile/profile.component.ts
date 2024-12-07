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


 
  getProgressBarWidth(enrollmentDate: Date, duration: number): string {
    const today = new Date();
    const startDate = new Date(enrollmentDate);
    
    
    if (duration <= 0) {
      return '0%';  
    }
  
    
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + duration);
  
    
    if (today < startDate) {
      return '0%';
    }
  
    
    const elapsedMonths = this.calculateElapsedMonths(startDate, today);
    const totalDuration = this.calculateElapsedMonths(startDate, endDate);
  
    
    if (elapsedMonths >= totalDuration) {
      return '100%';
    }
  
   
    const percentage = Math.min((elapsedMonths / totalDuration) * 100, 100); 
  
    return `${percentage.toFixed(2)}%`;  
  }
  
  
  calculateElapsedMonths(startDate: Date, endDate: Date): number {
    const yearsDifference = endDate.getFullYear() - startDate.getFullYear();
    const monthsDifference = endDate.getMonth() - startDate.getMonth();
    return yearsDifference * 12 + monthsDifference;
  }
  

 
  getProgressBarPercentage(enrollmentDate: Date, duration: number): number {
    const today = new Date();
    const startDate = new Date(enrollmentDate);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + duration);

    const elapsedMonths = this.calculateElapsedMonths(startDate, today);
    const totalDuration = this.calculateElapsedMonths(startDate, endDate);

    return Math.min((elapsedMonths / totalDuration) * 100, 100); 
  }

  // /**
  //  * Calculate the number of full months between two dates.
  //  */
  // private calculateElapsedMonths(startDate: Date, endDate: Date): number {
  //   const months = endDate.getMonth() - startDate.getMonth() + (12 * (endDate.getFullYear() - startDate.getFullYear()));
  //   return months < 0 ? 0 : months; // Return 0 if the calculated months are negative
  // }


  editProfileImage() {
    const modalRef = this.modalService.open(ProfileUpdateFormComponent, { centered: true });
    modalRef.componentInstance.nic = this.studentProfile.nic;
    modalRef.componentInstance.imageUpdated.subscribe((newImagePath: string) => {
     
      this.studentProfile.imagePath = newImagePath;
      this.loadStudentProfile(this.studentProfile.nic);
    });
  }
}
