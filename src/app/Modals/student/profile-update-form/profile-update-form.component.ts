import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-update-form',
  templateUrl: './profile-update-form.component.html',
  styleUrl: './profile-update-form.component.css'
})
export class ProfileUpdateFormComponent {
  @Input() nic: string = ''; 
  @Output() imageUpdated: EventEmitter<string> = new EventEmitter(); 
  imageFile: File | null = null;
  studentImagePreviewUrl: string | ArrayBuffer | null = null;

  constructor(private studentService: StudentService, public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.loadCurrentImage();
  }

  // Method to load the current image of the student
  loadCurrentImage(): void {
    if (this.nic) {
      this.studentService.getStudentByNIC(this.nic).subscribe(
        (response: any) => {
          this.studentImagePreviewUrl = 'https://localhost:7055'+response.imagePath; 
        },
        (error) => {
          console.error('Error loading current image:', error);
        }
      );
    }
  }



  
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.studentImagePreviewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  submitImage(): void {
    if (this.imageFile) {
      const formData = new FormData();
      formData.append('image', this.imageFile);

      const nic = this.nic; 

      
      this.studentService.updateStudentImage(nic, formData).subscribe(
        (response) => {
          console.log('Image Updated successfully:', response);
          alert("Image Updated successfully");
          
          this.imageUpdated.emit(response.imagePath);
          this.activeModal.close();  
        },
        (error) => {
          console.error('Error Updated image:', error);
          alert("Error Updated image")
        }
      );
    } else {
      console.error('No image selected');
      alert("No image selected");
    }
  }


  onImageUploadSuccess(newImagePath: string): void {
    this.imageUpdated.emit(newImagePath);  
  }


}
