import { Component, OnInit } from '@angular/core';
import { Enrollment, Payment } from '../../../Services/Modal';
import { PaymentService } from '../../../Services/payment.service';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentMessageFormComponent } from '../../../Modals/student/student-message-form/student-message-form.component';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit {
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
  courseNameFilter: string = '';
  paymentDateFilter: null = null;
  showFilterSection: boolean = false;

   // This method will toggle the visibility of the filter section
   toggleFilterSection() {
    this.showFilterSection = !this.showFilterSection;
  }

  constructor(
    private paymentService:PaymentService,
    private enrollmentService:EnrollmentService,
    private modalService: NgbModal
  ){}
  
  ngOnInit(): void {
    const nic = localStorage.getItem('NIC')|| ''
    this.paymentService.getPaymentsByNic(nic).subscribe(data=>{
      this.payments = data
      this.getEnrollmentsForPayments(); 
      console.log(this.payments);
      
    }, error=>{
      console.log(error.erorr);
      
    })
    
    // Initially, show all payments (no filters applied)
    this.filteredPayments = [...this.payments];
  }

  openMessageModal(): void {
    const modalRef = this.modalService.open(StudentMessageFormComponent); 
  }


  getEnrollmentsForPayments(): void {
    this.payments.forEach((payment) => {
      this.enrollmentService.getEnrollmentById(payment.enrollmentId).subscribe(
        (enrollment: Enrollment) => {
          const paymentData = this.payments.find(p => p.enrollmentId === payment.enrollmentId);
          if (paymentData) {
            paymentData.enrollment = enrollment;
          }
        },
        (error) => {
          console.error('Error fetching enrollment for payment:', error);
        }
      );
    });
  }
}
