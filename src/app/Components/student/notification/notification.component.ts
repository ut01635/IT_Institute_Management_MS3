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
    this.loadNotifications('200206601718')
  }

  loadNotifications(nic:string){
    this.notificationService.getMessageByNIC(nic).subscribe(data=>{
      this.messages = data;
    },error=>{
      console.log(error.error);
      
    })
  }
}
