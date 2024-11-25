import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private userService: AuthService, private router: Router) {
  }
  canActivate(): boolean {
	if (this.userService.isLoggedIn()) {
		return true;
	} else {
		this.router.navigate(['/']);
		return false;
       }
    }
}
