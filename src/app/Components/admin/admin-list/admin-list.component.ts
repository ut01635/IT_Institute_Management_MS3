import { Component } from '@angular/core';
import { admin } from '../../../Services/Modal';
import { AdminService } from '../../../Services/admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent {
  searchText: string = '';
  admins: admin[] = [];
  baseUrl = 'https://localhost:7055'; 

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAdmins().subscribe((data) => {
      this.admins = data;
    });
  }

  onDelete(nic: string): void {
    
    console.log('Delete admin with NIC:', nic);
  }

  onEdit(nic: string): void {
    
    console.log('Edit admin with NIC:', nic);
  }
}
