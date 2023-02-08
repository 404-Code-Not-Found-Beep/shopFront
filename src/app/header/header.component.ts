import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../Auth/auth-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  authenticated : boolean = false;
  constructor(private location: Location, private authService : AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((isAuthenticated : boolean) => {
      this.authenticated = isAuthenticated;
    })
  }
  backButton() {
    this.location.back();
  }


  ngOnDestroy(): void {
      this.authService.isAuthenticated().unsubscribe();
  }

}
