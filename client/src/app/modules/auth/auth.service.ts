import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isloggedIn = false;
  private token = null;

  constructor() { }

  login(username: string, password: string): boolean {
    this.isloggedIn = true;
    return this.isloggedIn;
  }

  logout(): void {
    this.isloggedIn = false;
  }

  getLoginStatus(): boolean {
    return this.isloggedIn;
  }
}
