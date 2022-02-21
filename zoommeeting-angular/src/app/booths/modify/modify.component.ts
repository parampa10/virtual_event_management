import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { boothInfo } from 'src/app/models/booth.model';
import { BoothService } from 'src/app/services/booth.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  boothInfo!: any;
  formVal: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private boothService: BoothService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    
    this.isAddMode = !this.id;
    this.form = this.formBuilder.group({
      company_name : ["", Validators.required],
      company_video : ["", Validators.required],
      company_brochure : ["", Validators.required],
      company_email : ["", Validators.required],
      is_available_for_one_on_one :  [false],
      company_meet : [""]
    })

    
    if(!this.isAddMode){
      // this.boothService.getById(this.id).subscribe(x => this.form.patchValue(x));
      this.boothService.getById(this.id).pipe(first()).subscribe(x => {
        this.form.patchValue(x);
        // console.log('Emotional Damage');
        // console.log(x);
        // // this.formVal = x; 
        // this.form.controls['company_name'].setValue(x.company_name);
        // this.form.controls['company_video'].setValue(x.company_video);
        // this.form.controls['company_brochure'].setValue(x.company_brochure);
        // this.form.controls['company_email'].setValue(x.company_email); 
        // this.form.controls['is_available_for_one_on_one'].setValue(x.is_available_for_one_on_one);
        // this.form.controls['company_meet'].setValue(x.company_meet);
      });
      // console.log(this.formVal);
      // this.form.controls['company_name'].setValue(this.formVal.company_name);
      // this.form.controls['company_video'].setValue(this.formVal.company_video);
      // this.form.controls['company_brochure'].setValue(this.formVal.company_brochure);
      // this.form.controls['company_email'].setValue(this.formVal.company_email); 
      // this.form.controls['is_available_for_one_on_one'].setValue(this.formVal.is_available_for_one_on_one);
      // this.form.controls['company_meet'].setValue(this.formVal.company_meet);

    }
  }

  get f(){return this.form.controls}
  onSubmit(){
    console.log('Haha');
    this.submitted = true;
    if(this.form.invalid) return;
    this.loading = true;
    // this.form.controls['company_name'].hasError
    this.form.controls["is_available_for_one_on_one"].setValue(this.form.controls["company_meet"].value === ""? false:true);
    // (this.boothInfo as any).company_name = this.form.controls['company_name'].value ;
    // (this.boothInfo as any).company_video = this.form.controls['company_video'].value ;
    // (this.boothInfo as any).company_brochure = this.form.controls['company_brochure'].value ;
    // (this.boothInfo as any).company_email = this.form.controls['company_email'].value ;
    // (this.boothInfo as any).is_available_for_one_on_one = this.form.controls['is_available_for_one_on_one'].value;
    // (this.boothInfo as any).company_meet = this.form.controls['company_meet'].value ;
    if(this.isAddMode){
      this.createBooth()
    }
    else{
      this.updateBooth()
    }
  }
  updateBooth() {
    console.log('UPD');
    this.boothService.update(this.id, this.form.value).subscribe({
      next: ()=>{this.router.navigate(["../../"], {relativeTo: this.route})},
      error: error => {this.loading = false}
    })
  }
  createBooth() {
    console.log('INS')
    this.boothService.create(this.form.value).subscribe({
      next: ()=>{this.router.navigate(["../"], {relativeTo: this.route})},
      error: error => {this.loading = false}
    });

  }
}
