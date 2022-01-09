import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private webReqService: WebRequestService) { }

  loginUser(credentials: Object) {
    return this.webReqService.post('login', credentials)
  }

  createUser(userInfo: Object) {
    return this.webReqService.post('signup', userInfo)
  }
  
}