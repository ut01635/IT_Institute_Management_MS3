import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { EnrollmentService } from '../../../Services/enrollment.service';

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
  ) {}

  ngOnInit(): void {
    
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
      console.log(this.students);
    });
  }


 
  getEnrollingCount(studentNic: number): number {
    let count = 0;
    this.enrollmentService.getEnrollments(studentNic).subscribe((enrollments) => {
      count = enrollments.length;
    });
    return count;
  }

 
  getCompletedCount(studentNic: number): number {
    let count = 0;
    this.enrollmentService.getCompletedEnrollments(studentNic).subscribe((completedEnrollments) => {
      count = completedEnrollments.length;
    });
    return count;
  }

  onEdit(studentNic: number) {
    console.log("Edit student with ID: ", studentNic);
  }

  onDelete(studentNic: number) {
    console.log("Delete student with ID: ", studentNic);
  }

}
