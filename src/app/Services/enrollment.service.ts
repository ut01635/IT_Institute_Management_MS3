import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Enrollment, Student } from './Modal';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private enrollmentUrl = 'https://localhost:7055/api/Enrollment';

  constructor(private http: HttpClient) { }

  
  getEnrollments(studentNic: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.enrollmentUrl}/nic/${studentNic}`);
  }

  
  getCompletedEnrollments(studentNic: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.enrollmentUrl}/nic/${studentNic}/completed`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching completed enrollments', error);
          return of([]);  
        })
      );
  }

  createEnrollment(enrollment:Enrollment){
    return this.http.post(this.enrollmentUrl, enrollment)
  }
  
}
