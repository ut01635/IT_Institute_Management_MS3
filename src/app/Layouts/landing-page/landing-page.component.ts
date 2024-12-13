import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Course, Enrollment, EnrollmentSummaryResponseDto, Student, SummaryResponse } from '../../Services/Modal';
import { CourseService } from '../../Services/course.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnquiryService } from '../../Services/enquiry.service';
import { EnrollmentService } from '../../Services/enrollment.service';
import { StudentService } from '../../Services/student.service';
import { SummaryService } from '../../Services/summary.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  email: string = 'devhubinstitute@gmail.com';
  courses: Course[] = [];
  enquiryResults: string = ''
  contactForm: FormGroup;
  errorMessage!: string;
  enrollments: Enrollment[] = [];
  completeEnrollments: Enrollment[] = [];
  students: Student[] = [];
  summary: SummaryResponse | null = null
  enrollmentSummary: EnrollmentSummaryResponseDto | null = null

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private enquiryService: EnquiryService,
    private renderer: Renderer2,
    private summaryService: SummaryService,
    private spinner: NgxSpinnerService
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

  showSpinner(name: string) {
    this.spinner.show(name);
  }

  hideSpinner(name: string) {
    this.spinner.hide(name);
  }

  onSubmit() {
    const enquiry = this.contactForm.value;
    if (this.contactForm.valid) {
      this.showSpinner('enquiry');
      this.enquiryService.postEnquiry(enquiry)?.subscribe(
        data => {
          this.hideSpinner('enquiry')
          this.enquiryResults = 'Your message was sent successfully';
          this.contactForm.reset();
          console.log('Form Submitted', data);

          // Clear the message after 10 seconds
          setTimeout(() => {
            this.enquiryResults = '';
          }, 5000);
        },
        error => {
          this.hideSpinner('enquiry')
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
    this.clearLocalStorage();
    localStorage.setItem('sidebar-theme', 'dark');
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

    this.summaryService.getSummary().subscribe(
      data=>{
        this.summary=data
      },error=>{
        console.error(error.error);   
      }
    )

    this.summaryService.GetEnrollmentSummary().subscribe(
      data=>{
        this.enrollmentSummary = data
      },error=>{
        console.error(error.error);
        
      }
    )


    // this.enrollmentService.getallEnrollement().subscribe(
    //   (data: Enrollment[]) => {
    //     this.enrollments = data;
    //   },
    //   (error) => {
    //     console.error('Error fetching enrollments:', error);
    //   }
    // );

    // this.studentService.students$.subscribe((students) => {
    //   this.students = students;
    //   // console.log(this.students);
    // }, (error) => {
    //   console.error('Error fetching students:', error);
    // });

    // this.studentService.getStudents();

    // this.enrollmentService.getAllCompleted().subscribe(data => {
    //   this.completeEnrollments = data
    // }, (error) => {
    //   console.error('Error fetching Completed enrollments:', error);
    // })
  }

  clearLocalStorage() {
    localStorage.clear();
    console.log("Local storage has been cleared.");
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

  // Method to calculate the percentage of completed enrollments
  getCompletionPercentage(): number {
    const totalEnrollments = this.enrollmentSummary?.totalEnrollments;

    // Prevent division by zero
    if (totalEnrollments === 0) {
      return 0;
    }

    return (this.enrollmentSummary?.completeEnrollments! / totalEnrollments!) * 100;
  }
}

