import { Injectable } from "@angular/core";
import { Router, CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()

export class AuthGuard implements CanActivate{
    constructor(private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(localStorage.getItem("token")){
            return true
        }
        this.router.navigate(["logIn"] , {queryParams: {returnUrl : state.url}})
        return false
    }
}