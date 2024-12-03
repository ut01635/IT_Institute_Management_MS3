import { Component, OnInit } from '@angular/core';
import { Message } from '../../../Services/Modal';
import { NotificationService } from '../../../Services/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationFormComponent } from '../../../Modals/admin/notification-form/notification-form.component';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent implements OnInit {
    messages:Message[] = [];
    messageDateFilter: null = null;
  
    constructor(private notificationService: NotificationService,private modalService: NgbModal){}
  
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
      this.notificationService.deleteStudentMessage(id).subscribe(data=>{
        alert('successfully deleted')
        this.loadMessages()
      },error=>{
        alert(error.error)
      })
    }


    openModal() {
    
      const modalRef = this.modalService.open(NotificationFormComponent, {
        size: 'lg'
      });
  
      
      modalRef.result.then(
        (result: any) => {
          console.log('Modal closed', result);
        },
        (reason: any) => {
          console.log('Modal dismissed', reason);
        }
      );
    }
  }

