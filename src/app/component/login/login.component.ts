import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoggedIn = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  title = 'SmartCart.V16';
  formData = {
    identifier: '',
    password: '',
  };
  login() {
    if (!this.validateForm()) {
      return;
    }

    this.auth.login(this.formData).subscribe({
      next: (response: any) => {
        this.validateData.login[0] = true;
        let token = response.jwt;

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('_token', token);
        localStorage.setItem('id', response.user.id);
        console.log(response.user.id);

        this.router.navigate(['/profile']);
        this.auth.setUserId(response.user.id);
        this.auth.setAuthStatus(true);
        this.auth.setProfileName(response.user.username);
      },
      error: (error) => {
        this.validateData.login[0] = false;
        this.validateData.login[1] =
          error?.error?.error?.message || 'Something Wrong...Please Try again';
      },
    });
  }

  validateData = {
    all: false,
    identifier: [true, ''],
    password: [true, ''],
    login: [true, ''],
  };

  validateForm() {
    this.validateData.all = this.validateEmail();
    this.validateData.all = this.validatePassword() && this.validateData.all;

    return this.validateData.all;
  }
  validateEmail() {
    if (!this.formData.identifier.includes('@')) {
      this.validateData.identifier[0] = false;
      this.validateData.identifier[1] = 'Please Provide valid username.';

      return false;
    }
    this.validateData.identifier[0] = true;

    return true;
  }
  validatePassword() {
    if (this.formData.password.length < 8) {
      this.validateData.password[0] = false;
      this.validateData.password[1] = 'Please Provide valid Password.';

      return false;
    }
    this.validateData.password[0] = true;

    return true;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('_token');
    this.auth.setAuthStatus(false);
    localStorage.removeItem('id');
  }
}
