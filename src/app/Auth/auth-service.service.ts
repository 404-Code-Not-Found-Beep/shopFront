import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  
  private authenticated: Subject<boolean> = new Subject();
  constructor() { }
  ngOnInit(): void {
      this.authenticated.next(true);
  }

  isAuthenticated(){
    return this.authenticated;
  }
  onSwitchAuthMode(){
    this.authenticated.next(false);
    console.log(!this.authenticated, "inside auth service")
    return !this.authenticated;
  }
}
