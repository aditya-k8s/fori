import { Component, OnInit,AfterViewInit,ViewChild,ElementRef,ChangeDetectorRef } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../environments/environment';
import { Title } from "@angular/platform-browser";
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-billing-detail',
  templateUrl: './billing-detail.component.html',
  styleUrls: ['./billing-detail.component.css']
})
export class BillingDetailComponent implements OnInit {
  cardHandler = this.onChange.bind(this);
	CardDetails :any = []
  userId:any
  customerID:any
  card: any;
  stripe:any
  submitted = false
  cardForm:FormGroup
  error:any
  loading =  false
  paymentMethodID:any
  constructor(
  	private router: Router,
  	private dataService: DataService,
    public toastr : ToastrManager,
  	private formBuilder:FormBuilder,
    private titleService:Title,
    private stripeService:AngularStripeService,
    private cd: ChangeDetectorRef,
    private ngxService: NgxUiLoaderService,
    ) { 
   		this.titleService.setTitle("Billing Details");

    this.cardForm = this.formBuilder.group({
      name: ['', Validators.required],
    })
	}

  ngAfterViewInit() {  
    setTimeout(() => {
      this.stripeService.setPublishableKey('pk_test_51I9yuoGm48tZv82dqKvjTxBk2hnC4TceAeXH4Kc2S5W5oLnxnfAEFElqKoRGYzWFrjVA4d8ueBLDfQWM9YyVaEBB00YHwGpG8b').then(
      stripe=> {
        this.stripe = stripe;
        const elements = stripe.elements();    
        this.card = elements.create('card');
        this.card.mount('#card-element')
        this.card.addEventListener('change', this.cardHandler);
      });
    }, 3000);
  }

  ngOnInit(){
    if(localStorage.getItem("data")){
      let data = this.dataService.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.ngxService.start();
  	this.getStripeCustomerID()
  }

  get f() { return this.cardForm.controls; }

  getStripeCustomerID() {
    this.dataService.getUserDetails(this.userId).subscribe(response => {
      if(response['success'] == true){
        this.customerID = response['data'][0]['strip_customerId']
        this.getCardDetails();
      }
    })
  }

  getCardDetails(){
  	this.dataService.getCards(this.customerID).subscribe(response => {
      if(response['success'] == true){
        	this.CardDetails = response['body']['data']
      }
      this.ngxService.stop();
	  });
  }

  deletePaymentMethd(paymentMethodID:any){
    if(!confirm("Are you sure to delete this card?")) {
      return;
    }
    this.ngxService.start();
    this.dataService.delPaymentMethod(paymentMethodID).subscribe(response => {
        if(response['success'] == true){
          this.getCardDetails();
          this.toastr.successToastr(response['message']);
        }
        else {
          this.toastr.errorToastr(response['message']); 
        }
        this.ngxService.stop();
    });
  }

  async __addNewCard(){
      this.submitted = true;

      if (this.cardForm.invalid) {
          return;
      }else{
        this.loading =  true
          const paymentMethod =  await this.stripe.createPaymentMethod({
            type: 'card',
            card: this.card,
            billing_details: {
              "name": this.cardForm.controls['name'].value,
            },
          })
          .then((result:any) => {
            this.loading =  false
            if (result.error) {
              
              if(result.error['error'] != undefined){
                this.error = result.error['error']['message'];
              }else {this.error = null;}
            } else {
              
               this.paymentMethodID = result['paymentMethod']['id']
              this.saveCard()
            }
          });
      }
    }

    saveCard() {
      let card = {
        'customerId' : this.customerID,
        'payment_method_id' : this.paymentMethodID
      }

      let encrypted_data = this.dataService.encryptData(card);
      let data = {'data' : encrypted_data}
      this.dataService.saveCardDetails(data).subscribe(response => {
        if(response['success'] == true){
          this.getCardDetails();
          this.toastr.successToastr(response['message']);
        }
        else {
          this.toastr.errorToastr(response['message']);
        }
          jQuery("#card_listingModal").hide()
          jQuery(".modal-backdrop").hide()
          var body = $('body');
          body.removeClass('modal-open');
      })
    }

    onChange(error:any) {
      if (error) {
        if(error['error'] != undefined) {
          this.error = error['error']['message'];
        } 
         else {
          this.error = null;
        }
      } else {
        this.error = null;
      }
      this.cd.detectChanges();
    }

  }
