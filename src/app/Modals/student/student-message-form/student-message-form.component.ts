import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NotificationService } from '../../../Services/notification.service';
import { MessageRequest } from '../../../Services/Modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-message-form',
  templateUrl: './student-message-form.component.html',
  styleUrl: './student-message-form.component.css'
})
export class StudentMessageFormComponent {
  message: string = '';
  studentNIC: string = localStorage.getItem('NIC') || '';
  currentDate: Date = new Date();


  constructor(private messageService:NotificationService,public activeModal: NgbActiveModal) {}

  onSubmit() {
    // Backend request payload
    const requestData:MessageRequest = {
      message: this.message,
      date: this.currentDate,
      studentNIC: this.studentNIC
    };

    this.messageService.postStudentmessage(requestData)
      .subscribe(
        (response) => {
          alert('Message submitted successfully!');
          console.log('Backend Response:', response);
         this.activeModal.close();
        },
        (error) => {
          alert('Error submitting message.');
          console.error('Error:', error);
        }
      );
  } 
}
