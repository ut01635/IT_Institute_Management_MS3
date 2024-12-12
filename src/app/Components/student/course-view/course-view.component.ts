import { Component, OnInit } from '@angular/core';
import { GreetingService } from '../../../Services/greeting.service';
import { CourseService } from '../../../Services/course.service';
import { Course, Enrollment, Student } from '../../../Services/Modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../../../Services/student.service';
import { PaymentPlanFormComponent } from '../../../Modals/student/payment-plan-form/payment-plan-form.component';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']  
})
export class CourseViewComponent implements OnInit {
  greeting: string = '';
  student: Student | undefined;
  nic: string = '';
  courses: Course[] = [];
  enrollments: Enrollment[] = []; 

  courseNameFilter: string = '';
  courseLevelFilter: string = '';
  minPriceFilter: number | null = null;
  maxPriceFilter: number | null = null;

  filteredCourses: Course[] = [];

  constructor(
    private greetingService: GreetingService,
    private courseService: CourseService,
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.nic = localStorage.getItem('NIC') || '';

   
    this.loadStudent(this.nic);
  }

  private loadStudent(nic: string): void {
   
    this.studentService.getStudentByNIC(nic).subscribe(
      (data) => {
        this.student = data;
        const studentName = `${this.student.firstName} ${this.student.lastName}`;
        this.greetingService.setGreeting(studentName).subscribe((greetingData) => {
          this.greeting = greetingData;
        });

       
        this.loadAllCourses();
        this.loadEnrollments();
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  private loadAllCourses(): void {
   
    this.courseService.courses$.subscribe(
      (courses) => {
        this.courses = courses;
        this.filteredCourses = [...courses]; 
        this.filterCourses();  
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
    this.courseService.getAllCourses();
  }


  private loadEnrollments(): void {
   
    this.enrollmentService.getEnrollments(this.nic).subscribe(
      (enrollments) => {
        this.enrollments = enrollments;   
      },
      (error) => {
        console.error('Error fetching enrollments:', error);
      }
    );
  }

  filterCourses(): void {
   
    if (this.minPriceFilter !== null && this.maxPriceFilter !== null) {
      if (this.maxPriceFilter <= this.minPriceFilter) {
       
        this.maxPriceFilter = this.minPriceFilter + 1;
      }
    }
  
    this.filteredCourses = this.courses.filter((course) => {
      const matchesCourseName = course.courseName.toLowerCase().includes(this.courseNameFilter.toLowerCase());
      const matchesLevel = this.courseLevelFilter ? course.level.toLowerCase() === this.courseLevelFilter.toLowerCase() : true;
      const matchesMinPrice = this.minPriceFilter !== null ? course.fees >= this.minPriceFilter : true;
      const matchesMaxPrice = this.maxPriceFilter !== null ? course.fees <= this.maxPriceFilter : true;
  
      return matchesCourseName && matchesLevel && matchesMinPrice && matchesMaxPrice;
    });
  }
  
  

  openPaymentPlanModal(courseId: string): void {
  
    const isEnrolled = this.enrollments.some(enrollment => enrollment.courseId === courseId);

    if (isEnrolled) {
     
      alert('You have already followed this course.');
    } else {
      
      const modalRef = this.modalService.open(PaymentPlanFormComponent);
      modalRef.componentInstance.studentNIC = this.student?.nic;
      modalRef.componentInstance.CourseId = courseId;
    }
  }
}