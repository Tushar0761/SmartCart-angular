import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  isLoggedIn = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.auth.getAuthStatus();
  }

  placeOrder() {
    this.router.navigate(['/order']);
  }
}
