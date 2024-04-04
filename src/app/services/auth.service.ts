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

  private profileNameSubject: BehaviorSubject<string>;
  public profileName$: Observable<string>;

  private userIdSubject: BehaviorSubject<any>;
  public userId$: Observable<any>;

  setUserId(userId: number) {
    this.userIdSubject.next(userId);
    localStorage.setItem('id', userId.toString()); // Optionally, update localStorage
    console.log('setting up id from auth service to ,', userId);
  }

  // Method to retrieve user ID
  getUserId(): number {
    console.log(
      'someone asking for id and sending id : ',
      this.userIdSubject.value
    );
    return this.userIdSubject.value;
  }

  constructor(private http: HttpClient) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    this.profileNameSubject = new BehaviorSubject<string>('');
    this.profileName$ = this.profileNameSubject.asObservable();

    let userIdFromLocalStorage = localStorage.getItem('id') || 0;
    console.log(
      'setting up user id for first time in auth service ',
      userIdFromLocalStorage
    );

    this.userIdSubject = new BehaviorSubject<any>(userIdFromLocalStorage);
    this.userId$ = this.userIdSubject.asObservable();
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

  setProfileName(username: string) {
    this.profileNameSubject.next(username);
    console.log('Set user name', username);
  }

  getProfileName(): string {
    return this.profileNameSubject.value;
  }
}
