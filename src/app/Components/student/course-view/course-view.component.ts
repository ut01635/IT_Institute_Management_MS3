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

        // Once student data is loaded, fetch all courses
        this.loadAllCourses();
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

  openSocialMediaUpdateModal(id: string): void {
    const modalRef = this.modalService.open(PaymentPlanFormComponent);
    modalRef.componentInstance.studentNIC = this.student?.nic;
    modalRef.componentInstance.CourseId = id;
  }
}
