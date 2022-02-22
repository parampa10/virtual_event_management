import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebRequestService } from 'src/app/Services/web-request/web-request.service';




@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  is_authenticated2 = false;
  public is_authenticated : Observable<boolean>
  public verify : BehaviorSubject<boolean>
  token = "";
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

  loginUser(credentials: Object) {
    const a = this.webReqService.post('user/login', credentials)
    a.subscribe(res => {
      if(res.hasOwnProperty("token")){
        this.is_authenticated2 = true
        this.verify.next(true)
        // this.verify = new BehaviorSubject<boolean>(true)
        // this.is_authenticated = this.verify.asObservable()
        this.token = this.getDataFromObj(res);
        localStorage.setItem("token", this.token);
      }
    })
    return a;
  }

  createUser(userInfo: Object) {
    return this.webReqService.post('user/signup', userInfo)
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