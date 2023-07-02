import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../environments/environment';
import {Title} from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router } from '@angular/router';
@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.css']
})
export class LiveStreamComponent implements OnInit {
  start:any;
  limit:any;
  image_url = '';
  live_streaming: any = [];
  href : boolean = false;
  totalChannel : boolean = false;
  constructor(
    private dataService: DataService,
    public toastr : ToastrManager,
    private titleService:Title,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) {
    this.image_url = environment.image_url;
  }

  ngOnInit(): void {
    if(this.router.url == '/list/streaming'){
      this.href = true;
    }
    this.ngxService.start(); 
    this.start=0;
    this.limit=4;
    this.getLiveSreaming();
  }

  getLiveSreaming() {
    this.dataService.getLiveStream(this.start,this.limit).subscribe(response => {
       this.ngxService.stop();
       if(response['success'] == true){
          this.live_streaming = response['body']['rows'];
          this.totalChannel = response['body']['totalRecords'];
        }
    });
  }

}
