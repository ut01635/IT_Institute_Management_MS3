import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Get the required role from the route data
    const requiredRole = route.data['role'];

    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      // Check if the user's role matches the required role for this route
      const userRole = localStorage.getItem('Role'); // Get role from localStorage

      if (userRole && userRole === requiredRole) {
        return true; // Allow access
      } else {
        this.router.navigate(['/']); // Redirect if the role doesn't match
        return false;
      }
    } else {
      this.router.navigate(['/']); // Redirect to login if not authenticated
      return false;
    }
  }
}
