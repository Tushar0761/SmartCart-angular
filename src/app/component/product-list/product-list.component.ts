import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  userId: any = 0;

  isLoggedIn = false;
  productArray: any = [];
  cartItemArray: any = [];
  wishListItemArray: any = [];

  constructor(
    public router: Router,
    private ProductService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private auth: AuthService
  ) {
    this.userId = this.auth.getUserId();
    this.isLoggedIn = this.auth.getAuthStatus();
  }

  ngOnInit() {
    this.fetchProducts();
    this.cartItemProductsIds();
    this.wishlistItemsProductIds();
  }

  cartItemProductsIds() {
    this.cartService.getCartItems(this.userId).subscribe({
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

  wishlistItemsProductIds() {
    this.wishlistService.getWishlist().subscribe({
      next: (response) => {
        let tempArr = response.data;
        tempArr.forEach((item: any) =>
          this.wishListItemArray.push(item.attributes.product.data.id)
        );
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      },
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  fetchProducts() {
    this.ProductService.getProducts().subscribe({
      next: (response: any) => {
        this.productArray = response.data;
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  addToCart(productId: number): void {
    const cartItemPayload = {
      data: {
        product: productId,
        quantity: 1,
        user_detail: this.userId,
      },
    };

    this.cartService.addCart(cartItemPayload).subscribe(
      (response: any) => {
        this.cartItemArray.push(productId);
      },
      (error: any) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }

  addToWishList(productId: number): void {
    this.wishlistService.addTOWishlist(productId).subscribe(
      (response: any) => {
        this.wishListItemArray.push(productId);
      },
      (error: any) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }
}
