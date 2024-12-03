import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './Modal';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AuthURL:string = 'https://localhost:7055/api/Auth/login'

  constructor(private http:HttpClient,private router:Router ) { }

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

  getUserRole(): string | null {
    return localStorage.getItem('Role');
  }

  logout(){
    localStorage.removeItem("Token");
    localStorage.removeItem("NIC");
    localStorage.removeItem("Role");
    this.router.navigate(['/'])
  }
}
