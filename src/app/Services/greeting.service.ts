import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GreetingService {

  constructor() { }

  setGreeting(name:string): Observable<string> {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 11) {
      return of(`Hello ${name}, Good Morning`);     
    } else if (hours >= 11 && hours < 16) {
      return of(`Hello ${name}, Good Afternoon`);
    } else {
      return of(`Hello ${name}, Good Evening`);
    }
  }
}
