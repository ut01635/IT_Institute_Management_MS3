import { Pipe, PipeTransform } from '@angular/core';
import { Enrollment } from '../Services/Modal';

@Pipe({
  name: 'enrollDateRangeFilter'
})
export class EnrollDateRangeFilterPipe implements PipeTransform {

  transform(
    enrollments: Enrollment[], // The list of enrollments
    dateRange: [Date, Date] | null // The date range filter
  ): Enrollment[] {
    // If there is no date range or invalid input, return the original array
    if (!enrollments || !dateRange || dateRange.length !== 2) {
      return enrollments;
    }

    const [startDate, endDate] = dateRange;

    return enrollments.filter((enrollment) => {
      const enrollmentDate = new Date(enrollment.enrollmentDate);  // Ensure it's a Date object

      // Check if the enrollment date falls within the range
      const isAfterStart = startDate ? enrollmentDate >= startDate : true;
      const isBeforeEnd = endDate ? enrollmentDate <= endDate : true;

      return isAfterStart && isBeforeEnd;
    });
  }

}
