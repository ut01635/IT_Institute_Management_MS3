import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailRequest, enquiry } from './Modal';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  private enquiryBaseURL = 'https://localhost:7055/api/ContactUs'; 
  

  constructor(private http: HttpClient) { }

 
  getEnquiries(): Observable<enquiry[]> {
    return this.http.get<enquiry[]>(this.enquiryBaseURL);
  }

  postEnquiry(enquiry: enquiry){
    return this.http.post(this.enquiryBaseURL,enquiry,{
      responseType: 'text'
    })
  }
  // https://localhost:7055/api/ContactUs/a9cb4ee4-1b3c-49ef-a96c-6e8b2dee545a
  deleteEnquiry(id:string){
    return this.http.delete(`${this.enquiryBaseURL}/${id}`,
      {responseType:'text'}
    )
  }

  replyEnquiry(emailRequest:EmailRequest){
    return this.http.post(`${this.enquiryBaseURL}/send-email`,emailRequest,
    {responseType:'text'}
    )
  }

}
