import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material/material.module';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  standalone: true,
  imports: [MatSnackBarModule, MaterialModule, ReactiveFormsModule]
})
export class ContactsComponent {
  constructor(
    private _snackBar: MatSnackBar, 
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  contactForm = this.formBuilder.group({
    'firstname': '',
    'lastname': '',
    'contact_number': '',
    'email': '',
    'message': ''
  });

  onSubmit(): void {
    console.log(`Contact Form Information\nFirst Name: ${this.contactForm.value.firstname}\nLast Name: ${this.contactForm.value.lastname}\nContact Number: ${this.contactForm.value.contact_number}\nEmail: ${this.contactForm.value.email}\nMessage: ${this.contactForm.value.message}`);

    setTimeout(() => {
      let snackBarRef = this._snackBar.open("Contact form submitted successfully!", "Close", {
        duration: 1500
      });

      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(['../']);
      });
    }, 300);
  }
}