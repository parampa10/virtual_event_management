import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request/web-request.service';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { event } from 'src/app/Models/event.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor(private webReqService: WebRequestService,private http:HttpClient) { 
  }

  getEventByDay(){
    
    return this.webReqService.get('event/events')
  }
  getEvents(){
    
    return this.webReqService.get('event/')
  }
  
  addEvent(event: Object){
    return this.webReqService.post('event/create',event)
  }
}
