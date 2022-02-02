import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(public auth: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if(this.auth.is_authenticated && this.auth.token){
        req = req.clone({ headers: req.headers.set('Authorization', this.auth.token)});
      }
      return next.handle(req);
  }
}
