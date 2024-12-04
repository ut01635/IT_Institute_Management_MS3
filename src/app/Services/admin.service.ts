import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { admin } from './Modal';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminBaseURL = 'https://localhost:7055/api/Admin';
  // private adminBaseURL = 'https://svts85hv-7055.asse.devtunnels.ms/api/Admin';


  private adminsSubject = new BehaviorSubject<admin[]>([]);
  public admins$ = this.adminsSubject.asObservable();

  constructor(private http: HttpClient) {}

  

  getAdmins(): Observable<admin[]> {
    return this.http.get<admin[]>(this.adminBaseURL).pipe(
      catchError((error) => {
        console.error('Error fetching admins', error);
        return [];
      })
    );
  }

  
  addAdmin(formData: FormData): Observable<admin> {
    return this.http.post<admin>(this.adminBaseURL, formData).pipe(
      catchError((error) => {
        console.error('Error adding admin', error);
        throw error;
      })
    );
  }

  deleteAdmin(nic: string) {
    const deleteUrl = `${this.adminBaseURL}/${nic}`;
    return this.http.delete(deleteUrl).pipe(
      catchError((error) => {
        console.error('Error deleting admin', error);
        throw error;
      })
    );
  }


  updateAdmin(nic: string, formData: FormData): Observable<admin> {
    const updateUrl = `${this.adminBaseURL}/${nic}`;
    return this.http.put<admin>(updateUrl, formData).pipe(
      catchError((error) => {
        console.error('Error updating admin', error);
        throw error;
      })
    );
  }
  
  refreshAdminList(): void {
    this.getAdmins().subscribe((admins) => {
      this.adminsSubject.next(admins); 
    });
  }

  getAdminByNic(nic:string){
    return this.http.get<admin>(`${this.adminBaseURL}/${nic}`)
  }


}
