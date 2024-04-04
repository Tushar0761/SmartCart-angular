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
    this.isLoggedIn = this.auth.getAuthStatus();
    this.getCartItems();
  }

  ngOnDestroy() {
    if (this.redirect) {
      return;
    }
    let updatedCart = this.updateCartQuantity();

    updatedCart.forEach((item) => {
      this.cartService
        .updateCartItemQuantity(item.id, item.quantity)
        .subscribe({
          next: (response) => {},
          error: (err) => {
            console.error(`Error updating cart item ${item.id}:`, err);
          },
        });
    });
  }

  redirect = false;
  placeOrder() {
    let updatedCart = this.updateCartQuantity();

    updatedCart.forEach((item) => {
      this.cartService
        .updateCartItemQuantity(item.id, item.quantity)
        .subscribe({
          next: (response) => {
            this.redirect = true;
            this.router.navigate(['/order']);
          },
          error: (err) => {
            console.error(`Error updating cart item ${item.id}:`, err);
          },
        });
    });
  }

  updateCartQuantity() {
    return this.cartItems.map((item) => {
      return {
        id: item.id,
        quantity: item.attributes.quantity,
      };
    });
  }

  cartItems: any[] = [];

  getCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (response) => {
        this.cartItems = response.data;

        this.getGrandTotal();
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      },
    });
  }

  grandTotal = 0;

  getGrandTotal() {
    this.grandTotal = this.cartItems.reduce((prev, cur) => {
      return (
        prev +
        cur.attributes.product.data.attributes.price * cur.attributes.quantity
      );
    }, 0);
  }

  incrementQuantity(index: any) {
    index.attributes.quantity++;
    this.getGrandTotal();
  }

  decrementQuantity(index: any) {
    if (index.attributes.quantity <= 1) {
      return;
    }
    index.attributes.quantity--;
    this.getGrandTotal();
  }
  removeCartItem(cartId: number) {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    this.cartItems = this.cartItems.filter((item) => item.id !== cartId);

    this.cartService.deleteCartItem(cartId).subscribe({
      next: (response) => {
        this.getGrandTotal();
      },
      error: (error) => {
        console.error('Error deleting cart item:', error);
      },
    });
  }
}
