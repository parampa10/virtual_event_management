import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoothlistComponent } from './boothlist/boothlist.component';
import { BoothvisualComponent } from './boothvisual/boothvisual.component';

import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ListComponent },
            { path: 'add', component: ModifyComponent },
            { path: 'edit/:id', component: ModifyComponent },
            { path: 'list', component: BoothlistComponent},
            { path: 'view/:name', component: BoothvisualComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BoothsRoutingModule { }