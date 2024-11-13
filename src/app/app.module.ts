import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Layouts/landing-page/landing-page.component';
import { AdminPageComponent } from './Layouts/admin-page/admin-page.component';
import { StudentPageComponent } from './Layouts/student-page/student-page.component';
import { AdminDashboardComponent } from './Components/admin/admin-dashboard/admin-dashboard.component';
import { StudentListComponent } from './Components/admin/student-list/student-list.component';
import { CourseListComponent } from './Components/admin/course-list/course-list.component';
import { EnquiryListComponent } from './Components/admin/enquiry-list/enquiry-list.component';
import { NotificationListComponent } from './Components/admin/notification-list/notification-list.component';
import { AnnouncementListComponent } from './Components/admin/announcement-list/announcement-list.component';
import { AdminListComponent } from './Components/admin/admin-list/admin-list.component';
import { PaymentComponent } from './Components/admin/payment/payment.component';
import { StudentReportComponent } from './Components/admin/report/student-report/student-report.component';
import { EnrollmentReportComponent } from './Components/admin/report/enrollment-report/enrollment-report.component';
import { PaymentReportComponent } from './Components/admin/report/payment-report/payment-report.component';
import { StudentDashboardComponent } from './Components/student/student-dashboard/student-dashboard.component';
import { CourseViewComponent } from './Components/student/course-view/course-view.component';
import { NotificationComponent } from './Components/student/notification/notification.component';
import { AnnouncementComponent } from './Components/student/announcement/announcement.component';
import { PaymentDetailsComponent } from './Components/student/payment-details/payment-details.component';
import { EnrollCoursesComponent } from './Components/student/enroll-courses/enroll-courses.component';
import { ProfileComponent } from './Components/student/profile/profile.component';
import { HomeComponent } from './Components/landing/home/home.component';
import { TopCoursesComponent } from './Components/landing/top-courses/top-courses.component';
import { ContactUsComponent } from './Components/landing/contact-us/contact-us.component';
import { FooterComponent } from './Components/landing/footer/footer.component';
import { LoginComponent } from './Modals/landing/login/login.component';
import { EnquiryFormComponent } from './Modals/landing/enquiry-form/enquiry-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AdminPageComponent,
    StudentPageComponent,
    AdminDashboardComponent,
    StudentListComponent,
    CourseListComponent,
    EnquiryListComponent,
    NotificationListComponent,
    AnnouncementListComponent,
    AdminListComponent,
    PaymentComponent,
    StudentReportComponent,
    EnrollmentReportComponent,
    PaymentReportComponent,
    StudentDashboardComponent,
    CourseViewComponent,
    NotificationComponent,
    AnnouncementComponent,
    PaymentDetailsComponent,
    EnrollCoursesComponent,
    ProfileComponent,
    HomeComponent,
    TopCoursesComponent,
    ContactUsComponent,
    FooterComponent,
    LoginComponent,
    EnquiryFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
