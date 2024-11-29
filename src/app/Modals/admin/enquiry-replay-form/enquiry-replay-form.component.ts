import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-enquiry-replay-form',
  templateUrl: './enquiry-replay-form.component.html',
  styleUrl: './enquiry-replay-form.component.css'
})
export class EnquiryReplayFormComponent implements OnInit {
  @Input() email!: string;  // Receiving email from the parent component

  emailForm!: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    // Initialize the form and access the email passed from the parent
    this.emailForm = this.fb.group({
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });

    // Log email to verify that it was passed correctly
    console.log('Received email:', this.email);
  }

  onSubmit(): void {
    if (this.emailForm.valid) {
      const formData = this.emailForm.value;
      console.log('Form Data:', formData);
      // Handle form submission (e.g., send the email)
      this.activeModal.close('Email Sent');
    }
  }
}
