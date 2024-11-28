import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { AdminService } from '../../Services/admin.service';
import { admin } from '../../Services/Modal';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  title = 'DevHub';
  isSidebarVisible = false; // Default is sidebar hidden on small screens
  isDarkMode = false; // Default to light mode
  admin:admin | null= null;
  baseUrl: string = 'https://localhost:7055';
  userRole:string = ''
  


  activeTab: string = 'dashboard'; // Default to 'dashboard'


  // Function to set the active tab
  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }


  // Function to toggle sidebar visibility
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  constructor(private authservice:AuthService, private adminService:AdminService) {
    
  }
  

  ngOnInit(): void {
    // Check saved theme preference in localStorage
    const savedTheme = localStorage.getItem('sidebar-theme');
    this.isDarkMode = savedTheme === 'dark';
    this.updateTheme();

    this.userRole = localStorage.getItem('Role') as string;
    const nic:string = localStorage.getItem('NIC') as string;
    this.adminService.getAdminByNic(nic).subscribe(data=>{
      this.admin = data
    },error=>{
      console.log(error.error);     
    })
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
