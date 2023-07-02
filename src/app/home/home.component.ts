import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	streamingList :any = []
  popularChannelsList :any = []
	image_url = '';
  customFormat="Jun 15, 2021, 9:03:01 AM"
  recentSales:any = []
  recommendedlist :any = []
  start = 0
  limit = 4
  totalStreaming = false
  totalChannel = false
  news_data : any = [];
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    dots: false,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
    navText : ["<span><i class='fa fa-chevron-left'></i></span>","<span><i class='fa fa-chevron-right'></i></span>"],
    responsive: {
      0:{
          items:1,
          nav:true
      },
      600:{
          items:1,
          nav:true
      },
      1000:{
          items:1,
          nav:true
      }
    },
    nav: true
  }
  constructor(
    private dataService: DataService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private titleService:Title,
  	) {
      this.titleService.setTitle("Welcome to FORI!");
    this.image_url = environment.image_url;
	}

  ngOnInit(){
    this.ngxService.start();
   // this.recommendedList();
    //this.getStreamingList();
    // this.getPopularChannels();
    // this.getRecentSales();
    this.getAllNews();
  }

  getStreamingList(){
     this.dataService.getsteamingList().subscribe(response => {
       this.ngxService.stop();
       if(response['success'] == true){
          this.totalStreaming == response['body']['totalRecords']
          this.streamingList = response['body']['rows']
        }
    });
  }

  recommendedList(){
    this.dataService.getRecommendationList(this.start,this.limit).subscribe(response => {
        this.ngxService.stop();
         if(response['success'] == true){
            this.recommendedlist = response['data']
          }
    });
  }

  getPopularChannels() {
    this.dataService.popularChannels().subscribe(response => {
      this.ngxService.stop();
       if(response['success'] == true){
          this.totalChannel == response['body']['totalRecords']
          this.popularChannelsList = response['body']['rows']
        }
    });
  }

  getRecentSales() {
    this.dataService.recentSales().subscribe(response => {
       this.ngxService.stop();
       if(response['success'] == true){
          this.recentSales = response['body']
        }
    });
  }

  getAllNews(){
    this.dataService.getNewsPublic(this.start,3).subscribe(response => {
      this.ngxService.stop();
      if(response['success'] == true){
        if(response['body']['rows'] != '' && response['body']['rows'] != null){
          this.news_data = response['body']['rows'];
        }else{}
      }else{}
    },error =>{
      console.log(error);
    });
  }

  allNews(){
    this.router.navigate(['/news/all-news']);
  }
}
