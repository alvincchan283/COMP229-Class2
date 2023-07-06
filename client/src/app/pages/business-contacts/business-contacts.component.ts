import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { ContactsFetchService, Contact } from 'src/app/modules/contacts-fetch/contacts-fetch.service';

@Component({
  selector: 'app-business-contacts',
  templateUrl: './business-contacts.component.html',
  styleUrls: ['./business-contacts.component.css']
})
export class BusinessContactsComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private contactsFetchervice: ContactsFetchService
  ) {
    this.fetchContacts();
  }

  contacts: Contact[] | undefined = [];

  async ngOnInit(): Promise<void> {
    if (!this.authService.getLoginStatus()) {
      this.router.navigate(['/login']);
    }
  }

  fetchContacts() {
    this.contactsFetchervice.fetchAllContacts().subscribe((data: Contact[]) => {
      if (data) this.contacts = data;
    });
  }
}
