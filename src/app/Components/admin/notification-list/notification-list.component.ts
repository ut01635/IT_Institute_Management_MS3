import { Component, OnInit } from '@angular/core';
import { Message } from '../../../Services/Modal';
import { NotificationService } from '../../../Services/notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent implements OnInit {
    messages:Message[] = [];
    messageDateFilter: null = null;
  
    constructor(private notificationService: NotificationService){}
  
    ngOnInit(): void {
      this.loadMessages()
    }
  
    loadMessages(){
      this.notificationService.getStudentMessage().subscribe(data=>{
        this.messages = data;
        console.log(this.messages);
        
      },error=>{
        console.log(error.error);    
      })
    }
  
    deleteMessage(id:string){
      this.notificationService.deleteMessage(id).subscribe(data=>{
        alert('successfully deleted')
        this.loadMessages()
      },error=>{
        alert(error.error)
      })
    }
  }

