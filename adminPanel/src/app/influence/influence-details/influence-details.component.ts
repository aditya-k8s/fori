import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-influence-details',
  templateUrl: './influence-details.component.html',
  styleUrls: ['./influence-details.component.css']
})
export class InfluenceDetailsComponent implements OnInit {
  influencer_list : any = []; 
  isLoading : boolean = false; 
  isRecord : boolean = false;
  users_id : any = "";
  sel_user_id : string = "";
  constructor(
    private dataService: DataService,
  	public toastr : ToastrManager,
    private router : Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_id')){
      this.users_id = sessionStorage.getItem('user_id');
    }
    this.route.queryParams.subscribe(params => {
			this.sel_user_id = params['id'];
		})
	  this.getInfluencerDetail();
  }

  getInfluencerDetail(){
    this.isLoading = true;
    this.isRecord = false;
    this.dataService.getInfluencerDetail(this.sel_user_id).subscribe(response => {
      if(response['success'] == true){
        if(response['body'] != '' && response['body'] != null){
          this.isLoading = false;
          this.isRecord = false;
          this.influencer_list = response['body'];
        }else{
          this.isLoading = false;
          this.isRecord = true;
        }
      }else{
        this.isLoading = false;
        this.isRecord = true;
      }
    },error =>{
      console.log(error);
    });
  }
}
