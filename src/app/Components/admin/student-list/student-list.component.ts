import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {

  students: any[] = [];
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
      forkJoin([
        this.enrollmentService.getEnrollments(student.nic),
        this.enrollmentService.getCompletedEnrollments(student.nic)
      ]).subscribe(([enrollments, completedEnrollments]) => {
        student.enrollingCount = enrollments.length;
        student.completedCount = completedEnrollments.length;
      });
    });
  }

  onEdit(studentNic: number) {
    console.log("Edit student with NIC: ", studentNic);
  }

  onDelete(studentNic: number) {
    console.log("Delete student with NIC: ", studentNic);
  }

}
