import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.css'
})
export class StudentPageComponent {
 
  constructor(
    private router:Router
  ){}

  isSidebarVisible = false;  // Initially set the sidebar visibility to false
studentName :string ='user' ;

  // Function to toggle the sidebar visibility on mobile
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  logout() {
    
    }

}
