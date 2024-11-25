import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Student } from './Modal';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  
  private GetAllStudentApi = 'https://localhost:7055/api/Students';

  private studentsSubject = new BehaviorSubject<Student[]>([]);
  public students$ = this.studentsSubject.asObservable();

  constructor(private http: HttpClient) {}


  getStudents(): void {
    this.http
      .get<Student[]>(this.GetAllStudentApi)
      .pipe(
        catchError((error) => {
          console.error('Error fetching students', error);
          return []; 
        })
      )
      .subscribe((students) => {
        this.studentsSubject.next(students);
      });
  }


  addStudent(formData: FormData): Observable<Student> {
    return this.http.post<Student>(this.GetAllStudentApi, formData).pipe(
      catchError((error) => {
        console.error('Error adding student', error);
        throw error;
      })
    );
  }


  refreshStudentList(): void {
    this.getStudents(); 
  }
}
