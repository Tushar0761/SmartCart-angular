import { Component, Input } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  pathName: string;
  username: string = '';

  isLoggedIn = false;
  constructor(public auth: AuthService, private router: Router) {
    this.pathName = '';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.pathName = event.url;
      }
    });
  }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isLoggedIn = isAuthenticated;
    });

    this.auth.profileName$.subscribe((profileName: string) => {
      this.username = profileName;
    });
  }
}
