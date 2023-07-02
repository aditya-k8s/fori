import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup,NgForm } from '@angular/forms';
import { Router} from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service'
import { Options, LabelType } from "@angular-slider/ngx-slider";
import {Title} from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-shipping-fee',
  templateUrl: './shipping-fee.component.html',
  styleUrls: ['./shipping-fee.component.css']
})
export class ShippingFeeComponent implements OnInit {
	shippingForm: FormGroup
  formdata:any={}
  paymentData :any={}
	userId :any = []
  customer_email:any
  customerID:any
	submitted = false
	shipingFee: any = []
	loading = false
	rangeSection:any =[]
	increaseRange : any
	minValue: number = 100;
	maxValue: number = 5000;
	shipping :any
  	options: Options = {
    floor: 0,
    ceil: 5000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "$" + value;
        case LabelType.High:
          return "$" +  value;
        default:
          return "$" + value;
      }
    }
	};

	constructor(
  	private router: Router,
  	private formBuilder:FormBuilder,
  	private dataService: DataService,
  	public toastr : ToastrManager,
  	private titleService:Title,
  	private ngxService: NgxUiLoaderService,
  	) {
		this.titleService.setTitle("Shipping Fee");
  	this.shippingForm = this.formBuilder.group({
        //shipping_fee: ['', Validators.required],
        //range_shipping:['']
    });

	}


	ngOnInit() {
		 this.ngxService.start();

			if(localStorage.getItem("data")){
				let data = this.dataService.decryptData(localStorage.getItem("data"));
				this.userId = data[0]['user_id'];
			}	  
			this.getShippingFees();
    }

  	getShippingFees() {
  		this.dataService.getShippingFee(this.userId).subscribe(response => {
	        if(response['success'] == true){
	        	 this.ngxService.stop();
	        	this.rangeSection = JSON.parse(response['body']['arrayData'])
	        }
	        else {
	        	this.ngxService.stop();
	        }
     	});
  	}

  	/**   You can add shipping fee in percent with amount range.   **/
  	addShipping() {
  		var itemToClone = { 
        minValue: 100,
		    maxValue: 5000,
		    floor: 0,
		    ceil: 5000,
		    shipping :""
      };
      this.rangeSection.push(itemToClone);
  	}
  
  	/**   Delete shipping Range   **/
  	__deleteRange(index:any){
  		if(confirm("Are you sure to delete the Shipping Fee.")) {
	  		if (index > -1) {
				  this.rangeSection.splice(index, 1);
				  this.onSubmit();
				}
			}
  	}

  	/**   Save and update shipping fee for specific amount range   **/
    onSubmit(){
    	this.ngxService.start();
			for(let i = 0 ; i < this.rangeSection.length; i++){
				let data = this.rangeSection[i];
				if(data['shipping'] == ""){
					this.toastr.errorToastr("Please enter shipping fee.");
					this.ngxService.stop();
					return;
				}
			}
	  	this.submitted = true;
	  	this.loading = true;
	  	this.formdata['user_id'] = this.userId
	  	this.formdata['shipping_fee'] = this.rangeSection
      this.dataService.shippingFee(this.formdata).subscribe(response => {
          this.loading = false;
          this.ngxService.stop();
          if(response['success'] == true){
            this.toastr.successToastr(response['message']);
          }else{
            this.toastr.errorToastr(response['message']); 
          }
          this.getShippingFees();
      },
      error => {this.toastr.errorToastr(error);});
  	}

	}





