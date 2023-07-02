import { Injectable, OnInit } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment'

@Injectable({
    providedIn: 'root'
})

export class AWSService implements OnInit  {
    httpOption: any;
    auth_token: any;
    auth_header: any;
    aws_url : string = "";
    carbon_url : string = "";
    constructor(private http: HttpClient) {
        this.aws_url = environment.aws_api;
        this.carbon_url = environment.carbon_api;
        if(sessionStorage.getItem('auth_token')){
          this.auth_token = sessionStorage.getItem('auth_token');
        }
        this.httpOption = {headers: new HttpHeaders({'x-amz-target': 'AWSCognitoIdentityProviderService.InitiateAuth','Content-Type': 'application/x-amz-json-1.1'})};
        this.auth_header = {headers: new HttpHeaders({'x-amz-target': 'AWSCognitoIdentityProviderService.InitiateAuth',
        'Content-Type': 'application/json', 'Authorization' : 'Bearer '+this.auth_token})};
    }

    ngOnInit() {}

    loginWithAWS(input_data:any){
      return this.http.post(this.aws_url,input_data,this.httpOption).pipe(
        map((response: any) => {const data = response;return data;}),
        catchError((error: any) => {const data = error;return data;})
      )
    }

    purchaseAmount(data:any){
      return this.http.post(this.carbon_url+'amount',data,this.auth_header).pipe(
        map((response: any) => {const data = response;return data;}),
        catchError((error: any) => {const data = error;return data;})
      )
    }

}