import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailRequest } from '../../../Services/Modal';
import { EnquiryService } from '../../../Services/enquiry.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-enquiry-replay-form',
  templateUrl: './enquiry-replay-form.component.html',
  styleUrl: './enquiry-replay-form.component.css'
})
export class EnquiryReplayFormComponent implements OnInit {
  @Input() email!: string;  // Receiving email from the parent component

  emailForm!: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,private enquirySrvice:EnquiryService,private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    // Initialize the form and access the email passed from the parent
    this.emailForm = this.fb.group({
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });

    // Log email to verify that it was passed correctly
    console.log('Received email:', this.email);
  }

  showSpinner(name: string) {
    this.spinner.show(name);
  }

  hideSpinner(name: string) {
    this.spinner.hide(name);
  }




  onSubmit(email: string): void {
    if (this.emailForm.valid) {
      // Get the form data
      let formData = this.emailForm.value;
      this.showSpinner('enquiry')
  
      // Create the emailRequest object using the form data
      const emailRequest: EmailRequest = {
        email: email,
        subject: formData.subject,
        body: formData.body,
      };
  
      // Call the replyEnquiry method
      this.enquirySrvice.replyEnquiry(emailRequest).subscribe(
        (response) => {
          this.hideSpinner('enquiry')
          // Handle success (email sent)
          alert(response)
          console.log(response); // You can log the response or show a success message
          this.activeModal.close('Email Sent'); // Close modal with success message
        },
        (error) => {
          this.hideSpinner('enquiry')
          // Handle error
          alert(error.error)
          console.error(error); // Log the error or show an error message
          this.activeModal.close('Email Failed'); // Close modal with failure message
        }
      );
    } else {
      // Handle invalid form submission
      console.log("Form is invalid");
    }
  }
  
}
