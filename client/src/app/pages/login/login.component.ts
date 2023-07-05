import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  onSubmit(): void {
    let { username, password } = this.loginForm.value;
    username = username ?? '';
    password = password ?? '';
    this.authService.login(username, password)
    .then(isloggedIn => {
      if (isloggedIn) {
        this.router.navigate(['/']);
      } else {
        console.error('Username or password is incorrect, please try again.')
      }
    });
  }

}
