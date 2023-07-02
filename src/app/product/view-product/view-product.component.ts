import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../environments/environment';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
	productData : any = {}
	data : any = {}
	userId :any
	productId:any
  constructor(
  	private routers: ActivatedRoute,
  	private router: Router,
  	private dataService: DataService,
    public toastr : ToastrManager,
    private titleService:Title
  	) { this.titleService.setTitle("View Product"); }

  ngOnInit() {
  	//this.userId = localStorage.getItem("user_id")
	if(localStorage.getItem("data")){
		let data = this.dataService.decryptData(localStorage.getItem("data"));
		this.userId = data[0]['user_id'];
	}
	this.routers.paramMap.subscribe((params: ParamMap) => {
      this.productId = params.get('productId');
    });

  	this.getProductDetail()
  }

   getProductDetail(){
   		this.data['user_id'] = this.userId
   		this.data['product_id'] = this.productId

		this.dataService.getProductDetail(this.data).subscribe(response => {
	        if(response['success'] == true){
	         this.productData = response['body']
	        }
	    });
   }

}
