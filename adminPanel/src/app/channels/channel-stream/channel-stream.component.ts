import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-channel-stream',
  templateUrl: './channel-stream.component.html',
  styleUrls: ['./channel-stream.component.css']
})
export class ChannelStreamComponent implements OnInit {
  user_id : any;
  channel_id : any;
  img_url : string = "";
  stream_data : any = [];
  product_list : any = [];
  isRecord : boolean = false;
  isLoading : boolean = false; 
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router : Router
  ) {
    this.img_url = environment.img_url;
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_id')){
      this.user_id = sessionStorage.getItem('user_id');
    }
    this.route.queryParams.subscribe(params => {
			this.channel_id = params['channel_id'];
		})
    this.publicBroadcastingContent();
  }

  publicBroadcastingContent(){
    this.product_list = [];
    this.isRecord = false;
    this.isLoading = true;
    this.dataService.publicBroadcastingContentDetails(this.channel_id).subscribe(response =>{
      if(response['success'] == true){
        this.stream_data = response['body'];
        if(response['body']['productList'] != ''){
          this.isRecord = false;
          this.isLoading = false;
          this.product_list = response['body']['productList'];
        }else{
          this.isRecord = true;
          this.isLoading = false;
        }
      }else{}
    },error =>{
      console.log(error);
    })
  }

}
