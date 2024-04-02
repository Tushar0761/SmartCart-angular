import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import the 'HttpClient' class
import { environment } from 'src/environments/environment.development';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  id: any = localStorage.getItem('id') || 0;

  getUserId() {
    return this.id;
  }
  setUserId(id: any) {
    this.id = id;
    localStorage.setItem('id', id);
  }

  constructor(private http: HttpClient) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  login(data: any) {
    const loginUrl = environment.loginUrl;
    return this.http.post(loginUrl, data);
  }

  register(data: any) {
    const registerUrl = environment.registerUrl;
    return this.http.post(registerUrl, data);
  }

  setAuthStatus(status: boolean) {
    this.isAuthenticatedSubject.next(status);
  }

  getAuthStatus(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
