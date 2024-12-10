import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnrollmentSummaryResponseDto, RevenueSummaryResponseDto, SummaryResponse } from './Modal';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  
  private BaseSummaryURL: string = 'https://localhost:7055/api/Summery/'

  constructor(private http: HttpClient) { }

  getSummary(){
   return this.http.get<SummaryResponse>(this.BaseSummaryURL+'summary')
  }

  GetEnrollmentSummary(){
    return this.http.get<EnrollmentSummaryResponseDto>(this.BaseSummaryURL+ 'enrollment-summary')
  }

  GetRevenueSummary(){
    return this.http.get<RevenueSummaryResponseDto>(this.BaseSummaryURL+'revenue-summary')
  }
}
