// Filename: main.ts
// Student Name: Cheuk Wing Chan
// Student ID: 301264973
// Date: 2023 July 7

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
