import { Component, OnInit } from '@angular/core';
import { enquiry } from '../../../Services/Modal';
import { EnquiryService } from '../../../enquiry.service';

@Component({
  selector: 'app-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrl: './enquiry-list.component.css'
})
export class EnquiryListComponent implements OnInit {


  enquirys: enquiry[] = [];
  searchText: string = '';

  constructor(private enquiryService: EnquiryService) {}

  ngOnInit(): void {
    
    this.enquiryService.getEnquiries().subscribe((data) => {
      this.enquirys = data;
    });
  }

  onView(id: string): void {
   
    console.log('View enquiry with ID:', id);
  }

  onDelete(id: string): void {
   
    console.log('Delete enquiry with ID:', id);
  }

  onReplay(email: string): void {
  
    console.log('Reply to enquiry with email:', email);
  }

}
