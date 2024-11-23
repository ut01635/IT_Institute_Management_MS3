import { Pipe, PipeTransform } from '@angular/core';
import { Announcement } from '../Services/Modal';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(announcements: Announcement[], startDate: string, endDate: string): Announcement[] {
    // If no dates are provided, return the original list
    if (!startDate && !endDate) {
      return announcements;
    }

    // Convert start and end dates to Date objects
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return announcements.filter(announcement => {
      const announcementDate = new Date(announcement.date);

      // If both start and end date are provided, filter by range
      if (start && end) {
        return announcementDate >= start && announcementDate <= end;
      }

      // If only start date is provided, filter by start date
      if (start) {
        return announcementDate >= start;
      }

      // If only end date is provided, filter by end date
      if (end) {
        return announcementDate <= end;
      }

      return true; // Default case if no filtering is needed
    });
  }

}
