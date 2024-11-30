import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnnouncementService } from '../../../Services/announcement.service';
import { Announcement } from '../../../Services/Modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrl: './announcement-form.component.css'
})
export class AnnouncementFormComponent {
  announcementForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    public activeModal: NgbActiveModal
  ) {
    // Initialize the form group with reactive form controls and validators
    this.announcementForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', Validators.required],
    });
  }

  // Submit form and handle form data
  onSubmit() {
    if (this.announcementForm.valid) {
      const formData = {
        ...this.announcementForm.value,
        date: new Date().toISOString(), // Add the current date in ISO format
      };
      this.announcementService
        .CreateAnnouncement(formData)
        .subscribe(
          (response) => {
            alert(response);
            console.log('Announcement saved successfully:', response);
            this.activeModal.close(); // Close the modal after successful submission
            this.announcementService.refreshAnnouncementList()
          },
          (error) => {
            console.error('Error saving announcement:', error);
            alert(error.error)
          }
        );
    }
  }

}
