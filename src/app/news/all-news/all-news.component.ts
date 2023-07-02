import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { environment } from '../../../environments/environment';
import { NgxUiLoaderService } from "ngx-ui-loader";


@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {
  image_url : string = "";
  news_data : any = [];
  loading = false
  start = 0;
  limit = 9;
  totalNewsData :any
  constructor(
    private dataService: DataService,
    private ngxService: NgxUiLoaderService,
  ) { 
    this.image_url = environment.image_url;
	}

  ngOnInit(): void {
    this.ngxService.start();
    this.getAllNews();
  }

  getAllNews(){
    this.dataService.getNewsPublic(this.start,this.limit).subscribe(response => {
      this.ngxService.stop();
      if(response['success'] == true){
        this.totalNewsData = response['body']['totalRecords']
        if(this.start == 0){
          this.news_data = response['body']['rows'];
        }else{
          this.news_data = this.news_data.concat(response['body']['rows']);
        }
      }else{}
    },error =>{
      console.log(error);
    });
  }

  allNews(start:any,limit:any) {
    this.ngxService.start(); 
    this.loading = true;
    this.start = start+this.start;
    this.limit = limit;
    this.getAllNews()
  }

}
