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
    this.adminService.getAdmins().subscribe((data) => {
      this.admins = data;
    });

    this.adminService.getAdmins();
  }

  onDelete(nic: string): void {
    
    console.log('Delete admin with NIC:', nic);
  }

  onEdit(nic: string): void {
    
    console.log('Edit admin with NIC:', nic);
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
