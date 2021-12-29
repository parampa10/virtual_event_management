import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) {
  }
  title = 'zoom-meet';
  ngOnInit() {

  }

}
