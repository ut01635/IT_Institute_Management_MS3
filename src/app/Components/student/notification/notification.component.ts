import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../Services/notification.service';
import { Message } from '../../../Services/Modal';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {



  messages:Message[] = [];

  constructor(private notificationService: NotificationService){}

  ngOnInit(): void {
    this.loadMessages('200206601718')
  }

  loadMessages(nic:string){
    this.notificationService.getMessageByNIC(nic).subscribe(data=>{
      this.messages = data;
    },error=>{
      console.log(error.error);    
    })
  }

  deleteMessage(id:string){
    this.notificationService.deleteMessage(id).subscribe(data=>{
      alert('successfilly deleted')
      this.loadMessages('200206601718')
    },error=>{
      alert(error.error)
    })
  }
}
