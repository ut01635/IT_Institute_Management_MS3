import { Component, DoBootstrap, OnInit } from '@angular/core';
import { Announcement } from '../../../Services/Modal';
import { AnnouncementService } from '../../../Services/announcement.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent implements OnInit {
  announcements: Announcement[] = [];
  selectedMonth: string = '';
  selectedDateRange: [Date, Date] | null = null; 
  selectedAnnouncement: Announcement | null = null;

  months = [
    { value: '', name: 'All Months' },
    { value: '1', name: 'January' },
    { value: '2', name: 'February' },
    { value: '3', name: 'March' },
    { value: '4', name: 'April' },
    { value: '5', name: 'May' },
    { value: '6', name: 'June' },
    { value: '7', name: 'July' },
    { value: '8', name: 'August' },
    { value: '9', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
  ];

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.announcementService.getAllAnnouncements().subscribe(
      (data) => (
        this.announcements = data,
      console.log(data)
      ),
      (error) => alert(error.error)
    );
  }

  viewAnnouncement(announcement: Announcement) {
    this.selectedAnnouncement = announcement;
  }
}

