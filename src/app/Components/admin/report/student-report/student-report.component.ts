import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../../Services/student.service';
import { EnrollmentService } from '../../../../Services/enrollment.service';
import { PaymentService } from '../../../../Services/payment.service';
import { Enrollment } from '../../../../Services/Modal';

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
  paymentDetails: any = null; // Store selected course payment details

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      nic: ['', Validators.required] // NIC field is required
    });
  }

  onsubmit() {
    const nicNumber: string = this.reportForm.value.nic;

    if (nicNumber) {
      // Fetch student details based on NIC
      this.studentService.getStudentByNIC(nicNumber).subscribe(
        (student: any) => {
          this.reportData = {
            nic: student.nic,
            name: `${student.firstName} ${student.lastName}`,
            email: student.email,
            phone: student.phone,
            address: student.address,
            imagePath: student.imagePath,
            courses: [], // Initialize the courses array
            fee: '',
            paymentPlan: '',
            paidAmount: '',
            dueAmount: '',
            payments: [] // Initialize the payments array
          };

          // Fetch enrollments (courses) for the student using NIC
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
          alert('Failed to fetch student details');
        }
      );
    }
  }

  selectCourse() {
    if (!this.selectedCourse) {
      this.reportData.fee = '';
      this.reportData.paymentPlan = '';
      this.reportData.paidAmount = '';
      this.reportData.dueAmount = '';
      return; // Return early if no course is selected
    }

    const selectedEnrollment = this.enrollments.find(enrollment => enrollment.course.id === this.selectedCourse);
    
    if (selectedEnrollment) {
      const enrollmentId = selectedEnrollment.id; // Get enrollment ID

      // Fetch detailed enrollment data by enrollment ID
      this.enrollmentService.getEnrollmentById(enrollmentId).subscribe(
        (enrollmentDetails: Enrollment) => {
          // Update the reportData with fee details from the enrollment
          this.reportData.fee = enrollmentDetails.course.fees; // Assume the fee is part of the enrollment details

          // Now, we fetch payment details using the NIC and enrollment ID
          this.paymentService.getPaymentsByNic(this.reportData.nic).subscribe(
            (payments: any[]) => {
              const payment = payments.find(p => p.enrollmentId === enrollmentId);

              if (payment) {
                // Set the payment details
                this.paymentDetails = {
                  fee: payment.amount,  // Course fee
                  paymentPlan: payment.dueAmount === 0 ? 'Full' : 'Installment',  // Payment plan (Full or Installment)
                  paidAmount: payment.totalPaidAmount,  // Total paid amount
                  dueAmount: payment.dueAmount,  // Due amount
                };

                // Update the reportData with payment details
                this.reportData.paymentPlan = this.paymentDetails.paymentPlan;
                this.reportData.paidAmount = this.paymentDetails.paidAmount;
                this.reportData.dueAmount = this.paymentDetails.dueAmount;
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

}