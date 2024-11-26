import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../../../Services/enrollment.service';
import { Enrollment } from '../../../../Services/Modal';

@Component({
  selector: 'app-enrollment-report',
  templateUrl: './enrollment-report.component.html',
  styleUrl: './enrollment-report.component.css'
})
export class EnrollmentReportComponent  implements OnInit {
  enrollments: Enrollment[] = []; // Array to hold enrollment data

  constructor(private enrollmentService: EnrollmentService) {}
  
  ngOnInit(): void {
    this.enrollmentService.getallEnrollement().subscribe(
      (data: any[]) => {
        this.enrollments = data; // Assign the fetched data to the array
        console.log('Enrollments fetched successfully:', this.enrollments);
      },
      (error) => {
        console.error('Error fetching enrollments:', error);
      }
    );
  }


}