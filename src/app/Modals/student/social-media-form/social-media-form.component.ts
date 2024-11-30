import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { StudentService } from '../../../Services/student.service';

@Component({
  selector: 'app-social-media-form',
  templateUrl: './social-media-form.component.html',
  styleUrl: './social-media-form.component.css'
})
export class SocialMediaFormComponent implements OnInit {
  @Input() studentNIC!: string; // Pass the NIC dynamically when opening the modal
  @Input() id!: string

  socialMediaForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal, // To close the modal
    private studentService: StudentService
  ) {
    this.createForm();
  }

  private createForm() {
    this.socialMediaForm = this.fb.group({
      linkedIn: ['', [Validators.pattern(/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/.*$/)]],
      instagram: ['', [Validators.pattern(/^(http(s)?:\/\/)?([\w]+\.)?instagram\.com\/.*$/)]],
      facebook: ['', [Validators.pattern(/^(http(s)?:\/\/)?([\w]+\.)?facebook\.com\/.*$/)]],
      gitHub: ['', [Validators.pattern(/^(http(s)?:\/\/)?([\w]+\.)?github\.com\/.*$/)]],
      whatsApp: ['', [Validators.pattern(/^\d{10,15}$/)]],
      studentNIC: [this.studentNIC, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.studentService.getSocialMediaLinks(this.studentNIC).subscribe(data => {
      this.socialMediaForm.patchValue(data);
    })
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.socialMediaForm.invalid) {
      return;
    }

    const formData = {
      request: this.socialMediaForm.value,
      id: this.id
    }
    this.studentService.updateSocialMediaLinks(formData.id, formData.request).subscribe(data => {
      alert('Update successfuly');
      this.activeModal.close();
    }, error => {
      alert('Update faild');
    })
  }


}
