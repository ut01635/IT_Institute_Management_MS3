import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  messages = [
    {
      title: 'New Update Available',
      content: 'A new update has been released for your courses. Please check it out!',
      date: 'Nov 22, 2024'
    },
    {
      title: 'Important Announcement',
      content: 'The semester exams are approaching. Please check your schedule.',
      date: 'Nov 20, 2024'
    },
    {
      title: 'Reminder: Assignment Deadline',
      content: 'Don’t forget to submit your assignment by the end of the week.',
      date: 'Nov 18, 2024'
    },
    {
      title: 'Reminder: Assignment Deadline',
      content: 'Don’t forget to submit your assignment by the end of the week.',
      date: 'Nov 18, 2024'
    },
    {
      title: 'Reminder: Assignment Deadline',
      content: 'Don’t forget to submit your assignment by the end of the week.',
      date: 'Nov 18, 2024'
    },
    {
      title: 'New Update Available',
      content: 'A new update has been released for your courses. Please check it out!',
      date: 'Nov 22, 2024'
    },
    {
      title: 'Important Announcement',
      content: 'The semester exams are approaching. Please check your schedule.',
      date: 'Nov 20, 2024'
    },
    {
      title: 'Reminder: Assignment Deadline',
      content: 'Don’t forget to submit your assignment by the end of the week.',
      date: 'Nov 18, 2024'
    }

  ];
}
