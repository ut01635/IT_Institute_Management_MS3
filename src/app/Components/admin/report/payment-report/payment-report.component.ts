import { Component, OnInit, inject, } from '@angular/core';
import { PaymentService } from '../../../../Services/payment.service';
import { Payment } from '../../../../Services/Modal';

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrl: './payment-report.component.css'
})
export class PaymentReportComponent implements OnInit {
  payments: Payment[] = []; // Array to hold enrollment data
  paymentDateFilter: null = null;

  constructor(private paymentService: PaymentService) {}
  
  ngOnInit(): void {
    this.paymentService.getAllPayments().subscribe(
      (data: Payment[]) => {
        this.payments = data; 
        console.log('Enrollments fetched successfully:', this.payments);
      },
      (error) => {
        console.error('Error fetching enrollments:', error);
      }
    );
  }
}