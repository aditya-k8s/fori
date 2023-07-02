import { Component, OnInit,AfterViewInit,ViewChild,ElementRef,ChangeDetectorRef } from '@angular/core';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {DataTablesModule} from 'angular-datatables';
import {Title} from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit,AfterViewInit {
  	ordersDetail : any = []
  	order_id : any
    stripePublicKey:any
    stripe:any
    refundData:any = {}
    userId:any
    client_secret:any
    loading = false
    dtOptions: any = {};

  	constructor(
		private routers: ActivatedRoute,
		private router: Router,
		private dataService: DataService,
    public toastr : ToastrManager,
		private formBuilder:FormBuilder,
    private stripeService:AngularStripeService,
    private titleService:Title,
    private ngxService: NgxUiLoaderService,
		) {   this.titleService.setTitle("Track Order"); }

    ngAfterViewInit() {  

      this.stripeService.setPublishableKey('pk_test_51I9yuoGm48tZv82dqKvjTxBk2hnC4TceAeXH4Kc2S5W5oLnxnfAEFElqKoRGYzWFrjVA4d8ueBLDfQWM9YyVaEBB00YHwGpG8b').then(
       stripe=> {
          this.stripe = stripe;
        });
    }

  	ngOnInit(){
      this.ngxService.start();
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 20,
        order:[],
        lengthMenu : [20, 50, 100],
        processing: true,
        paging:   true,
      };

      if(localStorage.getItem("data")){
        let data = this.dataService.decryptData(localStorage.getItem("data"));
        this.userId = data[0]['user_id'];
      }
      //this.userId =localStorage.getItem("user_id")

  		this.routers.paramMap.subscribe((params: ParamMap) => {
	      this.order_id = params.get('order_id');
	    });

  	  this.trackOrder()
  	}

    trackOrder(){
      this.dataService.getOrderDetails(this.order_id).subscribe(response => {
          this.ngxService.stop();
          if(response['success'] == true){
            this.ordersDetail = response['body']
            this.client_secret = response['body']['orderPaymentInfo']['client_secret']
           
          }
       });
    }

  convert_to_jason(value:any){
    let data = JSON.parse(value)
    let output = Object.entries(data).map(([key, value]) => ({key,value}));
    return output;
  }

   async cancelOrder(paymentId:any){
      this.ngxService.start();
      this.loading = true;
      this.refundData['payment_intent'] = paymentId
      this.refundData['user_id'] = this.userId
      this.refundData['order_id'] = this.order_id

      this.dataService.refund(this.refundData).subscribe(response => {
          this.loading = false;
          this.ngxService.stop();
          if(response['success'] == true){
            //this.ordersDetail = response['body']
            this.trackOrder();
            this.toastr.successToastr("Order Cancelled Successfully");
          }
          else{
            this.toastr.errorToastr(response['message']); 
          }
       });
    }

}
