import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
    return this.http.get<Contact>(`${environment.backend_url}/contacts/${contactId}`, { 
      headers: this.getHeader(),
      withCredentials: true
    });
  }

  fetchAllContacts() {
    return this.http.get<Contact[]>(`${environment.backend_url}/contacts/`, { 
      headers: this.getHeader(),
      withCredentials: true
    });
  }

  updateContact(contactId: string, data: ContactDTO) {
    return this.http.put<Contact>(`${environment.backend_url}/contacts/${contactId}`, data, { 
      headers: this.getHeader(),
      withCredentials: true
    });
  }

  deleleContact(contactId: string) {
    return this.http.delete<Response>(`${environment.backend_url}/contacts/${contactId}`, { 
      headers: this.getHeader(),
      withCredentials: true
    });
  }
}
