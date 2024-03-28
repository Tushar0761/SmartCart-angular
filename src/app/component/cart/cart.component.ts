import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  isLoggedIn = localStorage.getItem('isLoggedIn') ? true : false;

  constructor(private router: Router) {}

  placeOrder() {
    this.router.navigate(['/order']);
  }
}
