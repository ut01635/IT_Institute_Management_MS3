import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../../Services/notification.service';
import { Message } from '../../../Services/Modal';
import { CourseFormComponent } from '../../../Modals/admin/course-form/course-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnnouncementFormComponent } from '../../../Modals/admin/announcement-form/announcement-form.component';
import { StudentMessageFormComponent } from '../../../Modals/student/student-message-form/student-message-form.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  @ViewChild(StudentMessageFormComponent) StudentMessageFormComponent!: StudentMessageFormComponent;

  messages:Message[] = [];
  messageDateFilter: null = null;
  nic:string=''

  constructor(
    private notificationService: NotificationService,
    private modalService: NgbModal
  ){}

  ngOnInit(): void {
    this.nic = localStorage.getItem('NIC')||'';
    this.loadMessages(this.nic)
  }


   // Open modal and pass enquiry.email to the modal component
   openModal(): void {
    const modalRef = this.modalService.open(StudentMessageFormComponent); 
  }

  loadMessages(nic:string){
    this.notificationService.getMessageByNIC(nic).subscribe(data=>{
      this.messages = data;
      this.messages.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA; // Sort in descending order
      });

    },error=>{
      console.log(error.error);    
    })
  }

  deleteMessage(id:string){
    this.notificationService.deleteMessage(id).subscribe(data=>{
      alert('successfully deleted')
      this.loadMessages(this.nic)
    },error=>{
      alert(error.error)
    })
  }
}
