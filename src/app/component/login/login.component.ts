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

        localStorage.setItem('isLoggedIn', 'true');

        let token = response.jwt;

        localStorage.setItem('_token', JSON.stringify(token));
        localStorage.setItem('id', JSON.stringify(response.user.id));

        this.router.navigate(['/profile']);

        this.auth.setAuthStatus(true);
      },
      error: (error) => {
        this.validateData.login[0] = false;
        this.validateData.login[1] =
          error?.error?.error?.message || 'Something Wrong...Please Try again';
      },
    });

    // perform registration logic
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

    console.table(this.validateData);

    return this.validateData.all;
  }
  validateEmail() {
    if (!this.formData.identifier.includes('@')) {
      // handle error for invalid email
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

      // handle error for invalid password
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
    // window.location.reload();
  }
}

// http://localhost:1337/api::product.product?page=1&pageSize=10&sort=product_name:ASC
