import { Component, DoBootstrap } from '@angular/core';
import { Announcement } from '../../../Services/Modal';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent {
  announcements: Announcement[] = [
    {
      id: '1',
      title: 'Important Update',
      body: 'The school will be closed on Friday due to maintenance.',
      date: new Date(),
    },
    {
      id: '2',
      title: 'New Course Announcement',
      body: 'A new course on Web Development is starting next week.',
      date: new Date(),
    },
  ];

  selectedAnnouncement: Announcement | null = null;

  viewAnnouncement(announcement: Announcement) {
    this.selectedAnnouncement = announcement;

    const modalElement = document.getElementById('announcementModal');
    if (modalElement) {
      // const modal = new bootstrap.Modal(modalElement);
      // modal.show();
    } else {
      console.error('Modal element not found.');
    }
  }

  deleteAnnouncement(announcement: Announcement) {
    if (confirm(`Are you sure you want to delete "${announcement.title}"?`)) {
      this.announcements = this.announcements.filter(a => a.id !== announcement.id);
    }
  }
}
