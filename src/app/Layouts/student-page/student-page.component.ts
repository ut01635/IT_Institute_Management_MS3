import { Component } from '@angular/core';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.css'
})
export class StudentPageComponent {

  isSidebarVisible = false;  // Initially set the sidebar visibility to false

  // Function to toggle the sidebar visibility on mobile
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

}
