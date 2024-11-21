import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private enrollmentUrl = 'https://localhost:7055/api/Enrollment';

  constructor(private http: HttpClient) { }

  
  getEnrollments(studentNic: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.enrollmentUrl}/nic/${studentNic}`);
  }

  
  getCompletedEnrollments(studentNic: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.enrollmentUrl}/nic/${studentNic}/completed`);
  }
}
