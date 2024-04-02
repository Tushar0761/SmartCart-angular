import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  userId: number = 0;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.userId = this.auth.getUserId();
  }

  getWishlist() {
    const url = `http://localhost:1337/api/wish-lists?populate=product&&filters[user_detail][id][$eq][0]=${this.userId}`;

    return this.http.get<any>(url);
  }

  addTOWishlist(productId: number) {
    const url = `http://localhost:1337/api/wish-lists`;

    const body = {
      data: {
        user_detail: this.userId,
        product: productId,
      },
    };

    return this.http.post<any>(url, body);
  }
  removeFromWishlist(id: any) {
    const url = `http://localhost:1337/api/wish-lists/${id}`;

    return this.http.delete<any>(url);
  }
}
