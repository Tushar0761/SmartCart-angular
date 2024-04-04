import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  constructor(
    private auth: AuthService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    public router: Router
  ) {}

  ngOnInit() {
    this.cartItemProductsIds();
    this.getWishlist();
  }

  wishlistItems: any = [];

  getWishlist() {
    this.wishlistService.getWishlist().subscribe({
      next: (response) => {
        this.wishlistItems = response.data;
      },
      error: (error) => {},
    });
  }

  cartItemArray: any = [];

  cartItemProductsIds() {
    this.cartService.getCartItems().subscribe({
      next: (response) => {
        let tempArr = response.data;
        tempArr.forEach((item: any) =>
          this.cartItemArray.push(item.attributes.product.data.id)
        );
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      },
    });
  }

  addToCart(productId: any) {
    this.cartService.addCart(productId).subscribe(
      (response: any) => {
        this.cartItemArray.push(productId);
      },
      (error: any) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }

  removeFromWishlist(id: any) {
    if (!confirm('Are you sure you want to remove this item from wishlist?')) {
      return;
    }

    this.wishlistService.removeFromWishlist(id).subscribe({
      next: (response) => {
        this.wishlistItems = this.wishlistItems.filter(
          (items: any) => id !== items.id
        );
      },
      error: (error) => {},
    });
  }
}
