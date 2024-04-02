import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCartItems(userId: number) {
    let url = `http://localhost:1337/api/carts?filters[user_detail][id][$eq][0]=${userId}&populate=product&filters[order][id][$notNull]`;

    return this.http.get<any>(url);
  }

  addCart(cartProduct: any) {
    return this.http.post(environment.cartUrl, cartProduct);
  }

  updateCartItemQuantity(cartItemId: number, quantity: number) {
    const url = `${environment.cartUrl}/${cartItemId}`;

    const body = {
      data: {
        quantity: quantity,
      },
    };
    return this.http.put(url, body);
  }

  deleteCartItem(cartId: number) {
    const url = `${environment.cartUrl}/${cartId}`;

    return this.http.delete<any>(url);
  }
}
