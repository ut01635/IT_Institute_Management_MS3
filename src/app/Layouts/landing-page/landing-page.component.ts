import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Course } from '../../Services/Modal';
import { CourseService } from '../../Services/course.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnquiryService } from '../../Services/enquiry.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  email: string = 'devhubinstitute@gmail.com';
  courses: Course[] = [];
  enquiryResults:string = ''
  contactForm: FormGroup;
  errorMessage!: string;

  constructor(
    private courseService: CourseService,
     private fb: FormBuilder,
    private enquiryService : EnquiryService,
    private renderer: Renderer2
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngAfterViewInit(): void {
    const videoElement = document.getElementById('bg-video') as HTMLVideoElement;

    if (videoElement) {
      // Use Renderer2 to ensure DOM manipulation works in Angular's zone
      this.renderer.setProperty(videoElement, 'muted', true);
      videoElement.load();

      videoElement.play().then(() => {
        console.log('Video is playing');
      }).catch((error) => {
        console.error('Autoplay failed:', error);
      });
    } else {
      console.error('Video element not found');
    }
  }

  onSubmit() {
    const enquiry = this.contactForm.value;
    if (this.contactForm.valid) {
      this.enquiryService.postEnquiry(enquiry)?.subscribe(
        data => {
          this.enquiryResults = 'Your message was sent successfully';
          this.contactForm.reset();
          console.log('Form Submitted', data);
          
          // Clear the message after 10 seconds
          setTimeout(() => {
            this.enquiryResults = '';
          }, 5000);
        },
        error => {
          this.enquiryResults = 'Your message failed to send';
          
          // Clear the message after 10 seconds
          setTimeout(() => {
            this.enquiryResults = '';
          }, 5000);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  
  ngOnInit(): void {
    this.courseService.getAllCourses();

   
    this.courseService.courses$.subscribe(
      (data: Course[]) => {
        this.courses = data;  
      },
      (error: any) => {
        this.errorMessage = 'Failed to load courses';  
        console.error('Error loading courses:', error);  
      }
    );
  }

  // Method to chunk the courses into groups of 3
  chunkCourses(): Course[][] {
    const chunkSize = 3;
    const chunks: Course[][] = [];
    for (let i = 0; i < this.courses.length; i += chunkSize) {
      chunks.push(this.courses.slice(i, i + chunkSize));
    }
    return chunks;
  }
  
  // playVideo(event: Event): void {
  //   const container = event.currentTarget as HTMLElement;

  //   // Ensure the container exists and is of the correct type
  //   const img = container.querySelector<HTMLImageElement>('img');
  //   const button = container.querySelector<HTMLDivElement>('.play-button');
  //   const iframe = container.querySelector<HTMLIFrameElement>('iframe');

  //   if (!img || !button || !iframe) {
  //     console.error('Required elements not found in the container.');
  //     return;
  //   }

  //   // Hide the thumbnail and play button, show the iframe
  //   img.style.display = 'none';
  //   button.style.display = 'none';
  //   iframe.style.display = 'block';
  // }

  playVideo(event: Event): void {
    const container = event.currentTarget as HTMLElement;

    // Find the required elements within the container
    const img = container.querySelector<HTMLImageElement>('img');
    const playButton = container.querySelector<HTMLDivElement>('.play-button');
    const iframe = container.querySelector<HTMLIFrameElement>('iframe');

    if (!img || !playButton || !iframe) {
      console.error('Required elements not found in the container.');
      return;
    }

    // Hide the thumbnail and play button
    img.style.display = 'none';
    playButton.style.display = 'none';

    // Show the iframe and set its `src` to play the video
    const videoSrc = iframe.getAttribute('data-src');
    if (videoSrc) {
      iframe.src = videoSrc;
      iframe.style.display = 'block';  // Make iframe visible and play the video
    } else {
      console.error('Video source not found.');
    }
  }
}

