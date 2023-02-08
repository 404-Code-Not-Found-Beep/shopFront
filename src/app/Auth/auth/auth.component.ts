import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  easyAuth = false

  constructor(private authService : AuthService){}

  onSwitchAuthMode(){
    this.easyAuth = !this.easyAuth;
    this.authService.onSwitchAuthMode();
  }

  onSubmit(form : NgForm){
    console.log(form.value);
    form.reset;
  }

}
