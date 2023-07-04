/* Filename: app.component.ts
   Student Name: Cheuk Wing Chan
   Student ID: 301264973
   Date: 2023 July 7 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment2';

  onSwitchRoute() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
