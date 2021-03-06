import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { LayoutComponent } from './layout/layout.component';
import { ModifyComponent } from './modify/modify.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BoothsRoutingModule } from './booth-routing.module';
import { BoothlistComponent } from './boothlist/boothlist.component';
import { BoothvisualComponent } from './boothvisual/boothvisual.component';



@NgModule({
  declarations: [
    ListComponent,
    LayoutComponent,
    ModifyComponent,
    BoothlistComponent,
    BoothvisualComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BoothsRoutingModule,
    
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BoothsRoutingModule
  ]
})
export class BoothsModule { }
