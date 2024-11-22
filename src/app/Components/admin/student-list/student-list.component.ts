import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { forkJoin } from 'rxjs';
import { Student } from '../../../Services/Modal';
import { StudentFormComponent } from '../../../Modals/admin/student-form/student-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private enrollmentService: EnrollmentService,
    private modalService: NgbModal
    
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



 
  openModal() {
    
    const modalRef = this.modalService.open(StudentFormComponent, {
      size: 'lg'
    });

    
    modalRef.result.then(
      (result: any) => {
        console.log('Modal closed', result);
      },
      (reason: any) => {
        console.log('Modal dismissed', reason);
      }
    );
  }

  // onEdit(studentNic: number) {
  //   console.log("Edit student with NIC: ", studentNic);
  // }

  // onDelete(studentNic: number) {
  //   console.log("Delete student with NIC: ", studentNic);
  // }

}
