import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  formData = {
    nic: '',
    course: '',
    totalFee: 0,
    paymentPlan: '',
    dueAmount: 0,
    installmentAmount: 0
  };
  courses = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Physics' },
    { id: 3, name: 'Chemistry' }
  ];
  paymentDetails = 
    {
      nic: '123456789V',
      course: 'Mathematics',
      totalFee: 5000,
      dueAmount: 2000,
      paidAmount: 3000,
      paymentPlan: 'Installment'

    }
  //   {
  //     nic: '987654321V',
  //     course: 'Physics',
  //     totalFee: 6000,
  //     dueAmount: 1000,
  //     paidAmount: 5000
  //   }
  // ];
  message = '';

  ngOnInit(): void {
    this.formData.dueAmount = this.paymentDetails.dueAmount;
    this.formData.paymentPlan = this.paymentDetails.paymentPlan;
    this.formData.totalFee = this.paymentDetails.totalFee;
    this.formData.installmentAmount = Number(this.paymentDetails.totalFee - this.paymentDetails.dueAmount)
  }

  onSubmit() {
    this.message = 'Payment successful!';
  }

}
