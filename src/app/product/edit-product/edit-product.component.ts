import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {DataTablesModule} from 'angular-datatables';
import {Title} from "@angular/platform-browser";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxUiLoaderService } from "ngx-ui-loader";


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
	productForm: FormGroup
	submitted = false
	numberPatern = '^[0-9.,]+$'
	userId :any = []
	product_id:any
	Formdata :any ={}
	product_date: any = []
	hashtagValue :any = []
  onairData:any= {};
  offairData:any= {};


  	hashtagValues : any
  	retailerFees : any
  	editorData :any
  	loading = false
  	variants:any
  	sliderImage:any
  	customOptions: OwlOptions = {
    loop: true,
    margin:7,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 800,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      768: {
        items: 4
      },
      992: {
        items: 4
      }
    },
    nav: true,
    autoplay: true,
  }

  constructor(
	private routers: ActivatedRoute,
	private router: Router,
	private dataService: DataService,
	public toastr : ToastrManager,
	private formBuilder:FormBuilder,
	private titleService:Title,
	private ngxService: NgxUiLoaderService,
	) { 
  	this.titleService.setTitle("Edit Product");
		this.productForm = this.formBuilder.group({
	        product_title: ['', Validators.required],
	        product_retail_price: ['', [Validators.required, Validators.pattern(this.numberPatern)]],
	        product_stock: ['', [Validators.required, Validators.pattern(this.numberPatern)]],
	        // discount_peronair: ['', [Validators.required, Validators.pattern(this.numberPatern)]],
	        // discount_peroffair: ['', [Validators.required, Validators.pattern(this.numberPatern)]],
	        on_air_price: ['', [Validators.required, Validators.pattern(this.numberPatern)]],
	        off_air_price: ['', [Validators.required, Validators.pattern(this.numberPatern)]],
	        product_description: [''],
	        chips: ['']
	  	});
    }

  ngOnInit(){
  	this.ngxService.start();

  	this.routers.paramMap.subscribe((params: ParamMap) => {
      this.product_id = params.get('product_id');
    });

		if(localStorage.getItem("data")){
      	let data = this.dataService.decryptData(localStorage.getItem("data"));
      	this.userId = data[0]['user_id'];
     }

	   this.getProductsData();
  }

  get f() { return this.productForm.controls; }

  getProductsData() {
		this.Formdata['user_id'] = this.userId
	  this.Formdata['product_id'] = this.product_id
		this.dataService.getProductDetail(this.Formdata).subscribe(response => {
		this.ngxService.stop();   	 
		let data = response['body'];
		this.sliderImage = data['images']
		this.variants = data['variants']
	    if(data.channelTag){
	     	 this.hashtagValue = data.channelTag.split(',');
	  	}
  	// else{
   //    this.hashtagValue = [];
   //  }	

  	this.editorData = data.product_description
      this.productForm.patchValue({
      	'product_title' : data.product_title,
      	'product_description' : data.product_description,
      	'product_retail_price' : data.product_retail_price,
      	'product_stock' : data.product_stock,
      	'on_air_price' : data.on_air_price,
      	'off_air_price' : data.off_air_price,

      })
    });
  }

    onItemAdded(event:any){
      this.hashtagValue.push(event.value)
    }

    onItemRemoved(event:any){
 		 let index = this.hashtagValue.indexOf(event);
    	if (index > -1) {
       		this.hashtagValue.splice(index, 1);
    	}    	 
    }

	onSubmit(Formdata : any){
	  	this.submitted = true;
	    if (this.productForm.invalid) {
	        return;
	    }
	    else{
	    	this.loading = true;
	    		// Validation for the stock
	    		for (let index = 0; index < this.variants.length; index++) {
	        	const element = this.variants[index];
	        	if(element['inventoryQuantity'] == ""){
	            this.toastr.errorToastr('Stock is required');
	            this.loading = false;
	            return;
	          }
	          if(element['inventoryQuantity'] <=0){
	            this.toastr.errorToastr('Stock should be greater than 0');
	            this.loading = false;
	            return;
	          }  
	        }
	    	if(this.hashtagValue){
	    		this.hashtagValues = this.hashtagValue.toString()
	    	}

	    	Formdata['channelTag'] = this.hashtagValues
	    	Formdata['user_id'] = this.userId
	    	Formdata['product_id'] = this.product_id
			Formdata['variants'] = this.variants
	    	 this.dataService.updateProduct(Formdata).subscribe(response => {
	    	 	this.loading = false;
		        if(response['success'] == true){
		        	this.toastr.successToastr(response['message']);
		        	this.router.navigate(['inventory'])
		       	}else{
		       		this.toastr.errorToastr(response['message']); 
		      	}
	    	});
	    }
	}

}
