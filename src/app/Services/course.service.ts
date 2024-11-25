import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from './Modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {


  private courseApi = 'https://localhost:7055/api/Course';

  constructor(private http:HttpClient) { }
 
 

  getAllCourses(){
    return this.http.get<Course[]>(this.courseApi);
  }

  addCourse(formData: FormData): Observable<Course> {
    return this.http.post<Course>(this.courseApi, formData);
  }
}
