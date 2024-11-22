import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { admin } from './Modal';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private getAdminurl = 'https://localhost:7055/api/Admin'; 

  constructor(private http: HttpClient) { }

  
  getAdmins(): Observable<admin[]> {
    return this.http.get<admin[]>(this.getAdminurl);
  }
}
