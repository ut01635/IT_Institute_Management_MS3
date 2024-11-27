import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../../../Services/enrollment.service';
import { Enrollment } from '../../../../Services/Modal';
import { CourseService } from '../../../../Services/course.service';

@Component({
  selector: 'app-enrollment-report',
  templateUrl: './enrollment-report.component.html',
  styleUrl: './enrollment-report.component.css'
})
export class EnrollmentReportComponent implements OnInit {
  enrollments: Enrollment[] = [];
  filteredEnrollments: Enrollment[] = [];
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

  courses: { id: string, name: string }[] = [];  // Now dynamically populated
  selectedCourseName: string = ''; // Store selected course name for display in the UI

  constructor(
    private enrollmentService: EnrollmentService,
    private courseService: CourseService // Inject the CourseService
  ) { }

  ngOnInit(): void {
    // Fetch enrollments and courses data
    this.enrollmentService.getallEnrollement().subscribe(
      (data: Enrollment[]) => {
        this.enrollments = data;
        this.calculateTotalEnrollments();
        this.calculateCurrentMonthEnrollments();
        this.filteredEnrollments = [...this.enrollments]; // Initialize with all enrollments
      },
      (error) => {
        console.error('Error fetching enrollments:', error);
      }
    );

    this.courseService.getAllCourses().subscribe(
      (courses: any[]) => {
        this.courses = courses.map(course => ({
          id: course.id, // Assuming the course object has an 'id' and 'name'
          name: course.courseName
        }));
      },
      (error: any) => {
        console.error('Error fetching courses:', error);
      }
    );

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
      const matchSearch = this.studentSearch ? (enrollment.student.firstName.toLowerCase().includes(this.studentSearch.toLowerCase()) || 
                                                 enrollment.student.nic.toLowerCase().includes(this.studentSearch.toLowerCase())) : true;
      const matchDateRange = this.selectedDateRange ? new Date(enrollment.enrollmentDate) >= new Date(this.selectedDateRange[0]) &&
                                                      new Date(enrollment.enrollmentDate) <= new Date(this.selectedDateRange[1]) : true;
      const matchMonth = this.selectedMonth ? new Date(enrollment.enrollmentDate).getMonth() + 1 === +this.selectedMonth : true;
      const matchCourse = this.selectedCourse ? enrollment.course.id === this.selectedCourse : true;
      const matchStatus = this.selectedStatus ? (this.selectedStatus === 'complete' ? enrollment.isComplete : !enrollment.isComplete) : true;

      return matchSearch && matchDateRange && matchMonth && matchCourse && matchStatus;
    });
  }


}