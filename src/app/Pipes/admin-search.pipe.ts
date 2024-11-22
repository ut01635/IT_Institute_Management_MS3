import { Pipe, PipeTransform } from '@angular/core';
import { admin } from '../Services/Modal';

@Pipe({
  name: 'adminSearch'
})
export class AdminSearchPipe implements PipeTransform {

  transform(admins: admin[], searchText: string): admin[] {
    if (!admins || !searchText) {
      return admins; 
    }

    searchText = searchText.toLowerCase(); 

    return admins.filter(admin =>
      admin.name.toLowerCase().includes(searchText) || 
      admin.nic.toLowerCase().includes(searchText)
    );
  }

}
