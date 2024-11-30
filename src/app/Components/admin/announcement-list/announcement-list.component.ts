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


  loadAnnouncement(): void {
    this.announcementService.announcement$.subscribe((announcements) => {
     
      this.announcements = announcements.sort((a, b) => {
       
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        
        
        return dateB.getTime() - dateA.getTime();
      });
    });
    
    this.announcementService.getAllAnnouncements();
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

  openModal() {
    
    const modalRef = this.modalService.open(AnnouncementFormComponent, {
      size: 'lg'
    });

    
    modalRef.result.then(
      (result: any) => {
        console.log('Modal closed', result);
      },
      (reason: any) => {
        console.log('Modal dismissed', reason);
      }
    );
  }
}
