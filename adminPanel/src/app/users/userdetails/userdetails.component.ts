import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {


  channel_data : any = []; 
  isLoading : boolean = false; 
  isRecord : boolean = false;
  searchStr: string = "";
  users_id : any = "";
  index : any;
  img_url : string = "";
  sel_user_id : string = "";
  followe_data : any = [];
  order_data : any = [];
  stream_data : any = [];
  address_data : any = [];
  sales_data : any = [];
  select_id : number = 0;
  constructor(
		private dataService: DataService,
		public toastr : ToastrManager,
		private router: Router,
		private route: ActivatedRoute
	){
		this.img_url = environment.img_url;
		this.route.queryParams.subscribe(params => {
			this.sel_user_id = params['id'];
		}
	  );
  	}

  	ngOnInit() {
		this.channelDetails();
  	}

	/* ***** get channels list ***** */

	channelDetails(){
		this.channel_data = [];
		this.dataService.getSyncStore(this.sel_user_id).subscribe(response => {
			if(response['success'] == true){
				if(response['body'] != ''){
					this.channel_data = response['body'];
					this.select_id = this.channel_data[0]['id'];
					this.getBroadCastList(this.channel_data[0]);
				}
			}else{
				
			}
		},error =>{
			console.log(error);
		});
	}

	/* ***** get broadcast list ***** */

	getBroadCastList(pvarObj : any){
		this.select_id = pvarObj['id'];
		this.stream_data = [];
		this.isLoading = true;
		this.dataService.getmyStreamingChannel(pvarObj['user_id'],pvarObj['id']).subscribe(response =>{
			if(response['success'] == true){
				this.stream_data = response['body']['rows'];
				this.isLoading = false;
			}else{
				this.isLoading = false;
			}
		},error =>{
			this.isLoading = false;
			console.log(error);
		})
	}

	/* ***** get followers list ***** */

	getFollowerList(){
		this.isLoading = true;
		this.followe_data = [];
		this.dataService.followingsStoreList(this.sel_user_id).subscribe(response => {
			if(response['success'] == true){
				if(response['body']){
					this.followe_data = response['body'];
					this.isLoading = false;
				}else{
					this.isLoading = false;
				}
			}else{
				this.isLoading = false;
			}
		},error =>{
			this.isLoading = false;
			console.log(error);
		});
	}

	/* ***** get order list ***** */

	getMoOrder(){
		this.isLoading = true;
		this.order_data = [];
		this.dataService.getMyOrder(this.sel_user_id).subscribe(response => {
			if(response['success'] == true){
				if(response['body']){
					this.isLoading = false;
					this.order_data = response['body'];
				}
			}else{
				this.isLoading = false;
			}
		},error =>{
			this.isLoading = false;
			console.log(error);
		});
	}

	/* ***** get shipper address ***** */

	getShipping(){
		this.isLoading = true;
		this.address_data = [];
		this.dataService.getAddress(this.sel_user_id).subscribe(response => {
			if(response['success'] == true){
				if(response['body']){
					this.isLoading = false;
					this.address_data = response['body'];
				}
			}else{
				this.isLoading = false;
			}
		},error =>{
			this.isLoading = false;
			console.log(error);
		});
	}

	/* ***** get order history ***** */

	getOrderHistory(){
		this.isLoading = true;
		this.sales_data = [];
		this.dataService.getMarchantOrder(this.sel_user_id).subscribe(response => {
			if(response['success'] == true){
				if(response['body']){
					this.isLoading = false;
					this.sales_data = response['body'];
				}
			}else{
				this.isLoading = false;
			}
		},error =>{
			this.isLoading = false;
			console.log(error);
		});
	}
}

