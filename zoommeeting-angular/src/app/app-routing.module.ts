import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { JoinMeetingComponent } from './join-meeting/join-meeting.component';

const routes: Routes =[

  {path: 'createMeeting', component: CreateMeetingComponent } ,
  {path: 'joinMeeting', component:JoinMeetingComponent },
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }

export const routingComponents = [CreateMeetingComponent,JoinMeetingComponent]