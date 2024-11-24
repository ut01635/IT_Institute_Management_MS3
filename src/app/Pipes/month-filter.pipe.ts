import { Pipe, PipeTransform } from '@angular/core';
import { Announcement } from '../Services/Modal';

@Pipe({
  name: 'monthFilter'
})
export class MonthFilterPipe implements PipeTransform {
  
  transform(announcements: Announcement[], selectedMonth: string): Announcement[] {
    if (!announcements || !selectedMonth) {
      return announcements;
    }

    return announcements.filter(announcement => {
      const announcementDate = new Date(announcement.date);
      const announcementMonth = (announcementDate.getMonth() + 1).toString(); // getMonth() returns a 0-based month, so add 1
      return announcementMonth === selectedMonth;
    });
  }

}
