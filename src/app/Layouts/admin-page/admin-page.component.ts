import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  title = 'DevHub';
  isSidebarVisible = false; // Default is sidebar hidden on small screens
  isDarkMode = false; // Default to light mode

  // Function to toggle the sidebar visibility
  toggleSidebar() {
    this.isSidebarVisible = true; // Toggle the sidebar visibility
  }

  constructor(private authservice:AuthService) {
    
  }
  

  ngOnInit(): void {
    // Check saved theme preference in localStorage
    const savedTheme = localStorage.getItem('sidebar-theme');
    this.isDarkMode = savedTheme === 'dark';
    this.updateTheme();
  }

  // Toggle between dark and light mode
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('sidebar-theme', this.isDarkMode ? 'dark' : 'light');
    this.updateTheme();
  }

  // Update the sidebar theme class
  updateTheme(): void {
    const sidebar = document.getElementById('sidebar');
    if (this.isDarkMode) {
      sidebar?.classList.add('dark-mode');
      sidebar?.classList.remove('light-mode');
    } else {
      sidebar?.classList.add('light-mode');
      sidebar?.classList.remove('dark-mode');
    }
  }

  logout() {
    this.authservice.logout()
    }

 
}
