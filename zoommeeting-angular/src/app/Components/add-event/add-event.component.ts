import { Component, OnInit } from '@angular/core';
import { timezone } from 'src/app/constants';
import { event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  constructor(private eventService:EventService) { }

  ngOnInit(): void {
  }

  timezones = timezone

  public = true
  inheriting = false
  protected = false
  isAddBtnClicked = false
  isInvalid = false

  token = ""
  event_name = ""
  event_type = ""
  event_description = ""
  event_label = ""
  event_date = ""
  start_time = ""
  end_time = ""
  address = ""
  errorText = ""

  event: event = {
    eid:0,
    name: "",
    type: "",
    description: "",
    start: {hours:0,minutes:0},
    end: {hours:0,minutes:0},
    date: new Date,
    link:"",
  }

  showError = {
    event_name: false,
    event_type: false,
    event_description: false,
    event_date: false,
    start_time: false,
    end_time: false,
    venue: false,
    address: false,
  }

  addEventName(e: any) {
    if (e !== null) {
      this.showError.event_name = false
      this.event_name = e
      this.event.name = e
    } else {
      this.showError.event_name = true
    }
  }

  addEventType(e:any){
    if (e !== null) {
      this.showError.event_type = false
      this.event_type = e
      this.event.type = e
    } else {
      this.showError.event_type = true
    }
  }

  addEventDescription(e: any) {
    if (e !== null) {
      this.showError.event_description = false
      this.event_description = e
      this.event.description = e
    } else {
      this.showError.event_description = true
    }
  }


  addEventDate(e:any){
    if (e !== null) {
      this.showError.event_date = false
      this.event_date = e
      this.event.date = e
    } else {
      this.showError.event_date = true
    }
  }

  addEventTime(e: any ,name: string) {
    if (name === 'start_time') {
      if (e !== null) {
        this.showError.start_time = false
        this.start_time = e
        this.event.start = e
      } else {
        this.showError.start_time = true
      }
    }
    else if (name === 'end_time') {
      if (e !== null) {
        this.showError.end_time = false
        this.end_time = e
        this.event.end = e
      } else {
        this.showError.end_time = true
      }
    }
  }

  addevent(){
    console.log(this.event)
    this.eventService.addEvent(this.event).subscribe(
      data=> {
        console.log(data)
      }
    )
      
    
  }

  checkValidation() {
    if (this.event_name === "") {
      this.showError.event_name = true
    }
    if (this.event_description === "") {
      this.showError.event_description = true
    }
    if (this.start_time === "") {
      this.showError.start_time = true
    }
    if (this.end_time === "") {
      this.showError.end_time = true
    }
    if (this.address === "") {
      this.showError.address = true
    }
  }

}
function data(data: any) {
  throw new Error('Function not implemented.');
}

