import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../Services/Modal';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  
  transform(students: Student[], searchText: string): Student[] {
    if (!students || !searchText) {
      return students; 
    }

    searchText = searchText.toLowerCase();

    return students.filter(student => 
      student.firstName.toLowerCase().includes(searchText) ||
      student.lastName.toLowerCase().includes(searchText) ||
      student.nic.toLowerCase().includes(searchText)
    );
  }


}
