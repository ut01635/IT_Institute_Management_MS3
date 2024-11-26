import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrl: './payment-report.component.css'
})
export class PaymentReportComponent implements OnInit {

  // Sample payment data
  payments = [
    { id: 1, customerName: 'John Doe', transactionId: 'TXN001', amount: 100.50, paymentDate: new Date(), status: 'Completed' },
    { id: 2, customerName: 'Jane Smith', transactionId: 'TXN002', amount: 250.75, paymentDate: new Date(), status: 'Pending' },
    { id: 3, customerName: 'Sarah Lee', transactionId: 'TXN003', amount: 175.20, paymentDate: new Date(), status: 'Completed' },
    { id: 4, customerName: 'Mike Brown', transactionId: 'TXN004', amount: 50.00, paymentDate: new Date(), status: 'Failed' }
  ];

  constructor() { }

  ngOnInit(): void {
    // You could fetch payment data from an API here
  }

}