import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:3000/users';
  registerUser(userData: any) {
    return this.http.post(this.baseUrl, userData);
  }

  loginUser() {
    return this.http.get(this.baseUrl);
  }

  currentUser(user: any) {
    console.log(user);
  }
}
