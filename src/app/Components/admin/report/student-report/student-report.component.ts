import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../../Services/student.service';
import { EnrollmentService } from '../../../../Services/enrollment.service';
import { PaymentService } from '../../../../Services/payment.service';
import { Enrollment } from '../../../../Services/Modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentPlanFormComponent } from '../../../../Modals/student/payment-plan-form/payment-plan-form.component';


@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrl: './student-report.component.css'
})
export class StudentReportComponent  implements OnInit {
  reportForm!: FormGroup;
  selectedCourse: string = '';
  reportData: any = null;
  enrollments: any[] = [];
  paymentDetails: any[] = [];  
  

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
    private paymentService: PaymentService,
    private modalService :NgbModal 
  ) { }

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      nic: ['', Validators.required]  
    });
  }

  onsubmit() {
    const nicNumber: string = this.reportForm.value.nic;

    if (nicNumber) {
      
      this.studentService.getStudentByNIC(nicNumber).subscribe(
        (student: any) => {
          this.reportData = {
            nic: student.nic,
            name: `${student.firstName} ${student.lastName}`,
            email: student.email,
            phone: student.phone,
            address: student.address.addressLine1+', '+student.address.addressLine2+', '+student.address.city+', '+student.address.state+', '+student.address.country+', '+student.address.postalCode,
            imagePath: student.imagePath,
            courses: [], 
            fee: 0,
            paymentPlan: 'Payment Plan',
            paidAmount: 0,
            dueAmount: 0,
            payments: [] 
          };

         
          this.enrollmentService.getEnrollments(nicNumber).subscribe(
            (enrollments: any[]) => {
              this.enrollments = enrollments;
              this.reportData.courses = enrollments.map(enrollment => enrollment.course);
            },
            (error) => {
              console.error('Error fetching enrollments:', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching student details:', error);
          alert('Student not found for the given NIC.');
        }
      );
    }
  }

  selectCourse() {
    if (!this.selectedCourse) {
      this.reportData.fee = '';
      this.reportData.paymentPlan = '';
      this.reportData.paidAmount = 0;
      this.reportData.dueAmount = 0;
      this.paymentDetails = []; 
      return; 
    }

    const selectedEnrollment = this.enrollments.find(enrollment => enrollment.course.id === this.selectedCourse);

    if (selectedEnrollment) {
      const enrollmentId = selectedEnrollment.id;

     
      this.enrollmentService.getEnrollmentById(enrollmentId).subscribe(
        (enrollmentDetails: Enrollment) => {
          
          this.reportData.fee = enrollmentDetails.course.fees;
          this.reportData.paymentPlan = enrollmentDetails.paymentPlan;
          this.reportData.dueAmount = enrollmentDetails.course.fees;

         
          this.paymentService.getPaymentsByNic(this.reportData.nic).subscribe(
            (payments: any[]) => {
              
              const coursePayments = payments.filter(p => p.enrollmentId === enrollmentId);

             
              if (coursePayments.length > 0) {
                this.paymentDetails = coursePayments.map(payment => ({
                  paymentDate: payment.paymentDate,
                  fee: payment.amount, 
                  totalPaidAmount: payment.totalPaidAmount, 
                  amount: payment.amount, 
                  dueAmount: payment.dueAmount 
                }));

               
                const latestPayment = this.paymentDetails[this.paymentDetails.length - 1];
                this.reportData.paidAmount = latestPayment.totalPaidAmount;
                this.reportData.dueAmount = latestPayment.dueAmount;
              } else {
               
                this.paymentDetails = [];
                this.reportData.paidAmount = 0;
                this.reportData.dueAmount =enrollmentDetails.course.fees;
              }
            },
            (error) => {
              console.error('Error fetching payment details:', error);
            }
          );

          
        },
        (error) => {
          console.error('Error fetching detailed enrollment data:', error);
        }
      );
    }
  }

  refreshEnrollments(nic: string) {
    this.enrollmentService.getEnrollments(nic).subscribe(
      (enrollments: any[]) => {
        this.enrollments = enrollments;
       
        this.reportData.courses = enrollments.map(enrollment => enrollment.course);
      },
      (error) => {
        console.error('Error fetching enrollments:', error);
      }
    );
  }

  confirmDelete(enrollmentId: string) {
    if (window.confirm('Are you sure you want to delete this enrollment?')) {
      this.deleteEnrollment(enrollmentId);
    }
  }

  deleteEnrollment(enrollmentId: string) {
    this.enrollmentService.deleteEnrollment(enrollmentId).subscribe(
      (response) => {
        alert('Enrollment deleted successfully');
       
        this.refreshEnrollments(this.reportData.nic);
      },
      (error) => {
        console.error('Error deleting enrollment:', error);
      }
    );
  }
  

  openCreatePaymentPlanModal(enrollment: any) {
    const modalRef = this.modalService.open(PaymentPlanFormComponent);
    modalRef.componentInstance.isNewPlan = true;  
    modalRef.componentInstance.studentNIC = enrollment.studentNIC;
    modalRef.componentInstance.CourseId = enrollment.courseId;
  }


  openUpdatePaymentPlanModal(enrollment: any) {
    const modalRef = this.modalService.open(PaymentPlanFormComponent);
    modalRef.componentInstance.isNewPlan = false;  
    modalRef.componentInstance.studentNIC = enrollment.studentNIC;
    modalRef.componentInstance.CourseId = enrollment.courseId;
    modalRef.componentInstance.id = enrollment.id; 

    modalRef.result.then(() => {
      this.refreshEnrollments(this.reportData.nic);  
    }).catch(() => {
      
    });
  }

}