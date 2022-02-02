import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from './services/authentication/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // userToken = "";
  is_authenticated = false
  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document, public auth:AuthenticationService) {
    // var a = auth.isAuthenticated()
    // if(auth.is_authenticated){
    //   this.is_authenticated = true
    // }
    this.auth.is_authenticated.subscribe(x => this.is_authenticated = x);
  }
  title = 'zoom-meet';
  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }


}
