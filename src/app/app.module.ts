import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Layouts/landing-page/landing-page.component';
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
import { LoginComponent } from './Modals/landing/login/login.component';
import { EnquiryFormComponent } from './Modals/landing/enquiry-form/enquiry-form.component';
import { StudentFormComponent } from './Modals/admin/student-form/student-form.component';
import { CourseFormComponent } from './Modals/admin/course-form/course-form.component';
import { EnquiryReplayFormComponent } from './Modals/admin/enquiry-replay-form/enquiry-replay-form.component';
import { NotificationFormComponent } from './Modals/admin/notification-form/notification-form.component';
import { AnnouncementFormComponent } from './Modals/admin/announcement-form/announcement-form.component';
import { PaymentFormComponent } from './Modals/admin/payment-form/payment-form.component';
import { AdminFormComponent } from './Modals/admin/admin-form/admin-form.component';
import { EnrollmentFormComponent } from './Modals/student/enrollment-form/enrollment-form.component';
import { ProfileUpdateFormComponent } from './Modals/student/profile-update-form/profile-update-form.component';
import { PasswordRestFormComponent } from './Modals/student/password-rest-form/password-rest-form.component';
import { AnnouncementViewComponent } from './Modals/student/announcement-view/announcement-view.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPageComponent } from './Layouts/admin-page/admin-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from './Pipes/search.pipe';
import { CourseSearchPipe } from './Pipes/course-search.pipe';
import { AdminSearchPipe } from './Pipes/admin-search.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
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
    LoginComponent,
    EnquiryFormComponent,
    StudentFormComponent,
    CourseFormComponent,
    EnquiryReplayFormComponent,
    NotificationFormComponent,
    AnnouncementFormComponent,
    PaymentFormComponent,
    AdminFormComponent,
    EnrollmentFormComponent,
    ProfileUpdateFormComponent,
    PasswordRestFormComponent,
    AnnouncementViewComponent,
    AdminPageComponent,
    SearchPipe,
    CourseSearchPipe,
    AdminSearchPipe

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
