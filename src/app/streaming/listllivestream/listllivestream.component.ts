import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../environments/environment';
import {Title} from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-listllivestream',
  templateUrl: './listllivestream.component.html',
  styleUrls: ['./listllivestream.component.css']
})
export class ListllivestreamComponent implements OnInit {
  //streamingList :any = [];
  start:any;
  limit:any;
  image_url = '';
  customFormat="Jun 15, 2021, 9:03:01 AM";
  msg:any;
  loading = false
  //totalRecords:any;
  totalChannel : boolean = false;
  totalRecommended : boolean = false;
  popularChannelsList :any = [];
  recommendedlist :any = [];
  influencer_data : any = [];
  isMoreInfluencer : boolean = false;
  popular_data : any = [];
  isMorePopular : boolean = false;
  userId : any;
  constructor( 
    private dataService: DataService,
    public toastr : ToastrManager,
    private titleService:Title,
    private ngxService: NgxUiLoaderService,
  ) {
  this.titleService.setTitle("Broadcast Channel Listing");
  this.image_url = environment.image_url;}

  ngOnInit() {
    this.ngxService.start();
    if(localStorage.getItem("data")){
      let data = this.dataService.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.start=0;
    this.limit=4;
    //this.getAllSreamingChannel();
    this.getPopularChannels();
    this.recommendedList();
    this.getFeaturedInfluencers();
    this.featuredandPopular();
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

  // viewmorstream(start:any,limit:any){
  //   this.ngxService.start(); 
  //   this.loading = true;
  //   this.msg='';
  //   this.start=start+this.start;
  //   this.limit=limit;
  //   console.log(this.start,"))))",this.limit)
  //   this.dataService.getAllSreamingChannel(this.start,this.limit).subscribe(response => {
  //     this.ngxService.stop();
  //     this.loading = false;
  //      if(response['success'] == true){
  //       //console.log(this.streamingList );
  //       if(response['body']!=''){
  //         this.msg='';
          
  //         this.streamingList = this.streamingList.concat(response['body']['rows']);
  //        this.totalRecords = response['body']['totalRecords'];
  //       }else{
  //        // this.msg='NO MORE RECORD FOUND';
  //         this.toastr.errorToastr('NO MORE RECORD FOUND');
  //       }
  //       }
  //   });
  // }

  getPopularChannels() {
    this.dataService.popularChannels().subscribe(response => {
      this.ngxService.stop();
        if(response['success'] == true){
          this.totalChannel == response['body']['totalRecords']
          this.popularChannelsList = response['body']['rows']
        }
    });
  }

  recommendedList(){
    this.dataService.getRecommendationList(this.start,this.limit).subscribe(response => {
      this.ngxService.stop();
      if(response['success'] == true){
        this.recommendedlist = response['data']['rows'];
        this.totalRecommended = response['data']['totalRecords'];
      }
    });
  }

  getFeaturedInfluencers(){
    this.dataService.getFeaturedInfluencers(this.start,this.limit).subscribe(response => {
      this.ngxService.stop();
      if(response['success'] == true){
        this.influencer_data = response['body']['rows'];
        this.isMoreInfluencer = response['body']['totalRecords'];
      }
    });
  }

  splitTags(pvarTags : any){
    return pvarTags.split(',');
  }

  featuredandPopular(){
    this.dataService.featuredandPopular(this.start,this.limit).subscribe(response => {
      this.ngxService.stop();
      console.log(response);
      if(response['success'] == true){
        this.popular_data = response['body']['rows'];
        this.isMorePopular = response['body']['totalRecords'];
      }
    });
  }
}
