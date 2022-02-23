import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { event } from 'src/app/models/event.model';
import { Break } from 'src/app/models/break.model';
import { MatDialog } from '@angular/material/dialog';
import{EventService} from 'src/app/services/event/event.service';
import { Router } from '@angular/router';

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
  month:number = this.todayDate.getMonth()+1;

  currentMonth = (this.todayDate.getMonth() < 10 ? '0' : '') + this.month;
  
  year:number = this.todayDate.getFullYear();
  todayDate1 : Date = new Date(this.year+"-"+(this.month)+"-"+(this.date+1));
  todayDate2 : Date = new Date(this.year+"-"+(this.month)+"-"+(this.date+2));
  todayDate3 : Date = new Date(this.year+"-"+(this.month)+"-"+(this.date+3));
  todayDate4 : Date = new Date(this.year+"-"+(this.month)+"-"+(this.date+4));
  todayDate5 : Date = new Date(this.year+"-"+(this.month)+"-"+(this.date+5));
  todayDate6 : Date = new Date(this.year+"-"+(this.month)+"-"+(this.date+6));

  stringdate =  this.year+"-"+this.currentMonth+"-"+(this.date)
  stringdate1 = this.year+"-"+this.currentMonth+"-"+(this.date+1)
  stringdate2 = this.year+"-"+this.currentMonth+"-"+(this.date+2)
  stringdate3 = this.year+"-"+this.currentMonth+"-"+(this.date+3)
  stringdate4 = this.year+"-"+this.currentMonth+"-"+(this.date+4)
  stringdate5 = this.year+"-"+this.currentMonth+"-"+(this.date+5)
  stringdate6 = this.year+"-"+this.currentMonth+"-"+(this.date+6)

  event: event = {
    eid:0,
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
 
  constructor(public dialog: MatDialog,private eventService:EventService,private router: Router) { }

  temp:any=[]
  
  ngOnInit(): void {
    
    
    this.eventService.getEvents().subscribe(res  => {
      this.temp=res
      
      for (let i = 0; i <this.temp.length ; i++) {
        if(this.temp[i].date == this.stringdate){
          this.basket1.push(this.temp[i])  
        }
        else if(this.temp[i].date == this.stringdate1){
          this.basket2.push(this.temp[i])  
        }
        else if(this.temp[i].date == this.stringdate2){
          this.basket3.push(this.temp[i])  
        }
        else if(this.temp[i].date == this.stringdate3){
          this.basket4.push(this.temp[i])  
        }
        else if(this.temp[i].date == this.stringdate4){
          this.basket5.push(this.temp[i])  
        }
        else if(this.temp[i].date == this.stringdate5){
          this.basket6.push(this.temp[i])  
        }
        else if(this.temp[i].date == this.stringdate6){
          this.basket7.push(this.temp[i])  
        }
        
      }
    })

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
  deletefunction(eid:any){
    console.log("deleting")
    this.events_objects.forEach((item:any,index:any)=>{
      if(item.eid==eid) this.events_objects.splice(index,1);
    });
    this.eventService.deleteEvent(eid).subscribe(
      data=> {
        console.log(data)
      }
    )
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
  
   this.eventService.editEvent(this.event.eid,this.event).subscribe(
    data=> {
      console.log(data)
    }
  )

    this.event={
      eid:0,
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

    this.eventService.addEvent(this.event).subscribe(
      data=> {
        console.log(data)
      }
    )

    this.event={
      eid: 0,
      name: "",
      type: "",
      description: "",
      start: {hours:0,minutes:0},
      end: {hours:0,minutes:0},
      date: new Date
    }
    this.adding=!this.adding
    this.router.navigate(['/timeTable'])
    .then(() => {
      window.location.reload();
    });
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

  arrange(){
    for (let i = 0; i <this.events_objects.length ; i++) {
      if(this.events_objects[i].date == this.stringdate){
        this.basket1.push(this.events_objects[i])  
      }
      else if(this.events_objects[i].date == this.stringdate1){
        this.basket2.push(this.events_objects[i])  
      }
      else if(this.events_objects[i].date == this.stringdate2){
        this.basket3.push(this.events_objects[i])  
      }
      else if(this.events_objects[i].date == this.stringdate3){
        this.basket4.push(this.events_objects[i])  
      }
      else if(this.events_objects[i].date == this.stringdate4){
        this.basket5.push(this.events_objects[i])  
      }
      else if(this.events_objects[i].date == this.stringdate5){
        this.basket6.push(this.events_objects[i])  
      }
      else if(this.events_objects[i].date == this.stringdate6){
        this.basket7.push(this.events_objects[i])  
      }
      
    }
    this.events_objects =[]
  }
}
