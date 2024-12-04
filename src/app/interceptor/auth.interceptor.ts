import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; // For navigation to login page

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('Token');
    let clonedRequest = req;

    if (token) {
      clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        
        if (error.status === 401) {
         
          alert('Session expired. Please log in again.');
          this.router.navigate(['/login']);
        } else if (error.status === 0) {
       
          // alert('Network error. Please check your internet connection.');
        } else {
         
          // alert(error.message || 'An unexpected error occurred.');
        }

       
        return throwError(() => error);
      })
    );
  }
}
