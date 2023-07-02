import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DataTablesModule } from 'angular-datatables';
import { Title } from "@angular/platform-browser";
import { environment } from '../../../environments/environment';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-my-influencer-page',
  templateUrl: './my-influencer-page.component.html',
  styleUrls: ['./my-influencer-page.component.css']
})
export class MyInfluencerPageComponent implements OnInit {
	influencerData :any = []
	image_url = ''
	influencerName:any
	follower:any = {}
	following:any
	submitted = false
  loading = true
	href: string = "";
	userId :any = []
  copied:any
  url:any
  welcomeVedio:any
  testimonials:any = []
  testimonialsCat : any = []
  start = 0
  limit = 3
  constructor(
  	private route: ActivatedRoute,
    private router: Router,
	  private dataService: DataService,
    public toastr : ToastrManager,
	  private formBuilder:FormBuilder,
    private titleService:Title,
    private ngxService: NgxUiLoaderService,
    ) { 
  	this.image_url = environment.image_url;
  	this.titleService.setTitle("Influencer Profile");
	}


  ngOnInit(){
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.influencerName = params.get('name');
    });

    if(localStorage.getItem("data")){
      let data = this.dataService.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
  	//this.userId = localStorage.getItem("user_id")
  	this.href   = window.location.href

  	this.getInfluencerProfile();
    this.getTestimonials();
  }

  getInfluencerProfile() {
  	this.dataService.getInfluencerProfileDetail(this.influencerName).subscribe(response => {
    	this.ngxService.stop();
        if(response['success'] == true){
        	this.influencerData = response['body'][0]
          this.welcomeVedio = response['body'][0]['welcome_video']
          this.url = this.image_url+response['body'][0]['welcome_video']
          let data =  response['body'][0]['category_name']
          if(data) {
              this.testimonialsCat = data.split(',');
          }
       	} 	
	  });
  }

  getTestimonials() {
    this.ngxService.start(); 
    this.dataService.getTestimonialBypage(this.start,this.limit).subscribe(response => {
        this.loading = false
         this.ngxService.stop();
        if(response['message'] == "Success"){
          this.testimonials = response['data']
          if(this.start != 0) {
            this.testimonials = this.testimonials.concat(response['data']);
          }
        }
        else{
          //this.toastr.errorToastr('NO MORE RECORD FOUND');
        }
    });
  }

  viewMoreTestimonial(start:any,limit:any){
    this.loading = true
    this.start = start + this.start;
    this.limit = limit;
    this.getTestimonials()
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
                this.getInfluencerProfile();
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
