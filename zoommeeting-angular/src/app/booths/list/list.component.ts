import { Component, OnInit, ViewChild } from '@angular/core';
import { BoothService } from 'src/app/services/booth.service';
import {MatTable} from '@angular/material/table';
import { boothInfo } from 'src/app/models/booth.model';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  booths: any;
  // displayedColumns: string[] = ["boothid","company_name","company_video","company_brochure","company_email","is_available_for_one_on_one","company_meet"];
  // dataSource = [...this.booths];

  // @ViewChild(MatTable) table: MatTable<boothInfo>;

  constructor(private boothService: BoothService, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.boothService.getAll().subscribe(x => this.booths = x);
    // (this.booths as any).isDeleting = false;
    // this.booths.forEach(element => {
    //   (element as any).isDeleting = false;
    // });

    // this.dataSource = [...this.booths];
  }
  deleteBooth(id:string){
    console.log('inHere');
    // const booth = this.booths.find(x => x.id === id);
    // (booth as any).isDeleting = true;
    console.log(id);
    this.boothService.delete(id).pipe(first()).subscribe(() => this.booths = this.booths.filter(x => x.boothid !== id));
    this.router.navigate(['/booths'])
    .then(() => {
      window.location.reload();
    });
    // this.boothService.getAll().subscribe(x => this.booths = x);
    // this.dataSource = [...this.booths];
    

  }


}
