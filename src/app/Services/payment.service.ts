import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from './Modal';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  
  private paymentUrl = 'https://localhost:7055/api/Payment';
  private totalIncomeUrl = 'https://localhost:7055/api/Payment/total-income';

  constructor(private http: HttpClient) {}

  // Function to fetch all payments
  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.paymentUrl);
  }

  // Function to fetch total income
  getTotalIncome(): Observable<any> {
    return this.http.get<any>(this.totalIncomeUrl);
  }
}
