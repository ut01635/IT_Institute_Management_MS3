import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-social-media-form',
  templateUrl: './social-media-form.component.html',
  styleUrl: './social-media-form.component.css'
})
export class SocialMediaFormComponent {
  @Input() studentNIC!: string; // Pass the NIC dynamically when opening the modal
  @Input() id!:string

  socialMediaForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal // To close the modal
  ) {
    this.createForm();
  }

  private createForm() {
    this.socialMediaForm = this.fb.group({
      id:[this.id],
      linkedIn: ['', [Validators.pattern(/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/.*$/)]],
      instagram: ['', [Validators.pattern(/^(http(s)?:\/\/)?([\w]+\.)?instagram\.com\/.*$/)]],
      facebook: ['', [Validators.pattern(/^(http(s)?:\/\/)?([\w]+\.)?facebook\.com\/.*$/)]],
      gitHub: ['', [Validators.pattern(/^(http(s)?:\/\/)?([\w]+\.)?github\.com\/.*$/)]],
      whatsApp: ['', [Validators.pattern(/^\d{10,15}$/)]],
      studentNIC: [this.studentNIC, [Validators.required]],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.socialMediaForm.invalid) {
      return;
    }

    const formData = this.socialMediaForm.value;

    // Mock API call or integrate with your service
    console.log('Form Submitted:', formData);

    // Close the modal after successful submission
    this.activeModal.close();
  }

  
}
