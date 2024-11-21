import { Component } from '@angular/core';
import { enquiry } from '../../../Services/Modal';

@Component({
  selector: 'app-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrl: './enquiry-list.component.css'
})
export class EnquiryListComponent {


  enquirys: enquiry[] = [];
  searchText: string='';


  onView(arg0: any) {
    throw new Error('Method not implemented.');
  }

  onDelete(arg0: any) {
    throw new Error('Method not implemented.');
  }
  onReplay(arg0: string) {
    throw new Error('Method not implemented.');
    }

}
