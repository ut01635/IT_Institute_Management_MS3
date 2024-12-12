import { Pipe, PipeTransform } from '@angular/core';
import { Course, Student } from '../Services/Modal';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: any[], searchText: string): any[] {
    if (!data || !searchText) {
      return data; 
    }

    searchText = searchText.toLowerCase();

  
    if (data.length > 0 && data[0].firstName) {
   
      return data.filter(student =>
        student.firstName.toLowerCase().includes(searchText) ||
        student.lastName.toLowerCase().includes(searchText) ||
        student.nic.toLowerCase().includes(searchText)
      );
    } else if (data.length > 0) {
     
      return data.filter(payment =>
        payment.enrollment?.course?.courseName.toLowerCase().includes(searchText) ||
        payment.enrollment?.course?.level?.toLowerCase().includes(searchText)
      );
    }

   
    return data;
  }
}
