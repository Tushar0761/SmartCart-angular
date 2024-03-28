import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoggedIn = localStorage.getItem('isLoggedIn') ? true : false;
  logout() {
    localStorage.removeItem('isLoggedIn');

    window.location.reload();
  }

  title = 'SmartCart.V16';
  formData = {
    username: '',
    password: '',
  };
  constructor(private router: Router) {}
  login() {
    if (!this.validateForm()) {
      console.log(
        'Invalid form data. Please correct the errors and try again.'
      );
      return;
    }
    console.log('Form data is valid. Proceeding with registration.');

    localStorage.setItem('isLoggedIn', JSON.stringify(1));
    this.router.navigate(['/profile']);

    // perform registration logic
  }

  validateData = {
    all: false,
    username: [true, ''],
    password: [true, ''],
  };

  validateForm() {
    this.validateData.all = this.validateEmail();
    this.validateData.all = this.validatePassword() && this.validateData.all;

    console.table(this.validateData);

    return this.validateData.all;
  }
  validateEmail() {
    if (!this.formData.username.includes('@')) {
      // handle error for invalid email
      this.validateData.username[0] = false;
      this.validateData.username[1] = 'Please Provide valid username.';

      return false;
    }
    this.validateData.username[0] = true;

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
}
