import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  placeOrder(orderData: any) {
    const token = localStorage.getItem('_token') || '';
    return this.http.post<any>(environment.orderUrl, orderData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
    });
  }

  getOrders(): any {
    const token = localStorage.getItem('_token') || '';
    const id = localStorage.getItem('id');

    const url = `http://localhost:1337/api/orders?filters[user_detail][id][$eq][0]=${id}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(url, { headers });
  }
}
