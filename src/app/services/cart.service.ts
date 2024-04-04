import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  userId = 0;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.userId$.subscribe((userId: number) => {
      this.userId = userId;
    });
  }

  getCartItems() {
    let url = `http://localhost:1337/api/carts?filters[user_detail][id][$eq][0]=${this.userId}&populate=product&filters[order][id][$notNull]`;

    return this.http.get<any>(url);
  }

  addCart(productId: any) {
    const cartItemPayload = {
      data: {
        product: productId,
        quantity: 1,
        user_detail: this.userId,
      },
    };

    console.log('adding to cart of : ', cartItemPayload);
    return this.http.post(environment.cartUrl, cartItemPayload);
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
