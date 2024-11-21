import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GreetingService {
  greeting: string='';

  constructor() { }

  setGreeting(name:string):string {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 11) {
      this.greeting = `Hello ${name}, Good Morning`;
      return this.greeting
    } else if (hours >= 11 && hours < 16) {
      this.greeting = `Hello ${name}, Good Afternoon`;
      return this.greeting
    } else {
      this.greeting = `Hello ${name}, Good Evening`;
      return this.greeting
    }
  }
}
