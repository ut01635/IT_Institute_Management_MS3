import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from './Modal';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }


  getAllCourses(){
    return this.http.get<Course[]>('https://localhost:7055/api/Course');
  }
}
