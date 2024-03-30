import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  productArray = [{}];

  constructor() {
    this.productArray = [
      {
        name: 'Product 1',
        price: 100,
        image: 'https://via.placeholder.com/150',
      },
      {
        name: 'Product 2',
        price: 200,
        image: 'https://via.placeholder.com/150',
      },
      {
        name: 'Product 3',
        price: 300,
        image: 'https://via.placeholder.com/150',
      },
      {
        name: 'Product 4',
        price: 400,
        image: 'https://via.placeholder.com/150',
      },
      {
        name: 'Product 5',
        price: 500,
        image: 'https://via.placeholder.com/150',
      },
      {
        name: 'Product 6',
        price: 600,
        image: 'https://via.placeholder.com/150',
      },
    ];
  }
}
