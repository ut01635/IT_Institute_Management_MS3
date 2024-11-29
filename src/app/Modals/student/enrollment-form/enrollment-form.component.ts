import { Component } from '@angular/core';

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrl: './enrollment-form.component.css'
})
export class EnrollmentFormComponent {
  curriculumCards = [
    {
      title: 'Web Development',
      description: 'JAN 2019 Web Development',
      location: 'Conference Room',
      date: '21st May 2019 - 29th June 2019',
      image: 'assets/web-dev.png', // Outside image
      progress: 40
    },
    {
      title: 'Web Designing',
      description: 'JAN 2019 Web Designing',
      location: 'Computer Lab',
      date: '21st May 2019 - 29th June 2019',
      image: 'assets/web-design.png', // Outside image
      progress: 60
    }
  ];

  // Method to dynamically generate the gradient background
  getProgressStyle(progress: number): string {
    const angle = progress * 3.6; // Convert percentage to degrees
    return `conic-gradient(#ffc107 ${angle}deg, #343a40 0deg)`;
  }
}
