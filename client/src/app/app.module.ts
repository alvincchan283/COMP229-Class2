import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { ServicesComponent } from './pages/services/services.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { MaterialModule } from './modules/material/material.module';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { BusinessContactsComponent } from './pages/business-contacts/business-contacts.component';
import { UpdateContactsComponent } from './pages/update-contacts/update-contacts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutmeComponent,
    ServicesComponent,
    ProjectsComponent,
    LoginComponent,
    BusinessContactsComponent,
    UpdateContactsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
