import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn =
    localStorage.getItem('isLoggedIn') && localStorage.getItem('_token')
      ? true
      : false;

  constructor(private auth: AuthService) {}
  ngOnInit() {
    this.auth.setAuthStatus(this.isLoggedIn);
  }
}
