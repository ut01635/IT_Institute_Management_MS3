import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../Services/Modal';

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

  
  ngOnInit(): void {
    // Sample Payment Data
    this.payments = [
      { date: '2024-11-20', courseName: 'Web Development', amount: 200, dueAmount: 50, totalAmount: 250 },
      { date: '2024-11-15', courseName: 'Data Science', amount: 300, dueAmount: 30, totalAmount: 330 },
      { date: '2024-11-10', courseName: 'UI/UX Design', amount: 150, dueAmount: 20, totalAmount: 170 },
      { date: '2024-11-05', courseName: 'Machine Learning', amount: 400, dueAmount: 70, totalAmount: 470 },
      { date: '2024-11-01', courseName: 'Web Development', amount: 250, dueAmount: 30, totalAmount: 280 },
      { date: '2024-10-30', courseName: 'Python Programming', amount: 350, dueAmount: 40, totalAmount: 390 },
      { date: '2024-10-25', courseName: 'JavaScript Basics', amount: 100, dueAmount: 10, totalAmount: 110 },
      { date: '2024-10-15', courseName: 'Full Stack Development', amount: 500, dueAmount: 60, totalAmount: 560 },
      { date: '2024-10-10', courseName: 'Data Science', amount: 300, dueAmount: 25, totalAmount: 325 },
      { date: '2024-10-05', courseName: 'Artificial Intelligence', amount: 600, dueAmount: 80, totalAmount: 680 },
      // Add more rows here as needed
    ];

    // Initially, show all payments (no filters applied)
    this.filteredPayments = [...this.payments];
  }
}
