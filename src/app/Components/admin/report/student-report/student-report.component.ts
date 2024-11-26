import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrl: './student-report.component.css'
})
export class StudentReportComponent  implements OnInit {

  // Sample student data
  students = [
    { id: 1, name: 'John Doe', enrollmentNumber: 'S12345', course: 'Computer Science', grade: 'A', status: 'Active' },
    { id: 2, name: 'Jane Smith', enrollmentNumber: 'S12346', course: 'Business Administration', grade: 'B', status: 'Inactive' },
    { id: 3, name: 'Sarah Lee', enrollmentNumber: 'S12347', course: 'Mechanical Engineering', grade: 'A', status: 'Active' },
    { id: 4, name: 'James Brown', enrollmentNumber: 'S12348', course: 'Electrical Engineering', grade: 'C', status: 'Active' },
  ];

  constructor() { }

  ngOnInit(): void {
    // Fetch data from API or service if needed
  }

  previousPage(): void {
    console.log('Previous page clicked');
    // Add pagination logic here if needed
  }

  nextPage(): void {
    console.log('Next page clicked');
    // Add pagination logic here if needed
  }
}