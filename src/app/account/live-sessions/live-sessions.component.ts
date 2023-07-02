import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../environments/environment';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-live-sessions',
  templateUrl: './live-sessions.component.html',
  styleUrls: ['./live-sessions.component.css']
})
export class LiveSessionsComponent implements OnInit {

	upComingSessions : any = [];
	previousSessions : any = {}
	userId : any
	image_url = ''
	start = 0;
  limit = 3;
  loading = false
  totalupcoming = false
  totalStareaming = false
  constructor(
  	private router: Router,
  	private dataService: DataService,
    public toastr : ToastrManager,
  	private formBuilder:FormBuilder,
    private titleService:Title
  	) { 
    this.titleService.setTitle("Live Sessions");
	  this.image_url = environment.image_url;
	}

  ngOnInit() {
    if(localStorage.getItem("data")){
      let data = this.dataService.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
  	//this.userId = localStorage.getItem("user_id")
  	this.getUpcomingSessions();
    this.getPreviousSessions();
  }

  getUpcomingSessions(){
  	this.loading = true;
  	this.dataService.getupcomingStreaming(this.start,this.limit).subscribe(response => {
  		this.loading = false;
       if(response['success'] == true){
          this.totalupcoming = response['body']['totalRecords']
          if(this.start == 0){ 
            this.upComingSessions = response['body'];
          }
          else {
             this.upComingSessions = this.upComingSessions.concat(response['body']);
          }
        }
    });
  }

  getPreviousSessions() {
    this.loading = true;
    this.dataService.getStoredStreaming(this.start,this.limit).subscribe(response => {
      this.loading = false;
       if(response['success'] == true){
         this.totalStareaming = response['body']['totalRecords']
          if(this.start == 0){
            this.previousSessions = response['body']['rows']
          }
          else {
            this.previousSessions = this.previousSessions.concat(response['body']['rows']);
          }
        }
    });
  }

 view_sessions(start:any,limit:any){
	this.start = start+this.start;
	this.limit = limit;
	this.getUpcomingSessions()
 }

 view_StoredSessions(start:any,limit:any){
 	this.start = start+this.start;
	this.limit = limit;
	this.getPreviousSessions()
 }

}
