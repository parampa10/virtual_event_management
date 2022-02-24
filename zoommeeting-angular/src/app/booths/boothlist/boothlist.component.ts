import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoothService } from 'src/app/services/booth.service';

@Component({
  selector: 'app-boothlist',
  templateUrl: './boothlist.component.html',
  styleUrls: ['./boothlist.component.css']
})
export class BoothlistComponent implements OnInit {

  booths: any;
  constructor(private boothService: BoothService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.boothService.getAll().subscribe(x => this.booths = x);
  }
  Redirect(){
   this.router.navigate(["../view/MCI"], {relativeTo: this.route})
  }
}
