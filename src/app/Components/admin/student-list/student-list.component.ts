import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { forkJoin } from 'rxjs';
import { Student } from '../../../Services/Modal';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];
  searchText: string = '';

  constructor(
    private studentService: StudentService,
    private enrollmentService: EnrollmentService
  ) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
      this.fetchEnrollments();
    });
  }

  fetchEnrollments() {
    this.students.forEach(student => {
      const nicNumber = Number(student.nic); 

     
      forkJoin([
        this.enrollmentService.getEnrollments(nicNumber),
        this.enrollmentService.getCompletedEnrollments(nicNumber)
      ]).subscribe(([enrollments, completedEnrollments]) => {
       
        student.enrollingCount = enrollments.length;
        student.completedCount = completedEnrollments.length;
      });
    });
  }

  // onEdit(studentNic: number) {
  //   console.log("Edit student with NIC: ", studentNic);
  // }

  // onDelete(studentNic: number) {
  //   console.log("Delete student with NIC: ", studentNic);
  // }

}
