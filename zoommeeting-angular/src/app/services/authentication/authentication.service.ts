import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebRequestService } from 'src/app/services/web-request/web-request.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  is_authenticated2 = false;
  public is_authenticated : Observable<boolean>
  public verify : BehaviorSubject<boolean>
  token = "";
  username = "";
  constructor(private webReqService: WebRequestService, private router : Router) {
    this.verify = new BehaviorSubject<boolean>(localStorage.getItem("token")? true:false)
    this.is_authenticated = this.verify.asObservable()
  }

  isLoggedIn(){
    return this.is_authenticated2
  }

  getDataFromObj(data: any) {
    if (data.token) return data.token
    else return data.message
  }

  getData(data: any) {
    if (data.username) return data.username
    else return data.message
  }

  loginUser(credentials: Object) {
    const a = this.webReqService.post('user/login', credentials)
    a.subscribe(res => {
      if(res.hasOwnProperty("token")){
        this.is_authenticated2 = true
        this.verify.next(true)
        // this.verify = new BehaviorSubject<boolean>(true)
        // this.is_authenticated = this.verify.asObservable()
        this.token = this.getDataFromObj(res);
        this.username = this.getData(res);
        localStorage.setItem("token", this.token);
        localStorage.setItem("jid", this.username);
        const password = this.username + "@123";
        localStorage.setItem("password" , password);
      }
    })
    return a;
  }

  createUser(userInfo: Object) {
    // var user = {
    //   "user": userInfo["username"],
    //   "host": "localhost",
    //   "password": userInfo["username"] + "@123",
    // }
    // this.webReqService.registerEjab(user);
    return this.webReqService.post('user/signup', userInfo)
  }

  createEjabUser(userInfo: Object){
    var user = {
      "user": userInfo["username"],
      "host": "localhost",
      "password": userInfo["username"] + "@123",
    }
    return this.webReqService.registerEjab(user);
    
  }
  
  isAuthenticated(){
    // return this.is_authenticated
    if(this.is_authenticated2 && this.token){
      return this.token
    }
    return "No Token Found"
  }

  logout(){
    localStorage.removeItem("token")
    this.verify.next(false)
    this.router.navigate(["/logIn"])
  }
}