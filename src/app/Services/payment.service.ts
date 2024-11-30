import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getPaymentsByNic(nic: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.paymentUrl}/student/${nic}`);
  }


  makePayment(paymentData: any): Observable<any> {
    const url = this.paymentUrl;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, paymentData, { headers })
    
  }
  
  
}
