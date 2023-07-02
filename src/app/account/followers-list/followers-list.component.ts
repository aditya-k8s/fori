import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../environments/environment';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-followers-list',
  templateUrl: './followers-list.component.html',
  styleUrls: ['./followers-list.component.css']
})
export class FollowersListComponent implements OnInit {
	myfollowList : any = []
	image_url = ''
  constructor(
  	private router: Router,
  	private dataService: DataService,
    public toastr : ToastrManager,
  	private formBuilder:FormBuilder,
    private titleService:Title
  ) { 
    this.titleService.setTitle("Followers List");
  	this.image_url = environment.image_url;
  }

  ngOnInit(){
  	this.getFollowerList();
  }

  getFollowerList() {
  	this.dataService.followingsStoreList().subscribe(response => {
      if(response['success'] == true){
      	this.myfollowList = response['body']
     	}
	  });
  }
}
