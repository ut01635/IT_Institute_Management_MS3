import { Pipe, PipeTransform } from '@angular/core';
import { Announcement, Payment } from '../Services/Modal';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(payments: Payment[], selectedDate: Date): Payment[] {
    if (!selectedDate) {
      return payments; // Return all announcements if no date is selected
    }

    // Filter announcements that match the selected date (ignoring the time part)
    return payments.filter(payments => {
      const announcementDate = new Date(payments.date);
      
      // Compare only the date parts, not the time parts
      return announcementDate.toDateString() === selectedDate.toDateString();
    });
  }
}
