import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from './Modal';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {


  private courseApi = 'https://localhost:7055/api/Course';

  private coursesSubject = new BehaviorSubject<Course[]>([]);
  public courses$ = this.coursesSubject.asObservable();


  constructor(private http: HttpClient) { }



  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseApi).pipe(
      catchError((error) => {
        console.error('Error fetching courses', error);
        // Use throwError to propagate the error to the subscriber
        return throwError(() => error);
      })
    );
  }
  


  addCourse(formData: FormData): Observable<Course> {
    return this.http.post<Course>(this.courseApi, formData).pipe(
      catchError((error) => {
        console.error('Error adding course', error);
        throw error;
      })
    );
  }


  updateCourse(courseId: string, formData: FormData): Observable<Course> {
    return this.http.put<Course>(`${this.courseApi}/${courseId}`, formData).pipe(
      catchError((error) => {
        console.error('Error updating course', error);
        throw error;
      })
    );
  }

  
  deleteCourse(courseId: string) {
    return this.http.delete(`${this.courseApi}/${courseId}`).pipe(
      catchError((error) => {
        console.error('Error deleting course', error);
        throw error;
      })
    );
  }

  refreshCourseList(): void {
    this.getAllCourses(); 
  }
}
