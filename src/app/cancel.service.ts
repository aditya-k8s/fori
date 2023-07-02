import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class CancelService {
  
  constructor(private http: HttpClient){}

  // init the subject
  public stopRequest: Subject<void> = new Subject<void>();

  public getData(url: string, params?:any) {
    return this.http
      .get(url).pipe(takeUntil(this.stopRequest) /* once the subject emits a value, cancel the request*/);
  }
}
