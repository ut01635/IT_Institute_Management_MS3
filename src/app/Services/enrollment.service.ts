import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Enrollment, EnrollmentRequest, Student } from './Modal';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private enrollmentUrl = 'https://localhost:7055/api/Enrollment';

  constructor(private http: HttpClient) {}

  getEnrollments(studentNic: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.enrollmentUrl}/nic/${studentNic}`);
  }

  getCompletedEnrollments(studentNic: string): Observable<Enrollment[]> {
    return this.http
      .get<Enrollment[]>(`${this.enrollmentUrl}/nic/${studentNic}/completed`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching completed enrollments', error);
          return of([]);
        })
      );
  }
  getallEnrollement(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.enrollmentUrl}`);
  }

  getReadingEnrollments(studentNic: string) {
    return this.http.get<Enrollment[]>(
      `${this.enrollmentUrl}/nic/${studentNic}/notcompleted`
    );
  }

  createEnrollment(enrollment: EnrollmentRequest) {
    return this.http.post(this.enrollmentUrl, enrollment, {
      responseType: 'text',
    });
  }

  getEnrollmentById(enrollmentId: string): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.enrollmentUrl}/${enrollmentId}`);
  }

  getAllCompleted(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.enrollmentUrl}/all/completed`);
  }

  
  getAllReading(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.enrollmentUrl}/all/notcompleted`);
  }


  deleteEnrollment(id: string): Observable<any> {
    const url = `${this.enrollmentUrl}/delete/${id}?forceDelete=true`;  
    return this.http.delete(url);  
  }

  updateEnrollment(id:string,enrollmentData: EnrollmentRequest) {
    const updateUrl = (`${this.enrollmentUrl}/update/${id}`);
    return this.http.put<Enrollment>(updateUrl, enrollmentData);
  }
  
}
