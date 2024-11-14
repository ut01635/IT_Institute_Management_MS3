import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  title = 'coding-academy';
  isSidebarVisible = false; // Default is sidebar hidden on small screens

  // Function to toggle the sidebar visibility
  toggleSidebar() {
    this.isSidebarVisible = true;
  }
}
