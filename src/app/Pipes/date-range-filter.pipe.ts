import { Pipe, PipeTransform } from '@angular/core';
import { Announcement } from '../Services/Modal';

@Pipe({
  name: 'dateRangeFilter'
})
export class DateRangeFilterPipe implements PipeTransform {

  transform(
    announcements: Announcement[],
    dateRange: [Date, Date] | null
  ): Announcement[] {
    if (!announcements || !dateRange || dateRange.length !== 2) {
      return announcements; // Return all if no valid date range is selected
    }

    const [startDate, endDate] = dateRange;

    return announcements.filter((announcement) => {
      const announcementDate = new Date(announcement.date);

      // Check if the announcement date falls within the range
      const isAfterStart = startDate ? announcementDate >= startDate : true;
      const isBeforeEnd = endDate ? announcementDate <= endDate : true;

      return isAfterStart && isBeforeEnd;
    });
  }


}
