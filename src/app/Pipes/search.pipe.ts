import { Pipe, PipeTransform } from '@angular/core';
import { Course, Student } from '../Services/Modal';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: any[], searchText: string): any[] {
    if (!data || !searchText) {
      return data; // Return original data if no search text
    }

    searchText = searchText.toLowerCase();

    // Check if data contains Student objects or Course objects
    if (data.length > 0 && data[0].firstName) {
      // If it's a Student array
      return data.filter(student => 
        student.firstName.toLowerCase().includes(searchText) ||
        student.lastName.toLowerCase().includes(searchText) ||
        student.nic.toLowerCase().includes(searchText)
      );
    } else if (data.length > 0 && data[0].courseName) {
      // If it's a Course array
      return data.filter(payment => 
        payment.courseName.toLowerCase().includes(searchText) ||
        payment.level.toLowerCase().includes(searchText)
      );
    }

    // If data type is neither Student nor Course
    return data;
  }
}
