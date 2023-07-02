import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { environment } from '../../../environments/environment';
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-upcoming-live-stream',
  templateUrl: './upcoming-live-stream.component.html',
  styleUrls: ['./upcoming-live-stream.component.css']
})
export class UpcomingLiveStreamComponent implements OnInit {
  start = 0;
  limit = 4;
  image_url = '';
  upcoming_streaming: any = [];
  totalRecords : boolean = false
  constructor(
    private dataService: DataService,
    private ngxService: NgxUiLoaderService,
  ) {
    this.image_url = environment.image_url;
  }

  ngOnInit(): void {
    this.ngxService.start();
    this.getUpcomingStreaming();
  }

  getUpcomingStreaming() {
    this.dataService.getUpcomingStream(this.start,this.limit).subscribe(response => {
       this.ngxService.stop();
       if(response['success'] == true){
          this.upcoming_streaming = response['body']['rows'];
          this.totalRecords = response['body']['totalRecords'];
        }
    });
  }

}
