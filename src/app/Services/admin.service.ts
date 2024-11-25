import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { admin } from './Modal';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private getAdminurl = 'https://localhost:7055/api/Admin';


  private adminsSubject = new BehaviorSubject<admin[]>([]);
  public admins$ = this.adminsSubject.asObservable();

  constructor(private http: HttpClient) {}

  

  getAdmins(): Observable<admin[]> {
    return this.http.get<admin[]>(this.getAdminurl).pipe(
      catchError((error) => {
        console.error('Error fetching admins', error);
        return [];
      })
    );
  }

  
  addAdmin(formData: FormData): Observable<admin> {
    return this.http.post<admin>(this.getAdminurl, formData).pipe(
      catchError((error) => {
        console.error('Error adding admin', error);
        throw error;
      })
    );
  }

  
  refreshAdminList(): void {
    this.getAdmins().subscribe((admins) => {
      this.adminsSubject.next(admins); 
    });
  }

  
}
