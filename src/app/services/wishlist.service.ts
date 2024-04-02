import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  userId: number = 0;
  token: string = '';

  constructor(private http: HttpClient) {
    this.userId = Number(localStorage.getItem('id'));
    this.token = localStorage.getItem('_token') || '';
  }

  getWishlist() {
    const url = `http://localhost:1337/api/wish-lists?populate=product&&filters[user_detail][id][$eq][0]=${this.userId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<any>(url, { headers });
  }

  addTOWishlist(productId: number) {
    const url = `http://localhost:1337/api/wish-lists`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    const body = {
      data: {
        user_detail: this.userId,
        product: productId,
      },
    };

    return this.http.post<any>(url, body, { headers });
  }
  removeFromWishlist(id: any) {
    const url = `http://localhost:1337/api/wish-lists/${id}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.delete<any>(url, { headers });
  }
}
