import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrl: './student-report.component.css'
})
export class StudentReportComponent  implements OnInit {

  reportForm!: FormGroup; // Reactive form group
  selectedCourse: string = '';
  reportData: any = null;

  // Example data for demonstration
  months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' }
  ];
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
     // Initialize the form with a required NIC field
     this.reportForm = this.fb.group({
      nic: ['', Validators.required]  // NIC field is required
    });
  }

  onsubmit()
  {
    console.log(this.reportForm.value);
    let nicNumber:string = this.reportForm.value
    if (nicNumber) {
      // Fetch data based on NIC (Simulating data for now)
      this.reportData = {
        nic: nicNumber,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        courses: [
          { id: 'course1', name: 'Math 101' },
          { id: 'course2', name: 'Science 101' }
        ],
        fee: 500,
        paymentPlan: 'Monthly',
        paidAmount: 200,
        dueAmount: 300,
        payments: [
          { date: '2023-11-01', courseName: 'Math 101', amount: 100 },
          { date: '2023-11-15', courseName: 'Science 101', amount: 100 }
        ]
      };
    }
  }

  // Method to simulate report generation
  generateReport() {
    
  }

  // Method to handle course selection
  selectCourse() {
    console.log('Selected course:', this.selectedCourse);
  }

}