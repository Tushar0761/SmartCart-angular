import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import the 'HttpClient' class
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any) {
    const loginUrl = environment.loginUrl;
    return this.http.post(loginUrl, data);
  }

  register(data: any) {
    const registerUrl = environment.registerUrl;
    return this.http.post(registerUrl, data);
  }
}
