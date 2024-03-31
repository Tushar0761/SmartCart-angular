import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  isLoggedIn = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('id');
    this.isLoggedIn = this.auth.getAuthStatus();
    this.getCartItems(userId);
  }

  getUniqueCartItems() {
    this.cartItems = this.cartItems.reduce((prev, cur) => {
      if (
        !prev.some(
          (item: any) =>
            item.attributes.product.data.id === cur.attributes.product.data.id
        )
      ) {
        prev.push(cur);
      }
      return prev;
    }, []);
  }

  placeOrder() {
    this.router.navigate(['/order']);
  }

  cartItems: any[] = [];

  getCartItems(userId: any) {
    this.cartService.getCartItems(userId).subscribe({
      next: (response) => {
        this.cartItems = response.data;
        console.log(this.cartItems);

        this.getUniqueCartItems();
        console.log(this.cartItems);

        console.log('Cart Items:', this.cartItems);
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      },
    });
  }
}
