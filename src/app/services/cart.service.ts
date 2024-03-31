import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCartItems(userId: number) {
    const token = localStorage.getItem('_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    let url = `http://localhost:1337/api/carts?filters[user_detail][id][$eq][0]=${userId}&populate=product&filters[order][id][$notNull]`;
    console.log(url);

    // let url = `http://localhost:1337/api/carts?filters[user_detail][id][%24eq][0]=${userId}&populate=product&filters[order][id][%24notNull]=null`;

    return this.http.get<any>(url, {
      headers,
    });
  }

  addCart(cartProduct: any) {
    const token = localStorage.getItem('_token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(environment.cartUrl, cartProduct, { headers });
  }

  private cartItems: number[] = [];

  addToCartItems(productId: number) {
    if (!this.cartItems.includes(productId)) {
      this.cartItems.push(productId);
    }
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((id) => id !== productId);
  }

  isInCart(productId: number): boolean {
    return this.cartItems.includes(productId);
  }
}
