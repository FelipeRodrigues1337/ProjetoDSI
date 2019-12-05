import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User;

  constructor(private router: Router, private loginService: LoginService) {
    this.loginService.currentUser.subscribe(data => this.currentUser = data);
    
   }

  ngOnInit() {
  }
 

  logOut(){
    this.router.navigate['/login'];
    this.loginService.logout();
    
  }
}
