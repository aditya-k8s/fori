import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../environments/environment';
import {Title} from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-shopper',
  templateUrl: './shopper.component.html',
  styleUrls: ['./shopper.component.css']
})
export class ShopperComponent implements OnInit {
  start:any;
  limit:any;
  image_url = '';
  totalRecords:any;
  streamingList :any = [];
  constructor(
    private dataService: DataService,
    public toastr : ToastrManager,
    private titleService:Title,
    private ngxService: NgxUiLoaderService,
  ) {
    this.titleService.setTitle("Shoppers");
    this.image_url = environment.image_url;
  }

  ngOnInit(): void {
    // this.ngxService.start(); 
    // this.start=0;
    // this.limit=4;
    // this.getAllSreamingChannel();
  }

  // getAllSreamingChannel(){
  //   this.dataService.getAllSreamingChannel(this.start,this.limit).subscribe(response => {
  //     this.ngxService.stop();
  //      if(response['success'] == true){
  //         this.streamingList = response['body']['rows'];
  //         this.totalRecords = response['body']['totalRecords'];
  //       }
  //   });
  // }

}
