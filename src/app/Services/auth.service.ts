import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './Modal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AuthURL:string = 'https://localhost:7055/api/Auth/login'

  constructor(private http:HttpClient) { }

  login(loginRequest: LoginRequest) {
    return this.http.post(this.AuthURL, loginRequest, {
      responseType: 'text'
    });
  }

  isLoggedIn() {
    if(localStorage.getItem("Token")) {
      return true;
    } else {
      return false;
    }
  }
}
