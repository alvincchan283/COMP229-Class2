import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'src/app/pages/home/home.component';
import { AboutmeComponent } from 'src/app/pages/aboutme/aboutme.component';
import { ContactsComponent } from 'src/app/pages/contacts/contacts.component';
import { ProjectsComponent } from 'src/app/pages/projects/projects.component';
import { ServicesComponent } from 'src/app/pages/services/services.component';
import { LoginComponent } from 'src/app/pages/login/login.component';

const routes: Routes = [
  { path: 'aboutme', component: AboutmeComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [ 
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
