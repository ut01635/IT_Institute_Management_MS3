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
  styleUrls: ['./course-view.component.css']  // Corrected styleUrls
})
export class CourseViewComponent implements OnInit {
  greeting: string = '';
  student: Student | undefined;
  nic: string = '';
  courses: Course[] = [];
  enrollments: Enrollment[] = []; // Added to hold student enrollments

  constructor(
    private greetingService: GreetingService,
    private courseService: CourseService,
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.nic = localStorage.getItem('NIC') || '';

    // Load student data
    this.loadStudent(this.nic);
  }

  private loadStudent(nic: string): void {
    // Load student details
    this.studentService.getStudentByNIC(nic).subscribe(
      (data) => {
        this.student = data;
        const studentName = `${this.student.firstName} ${this.student.lastName}`;
        this.greetingService.setGreeting(studentName).subscribe((greetingData) => {
          this.greeting = greetingData;
        });

        // Once student data is loaded, fetch all courses and enrollments
        this.loadAllCourses();
        this.loadEnrollments();
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  private loadAllCourses(): void {
    // Fetch all courses
    this.courseService.courses$.subscribe(
      (courses) => {
        this.courses = courses;     
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
    this.courseService.getAllCourses();
  }

  private loadEnrollments(): void {
    // Fetch student enrollments
    this.enrollmentService.getEnrollments(this.nic).subscribe(
      (enrollments) => {
        this.enrollments = enrollments;   
      },
      (error) => {
        console.error('Error fetching enrollments:', error);
      }
    );
  }

  openPaymentPlanModal(courseId: string): void {
    // Check if the student is already enrolled in the selected course
    const isEnrolled = this.enrollments.some(enrollment => enrollment.courseId === courseId);

    if (isEnrolled) {
      // If the student is already enrolled, show an alert
      alert('You have already followed this course.');
    } else {
      // If not enrolled, open the modal for course enrollment
      const modalRef = this.modalService.open(PaymentPlanFormComponent);
      modalRef.componentInstance.studentNIC = this.student?.nic;
      modalRef.componentInstance.CourseId = courseId;
    }
  }
}