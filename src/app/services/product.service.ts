import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productDetailsURL: string = environment.baseUrl + environment.product_details;

  constructor(private http: HttpClient) {}

  getProducts(page: any, category: any, search: any) {
    if (search && page) {
      return this.http.get(
        `http://localhost:1337/api/products?pagination[page]=${page}&populate[product_image][fields][1]=url&filters[product_name][$containsi][0]=${search}&pagination[pageSize]=12`
      );
    }
    if (search) {
      return this.http.get(
        `http://localhost:1337/api/products?pagination[page]=1&populate[product_image][fields][1]=url&filters[product_name][$containsi][0]=${search}&pagination[pageSize]=12`
      );
    }
    if (category) {
      return this.http.get(
        `http://localhost:1337/api/products?pagination[page]=1&populate[product_image][fields][1]=url&filters[category][id][$eqi][1]=${category}&pagination[pageSize]=12`
      );
    }
    if (page) {
      console.log('call products of page :', page);
      return this.http.get(
        `http://localhost:1337/api/products?populate[product_image][fields][1]=url&pagination[page]=${page}&pagination[pageSize]=12`
      );
    }

    return this.http.get(environment.getAllProductsUrl);
  }

  getProductById(id: number) {
    const url = `${environment.baseUrl}${environment.product_by_id.replace(
      'id',
      id.toString()
    )}`;
    return this.http.get(url);
  }

  getAllCategories() {
    return this.http.get(environment.getAllCategories);
  }
}

/* 


*/
