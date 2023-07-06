import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface ContactDTO {
  name: string,
  number: string,
  email: string
}

export interface Contact extends ContactDTO {
  _id: string
}

export interface Response {
  ok: boolean
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  contacts: Subject<Contact[]>;

  constructor(private http: HttpClient) { 
    this.contacts = new Subject<Contact[]>();
  }

  private getHeader() {
    let header = new HttpHeaders();
    header = header.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return header;
  }

  fetchOneContact(contactId: string) {
    return this.http.get<Contact>('http://localhost:4000/contacts/' + contactId, { 
      headers: this.getHeader(),
      withCredentials: true
    });
  }

  fetchAllContacts() {
    return this.http.get<Contact[]>('http://localhost:4000/contacts', { 
      headers: this.getHeader(),
      withCredentials: true
    });
  }

  updateContact(contactId: string, data: ContactDTO) {
    return this.http.put<Contact>('http://localhost:4000/contacts/' + contactId, data, { 
      headers: this.getHeader(),
      withCredentials: true
    });
  }

  deleleContact(contactId: string) {
    return this.http.delete<Response>('http://localhost:4000/contacts/' + contactId, { 
      headers: this.getHeader(),
      withCredentials: true
    });
  }
}
