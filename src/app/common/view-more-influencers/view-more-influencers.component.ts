import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../environments/environment';
import {Title} from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-view-more-influencers',
  templateUrl: './view-more-influencers.component.html',
  styleUrls: ['./view-more-influencers.component.css']
})
export class ViewMoreInfluencersComponent implements OnInit {
  start = 0;
  limit = 6;
  loading:any;
  influencer_data : any = [];
  constructor(
    private dataService: DataService,
    public toastr : ToastrManager,
    private titleService:Title,
    private ngxService: NgxUiLoaderService,
  ) {
    this.titleService.setTitle("More Influencers");
  }

  ngOnInit(): void {
    this.ngxService.start();
    this.getFeaturedInfluencers();
  }

  getFeaturedInfluencers(){
    this.dataService.getFeaturedInfluencers(this.start,this.limit).subscribe(response => {
      this.loading = false;
      this.ngxService.stop();
      if(response['success'] == true){
        if(this.start > 0){
          if(response['body']['rows'] != ''){
            this.influencer_data = response['body']['rows'];		
          }else{
            this.toastr.errorToastr("No more influencers.");
          }
        }else{
          this.influencer_data = response['body']['rows'];
        }
      }
    });
  }

  splitTags(pvarTags : any){
    return pvarTags.split(',');
  }

  viewInfluencer(start:any,limit:any) {
    this.loading = true
    this.start = start + this.start;
    this.limit = limit;
    this.getFeaturedInfluencers()
  }

}
