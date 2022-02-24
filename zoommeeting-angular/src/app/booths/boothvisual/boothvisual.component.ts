import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boothvisual',
  templateUrl: './boothvisual.component.html',
  styleUrls: ['./boothvisual.component.css']
})
export class BoothvisualComponent implements OnInit {

  name!: string;
  isValid: boolean = false;
  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.name = this.route.snapshot.params["name"];
    console.log(this.name);
    // this.isValid = !this.name;
    this.isValid = true;
  }
  onClick(message){
    console.log(message);
  }
  onClick2(event){
    var x = event.clientX;
    var y = event.clientY;
    console.log(x,y);
  }
}
