import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../environments/environment';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
	shopifyProduct : any = []
	loading = false
	start:any;
  limit:any;
  totalProduct = false
  constructor(
  	private router: Router,
  	private dataService: DataService,
    public toastr : ToastrManager,
  	private formBuilder:FormBuilder,
  	private titleService:Title
  	) { 
      this.titleService.setTitle("My Products");
    }

  	ngOnInit(){
  	 	this.getProducts()
    }

   getProducts(){
   	  this.start=0;
    	this.limit=6;
   		this.dataService.getProducts(this.start,this.limit).subscribe(response => {
	       if(response['success'] == true){
          this.totalProduct = response['body']['totalRecords']
	          this.shopifyProduct = response['body']['rows']
	        }
    	});
    }

    view_products(start:any,limit:any){
	    this.loading = true;
	    this.start = start+this.start;
	    this.limit = limit;
	    this.dataService.getProducts(this.start,this.limit).subscribe(response => {
	       this.loading = false;
	        if(response['success'] == true){	
            this.totalProduct = response['body']['totalRecords']        
		        this.shopifyProduct = this.shopifyProduct.concat(response['body']['rows']);
	        }
	        else
	        {
	        	 this.toastr.errorToastr(response['message']);
	        }
	    });
    }

}
