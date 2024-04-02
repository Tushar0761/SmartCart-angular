import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  userId: any = 0;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.userId = this.auth.getUserId();
  }

  placeOrder(orderData: any) {
    return this.http.post<any>(environment.orderUrl, orderData);
  }

  getOrders(): any {
    const url = `http://localhost:1337/api/orders?filters[user_detail][id][$eq][0]=${this.userId}`;

    return this.http.get<any>(url);
  }
}
