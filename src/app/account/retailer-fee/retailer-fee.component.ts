import { Component, OnInit,AfterViewInit,ViewChild,ElementRef,ChangeDetectorRef } from '@angular/core';
import { FormBuilder,Validators,FormGroup,NgForm } from '@angular/forms';
import { Router} from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-retailer-fee',
  templateUrl: './retailer-fee.component.html',
  styleUrls: ['./retailer-fee.component.css']
})
export class RetailerFeeComponent implements  OnInit,AfterViewInit {
	paymentHandler:any = null;
	data:any =[]
	formdata:any={}
	paymentData :any={}
	subscriptionStatus:any
	//customStripeForm: FormGroup
	cardNumber:any 
 	expiryMonth:any 
	expiryYear:any 
	cvc: any 
	userId :any = []
	customer_email:any
	customerID:any
	stripe:any;
	loading = false;
	card: any;
	cardHandler = this.onChange.bind(this);
	error: any;
	subscribePlan:any
	subscribeData:any={}
	subData:any
	retailer_fee:any
	noSubscription=false
	cancelData:any = {}
	checked = false
	retailer_checked = true
	disable_retailer = false
	cardCvcElement:any;
	retailerFee : string = "retailer";
  constructor(
  	private router: Router,
  	private formBuilder:FormBuilder,
  	private dataService: DataService,
  	public toastr : ToastrManager,
  	private cd: ChangeDetectorRef,
  	private stripeService:AngularStripeService,
  	private titleService:Title
  	) { this.titleService.setTitle("Retailer Fee"); }

	ngAfterViewInit() {
	    this.stripeService.setPublishableKey('pk_test_51I9yuoGm48tZv82dqKvjTxBk2hnC4TceAeXH4Kc2S5W5oLnxnfAEFElqKoRGYzWFrjVA4d8ueBLDfQWM9YyVaEBB00YHwGpG8b').then(
	      stripe=> {
	        this.stripe = stripe;
	    const elements = stripe.elements();    
	    this.card = elements.create('card');
	     this.card.mount('#card-element')

	    //  this.cardCvcElement = elements.create("cardCvc");
	    //  this.cardCvcElement.mount('#cardcvc')
	     
	    //this.card.mount(this.cardInfo.nativeElement);
	    this.card.addEventListener('change', this.cardHandler);
	    });
	}

  	ngOnInit() {
  		//this.userId = localStorage.getItem("user_id")
		if(localStorage.getItem("data")){
			let data = this.dataService.decryptData(localStorage.getItem("data"));
			this.userId = data[0]['user_id'];
		}
	  	this.__getSubscription(this.userId);

	  	//Get Retailer Fee
	  	this.dataService.getfeeDetail().subscribe(response => {
	        if(response['success'] == true){
	          	//this.shipingFee = response['body']['shipping_fee']
	          	this.retailer_fee = response['body']['retail_fee']
	        }
     	});

      this.dataService.getUserDetails(this.userId).subscribe(response => {
        if(response['success'] == true){
          this.customer_email = response['data'][0]['email']
        }
      })
 	}

  	onChange(error:any) {
	    if (error) {
	    	if(error['error'] != undefined)
	    	{
	    		this.error = error['error']['message'];
	    	}
	      
	    } else {
	      this.error = null;
	    }
	    this.cd.detectChanges();
	}


    __subscribe(form: NgForm)
    {
      //this.__getCustomerEmail();
      this.__createCustomerStripe();
      

      setTimeout(() => {
	        if(this.customerID){
	        const paymentMethod = this.stripe.createPaymentMethod({
		        type: 'card',
		        card: this.card,
	      	})
	      	.then((result:any) => {
	      	if (result.error) {
		        if (result.error) {
			    	if(result.error['error'] != undefined)
			    	{
			    		this.error = result.error['error']['message'];
			    	}
			    } else {
			      this.error = null;
			    }
	      } else {
	        
	        this.paymentData['user_id'] = this.userId
	        this.paymentData['paymentMethodId'] = result['paymentMethod']['id']
	        this.paymentData['customerId'] = this.customerID

	        let encrypted_data = this.dataService.encryptData(this.paymentData);
        	let data = {'data' : encrypted_data};

	        this.dataService.createSubscription(data).subscribe(response => {
	            if(response['success'] == true){
	              	this.__getSubscription(this.userId)
	              	setTimeout(() => {
		              	this.subscriptionStatus = response['status']
		              	this.subscribePlan = "on"
		              	this.noSubscription = true
		              	this.toastr.successToastr("You have been successfully subscribed monthly subscription");
		              }, 2000);
	            }
	            else{
	                this.toastr.errorToastr(response['message']); 
	                this.subscribePlan = "off"

	            } 
	        })
	      }
	    });
	   
	    }

    }, 3000);
          
    }


    __getSubscription(userID:any){
    	this.subscribeData['user_id'] = userID

    	let encrypted_data = this.dataService.encryptData(this.subscribeData);
        let data = {'data' : encrypted_data};

        this.dataService.getSubscription(data).subscribe(response => {
           if(response['success'] == true && response['body']['status'] != "0"){
           	this.noSubscription = true
           	this.subData = response['body']
           	this.checked = true
           	this.subscribePlan = "on";
			   this.disable_retailer = true;
			   this.retailerFee = "subscription";
          }else{
          	this.checked = false
          	this.noSubscription = false
          	this.subscribePlan = "off"
			  this.retailer_checked = true
			  this.disable_retailer = false
			  this.retailerFee = "retailer";
           // this.toastr.errorToastr(response['message']); 
          } 
      })
    }

    __createCustomerStripe() {
      this.formdata['email'] = this.customer_email

        let encrypted_data = this.dataService.encryptData(this.formdata);
        let data = {'data' : encrypted_data};

        this.dataService.createCustomer(data).subscribe(response => {
           if(response['success'] == true){
              this.customerID = response['body']['id']
          }
          else{
              this.toastr.errorToastr(response['message']); 
          } 
      })
    }

    onPlanChange(event:any){
    	let {checked, value} = event.target;
     	this.subscribePlan = (value == "subscription") ? "on" : "off";
    }

    __cancelSubscription(id:any){
    	this.cancelData['subscriptionId'] = id
    	this.cancelData['user_id'] = this.userId

    	let encrypted_data = this.dataService.encryptData(this.cancelData);
        let data = {'data' : encrypted_data};

    	if(confirm("Are you sure you want to cancel your monthly subscription?")) {
	    	this.dataService.cancelSubscription(data).subscribe(response => {
		        if(response['success'] == true){
		        	this.__getSubscription(this.userId)
		             // this.customerID = response['body']['id']
		             this.noSubscription = false
		             this.retailer_checked = true
		             this.toastr.successToastr("You have been unsubscribe monthly subscription");
		        }
		        else{
		              this.toastr.errorToastr(response['message']); 
		        } 
	      	})

	    }
    }

}
