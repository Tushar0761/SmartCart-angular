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

  updateCartItemQuantity(cartItemId: number, quantity: number) {
    const url = `${environment.cartUrl}/${cartItemId}`;
    const token = localStorage.getItem('_token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const body = {
      data: {
        quantity: quantity,
      },
    };
    return this.http.put(url, body, { headers });
  }

  deleteCartItem(cartId: number) {
    const url = `${environment.cartUrl}/${cartId}`;
    const token = localStorage.getItem('_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<any>(url, { headers });
  }
}
