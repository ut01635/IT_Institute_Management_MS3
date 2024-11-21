import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  
  private GetAllStudentApi = 'https://localhost:7055/api/Students';

  constructor(private http: HttpClient) { }

  
  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.GetAllStudentApi);
  }
}
