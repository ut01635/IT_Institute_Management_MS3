import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../Services/notification.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrl: './notification-form.component.css'
})
export class NotificationFormComponent {

  messageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: NotificationService,
    public activeModal: NgbActiveModal
  ) {
    this.messageForm = this.fb.group({
      studentNIC: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{9}[vVxX]$|^\d{12}$/), // Validates NIC formats
        ],
      ],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.messageForm.valid) {
      const formData = this.messageForm.value
console.log(formData);

      this.messageService.postAdminMessage(formData).subscribe(
        (response) => {
          alert('Message sent successfully!');
          console.log('Message sent:', response);
          this.activeModal.close();
        },
        (error) => {
          console.error('Error sending message:', error);
          alert('Failed to send message. Please try again.');
        }
      );
    }
  }

  // Getter for easier access to form controls
  get f() {
    return this.messageForm.controls;
  }
}
