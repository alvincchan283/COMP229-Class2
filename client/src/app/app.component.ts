/* Filename: app.component.ts
   Student Name: Cheuk Wing Chan
   Student ID: 301264973
   Date: 2023 July 7 */

import { Component } from '@angular/core';
import { AuthService } from './modules/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  title = 'assignment2';

  onSwitchRoute() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
