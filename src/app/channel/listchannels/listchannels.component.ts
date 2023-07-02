import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-listchannels',
  templateUrl: './listchannels.component.html',
  styleUrls: ['./listchannels.component.css']
})
export class ListchannelsComponent implements OnInit {
  popularChannelsList:any=[];
  start:any;
  limit:any;
  msg:any;
  loading = false
  image_url = ''
  totalRecords:any
  constructor(
  private dataService: DataService,
  public toastr : ToastrManager,
  private ngxService: NgxUiLoaderService,
  ) {
   this.image_url = environment.image_url;
  }

  ngOnInit() {
    this.getChannels()
  }

  getChannels() {
    this.ngxService.start();
    this.start=0;
    this.limit=8;
    this.dataService.getAllChannel(this.start,this.limit).subscribe(response => {
      this.ngxService.stop();
      if(response['success'] == true){
          this.totalRecords = response['body']['totalRecords']
          this.popularChannelsList = response['body']['rows']
      }
    });
  }

  viewmorechannels(start:any,limit:any){
    this.ngxService.start();
    this.loading = true;
    this.start=start+this.start;
    this.limit=limit;
    this.dataService.getAllChannel(this.start,this.limit).subscribe(response => {
      this.loading = false;
      this.ngxService.stop();
       if(response['success'] == true){
          if(response['body']!=''){
            this.totalRecords = response['body']['totalRecords']
            this.popularChannelsList = this.popularChannelsList.concat(response['body']['rows']);
          }else{
            this.toastr.errorToastr('NO MORE RECORD FOUND');
          }
        }
    });

  }

}
