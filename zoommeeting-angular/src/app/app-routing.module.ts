import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateMeetingComponent  } from './Components/create-meeting/create-meeting.component';
import { JoinMeetingComponent } from './Components/join-meeting/join-meeting.component';
import { SignupComponent } from './Components/User/sign-up/sign-up.component'; 
import { InputLabelComponent } from './Components/input-label/input-label.component';
import { ErrorDisplayComponent } from './Components/error-display/error-display.component';
import { ButtonSubmitComponent } from './Components/button-submit/button-submit.component';
import { LoginComponent } from './Components/User/login/login.component';
import { AuthGuard } from './services/authentication/auth.guard';

const routes: Routes =[

  {path: 'createMeeting', component: CreateMeetingComponent, canActivate:[AuthGuard] } ,
  {path: 'joinMeeting', component:JoinMeetingComponent, canActivate:[AuthGuard] },
  {path: 'signUp', component:SignupComponent},
  {path: 'logIn', component:LoginComponent},
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent,CreateMeetingComponent,JoinMeetingComponent,SignupComponent,InputLabelComponent,ErrorDisplayComponent,ButtonSubmitComponent]