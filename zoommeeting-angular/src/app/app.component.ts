import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthenticationService } from './Services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {

  // userToken = "";
  is_authenticated = false
  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document, public auth:AuthenticationService) {
    // var a = auth.isAuthenticated()
    // if(auth.is_authenticated){
    //   this.is_authenticated = true
    // }
    this.getVerification()
  }
  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    this.auth.is_authenticated.subscribe(x => this.is_authenticated = x);
    if(this.auth.isLoggedIn()){
      this.is_authenticated = true
    }
  }
  title = 'zoom-meet';
  ngOnInit() {
    this.is_authenticated = this.auth.isLoggedIn()
    this.getVerification()
  }

  getVerification(){
    this.auth.is_authenticated.subscribe(x => this.is_authenticated = x);
  }

  logout() {
    this.auth.logout();
  }


}
