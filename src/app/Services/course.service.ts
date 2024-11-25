import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from './Modal';
import { BehaviorSubject, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {


  private courseApi = 'https://localhost:7055/api/Course';

  private coursesSubject = new BehaviorSubject<Course[]>([]);
  public courses$ = this.coursesSubject.asObservable();


  constructor(private http: HttpClient) { }



  getAllCourses(): any {
    this.http.get<Course[]>(this.courseApi).pipe(
      catchError((error) => {
        console.error('Error fetching courses', error);
        return [];
      })
    ).subscribe((courses) => {
      this.coursesSubject.next(courses); 
    });
  }



  addCourse(formData: FormData): Observable<Course> {
    return this.http.post<Course>(this.courseApi, formData).pipe(
      catchError((error) => {
        console.error('Error adding course', error);
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
