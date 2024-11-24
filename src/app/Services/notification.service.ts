import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from './Modal';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseURL:string= 'https://localhost:7055/api/Notification';

  constructor(private http: HttpClient) { }

 getMessageByNIC(nic:string){
  return this.http.get<Message[]>(this.baseURL+`/nic/${nic}`)
 }

 deleteMessage(id:string){
  return this.http.delete(this.baseURL+`/${id}`)
 }

}
