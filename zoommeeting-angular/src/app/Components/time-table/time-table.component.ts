import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { event } from 'src/app/Models/event.model';
import { Break } from 'src/app/Models/break.model';
import { MatDialog } from '@angular/material/dialog';
import{EventService} from 'src/app/Services/event/event.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})


export class TimeTableComponent implements OnInit {

  public editing:boolean =false;
  public adding:boolean =false;
  public breaking:boolean = false;
  public editingBreak:boolean =false;

  public editing_name:string = "";
  public editing_status:string = "";
  public editing_start:string = "";
 
  todayDate : Date = new Date();
  date:number = this.todayDate.getDate();
  month:number = this.todayDate.getMonth();
  year:number = this.todayDate.getFullYear();
  todayDate1 : Date = new Date(this.year+"-"+(this.month+1)+"-"+(this.date+1));
  todayDate2 : Date = new Date(this.year+"-"+(this.month+1)+"-"+(this.date+2));
  todayDate3 : Date = new Date(this.year+"-"+(this.month+1)+"-"+(this.date+3));
  todayDate4 : Date = new Date(this.year+"-"+(this.month+1)+"-"+(this.date+4));
  todayDate5 : Date = new Date(this.year+"-"+(this.month+1)+"-"+(this.date+5));
  todayDate6 : Date = new Date(this.year+"-"+(this.month+1)+"-"+(this.date+6));

  event: event = {
    name: "",
    type: "",
    description: "",
    start: {hours:0,minutes:0},
    end: {hours:0,minutes:0},
    date: new Date
  }
  //user B cause break is keyword
  Break: Break = {
    name: "",
    start: {hours:0,minutes:0},
    end: {hours:0,minutes:0},
  }
  
  @ViewChild('addeventmodalref')
  addeventmodalref!: TemplateRef<any>;
  @ViewChild('editeventmodalref')
  editeventmodalref!: TemplateRef<any>;
  @ViewChild('addBreakmodalref')
  addBreakmodalref!: TemplateRef<any>;
  @ViewChild('editBreakmodalref')
  editBreakmodalref!: TemplateRef<any>;
 
  constructor(public dialog: MatDialog,private eventService:EventService) { }

  temp:any=[]
  
  ngOnInit(): void {
    this.eventService.getEvents().subscribe(res  => {
      this.temp=res
      for (let i = 0; i <this.temp.length ; i++) {
        this.basket1.push(this.temp[i])
      }
      console.log(this.temp.length)
      console.log(this.temp[0])
    })
    
    this.basket1.forEach((e :any) => {
      console.log("HIII")  
      console.log(e)
      
    });
  } 

  events_objects:any=[]

  basket1 :any = [];
  basket2 :any = [];
  basket3 :any = [];
  basket4 :any = [];
  basket5 :any = [];
  basket6 :any = [];
  basket7 :any = [];

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  //event deleting .......
  deletefunction(ename:any){
    console.log("deleting")
    this.events_objects.forEach((item:any,index:any)=>{
      if(item.name==ename) this.events_objects.splice(index,1);
    });
  }

  //event editing............
  editmodal(ename:any){
    console.log("editing modal open!")
    this.editing=!this.editing
    const myTempDialog = this.dialog.open(this.editeventmodalref);
    myTempDialog.afterClosed().subscribe((res) => {

      // Data back from dialog
      console.log({ res });
    });
    
    this.events_objects.forEach((item:any)=>{
      if(item.name==ename) 
      {
        console.log(this.event) 
        this.event=item    
      }
   });
  }

  editevent(ename:any){
    console.log("event edited!")
    
    this.events_objects.forEach((item:any)=>{
      if(item.name==ename) 
      {
        this.event=item    
      }
   });

    this.event={
      name: "",
      type: "",
      description: "",
      start: {hours:0,minutes:0},
      end: {hours:0,minutes:0},
      date: new Date
    }
    this.editing=!this.editing
    
  }

  //event ADDing
  addeventmodal(){
    const myTempDialog = this.dialog.open(this.addeventmodalref);
    myTempDialog.afterClosed().subscribe((res) => {

      // Data back from dialog
      console.log({ res });
    });
    this.adding=!this.adding
  }

  event_data(e:any){
    console.log(e)
    console.log(this.event.name)
  }

  addevent(){
    console.log("event added!")
    this.events_objects.push(this.event)
    this.event={
      name: "",
      type: "",
      description: "",
      start: {hours:0,minutes:0},
      end: {hours:0,minutes:0},
      date: new Date
    }
    this.adding=!this.adding
    console.log(this.events_objects)
  }

  //break............
  addBreakmodal(){
    const myTempDialog = this.dialog.open(this.addBreakmodalref);
    myTempDialog.afterClosed().subscribe((res) => {

      // Data back from dialog
      console.log({ res });
    });
    this.breaking=!this.breaking
  }

  editBreakmodal(ename:any){
    const myTempDialog = this.dialog.open(this.editBreakmodalref);
    myTempDialog.afterClosed().subscribe((res) => {

      // Data back from dialog
      console.log({ res });
    });
    this.events_objects.forEach((item:any)=>{
      if(item.name==ename) 
      {
        console.log(this.event) 
        this.event=item    
      }
   });
  }

  addBreak(){
    console.log("Break added!")
    this.events_objects.push(this.Break)
    this.Break={
      name: "",
      start: {hours:0,minutes:0},
      end: {hours:0,minutes:0},
    }
    this.breaking=!this.breaking
    console.log(this.events_objects)
  }

  editBreak(bname:any){
    console.log("Break being edited!")
    
    this.events_objects.forEach((item:any)=>{
      if(item.name==bname) 
      {
        this.Break=item    
      }
   });

    this.Break={
      name: "",
      start: {hours:0,minutes:0},
      end: {hours:0,minutes:0},
    }
    this.breaking=!this.breaking
  }
}
