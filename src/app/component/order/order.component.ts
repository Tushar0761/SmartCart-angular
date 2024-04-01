import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  userId = localStorage.getItem('id');
  isLoggedIn = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.auth.getAuthStatus();
    this.getCartItems(this.userId);
  }

  grandTotal: number = 0;
  tax: number = 0;
  payableAmount: number = 0;

  calculateAmount() {
    this.grandTotal = this.cartItems.reduce((prev, cur) => {
      return (
        prev +
        cur.attributes.product.data.attributes.price * cur.attributes.quantity
      );
    }, 0);

    this.tax = (this.grandTotal + 50) * 0.18;
    this.tax = Number(this.tax.toFixed(2));
    this.payableAmount = this.grandTotal + this.tax;
  }

  getCartItems(userId: any) {
    this.cartService.getCartItems(userId).subscribe({
      next: (response) => {
        this.cartItems = response.data;
        this.calculateAmount();
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      },
    });
  }
  cartItems: any[] = [];
  order_items: string = '';
  carts: number[] = [];

  calculateOrderItemsAndCarts() {
    this.order_items = JSON.stringify(
      this.cartItems.map((item) => {
        return {
          name: item.attributes.product.data.attributes.product_name,
          quantity: item.attributes.quantity,
          price: item.attributes.product.data.attributes.price,
        };
      })
    );
    console.log(this.order_items);
    this.carts = this.cartItems.map((item) => item.id);
  }

  placeOrder() {
    let userId = localStorage.getItem('id');
    const orderDate = new Date().toISOString();
    this.calculateOrderItemsAndCarts();
    this.calculateAmount();

    const orderData = {
      data: {
        order_status: 'Placed,',
        order_date: orderDate,
        tax_amount: this.grandTotal,
        total_amount: this.tax,
        payable_amount: this.payableAmount,
        carts: this.carts,
        order_items: this.order_items,
        user_detail: userId,
      },
    };

    this.orderService.placeOrder(orderData).subscribe({
      next: (response) => {
        console.log('Order placed successfully:', response);
        this.isOrderPlaced = true;
      },
      error: (error) => {
        console.error('Error placing order:', error);
      },
    });
  }
  isOrderPlaced = false;
}
