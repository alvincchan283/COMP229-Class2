import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteContactDialogComponent } from 'src/app/components/delete-contact-dialog/delete-contact-dialog.component';
import { Contact, ContactDTO, ContactService } from 'src/app/modules/contact/contact.service';

@Component({
  selector: 'app-update-contacts',
  templateUrl: './update-contacts.component.html',
  styleUrls: ['./update-contacts.component.css']
})
export class UpdateContactsComponent {
  constructor(
    private contactService: ContactService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.fetchContact();
  }

  contactId: string = this.route.snapshot.paramMap.get('id') ?? '';
  contact: Contact | null = null;
  contactForm = this.formBuilder.group<ContactDTO>({
    'name': '',
    'number': '',
    'email': '',
  });

  fetchContact() {
    this.contactService.fetchOneContact(this.contactId).subscribe((data: Contact) => {
      if (data) {
        this.contact = data;
        this.contactForm.setValue({
          name: data.name,
          number: data.number,
          email: data.email
        });
      };
    });
  }

  onSubmit(): void {
    this.contactService.updateContact(this.contactId, this.contactForm.value as ContactDTO)
    .subscribe(result => {
      this._snackBar.open("Contact updated successfully!", "Close", {
        duration: 1500
      }).afterDismissed().subscribe(() => {
        this.router.navigate(['/business-contacts']);
      });
    });
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(DeleteContactDialogComponent, {
      data: this.contact
    });

    dialogRef.afterClosed().subscribe(_ => this.router.navigate(['/business-contacts']));
  }

  onCancel(): void {
    this.router.navigate(['/business-contacts']);
  }
}
