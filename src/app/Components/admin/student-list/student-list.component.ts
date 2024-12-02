import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { forkJoin } from 'rxjs';
import { Student } from '../../../Services/Modal';
import { StudentFormComponent } from '../../../Modals/admin/student-form/student-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentPasswordComponent } from '../../../Modals/admin/student-password/student-password.component';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];
  searchText: string = '';
  baseUrl = 'https://localhost:7055'; 

  constructor(
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.studentService.students$.subscribe((students) => {
      this.students = students;
      this.fetchEnrollments();
      console.log(this.students);
    });

    this.studentService.getStudents();

    
    
  }

  fetchEnrollments() {
    this.students.forEach(student => {
      const nicNumber: string = student.nic; 
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
    const modalRef = this.modalService.open(StudentFormComponent, { size: 'lg' });
    modalRef.componentInstance.isEditMode = false; 
    modalRef.result.then((result: any) => {
      console.log('Modal closed', result);
    }, (reason: any) => {
      console.log('Modal dismissed', reason);
    });
  }


  editStudent(nic: string): void {
    const studentToEdit = this.students.find(student => student.nic === nic);
    const modalRef = this.modalService.open(StudentFormComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.studentToEdit = studentToEdit;
  }

  onDelete(studentNic: string): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');

    if (confirmDelete) {
      this.studentService.deleteStudent(studentNic).subscribe(
        () => {
          alert('Student deleted successfully!');
          this.studentService.refreshStudentList();
        },
        (error) => {
          console.error('Error deleting student:', error);
          alert('An error occurred while deleting the student.');
        }
      );
    }
  }

  toggleLockOrUnlock(student: any): void {
    if (student.IsLocked) {
      this.toggleUnlock(student); 
    } else {
      this.toggleLock(student); 
    }
  }
  
  toggleLock(student: any) {
    this.studentService.lockAccount(student.nic).subscribe(
      (data) => {
        alert("Account locked with NIC: " + student.nic);
       
        student.IsLocked = true;
       
      },
      (error) => {
        alert("Account locking failed for NIC: " + student.nic);
      }
    );
  }
  
  toggleUnlock(student: any) {
    this.studentService.dirrectUnlockAccount(student.nic).subscribe(
      (data) => {
        alert("Account unlocked with NIC: " + student.nic);
       
        student.IsLocked = false;
       
      },
      (error) => {
        alert("Account unlocking failed for NIC: " + student.nic);
      }
    );
  }


  openPasswordResetModal(nic: string): void {
    const modalRef = this.modalService.open(StudentPasswordComponent);
    modalRef.componentInstance.studentNic = nic; 
  }
}
