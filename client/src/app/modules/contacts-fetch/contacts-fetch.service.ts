import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Contact {
  _id?: String
  name: String,
  number: String,
  email: String
}

@Injectable({
  providedIn: 'root',
})
export class ContactsFetchService {

  contacts: Subject<Contact[]>;

  constructor(private http: HttpClient) { 
    this.contacts = new Subject<Contact[]>();
  }

  fetchAllContacts() {
    return this.http.get<Contact[]>('http://localhost:4000/contacts', { 
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      withCredentials: true
    });
  }
}
