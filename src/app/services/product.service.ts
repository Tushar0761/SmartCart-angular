import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productDetailsURL: string = environment.baseUrl + environment.product_details;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(environment.getAllProductsUrl);
  }

  getProductById(id: number) {
    const url = `${environment.baseUrl}${environment.product_by_id.replace(
      'id',
      id.toString()
    )}`;
    return this.http.get(url);
  }
}
