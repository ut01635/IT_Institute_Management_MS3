import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; // For navigation to login page

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private alertShown: boolean = false; // Flag to track if the alert has already been shown

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('Token'); // Get token from localStorage
    let clonedRequest = req;

    // Add Authorization header if token exists
    if (token) {
      clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.log("aa" + error.message);
        // console.log("bb" + error.status);
        
        if (error.status === 0 && !this.alertShown) {  // Check if alert is not already shown
          console.log("hello this error"+error.error);
          
          // Remove token from localStorage (logout)
          localStorage.clear();
          
          // If session expired or unauthorized, log out the user
          this.alertShown = true;  // Set the flag to true to prevent future alerts
          alert('Session expired. Please log in again.');
          
          // Navigate to the login page or home page
          this.router.navigate(['/']);  // Adjust the URL to where the login page is
          // this.alertShown = false;
        }

        // Re-throw the error so it can be handled elsewhere if needed
        return throwError(() => error);
      })
    );
  }
}
