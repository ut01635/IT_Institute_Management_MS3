import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Layouts/landing-page/landing-page.component';
import { AdminPageComponent } from './Layouts/admin-page/admin-page.component';
import { StudentPageComponent } from './Layouts/student-page/student-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AdminPageComponent,
    StudentPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
