import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './Layouts/landing-page/landing-page.component';
import { AdminPageComponent } from './Layouts/admin-page/admin-page.component';
import { StudentPageComponent } from './Layouts/student-page/student-page.component';

const routes: Routes = [
  { path:'', 
    component:LandingPageComponent,
    children:[

    ]
  },
  { path:'admin', 
    component:AdminPageComponent,
    children:[

    ]
  },
  { path:'student', 
    component:StudentPageComponent,
    children:[

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
