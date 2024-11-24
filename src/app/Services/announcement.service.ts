import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Announcement } from './Modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  baseURL: string = 'https://localhost:7055/api/Announcement'

  constructor(private http: HttpClient) { }

  getAllAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.baseURL);
  }

  CreateAnnouncement(announcement:Announcement){
    return this.http.post(this.baseURL,announcement);
  }

  deleteAnnouncement(id:string){
    return this.http.delete(this.baseURL+'/'+ id);
  }

}
