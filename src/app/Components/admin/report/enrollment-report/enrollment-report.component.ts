import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../../../Services/enrollment.service';
import { Course, Enrollment } from '../../../../Services/Modal';
import { CourseService } from '../../../../Services/course.service';

@Component({
  selector: 'app-enrollment-report',
  templateUrl: './enrollment-report.component.html',
  styleUrl: './enrollment-report.component.css'
})
export class EnrollmentReportComponent implements OnInit {
  enrollments: Enrollment[] = [];
  filteredEnrollments: Enrollment[] = [];
  courses: Course[] = []; 
  selectedMonth: string = '';
  selectedDateRange: [Date, Date] | null = null;
  selectedCourse: string = '';
  studentSearch: string = "";
  selectedStatus: string = "";
  currentMonth: string = "";

  filtersVisible = false;
  totalEnrollments: any;
  currentMonthEnrollments: any;

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

 

  constructor(
    private enrollmentService: EnrollmentService,
    private courseService: CourseService 
  ) { }

  ngOnInit(): void {
    
    this.enrollmentService.getallEnrollement().subscribe(
      (data: Enrollment[]) => {
        this.enrollments = data;
        this.calculateTotalEnrollments();
        this.calculateCurrentMonthEnrollments();
        this.filteredEnrollments = [...this.enrollments]; 
      },
      (error) => {
        console.error('Error fetching enrollments:', error);
      }
    );

    this.courseService.getAllCourses(); 
    this.courseService.courses$.subscribe(courses => this.courses = courses); 

    this.getCurrentMonth();
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

  calculateCurrentMonthEnrollments(): void {
    const currentMonthIndex = new Date().getMonth();
    this.currentMonthEnrollments = this.enrollments.filter(enrollment => {
      const enrollmentDate = new Date(enrollment.enrollmentDate);
      return enrollmentDate.getMonth() === currentMonthIndex;
    }).length;
  }

  toggleFilters(): void {
    this.filtersVisible = !this.filtersVisible;
  }

  applyFilters(): void {
    this.filteredEnrollments = this.enrollments.filter(enrollment => {

        const matchSearch = this.studentSearch ? 
        (enrollment.student.firstName.toLowerCase().includes(this.studentSearch.toLowerCase()) || 
        enrollment.student.lastName.toLowerCase().includes(this.studentSearch.toLowerCase()) ||
        enrollment.student.nic.toLowerCase().includes(this.studentSearch.toLowerCase())) : true;
  
      // Date range comparison fix
      // const matchDateRange = this.selectedDateRange && this.selectedDateRange.length === 2 ? 
      //   (this.isValidDate(this.selectedDateRange[0]) && this.isValidDate(this.selectedDateRange[1])) ?
      //     new Date(enrollment.enrollmentDate) >= new Date(this.selectedDateRange[0]) && 
      //     new Date(enrollment.enrollmentDate) <= new Date(this.selectedDateRange[1]) : true 
      //   : true;
  
      const matchMonth = this.selectedMonth ? new Date(enrollment.enrollmentDate).getMonth() + 1 === +this.selectedMonth : true;
      const matchCourse = this.selectedCourse ? enrollment.course.id === this.selectedCourse : true;
      const matchStatus = this.selectedStatus ? 
        (this.selectedStatus === 'complete' ? enrollment.isComplete : !enrollment.isComplete) : true;
  
      return matchSearch  && matchMonth && matchCourse && matchStatus;
    });
  }
  
  // Helper function to validate date objects
  isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
  
  

}