import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isloggedIn = false;
  private token = null;

  constructor() { }

  async login(username: string, password: string): Promise<boolean> {
    const res = await fetch('http://localhost:4000/users', { 
      method: 'POST', 
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })}
    );

    this.isloggedIn = res.ok;
    return this.isloggedIn;
  }

  logout(): void {
    this.isloggedIn = false;
  }

  getLoginStatus(): boolean {
    return this.isloggedIn;
  }
}
