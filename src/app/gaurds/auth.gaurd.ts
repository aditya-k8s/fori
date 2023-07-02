import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private route :ActivatedRoute,
    ){
    this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd ) {
            let url:any=event.url;
          }
        })
    }
    // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //     if(localStorage.getItem("user_id") != undefined && localStorage.getItem("profile_Pic") != undefined
    //     && localStorage.getItem("user_name") != undefined && localStorage.getItem("shopify_verify") != undefined
    //     && localStorage.getItem("token") != undefined){  
    //         return true;
    //     }else{
    //         this.router.navigate(['/login']);
    //         return false;
    //     }
    // }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(localStorage.getItem("data") != undefined && localStorage.getItem("token") != undefined){  
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}