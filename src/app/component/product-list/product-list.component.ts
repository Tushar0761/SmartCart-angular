import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  productArray: any = [];

  cartItemArray: any = [];

  constructor(
    public router: Router,
    private ProductService: ProductService,
    private cartService: CartService
  ) {
    this.productArray = [];
  }

  ngOnInit() {
    this.fetchProducts();
    this.cartItemProductsIds();
  }

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
    //check user login or not
    const isAuthenticated = localStorage.getItem('id') !== null;
    if (!isAuthenticated) {
      alert('Please login first.');
      return;
    }

    const cartItemPayload = {
      data: {
        product: productId,
        quantity: 1,
        user_detail: localStorage.getItem('id'),
      },
    };

    this.cartService.addCart(cartItemPayload).subscribe(
      (response: any) => {
        this.cartService.addToCartItems(productId);
        this.cartItemArray.push(productId);
        // alert('Product added to cart successfully!');
      },
      (error: any) => {
        console.error('Error adding product to cart:', error);
        // Handle error as needed
      }
    );
  }
}
