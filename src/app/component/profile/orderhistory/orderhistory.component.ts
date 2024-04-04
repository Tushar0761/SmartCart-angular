import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css'],
})
export class OrderhistoryComponent {
  orderItems: any = [];
  constructor(private orderService: OrderService, private auth: AuthService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(
      (response: { data: any }) => {
        this.orderItems = response.data;
      },
      (error: any) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
