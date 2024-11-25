import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.css'
})
export class StudentPageComponent {
 
  constructor(
    private router:Router,
    private authservice: AuthService
  ){}

  isSidebarVisible = false;  // Initially set the sidebar visibility to false
studentName :string ='user' ;

activeTab: string = 'home';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Function to toggle the sidebar visibility on mobile
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  logout() {
    this.authservice.logout()
    }

}
