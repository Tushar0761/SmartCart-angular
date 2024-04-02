import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import the 'HttpClient' class
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfile(token: string) {
    const url = environment.getAddressUrl;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(url, {
      headers,
    });
  }

  updateUserDetails(userId: any, token: any, newData: any) {
    const url = `http://localhost:1337/api/users/${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<any>(url, newData, { headers });
  }

  addNewAddress(addressData: any) {
    const url = environment.userAddressUrl;
    const token = localStorage.getItem('_token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(url, { data: addressData }, { headers });
  }

  getAllStates() {
    return this.http.get<any>(environment.getAllStatesUrl);
  }
  getCityById(stateId: any) {
    return this.http.get<any>(environment.getCityByStateUrl + stateId);
  }
}
