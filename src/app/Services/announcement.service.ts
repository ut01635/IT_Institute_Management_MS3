import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Announcement, AnnouncementRequest } from './Modal';
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

  CreateAnnouncement(announcement:AnnouncementRequest){
    return this.http.post(this.baseURL,announcement,{
      responseType: 'text'
    });
  }

  deleteAnnouncement(id:string){
    return this.http.delete(this.baseURL+'/'+ id,{
       responseType: 'text'
    });
  }


  refreshAnnouncementList():void{
    this.getAllAnnouncements()
  }

}
