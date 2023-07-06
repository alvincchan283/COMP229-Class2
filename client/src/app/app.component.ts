/* Filename: app.component.ts
   Student Name: Cheuk Wing Chan
   Student ID: 301264973
   Date: 2023 July 7 */

import { Component, HostListener } from '@angular/core';
import { AuthService } from './modules/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {
  constructor(public authService: AuthService) {
    this.subscription = authService.loginStatus$.subscribe(status => this.isloggedIn = status);
  }

  subscription: Subscription;
  showNavBarButton: boolean = false;
  openSidebar: boolean = false;
  screenWidth: number = 0;
  isloggedIn: boolean = false;
  title = 'assignment2';

  onSwitchRoute() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnInit() {
    this.showNavBarButton = window.innerWidth >= 950;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event']) 
  getScreenSize() {
    this.showNavBarButton = window.innerWidth >= 950;
  }

  toggleSidebar() {
    this.openSidebar = !this.openSidebar;
  }
}
