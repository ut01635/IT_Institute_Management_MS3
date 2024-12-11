import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; 

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private alertShown: boolean = false; 

  constructor(private router: Router) { }

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
      
        
        if (error.status === 0 && !this.alertShown) {  
          console.log("hello this error"+error.error);
          
          
          localStorage.clear();
          
        
          this.alertShown = true;  
          alert('Session expired. Please log in again.');
          
         
          this.router.navigate(['/']);  
          // this.alertShown = false;
        }

       
        return throwError(() => error);
      })
    );
  }
}
