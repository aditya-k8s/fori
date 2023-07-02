import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Title} from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-my-channel',
  templateUrl: './my-channel.component.html',
  styleUrls: ['./my-channel.component.css']
})
export class MyChannelComponent implements OnInit {
	channel_name:any
	channel_data : any = []
  broadcast_data :any =[]
  userId :any = []
  image_url = ''
  follower:any = {}
  following:any
  submitted = false
  href: string = "";
  copied:any

  constructor(
  	private route: ActivatedRoute,
    private router: Router,
    public toastr : ToastrManager,
  	private dataService: DataService,
    private titleService:Title,
    private ngxService: NgxUiLoaderService,
  	) { 
        this.image_url = environment.image_url;
        this.titleService.setTitle("My Channels");
    }

    ngOnInit(){
      //Get Logged userID
      if(localStorage.getItem("data")){
        let data = this.dataService.decryptData(localStorage.getItem("data"));
        this.userId = data[0]['user_id'];
      }
      //this.userId = localStorage.getItem("user_id")

      // Get Channel Name from URL
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.channel_name = params.get('channel_name');
      });

      this.href =window.location.href

     this.getChannelInformation();
    }

    getChannelInformation(){
      this.ngxService.start();
      this.dataService.getStreamingChannel(this.channel_name,this.userId).subscribe(response => {
        this.ngxService.stop();
        this.channel_data = response['body']
        this.broadcast_data = response['body']['broadcasts']
        this.following = response['body']['is_follow']
      });
    }

    toggleFollowing(channel_ownerID: any,storeId: any){
      if(this.userId == null || this.userId == ''){
        this.router.navigate(['login'])
      }
      this.submitted = true;

          this.follower['user_id'] = channel_ownerID
          this.follower['store_id'] = storeId
          this.follower['follow_by_id'] =  this.userId

           this.dataService.addEditfollower( this.follower).subscribe(response => {
              if(response['success'] == true){
                this.getChannelInformation();
                this.toastr.successToastr(response['message']);
                this.following = response['body']['is_follow']
              }else{
                this.toastr.errorToastr(response['message']['message']); 
              }
          });
        
    }

    copyUrl(inputElement:any){
      this.copied = "Copied"
      inputElement.select();
      document.execCommand('copy');
      inputElement.setSelectionRange(0, 0);
    }
}
