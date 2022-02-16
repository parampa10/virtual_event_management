import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ButtonSubmitComponent } from './Components/button-submit/button-submit.component';
import { ErrorDisplayComponent } from './Components/error-display/error-display.component';
import { InputLabelComponent } from './Components/input-label/input-label.component';
import { LoginComponent } from './Components/User/login/login.component';
import { SignupComponent } from './Components/User/sign-up/sign-up.component';
import { AddEventComponent } from './Components/add-event/add-event.component';
import { TimeTableComponent } from './Components/time-table/time-table.component';
import { InputTextRequiredComponent } from './Components/input-text-required/input-text-required.component';
import { CreateMeetingComponent } from './Components/create-meeting/create-meeting.component';
import { JoinMeetingComponent } from './Components/join-meeting/join-meeting.component';
import { AuthGuard } from './Services/authentication/auth.guard';

const routes: Routes = [

  {path: 'createMeeting', component: CreateMeetingComponent, canActivate:[AuthGuard] } ,
  {path: 'joinMeeting', component:JoinMeetingComponent, canActivate:[AuthGuard] },
  {path: 'signUp', component: SignupComponent},
  {path: 'logIn', component:LoginComponent},
  {path: 'addEvent', component:AddEventComponent},
  {path: 'timeTable', component:TimeTableComponent}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [JoinMeetingComponent,CreateMeetingComponent,InputTextRequiredComponent,TimeTableComponent,AddEventComponent,LoginComponent,SignupComponent,InputLabelComponent,ErrorDisplayComponent,ButtonSubmitComponent]