import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { Course, Enrollment } from '../../../Services/Modal';

@Component({
  selector: 'app-enroll-courses',
  templateUrl: './enroll-courses.component.html',
  styleUrl: './enroll-courses.component.css'
})
export class EnrollCoursesComponent implements OnInit {
  enrollments: Enrollment[] = [];
  nic: string = '';

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.nic = localStorage.getItem('NIC') || '';
    this.loadEnrollments();
   
  }

  loadEnrollments(): void {
    this.enrollmentService.getReadingEnrollments(this.nic).subscribe(
      data => {
        this.enrollments = data;
      },
      error => {
        console.error('Error loading enrollments:', error);
      }
    );
  }

  // Calculate progress percentage based on enrollment date and course duration
  calculateProgress(enrollmentDate: Date, duration: number): number {
    const enrollmentStart = new Date(enrollmentDate);
    const now = new Date();
    const totalDays = duration * 30; // Approximate total days
    const elapsedDays = Math.min(
      Math.max(0, (now.getTime() - enrollmentStart.getTime()) / (1000 * 60 * 60 * 24)),
      totalDays
    );
    return Math.round((elapsedDays / totalDays) * 100);
  }

  // Calculate course end date
  calculateEndDate(enrollmentDate: Date, duration: number): Date {
    const endDate = new Date(enrollmentDate);
    endDate.setMonth(endDate.getMonth() + duration);
    return endDate;
  }

  // Determine if the "Unfollow" button should be hidden based on enrollment date
  shouldShowUnfollow(enrollmentDate: Date): boolean {
    const threeDaysAfter = new Date(enrollmentDate);
    threeDaysAfter.setDate(threeDaysAfter.getDate() + 3); // Add 3 days to the enrollment date
    return new Date() <= threeDaysAfter;
  } 
  
  confirmDelete(id: string) {
    if (window.confirm('Are you sure you want to Unfollow this Course?')) {
      this.onDelete(id);
    }
  }

  onDelete(id: string) {
    this.enrollmentService.deleteEnrollment(id).subscribe(
      (response) => {
        alert('Course Unfollow successfully');
        this.loadEnrollments();
       
        
      },
      (error) => {
        console.error('Error Unfollow Course:', error);
      }
    );
  }
}

