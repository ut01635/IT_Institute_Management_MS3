import { Pipe, PipeTransform } from '@angular/core';
import { enquiry } from '../Services/Modal';

@Pipe({
  name: 'enquirySearch'
})
export class EnquirySearchPipe implements PipeTransform {

  transform(enquirys: enquiry[], searchText: string): enquiry[] {
    if (!enquirys || !searchText) {
      return enquirys;  
    }

    searchText = searchText.toLowerCase(); 

    return enquirys.filter(enquiry => {
      const nameMatches = enquiry.name.toLowerCase().includes(searchText);  
      const dateMatches = enquiry.date ? new Date(enquiry.date).toLocaleDateString().includes(searchText) : false;  

      return nameMatches || dateMatches;
    });
  }

}
