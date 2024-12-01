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

    this.enrollmentService.getCompletedEnrollments(nic).subscribe(data=>{
      this.completeEnrollment = data
    },error=>{
      console.log(error.error);     
    })

    this.enrollmentService.getReadingEnrollments(nic).subscribe(data=>{
      this.ReadingEnrollolment = data
    },error=>{
      console.log(error.error);     
    })

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


  /**
   * Get the progress bar width based on enrollment date and course duration.
   */
  getProgressBarWidth(enrollmentDate: Date, duration: number): string {
    const today = new Date();
    const startDate = new Date(enrollmentDate);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + duration); // Add course duration to the start date

    // Calculate the number of months elapsed from the enrollment date
    const elapsedMonths = this.calculateElapsedMonths(startDate, today);
    const totalDuration = this.calculateElapsedMonths(startDate, endDate);

    // Calculate the percentage of progress
    const percentage = Math.min((elapsedMonths / totalDuration) * 100, 100); // Ensure it does not exceed 100%

    return `${percentage}%`;
  }

  /**
   * Get the percentage of progress from enrollment date to current date.
   */
  getProgressBarPercentage(enrollmentDate: Date, duration: number): number {
    const today = new Date();
    const startDate = new Date(enrollmentDate);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + duration);

    const elapsedMonths = this.calculateElapsedMonths(startDate, today);
    const totalDuration = this.calculateElapsedMonths(startDate, endDate);

    return Math.min((elapsedMonths / totalDuration) * 100, 100); // Ensure it does not exceed 100%
  }

  /**
   * Calculate the number of full months between two dates.
   */
  private calculateElapsedMonths(startDate: Date, endDate: Date): number {
    const months = endDate.getMonth() - startDate.getMonth() + (12 * (endDate.getFullYear() - startDate.getFullYear()));
    return months < 0 ? 0 : months; // Return 0 if the calculated months are negative
  }

}
