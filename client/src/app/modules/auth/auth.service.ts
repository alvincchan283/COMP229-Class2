import { Injectable } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isloggedIn = new BehaviorSubject<boolean>(localStorage.getItem('token') !== null);
  loginStatus$ = this.isloggedIn.asObservable();

  constructor() {}

  async login(username: string, password: string): Promise<boolean> {
    const res = await fetch('http://localhost:4000/users', { 
      method: 'POST', 
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })}
    );

    const data = await res.json();

    this.isloggedIn.next(res.ok);
    localStorage.setItem('token', data.token);
    return res.ok;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isloggedIn.next(false);
  }

  getLoginStatus(): boolean {
    return this.isloggedIn.value;
  }
}
