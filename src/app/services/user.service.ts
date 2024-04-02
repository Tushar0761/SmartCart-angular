import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import the 'HttpClient' class
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userId: any = 0;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.userId = this.auth.getUserId();
  }

  getUserProfile() {
    const url = environment.getAddressUrl;

    return this.http.get<any>(url);
  }

  updateUserDetails(newData: any) {
    const url = `http://localhost:1337/api/users/${this.userId}`;
    return this.http.put<any>(url, newData);
  }

  addNewAddress(addressData: any) {
    const url = environment.userAddressUrl;

    return this.http.post(url, { data: addressData });
  }

  getAllStates() {
    return this.http.get<any>(environment.getAllStatesUrl);
  }
  getCityById(stateId: any) {
    return this.http.get<any>(environment.getCityByStateUrl + stateId);
  }
}
