import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../environments/environment';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-recent-live-events',
  templateUrl: './recent-live-events.component.html',
  styleUrls: ['./recent-live-events.component.css']
})
export class RecentLiveEventsComponent implements OnInit {
	liveSessions : any = []
	loading = false
	start:any;
 	limit:any;
 	image_url = '';
  stored_url: any
  copied:any
  constructor(
  	private router: Router,
  	private dataService: DataService,
    public toastr : ToastrManager,
  	private formBuilder:FormBuilder,
  	private titleService:Title
  	) { 
  	this.image_url = environment.image_url;
  	this.titleService.setTitle("Recent Live Events");
   }

  ngOnInit(): void {
  	this.getSessions()
  }


     getSessions(){
   	  this.start=0;
    	this.limit=6;
   		this.dataService.getInflueStoredStreaming(this.start,this.limit).subscribe(response => {
	       if(response['success'] == true){
	          this.liveSessions = response['body']
	        }
    	});
    }

    view_sessions(start:any,limit:any){
	    this.loading = true;
	    this.start = start+this.start;
	    this.limit = limit;
	    this.dataService.getInflueStoredStreaming(this.start,this.limit).subscribe(response => {
	       this.loading = false;
	        if(response['success'] == true){	        
		        this.liveSessions = this.liveSessions.concat(response['body']);
	        }
	        else
	        {
	        	 this.toastr.errorToastr(response['message']);
	        }
	    });
    }

    getRecording(url:any) {
      this.copied = ""
      this.stored_url = url
    }

    copyUrl(inputElement:any){
      this.copied = "Copied"
      inputElement.select();
      document.execCommand('copy');
      inputElement.setSelectionRange(0, 0);
    }

}
