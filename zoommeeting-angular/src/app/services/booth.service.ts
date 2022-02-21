import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { boothInfo } from '../models/booth.model';
// import { WebRequestService } from './web-request/web-request.service';

// import { WebRequestService } from './web-request/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class BoothService {
  constructor(private router: Router, private http:HttpClient) {
    
   }
   create(boothInfo: boothInfo){
     return this.http.post('http://127.0.0.1:5000/boothinfo/create', boothInfo);
   }
   getAll(){
     return this.http.get<boothInfo[]>('http://127.0.0.1:5000/boothinfo/');
   }
   getById(id:string){
     return this.http.get<boothInfo>(`http://127.0.0.1:5000/boothinfo/${id}`);
    //  return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
   }
   getByName(name:string){
    return this.http.get(`http://127.0.0.1:5000/boothinfo/${name}`);
   }
   update(id,params){
     return this.http.put(`http://127.0.0.1:5000/boothinfo/update/${id}`, params);
   }
   delete(id:string){
     return this.http.delete(`http://127.0.0.1:5000/boothinfo/delete/${id}`);
   }
}
