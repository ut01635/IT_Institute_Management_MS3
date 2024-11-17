import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  title = 'coding-academy';
  isSidebarVisible = false; // Default is sidebar hidden on small screens

  greeting: string = '';

  // Function to toggle the sidebar visibility
  toggleSidebar() {
    this.isSidebarVisible = true;
  }

  constructor() {
    this.setGreeting();
  }

  setGreeting() {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      this.greeting = 'Hello admin, Good Morning';
    } else if (hours >= 12 && hours < 18) {
      this.greeting = 'Hello admin, Good Afternoon';
    } else {
      this.greeting = 'Hello admin, Good Evening';
    }
  }
}
