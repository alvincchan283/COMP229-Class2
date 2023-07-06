import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Contact, ContactService } from 'src/app/modules/contact/contact.service';

@Component({
  selector: 'app-delete-contact-dialog',
  templateUrl: './delete-contact-dialog.component.html',
  styleUrls: ['./delete-contact-dialog.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class DeleteContactDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteContactDialogComponent>,
    private contactService: ContactService,
    @Inject(MAT_DIALOG_DATA) public contact: Contact
  ) {}

  onClickDelete() {
    this.contactService.deleleContact(this.contact._id ?? '').subscribe(result => this.dialogRef.close());
  }

  onClickCancel() {
    this.dialogRef.close();
  }
}
