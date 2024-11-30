import { Component } from '@angular/core';
import { AnnouncementService } from '../../../Services/announcement.service';
import { Announcement } from '../../../Services/Modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnnouncementFormComponent } from '../../../Modals/admin/announcement-form/announcement-form.component';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.css'
})
export class AnnouncementListComponent {
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

  constructor(private announcementService: AnnouncementService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadAnnouncement()
  }


  loadAnnouncement(){
    this.announcementService.getAllAnnouncements().subscribe(
      (data) => (this.announcements = data),
      (error) => alert(error.error)
    );
  }
   // Open modal and pass enquiry.email to the modal component
   openModal(): void {
    const modalRef = this.modalService.open(AnnouncementFormComponent); 
  }

  viewAnnouncement(announcement: Announcement) {
    this.selectedAnnouncement = announcement;
  }


  onDelete(id:string){
    if(confirm('Do you want delete this announcement')){
      this.announcementService.deleteAnnouncement(id).subscribe(data=>{
        this.loadAnnouncement()
        alert(data)

      },error=>{
        alert('faild to delete')
      })
    }   
  }
}
