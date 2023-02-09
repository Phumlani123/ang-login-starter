import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: number;
  password: string;
  email: string;
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = 'dummy_token';
  user!: User;
  authenticationState = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router) {}
  setToken(token: string) {
    localStorage.setItem('id_token', token);
  }

  getToken() {
    this.token = localStorage.getItem('id_token') || '';
    return this.token;
  }

  deleteToken() {
    localStorage.removeItem('id_token');
  }

  signin(email: string, password: string) {
    return this.http.post<any>('api_url/login', { email, password }).pipe(
      map((res) => {
        if (res.data.token) {
          this.setToken(res.data.token);
          this.token = res.data.token;
          let decoded = 'decoded token';
          this.authenticationState.next(true);
          res = decoded;
          return res;
        } else res = null;
      })
    );
  }

  fakeSignin(email: string, password: string) {
    const res = { email, password };
    this.handleSignInResponse(res);
  }

  private handleSignInResponse(response: any) {
    this.user = response;
    this.setToken(this.token);
    this.authenticationState.next(true);
    this.router.navigate(['/welcome']);
  }

  logout() {
    this.deleteToken();
    this.authenticationState.next(false);
    this.router.navigate(['']);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
