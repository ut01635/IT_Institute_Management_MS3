import { Component } from '@angular/core';
import { admin } from '../../../Services/Modal';
import { AdminService } from '../../../Services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminFormComponent } from '../../../Modals/admin/admin-form/admin-form.component';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent {
  searchText: string = '';
  admins: admin[] = [];
  baseUrl = 'https://localhost:7055'; 

  constructor(private adminService: AdminService,private modalService: NgbModal) {}

  ngOnInit(): void {
    this.adminService.admins$.subscribe((data) => {
      this.admins = data;
    });

    this.adminService.refreshAdminList();
  }


  onDelete(nic: string): void {
    
    const confirmDelete = window.confirm("Are you sure you want to delete this admin?");
    
    if (confirmDelete) {
      
      this.adminService.deleteAdmin(nic).subscribe(
        (response) => {
          console.log("Admin deleted successfully", response);
          alert("Admin deleted successfully");
          
          this.adminService.refreshAdminList();
        },
        (error) => {
          console.error("Error deleting admin", error);
          alert("An error occurred while deleting the admin.");
        }
      );
    }
  }

  
  onEdit(nic: string): void {
    const adminToEdit = this.admins.find(admin => admin.nic === nic);
    const modalRef = this.modalService.open(AdminFormComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.adminToEdit = adminToEdit;
  }

  openModal() {
    
    const modalRef = this.modalService.open(AdminFormComponent, {
      size: 'lg'
    });

    
    modalRef.result.then(
      (result: any) => {
        console.log('Modal closed', result);
      },
      (reason: any) => {
        console.log('Modal dismissed', reason);
      }
    );
  }


}
