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

  constructor(private enrollmentService: EnrollmentService) { }

  ngOnInit(): void {
    this.enrollmentService.getallEnrollement().subscribe(data => {
      this.enrollments = data
    }, erorr => {
      console.log(erorr.erorr);

    });
  }
  handleViewCourse(course: any) {
    console.log('Viewing course:', course.title);
  }

  handleFollowCourse(course: any) {
    console.log('Following course:', course.title);
  }

  // Calculate progress based on enrollment date and course duration
  calculateProgress(enrollmentDate: Date, duration: number): number {
    const enrollmentStart = new Date(enrollmentDate);
    const now = new Date();
    const totalDays = duration * 30; // Approximate total days for course duration
    const elapsedDays = Math.min(
      Math.max(0, (now.getTime() - enrollmentStart.getTime()) / (1000 * 60 * 60 * 24)),
      totalDays
    );
    return Math.round((elapsedDays / totalDays) * 100);
  }

  // Determine if the "Unfollow" button should be hidden based on enrollment date
  shouldShowUnfollow(enrollmentDate: Date): boolean {
    const threeDaysAfter = new Date(enrollmentDate);
    threeDaysAfter.setDate(threeDaysAfter.getDate() + 3); // Add 3 days to the enrollment date
    return new Date() <= threeDaysAfter;
  }
}
