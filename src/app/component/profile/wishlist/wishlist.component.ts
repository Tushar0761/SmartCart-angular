import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  constructor(
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
    const userId: any = localStorage.getItem('id');

    this.cartService.getCartItems(userId).subscribe({
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

  addToCart(id: any) {
    const cartItemPayload = {
      data: {
        product: id,
        quantity: 1,
        user_detail: localStorage.getItem('id'),
      },
    };

    this.cartService.addCart(cartItemPayload).subscribe(
      (response: any) => {
        this.cartItemArray.push(id);
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
