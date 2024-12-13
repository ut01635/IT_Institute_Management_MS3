import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { forkJoin } from 'rxjs';
import { Student } from '../../../Services/Modal';
import { StudentFormComponent } from '../../../Modals/admin/student-form/student-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentPasswordComponent } from '../../../Modals/admin/student-password/student-password.component';
import { NgxSpinnerService } from 'ngx-spinner';


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
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(){
    this.spinner.show
    this.studentService.students$.subscribe(
      (students) => {
        this.spinner.hide();
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
      this.spinner.show();
      this.studentService.deleteStudent(studentNic).subscribe(
        () => {
          this.spinner.hide();
          alert('Student deleted successfully!');
          this.studentService.refreshStudentList();
        },
        (error) => {
          this.spinner.hide();
          console.error('Error deleting student:', error);
          alert('An error occurred while deleting the student.');
        }
      );
    }
  }

  toggleLockOrUnlock(student: any): void {
    const currentLockState = student.IsLocked;
  
  
    student.IsLocked = !currentLockState;
  
    const action = currentLockState ? 'Unlocking' : 'Locking';
    alert(`${action} account with NIC: ${student.nic}`);
  
  
    if (student.IsLocked) {
      this.lockStudent(student);
    } else {
      this.unlockStudent(student);
    }
  }
  
  lockStudent(student: any) {
    this.spinner.show();
    this.studentService.lockAccount(student.nic).subscribe(
      (data) => {
        this.spinner.hide();
        console.log(`Account locked for NIC: ${student.nic}`);
      this.loadStudents();
      },
      (error) => {
        this.spinner.hide();
        alert(`Account locking failed for NIC: ${student.nic}`);
      }
    );
  }
  
  unlockStudent(student: any) {
    this.spinner.show();
    this.studentService.dirrectUnlockAccount(student.nic).subscribe(
      (data) => {
        this.spinner.hide();
        console.log(`Account unlocked for NIC: ${student.nic}`);
       this.loadStudents();
      },
      (error) => {
        this.spinner.hide();
        alert(`Account unlocking failed for NIC: ${student.nic}`);
      }
    );
  }
  
  


  openPasswordResetModal(nic: string): void {
    const modalRef = this.modalService.open(StudentPasswordComponent);
    modalRef.componentInstance.studentNic = nic; 
  }
}
