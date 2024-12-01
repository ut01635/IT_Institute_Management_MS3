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
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent implements OnInit {
  greeting: string = '';
  student: Student | undefined;
  nic: string = '';
  courses: Course[] = [];

  constructor(
    private greetingService: GreetingService,
    private courseService: CourseService,
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.nic = localStorage.getItem('NIC') || '';

    // Load student data and filter courses
    this.loadStudentAndCourses(this.nic);
  }

  private loadStudentAndCourses(nic: string): void {
    // Load student details
    this.studentService.getStudentByNIC(nic).subscribe(
      (data) => {
        this.student = data;
        const studentName = `${this.student.firstName} ${this.student.lastName}`;
        this.greetingService.setGreeting(studentName).subscribe((greetingData) => {
          this.greeting = greetingData;
        });

        // Once student data is loaded, fetch enrollments and filter courses
        this.filterCoursesByEnrollment(nic);
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  private filterCoursesByEnrollment(nic: string): void {
    // Fetch enrollments for the student
    this.enrollmentService.getReadingEnrollments(nic).subscribe(
      (enrollments: Enrollment[]) => {
        const enrolledCourseIds = enrollments.map((enrollment) => enrollment.courseId);

        // Fetch all courses and filter out already enrolled ones
        this.courseService.courses$.subscribe((courses) => {
          this.courses = courses.filter((course) => !enrolledCourseIds.includes(course.id));
        });

        this.courseService.getAllCourses();
      },
      (error) => {
        console.error('Error fetching enrollments:', error);
      }
    );
  }

  openSocialMediaUpdateModal(id: string): void {
    const modalRef = this.modalService.open(PaymentPlanFormComponent);
    modalRef.componentInstance.studentNIC = this.student?.nic;
    modalRef.componentInstance.CourseId = id;
  }
}
