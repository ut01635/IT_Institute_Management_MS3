import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; // For navigation to login page

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
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
        console.log("aa"+error.message);
        console.log("bb"+error.status);
        if (error.status === 401) {
          console.log(error.error);
          
          // If session expired or unauthorized, log out the user
          alert('Session expired. Please log in again.');

          // Remove token from localStorage (logout)
          localStorage.clear();

          // Navigate to the login page or home page
          this.router.navigate(['/']);  // Adjust the URL to where the login page is
        }

        // Re-throw the error so it can be handled elsewhere if needed
        return throwError(() => error);
      })
    );
  }
}

