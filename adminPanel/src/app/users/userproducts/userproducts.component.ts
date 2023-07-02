import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-userproducts',
  templateUrl: './userproducts.component.html',
  styleUrls: ['./userproducts.component.css']
})
export class UserproductsComponent implements OnInit {


  productList : any = []; 
  isLoading : boolean = false; 
  isRecord : boolean = false;
  searchStr: string = ""; 
  user_id : any ="";
  users_id : any = "";
  index : any;
  constructor(
  	private dataService: DataService,
  	public toastr : ToastrManager,
  	private router: Router,
  	private route: ActivatedRoute) {
  		this.route.params.forEach((params: Params) => {
      		this.user_id = params['user_id'];
    	})
  	}

  	ngOnInit() {
		this.getMyProduct();
  	}


	getMyProduct(){
		this.isRecord = false;
		this.isLoading = true;
		this.productList = [];
		this.dataService.getMyProduct({user_id:this.user_id}).subscribe(response => {
			if(response['success'] == true){
				if(response['body'] != ''){
					this.isRecord = false;
					this.isLoading = false;
					this.productList = response['body']['rows'];
				}else{
					this.isRecord = true;
					this.isLoading = false;
				}
			}else{
				this.isRecord = true;
				this.isLoading = false;
			}
		},error =>{
			this.isRecord = true;
			this.isLoading = false;
			console.log(error);
		});
	}
}

