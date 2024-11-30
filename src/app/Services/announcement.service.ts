import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Announcement, AnnouncementRequest } from './Modal';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  baseURL: string = 'https://localhost:7055/api/Announcement';
  private announcementSubject = new BehaviorSubject<Announcement[]>([]);
  public announcement$ = this.announcementSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllAnnouncements(): any {
    this.http.get<Announcement[]>(this.baseURL).pipe(
      catchError((error) => {
        console.error('Error fetching announcement', error);
        return throwError(() => error); 
      })
    ).subscribe(
      (announcements: Announcement[]) => {
        this.announcementSubject.next(announcements); 
      },
      (error) => {
        console.error('Failed to load announcements', error);
      }
    );
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
