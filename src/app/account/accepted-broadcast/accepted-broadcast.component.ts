import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../environments/environment';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-accepted-broadcast',
  templateUrl: './accepted-broadcast.component.html',
  styleUrls: ['./accepted-broadcast.component.css']
})
export class AcceptedBroadcastComponent implements OnInit {
  broadcast : any = [];
  newArray : any = [];
	userId : any
	image_url = ''
	start = 0;
  limit = 3;
  loading = false
  userName:any;
  isntAccepted : boolean = false;
  constructor(
  	private router: Router,
    private route: ActivatedRoute,
  	private dataService: DataService,
    public toastr : ToastrManager,
  	private formBuilder:FormBuilder,
    private titleService:Title
    ) { 
      this.titleService.setTitle("Live Sessions");
	  this.image_url = environment.image_url;
	}

  ngOnInit(){

    if(localStorage.getItem("data")){
      let data = this.dataService.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
      this.userName = data[0]['username'];
    }

  // 	if(localStorage.getItem("user_id")){
	//   	this.userId = localStorage.getItem("user_id")
	//   	this.userName=localStorage.getItem("user_name");
	// }

    this.route.queryParams.subscribe(params => {
      if(params['share'] == 'influencer') {
        if(localStorage.getItem("data")){
          let data = this.dataService.decryptData(localStorage.getItem("data"));
          if(data[0]['user_type'] == '3') {
            this.isntAccepted = true
          }
        }
        // if(localStorage.getItem("user_type") == '3') 
        // {
        //   this.isntAccepted = true
        // }
      }
    });

    // this.route.queryParams.subscribe(params => {
    //   if(params['share'] == 'influencer') {
    //     if(localStorage.getItem("user_type") == '3') 
    //     {
    //       this.isntAccepted = true
    //     }
    //   }
    // });

  	this.getInfluencerBroadcast();
  }


    getInfluencerBroadcast(){
	  	this.loading = true;
	  	this.dataService.getInfluencerStreaming(this.start,this.limit).subscribe(response => {
	  		this.loading = false;
	       if(response['success'] == true){
             //this.broadcast = response['body']
              this.newArray = this.newArray.concat(response['body']);
              this.broadcast = this.newArray;
	        }
	    });
 	}

  view_sessions(start:any,limit:any){
		this.start = start+this.start;
		this.limit = limit;
		this.getInfluencerBroadcast()
 	}

 	getBroadcastName(title:any,id:any){
   		 return title.replace(/ |@|$|~|"|'|{|}|:|;|,|!/gi, "-")+'_'+id;
  }
  	encryptedData(s:any,u:any,b:any){
    	return this.getBroadcastName(s,b);
  }

}
