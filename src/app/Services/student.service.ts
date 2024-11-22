import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Student } from './Modal';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  
  private GetAllStudentApi = 'https://localhost:7055/api/Students';

  constructor(private http: HttpClient) { }

  
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.GetAllStudentApi);
  }
}
