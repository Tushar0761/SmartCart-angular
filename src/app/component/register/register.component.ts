import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('_token');

    this.auth.setAuthStatus(false);
    localStorage.removeItem('id');

    // window.location.reload();
  }

  register() {
    if (!this.validateForm()) {
      return;
    }

    let data = {
      username: this.formData.username,
      email: this.formData.email,
      password: this.formData.password,
    };

    this.auth.register(data).subscribe({
      next: (response: any) => {
        this.validateData.register[0] = true;
        localStorage.setItem('isLoggedIn', 'true');
        let token = response.jwt;

        localStorage.setItem('_token', token);
        localStorage.setItem('id', JSON.stringify(response.user.id));

        this.router.navigate(['/profile']);

        this.auth.setAuthStatus(true);
      },
      error: (error) => {
        this.validateData.register[0] = false;
        this.validateData.register[1] =
          error?.error?.error?.message || 'Something Wrong Happened.';
      },
    });
  }

  validateData = {
    all: false,
    username: [true, ''],
    email: [true, ''],
    password: [true, ''],
    confirmPassword: [true, ''],
    register: [true, ''],
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
