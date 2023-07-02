import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { environment } from '../../../environments/environment';
import {Title} from "@angular/platform-browser";
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-view-more-recommendation',
  templateUrl: './view-more-recommendation.component.html',
  styleUrls: ['./view-more-recommendation.component.css']
})
export class ViewMoreRecommendationComponent implements OnInit {
  recommendedlist :any = []
	start = 0
	limit = 6
	loading:any
	image_url:any
  constructor(
    private dataService: DataService,
    private titleService:Title,
    public toastr : ToastrManager,
  ) {
    this.image_url = environment.image_url;
   	this.titleService.setTitle("More Recommended Sessions");
  }

  ngOnInit(): void {
    this.recommendedList();
  }

  recommendedList() {
    this.dataService.getRecommendationList(this.start,this.limit).subscribe(response => {
      this.loading = false
       if(response['success'] == true){
       if(this.start > 0){
        if(response['data']['rows'] != ''){
          this.recommendedlist = response['data']['rows'];		
        }else{
          this.toastr.errorToastr("No more recommended sessions.");
        }
       }else{
      this.recommendedlist = response['data']['rows'];
       }
        }
    });
  }

  viewRecommended(start:any,limit:any) {
    this.loading = true
    this.start = start + this.start;
    this.limit = limit;
    this.recommendedList()
  }
}
