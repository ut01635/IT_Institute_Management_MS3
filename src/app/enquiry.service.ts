import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enquiry } from './Services/Modal';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  
  private enguiryGetApi = 'https://localhost:7055/api/Enquiry'; 

  constructor(private http: HttpClient) { }

 
  getEnquiries(): Observable<enquiry[]> {
    return this.http.get<enquiry[]>(this.enguiryGetApi);
  }
}
