import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './Layouts/landing-page/landing-page.component';

import { StudentPageComponent } from './Layouts/student-page/student-page.component';
import { AdminDashboardComponent } from './Components/admin/admin-dashboard/admin-dashboard.component';
import { StudentListComponent } from './Components/admin/student-list/student-list.component';
import { CourseListComponent } from './Components/admin/course-list/course-list.component';
import { EnquiryListComponent } from './Components/admin/enquiry-list/enquiry-list.component';
import { NotificationListComponent } from './Components/admin/notification-list/notification-list.component';
import { AnnouncementListComponent } from './Components/admin/announcement-list/announcement-list.component';
import { PaymentComponent } from './Components/admin/payment/payment.component';
import { StudentReportComponent } from './Components/admin/report/student-report/student-report.component';
import { EnrollmentReportComponent } from './Components/admin/report/enrollment-report/enrollment-report.component';
import { PaymentReportComponent } from './Components/admin/report/payment-report/payment-report.component';
import { AdminListComponent } from './Components/admin/admin-list/admin-list.component';
import { StudentDashboardComponent } from './Components/student/student-dashboard/student-dashboard.component';
import { CourseViewComponent } from './Components/student/course-view/course-view.component';
import { NotificationComponent } from './Components/student/notification/notification.component';
import { AnnouncementComponent } from './Components/student/announcement/announcement.component';
import { PaymentDetailsComponent } from './Components/student/payment-details/payment-details.component';
import { EnrollCoursesComponent } from './Components/student/enroll-courses/enroll-courses.component';
import { ProfileComponent } from './Components/student/profile/profile.component';
import { AdminPageComponent } from './Layouts/admin-page/admin-page.component';
import { LoginComponent } from './Modals/landing/login/login.component';
import { StudentFormComponent } from './Modals/admin/student-form/student-form.component';

const routes: Routes = [
  { path:'', 
    component:LandingPageComponent,
    children:[
     
    ]
  },
  { path:'admin', 
    component:AdminPageComponent,
    children:[
      {path:'', component:AdminDashboardComponent},
      {path:'admin-dashboard', component:AdminDashboardComponent},
      {path:'student-list', component:StudentListComponent},
      {path:'course-list', component:CourseListComponent},
      {path:'enquiry-list', component:EnquiryListComponent},
      {path:'Notification-list', component:NotificationListComponent},
      {path:'Annoucement-list', component:AnnouncementListComponent},
      {path:'payment', component:PaymentComponent},
      {path:'student-report', component:StudentReportComponent},
      {path:'enrollment-report', component:EnrollmentReportComponent},
      {path:'payment-report', component:PaymentReportComponent},
      {path:'admin-list', component:AdminListComponent},
    ]
  },
  { path:'student', 
    component:StudentPageComponent,
    children:[
      {path:'', component:CourseViewComponent},
      {path:'student-dashboard', component:StudentDashboardComponent},
      {path:'home', component:CourseViewComponent},
      {path:'notification', component:NotificationComponent},
      {path:'announcement', component:AnnouncementComponent},
      {path:'payment-details', component:PaymentDetailsComponent},
      {path:'enroll-courses', component:EnrollCoursesComponent},
      {path:'profile', component:ProfileComponent},
    ]
  },

  {path:'login', component:LoginComponent},
  {path:'form', component:StudentFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
