import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from './Modal';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentUrl = 'https://localhost:7055/api/Payment';

  constructor(private http: HttpClient) {}

  // Function to fetch all payments
  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.paymentUrl);
  }
}
