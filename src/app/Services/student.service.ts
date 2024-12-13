import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { SocialMediaLinks, Student, StudentProfileDto, StudentUpdateRequestDto, resetPassword } from './Modal';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  private BaseStudentURL = 'https://localhost:7055/api/Students';
  private SocialMediaLinkURL='https://localhost:7055/api/SocialMediaLinks'

  private studentsSubject = new BehaviorSubject<Student[]>([]);
  public students$ = this.studentsSubject.asObservable();

  constructor(private http: HttpClient) { }


  getStudents() {
    this.http
      .get<Student[]>(this.BaseStudentURL)
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
    return this.http.post<Student>(this.BaseStudentURL, formData).pipe(
      catchError((error) => {
        console.error('Error adding student', error);
        throw error;
      })
    );
  }

  updateStudent(nic: string, studentData: FormData): Observable<Student> {
    return this.http.put<Student>(`${this.BaseStudentURL}/${nic}`, studentData);
  }


  deleteStudent(nic: string): Observable<void> {
    const deleteUrl = `${this.BaseStudentURL}/${nic}`;
    return this.http.delete<void>(deleteUrl).pipe(
      catchError((error) => {
        if (error.status === 404) {
          alert(`Student with NIC ${nic} not found.`);
        } else {
          console.error('Error deleting student', error);
          alert('An error occurred while deleting the student.');
        }
        throw error;
      })
    );
  }

  getStudentByNIC(nic: string): Observable<Student> {
    return this.http.get<Student>(`${this.BaseStudentURL}/${nic}`).pipe(
      catchError((error) => {
        console.error('Error fetching student data', error);
        throw error;
      })
    );
  }


  refreshStudentList(): void {
    this.getStudents();
  }


  lockAccount(nic: string) {

    return this.http.put(`${this.BaseStudentURL}/${nic}/lock`, nic)
  }

  dirrectUnlockAccount(nic: string) {
    return this.http.put(`${this.BaseStudentURL}/${nic}/Directunlock`, nic)
  }

  getStudentProfile(nic: string): Observable<StudentProfileDto> {

    return this.http.get<StudentProfileDto>(`${this.BaseStudentURL}/profile/${nic}`);
  }

  resetPassword(nic: string, passwordRequest: resetPassword) {
    https://localhost:7055/api/Students/123456789v/update-password
    return this.http.put(`${this.BaseStudentURL}/${nic}/update-password`, passwordRequest)
  }

  getSocialMediaLinks(nic:string){
    return this.http.get<SocialMediaLinks>(`${this.SocialMediaLinkURL}/${nic}`)
  }

  updateSocialMediaLinks(id:string,formData:any){
    return this.http.put(`${this.SocialMediaLinkURL}/${id}`,formData)
  }

  updatestudentDetails(nic: string,request:StudentUpdateRequestDto){
    https://localhost:7055/api/Students/update/
    return this.http.put(`${this.BaseStudentURL}/update/${nic}`,request)
  }

  updatePassword(nic: string, newPassword: string): Observable<any> {
    const payload = { nic,newPassword };
    return this.http.put(`${this.BaseStudentURL}/${nic}/unlock`, payload);
  }

  updateStudentImage(nic: string, formData: FormData): Observable<any> {
    const url = `${this.BaseStudentURL}/${nic}/update-image`;
    return this.http.put(url, formData).pipe(
      catchError((error) => {
        console.error('Error updating student image', error);
        throw error;
      })
    );
  }

  
  
}
