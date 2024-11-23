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

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.announcementService.getAllAnnouncements().subscribe(
      data => {
        this.announcements = data;
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

