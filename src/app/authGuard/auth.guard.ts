import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const userRole = this.authService.getUserRole(); // Fetch the role from storage
    const allowedRoles = route.data['roles']; // Array of allowed roles

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      // Redirect to an appropriate page if the role is not allowed
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
