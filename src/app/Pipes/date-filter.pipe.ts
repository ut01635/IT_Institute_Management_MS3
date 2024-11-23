import { Pipe, PipeTransform } from '@angular/core';
import { Announcement } from '../Services/Modal';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(announcements: Announcement[], startDate: string, endDate: string): Announcement[] {
    if (!announcements || (!startDate && !endDate)) {
      return announcements;
    }

    return announcements.filter(announcement => {
      const announcementDate = new Date(announcement.date);
      
      // If startDate and endDate are provided
      const isAfterStart = startDate ? announcementDate >= new Date(startDate) : true;
      const isBeforeEnd = endDate ? announcementDate <= new Date(endDate) : true;

      return isAfterStart && isBeforeEnd;
    });
  }
}
