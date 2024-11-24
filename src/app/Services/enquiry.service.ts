import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enquiry } from './Modal';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  private enguiryGetApi = 'https://localhost:7055/api/ContactUs'; 

  constructor(private http: HttpClient) { }

 
  getEnquiries(): Observable<enquiry[]> {
    return this.http.get<enquiry[]>(this.enguiryGetApi);
  }

  postEnquiry(enquiry: enquiry){
    return this.http.post(this.enguiryGetApi,enquiry)
  }

}
