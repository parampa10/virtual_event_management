import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request/web-request.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  is_authenticated = false;
  token = "";
  constructor(private webReqService: WebRequestService) { }

  getDataFromObj(data: any) {
    if (data.token) return data.token
    else return data.message
  }

  loginUser(credentials: Object) {
    const a = this.webReqService.post('user/login', credentials)
    a.subscribe(res => {
      if(res.hasOwnProperty("token")){
        this.is_authenticated = true;
        this.token = this.getDataFromObj(res);
      }
      
    })
    return a;
  }

  createUser(userInfo: Object) {
    return this.webReqService.post('user/signup', userInfo)
  }
  
  isAuthenticated(){
    return this.is_authenticated
  }
}