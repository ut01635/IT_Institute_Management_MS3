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
import { StudentFormComponent } from './Modals/admin/student-form/student-form.component';
import { CourseFormComponent } from './Modals/admin/course-form/course-form.component';
import { EnquiryReplayFormComponent } from './Modals/admin/enquiry-replay-form/enquiry-replay-form.component';
import { NotificationFormComponent } from './Modals/admin/notification-form/notification-form.component';
import { AnnouncementFormComponent } from './Modals/admin/announcement-form/announcement-form.component';
import { AdminFormComponent } from './Modals/admin/admin-form/admin-form.component';
import { ProfileUpdateFormComponent } from './Modals/student/profile-update-form/profile-update-form.component';
import { PasswordRestFormComponent } from './Modals/student/password-rest-form/password-rest-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPageComponent } from './Layouts/admin-page/admin-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from './Pipes/search.pipe';
import { CourseSearchPipe } from './Pipes/course-search.pipe';
import { AdminSearchPipe } from './Pipes/admin-search.pipe';
import { EnquirySearchPipe } from './Pipes/enquiry-search.pipe';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateFilterPipe, MessageDateFilterPipe } from './Pipes/date-filter.pipe';
import { MonthFilterPipe } from './Pipes/month-filter.pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateRangeFilterPipe } from './Pipes/date-range-filter.pipe';
import { StudentMessageFormComponent } from './Modals/student/student-message-form/student-message-form.component';
import { SocialMediaFormComponent } from './Modals/student/social-media-form/social-media-form.component';
import {  NgChartsModule } from 'ng2-charts';
import { StudentUpdateFormComponent } from './Modals/student/student-update-form/student-update-form.component';
import { PaymentPlanFormComponent } from './Modals/student/payment-plan-form/payment-plan-form.component'; // Correct import




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
    StudentFormComponent,
    CourseFormComponent,
    EnquiryReplayFormComponent,
    NotificationFormComponent,
    AnnouncementFormComponent,
    AdminFormComponent,
    ProfileUpdateFormComponent,
    PasswordRestFormComponent,
    AdminPageComponent,
    SearchPipe,
    CourseSearchPipe,
    AdminSearchPipe,
    EnquirySearchPipe,
    DateFilterPipe,
    MonthFilterPipe,
    DateRangeFilterPipe,
    MessageDateFilterPipe,
    StudentMessageFormComponent,
    SocialMediaFormComponent,
    StudentUpdateFormComponent,
    PaymentPlanFormComponent

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    BrowserAnimationsModule,
    BsDatepickerModule,
    NgChartsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
