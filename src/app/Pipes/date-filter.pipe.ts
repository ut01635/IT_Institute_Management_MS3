import { Pipe, PipeTransform } from '@angular/core';
import { Message, Payment } from '../Services/Modal';

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
      const announcementDate = new Date(payments.paymentDate);
      
      // Compare only the date parts, not the time parts
      return announcementDate.toDateString() === selectedDate.toDateString();
    });
  }
  

}

@Pipe({
  name: 'messageDateFilter'
})
export class MessageDateFilterPipe implements PipeTransform {

  transform(messages: Message[], selectedDate: Date): Message[] {
    if (!selectedDate) {
      return messages; // Return all messages if no date is selected
    }

    // Filter messages that match the selected date (ignoring the time part)
    return messages.filter(message => {
      const messageDate = new Date(message.date);
      
      // Compare only the date parts, not the time parts
      return messageDate.toDateString() === selectedDate.toDateString();
    });
  }
}