import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enrollment-report',
  templateUrl: './enrollment-report.component.html',
  styleUrl: './enrollment-report.component.css'
})
export class EnrollmentReportComponent  implements OnInit {

  enrollments: any[] = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', enrollmentDate: new Date(), status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', enrollmentDate: new Date(), status: 'Inactive' },
    { id: 3, name: 'Sarah Lee', email: 'sarahlee@example.com', enrollmentDate: new Date(), status: 'Active' },
    // Add more sample data
  ];

  constructor() { }

  ngOnInit(): void {
  }

  previousPage(): void {
    console.log('Previous page clicked');
    // Add logic for pagination
  }

  nextPage(): void {
    console.log('Next page clicked');
    // Add logic for pagination
  }
}