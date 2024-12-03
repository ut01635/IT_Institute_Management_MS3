import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message, MessageRequest } from './Modal';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseURL:string= 'https://localhost:7055/api/Notification';
  studenMessageURL:string = 'https://localhost:7055/api/StudentMessage'

  constructor(private http: HttpClient) { }

 getMessageByNIC(nic:string){
  return this.http.get<Message[]>(this.baseURL+`/nic/${nic}`)
 }

 postAdminMessage(nic:string,message:string){
  return this.http.post(`${this.baseURL}/send?studentNIC=${nic}`,message)
 }

 deleteMessage(id:string){
  return this.http.delete(this.baseURL+`/${id}`)
 }

 getStudentMessage(){
  return this.http.get<Message[]>(this.studenMessageURL)
 }

 postStudentmessage(message:MessageRequest){
  return this.http.post(this.studenMessageURL,message)
 }

 deleteStudentMessage(id:string){
  return this.http.delete(this.studenMessageURL+`/${id}`)
 }

}
