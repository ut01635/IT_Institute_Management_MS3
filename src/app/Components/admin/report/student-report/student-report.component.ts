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
      this.reportData = {
        nic: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        imagePath: '',
        courses: [],
        fee: 0,
        paymentPlan: 'Payment Plan',
        paymentStatus : 'Status',
        paidAmount: 0,
        dueAmount: 0,
        socialMedia:[],
        payments: []
      };

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
              paymentStatus : 'Status',
              paidAmount: 0,
              dueAmount: 0,
              payments: [] 
            };

          
            this.studentService.getSocialMediaLinks(nicNumber).subscribe(data => {
              console.log(data);
              this.reportData.socialMedia=data;
            })

          
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
            this.enrollments = [];
            this.paymentDetails = [];
            
          }
        );
      }
    }

    selectCourse() {
      if (!this.selectedCourse) {
        this.reportData.fee = '';
        this.reportData.paymentPlan = '';
        this.reportData.paymentStatus = 'Status';
        this.reportData.paidAmount = 0;
        this.reportData.dueAmount = 0;
        this.paymentDetails = []; 
        return; 
      }
    
      const selectedEnrollment = this.enrollments.find(enrollment => enrollment.course.id === this.selectedCourse);
    
      if (selectedEnrollment) {
        const enrollmentId = selectedEnrollment.id;
        const enrollmentDate = selectedEnrollment.enrollmentDate; 
    
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
    
                 
                  const daysSinceEnrollment = this.getDaysDifference(new Date(enrollmentDate), new Date());
    
                  if (this.reportData.paymentPlan === 'Full') {
                  
                    if (this.reportData.paidAmount === this.reportData.fee) {
                      this.reportData.paymentStatus = 'Success';
                    } else {
                      this.reportData.paymentStatus = 'Pending'; 
                    }
                  } else if (this.reportData.paymentPlan === 'Installment') {
                   
                    if (this.reportData.paidAmount === 0 && daysSinceEnrollment <= 7) {
                      this.reportData.paymentStatus = 'Pending';  
                    } else if (this.reportData.paidAmount > 0 && daysSinceEnrollment <= 30) {
                      this.reportData.paymentStatus = 'Success';
                    } else {
                      this.reportData.paymentStatus = 'Pending'; 
                    }
                  }
                } else {
                 
                  this.reportData.paymentStatus = 'Pending';
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
    
    
   
    getDaysDifference(date1: Date, date2: Date): number {
      const timeDifference = Math.abs(date2.getTime() - date1.getTime());
      return Math.ceil(timeDifference / (1000 * 3600 * 24)); 
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