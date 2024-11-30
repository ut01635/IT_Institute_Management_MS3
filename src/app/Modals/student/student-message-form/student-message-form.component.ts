import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NotificationService } from '../../../Services/notification.service';
import { MessageRequest } from '../../../Services/Modal';

@Component({
  selector: 'app-student-message-form',
  templateUrl: './student-message-form.component.html',
  styleUrl: './student-message-form.component.css'
})
export class StudentMessageFormComponent {
  message: string = '';
  studentNIC: string = localStorage.getItem('NIC') || '';
  currentDate: Date = new Date();


  @ViewChild('modalForm', { static: false }) modal: any;
  constructor(private messageService:NotificationService) {}

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
          this.modal.hide();
        },
        (error) => {
          alert('Error submitting message.');
          console.error('Error:', error);
        }
      );
  } 
}
