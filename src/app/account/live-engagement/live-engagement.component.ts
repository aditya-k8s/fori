import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../environments/environment';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-live-engagement',
  templateUrl: './live-engagement.component.html',
  styleUrls: ['./live-engagement.component.css']
})
export class LiveEngagementComponent implements OnInit {
	stream_id:any;
	image_url = '';
	engagementData : any = []
  constructor(
  	private routers: ActivatedRoute,
  	private router: Router,
  	private dataService: DataService,
    public toastr : ToastrManager,
  	private formBuilder:FormBuilder,
  	private titleService:Title
  	) { 
  	this.image_url = environment.image_url;
  	this.titleService.setTitle("Live Engagement");
  	}

  ngOnInit() {
	this.routers.paramMap.subscribe((params: ParamMap) => {
	  this.stream_id = params.get('id');
	});

  	this.getInfluencerStreamingDetails()
  }

   getInfluencerStreamingDetails(){

		this.dataService.getInfluencerStreamingDetails(this.stream_id).subscribe(response => {
	        if(response['success'] == true){
	         // this.retailerFees = response['body']['retail_fee'];
	         this.engagementData = response['body'][0]
	        }
	    });
   }

}
