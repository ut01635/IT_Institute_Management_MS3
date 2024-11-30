import { Component, OnInit } from '@angular/core';
import { enquiry } from '../../../Services/Modal';
import { EnquiryService } from '../../../Services/enquiry.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnquiryReplayFormComponent } from '../../../Modals/admin/enquiry-replay-form/enquiry-replay-form.component';


@Component({
  selector: 'app-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrl: './enquiry-list.component.css'
})
export class EnquiryListComponent implements OnInit {


 

  enquirys: enquiry[] = [];
  searchText: string = '';

  constructor(
    private enquiryService: EnquiryService,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadEnquiries();
  }

  loadEnquiries(){
    this.enquiryService.getEnquiries().subscribe((data) => {
      this.enquirys = data;
    });
  }

   // Open modal and pass enquiry.email to the modal component
   openModal(email: string): void {
    const modalRef = this.modalService.open(EnquiryReplayFormComponent); // Open the modal
    modalRef.componentInstance.email = email; // Pass the email to the modal component
  }

  onDelete(id: string): void {
    this.enquiryService.deleteEnquiry(id).subscribe(data=>{
      alert(data)
      this.loadEnquiries()
    },error=>{
      alert(error.error)
    })
  }


}
