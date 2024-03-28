import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isLoggedIn = localStorage.getItem('isLoggedIn') ? true : false;
  title = 'Register';

  formData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  logout() {
    localStorage.removeItem('isLoggedIn');

    window.location.reload();
  }

  register() {
    if (!this.validateForm()) {
      console.log(
        'Invalid form data. Please correct the errors and try again.'
      );
      return;
    }
    console.log('Form data is valid. Proceeding with registration.');

    localStorage.setItem('isLoggedIn', JSON.stringify(1));
  }

  validateData = {
    all: false,
    username: [true, ''],
    email: [true, ''],
    password: [true, ''],
    confirmPassword: [true, ''],
  };

  validateForm() {
    this.validateData.all = this.validateUsername();
    this.validateData.all = this.validateEmail() && this.validateData.all;
    this.validateData.all = this.validatePassword() && this.validateData.all;
    this.validateData.all =
      this.validateConfirmPassword() && this.validateData.all;

    if (this.formData.password !== this.formData.confirmPassword) {
      this.validateData.all = false;
      this.validateData.confirmPassword[0] = false;
      this.validateData.confirmPassword[1] = 'Password did"nt match.';
    }
    console.table(this.validateData);

    return this.validateData.all;
  }

  validateUsername() {
    if (this.formData.username.length < 5) {
      // handle error for invalid username
      this.validateData.username[0] = false;
      this.validateData.username[1] = 'Please Provide valid username.';
      return false;
    }
    this.validateData.username[0] = true;

    return true;
  }
  validateEmail() {
    if (!this.formData.email.includes('@')) {
      // handle error for invalid email
      this.validateData.email[0] = false;
      this.validateData.email[1] = 'Please Provide valid email.';
      return false;
    }
    this.validateData.email[0] = true;

    return true;
  }
  validatePassword() {
    if (this.formData.password.length < 8) {
      // handle error for invalid password
      this.validateData.password[0] = false;
      this.validateData.password[1] = 'Please Provide valid Password.';
      return false;
    }
    this.validateData.password[0] = true;

    return true;
  }
  validateConfirmPassword() {
    if (this.formData.confirmPassword.length < 8) {
      // handle error for invalid password
      this.validateData.confirmPassword[0] = false;
      this.validateData.confirmPassword[1] = 'Please Provide valid Password.';
      return false;
    }
    this.validateData.confirmPassword[0] = true;
    return true;
  }
}
