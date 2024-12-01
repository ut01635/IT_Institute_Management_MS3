import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EnrollmentService } from '../../../Services/enrollment.service';

@Component({
  selector: 'app-payment-plan-form',
  templateUrl: './payment-plan-form.component.html',
  styleUrl: './payment-plan-form.component.css'
})
export class PaymentPlanFormComponent implements OnInit {
  @Input() studentNIC!: string;
  @Input() CourseId!:string;
  

  paymentForm!: FormGroup;

constructor(
  private enrollmentService: EnrollmentService,
  private fb: FormBuilder,
  public activeModal: NgbActiveModal,
){}

ngOnInit(): void {
  this.paymentForm = this.fb.group({
    paymentPlan: ['', Validators.required]
  });
}
  //  Submit Payment Plan
  submitPaymentPlan(): void {
    const enrolmentData = {
      paymentPlan: this.paymentForm.get('paymentPlan')?.value,
      studentNic: this.studentNIC,
      courseId: this.CourseId
    }
    if (this.paymentForm.valid) {
      this.enrollmentService.createEnrollment(enrolmentData).subscribe(data => {
        this.paymentForm.reset();
        alert("You have sucessfully enroll")
        this.activeModal.close();
      }, error => {
        // this.activeModal.close();
        alert(error.error)
      })

    }
  }
}
