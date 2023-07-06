import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteContactDialogComponent } from 'src/app/components/delete-contact-dialog/delete-contact-dialog.component';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { ContactService, Contact } from 'src/app/modules/contact/contact.service';

@Component({
  selector: 'app-business-contacts',
  templateUrl: './business-contacts.component.html',
  styleUrls: ['./business-contacts.component.css']
})
export class BusinessContactsComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private contactsFetchervice: ContactService,
    private dialog: MatDialog
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
      if (data) {
        data = data.sort((a, b) => a.name > b.name ? 1 : -1);
        this.contacts = data;
      };
    });
  }

  onClickDelete(contact: Contact) {
    const dialogRef = this.dialog.open(DeleteContactDialogComponent, {
      data: contact
    });

    dialogRef.afterClosed().subscribe(_ => this.fetchContacts());
  }
}
