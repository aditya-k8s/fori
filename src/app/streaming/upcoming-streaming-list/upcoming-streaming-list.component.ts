import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { DataService } from '../../data.service';
import { environment } from '../../../environments/environment';
import {Title} from "@angular/platform-browser";
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-upcoming-streaming-list',
  templateUrl: './upcoming-streaming-list.component.html',
  styleUrls: ['./upcoming-streaming-list.component.css']
})
export class UpcomingStreamingListComponent implements OnInit {
	totalRecords: any
	live_streaming:any = []
	image_url = '';
	loading = false
	start = 0;
	limit = 8;

  constructor(
  		private dataService: DataService,
	    private ngxService: NgxUiLoaderService,
	    private titleService:Title,
	    public toastr : ToastrManager,
	) { 
	  	this.titleService.setTitle("Upcoming Broadcast Listing");
	    this.image_url = environment.image_url;
  	}

  	ngOnInit(): void {
  		this.getUcomingSreaming()
  	}

     getUcomingSreaming() {
    	this.ngxService.start();
	    this.dataService.getUpcomingStream (this.start,this.limit).subscribe(response => {
	       this.ngxService.stop();
	       this.loading = false
	       	if(response['success'] == true){
	       		this.totalRecords = response['body']['totalRecords']
	           	if(this.start == 0){ 
            		this.live_streaming = response['body']['rows']
         		}
          		else {
          			this.toastr.successToastr(response['message']);
             		this.live_streaming = this.live_streaming.concat(response['body']['rows']);
          		}
	        }
	    });
  	}

	view_more(start:any,limit:any){
		this.start = start+this.start;
		this.limit = limit;
		this.loading = true
		this.getUcomingSreaming();
	}

}
