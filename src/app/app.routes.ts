import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { WebsiteLayoutComponent } from './website-layout/website-layout.component';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentsZoneComponent } from './students-zone/students-zone.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { EnquiryusComponent } from './enquiryus/enquiryus.component';
import { IeeeComponent } from './ieee/ieee.component';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import {ApplicationProjectsComponent} from './application-projects/application-projects.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import {AddIEEEComponent} from './add-ieee/add-ieee.component';
import { AddEnquiryComponent } from './add-enquiry/add-enquiry.component';
export const routes: Routes = [

  // -----------------------------
  // WEBSITE LAYOUT
  // -----------------------------
  {
    path: '',
    component: WebsiteLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'students-zone', component: StudentsZoneComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'enquiry-us', component: EnquiryusComponent },
      {path : 'ieee', component: IeeeComponent},
      {path : 'application-projects', component: ApplicationProjectsComponent},
      
    ]
  },

  // -----------------------------
  // ADMIN LAYOUT
  // -----------------------------
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '', 
        loadComponent: () =>
          import('./admin-dashboard/admin-dashboard.component')
          .then(m => m.AdminDashboardComponent)
      },
      {
        path: 'add-courses', 
        loadComponent: () =>
          import('./add-courses/add-courses.component')
          .then(m => m.AddCoursesComponent)
      },
     {
  path: 'add-application',
  loadComponent: () => 
    import('./add-application/add-application.component')
    .then(m => m.AddApplicationComponent)
},
{
  path: 'add-ieee',
  loadComponent: () => 
    import('./add-ieee/add-ieee.component')
    .then(m => m.AddIEEEComponent)  // <-- use exact exported class name
},

{
  path: 'add-enquiry',
  loadComponent: () => 
    import('./add-enquiry/add-enquiry.component')
    .then(m => m.AddEnquiryComponent)  // <-- use exact exported class name
}


    ]
  }

];
