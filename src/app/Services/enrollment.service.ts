import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Enrollment, Student } from './Modal';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private enrollmentUrl = 'https://localhost:7055/api/Enrollment';

  constructor(private http: HttpClient) {}

  getEnrollments(studentNic: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.enrollmentUrl}/nic/${studentNic}`);
  }

  getCompletedEnrollments(studentNic: string): Observable<Student[]> {
    return this.http
      .get<Student[]>(`${this.enrollmentUrl}/nic/${studentNic}/completed`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching completed enrollments', error);
          return of([]);
        })
      );
  }
  getallEnrollement(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.enrollmentUrl}`);
  }

  getReadingEnrollments(studentNic: string) {
    '/nic/200206601718/notcompleted';
    return this.http.get<any[]>(
      `${this.enrollmentUrl}/nic/${studentNic}/notcompleted`
    );
  }

  createEnrollment(enrollment: Enrollment) {
    return this.http.post(this.enrollmentUrl, enrollment, {
      responseType: 'text',
    });
  }
}
