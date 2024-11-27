import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../../../Services/enrollment.service';
import { Enrollment } from '../../../../Services/Modal';

@Component({
  selector: 'app-enrollment-report',
  templateUrl: './enrollment-report.component.html',
  styleUrl: './enrollment-report.component.css'
})
export class EnrollmentReportComponent implements OnInit {
  enrollments: Enrollment[] = []; // Array to hold enrollment data
  selectedMonth: string = '';
  selectedDateRange: [Date, Date] | null = null;
  selectedCourse: string = '';
  studentSearch: string = "";
  selectedStatus: string = "";
  currentMonth = ""

  filtersVisible = false; // Initially filters are hidden
  totalEnrollments: any;
  currentMonthEnrollments: any;

  // Toggle the visibility of the filters section
  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }


  months = [
    { value: '', name: 'All Months' },
    { value: '1', name: 'January' },
    { value: '2', name: 'February' },
    { value: '3', name: 'March' },
    { value: '4', name: 'April' },
    { value: '5', name: 'May' },
    { value: '6', name: 'June' },
    { value: '7', name: 'July' },
    { value: '8', name: 'August' },
    { value: '9', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
  ];

  courses: { id: string, name: string }[] = [
    { id: '1', name: 'Mathematics' },
    { id: '2', name: 'Physics' },
    { id: '3', name: 'Chemistry' },
    // Add more courses dynamically or fetch from a service
  ];


  constructor(private enrollmentService: EnrollmentService) { }

  ngOnInit(): void {
    this.enrollmentService.getallEnrollement().subscribe(
      (data: any[]) => {
        this.enrollments = data; // Assign the fetched data to the array
        console.log('Enrollments fetched successfully:', this.enrollments);

        this.calculateTotalEnrollments();
        this.calculateCurrentMonthEnrollments();
      },
      (error) => {
        console.error('Error fetching enrollments:', error);
      }
    );

    this.getCurrentMonth()
  }

  getCurrentMonth(): void {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentDate = new Date();
    this.currentMonth = monthNames[currentDate.getMonth()];
  }


  calculateTotalEnrollments(): void {
    this.totalEnrollments = this.enrollments.length;
  }

  // Calculate the number of enrollments for the current month
  calculateCurrentMonthEnrollments(): void {
    const currentMonthIndex = new Date().getMonth();
    this.currentMonthEnrollments = this.enrollments.filter(enrollment => {
      const enrollmentDate = new Date(enrollment.enrollmentDate);
      return enrollmentDate.getMonth() === currentMonthIndex;
    }).length;
  }


}