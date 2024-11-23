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
  filterStartDate: string = '';
  filterEndDate: string = '';
  selectedMonth: string = '';

  months = [
    { value: '', name: 'months' },
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

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.announcementService.getAllAnnouncements().subscribe(
      data => {
        this.announcements = data;
        console.log(this.announcements);
      },
      error => {
        alert(error.error);
      }
    );

   
    
  }

  selectedAnnouncement: Announcement | null = null;

  viewAnnouncement(announcement: Announcement) {
    this.selectedAnnouncement = announcement;
  }

  deleteAnnouncement(id: string | undefined) {
    if (!id) {
        alert("Announcement not selected or already deleted.");
        return;
    }

    if (confirm("Are you sure you want to delete this announcement?")) {
        this.announcementService.deleteAnnouncement(id).subscribe(
            () => {
                alert("Announcement deleted successfully!");
                this.announcements = this.announcements.filter(a => a.id !== id);
                this.selectedAnnouncement = null;  // Clear the selection after deletion
            },
            error => {
                alert("An error occurred while deleting the announcement.");
            }
        );
    }
}

}

