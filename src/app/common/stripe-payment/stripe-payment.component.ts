import { Component, OnInit,AfterViewInit,ViewChild,ElementRef,ChangeDetectorRef } from '@angular/core';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { FormBuilder,Validators,FormGroup,NgForm } from '@angular/forms';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
// import { CheckoutComponent } from '../../checkout/checkout.component';


@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.css']
})
export class StripePaymentComponent implements OnInit {
	checkoutForm:FormGroup
	card: any;
  	cardHandler = this.onChange.bind(this);
 	 stripe:any;
  	error: any;
  	userId:any
  	splitPaymentData : any = {}
  	customerData :any = {}
  	customerID:any
  	//payment_method_id:any
  	paymentIntent : any = {}
  	isSavingCard = false  
  	paymentData : any = {}
  	cards : any = []
  	options:any
  	client_secret:any
  	selected_client_secret :any
  	paymentMethodID : any
  	cvc :any
  	checkout:any
  constructor(
	private formBuilder:FormBuilder,
  	private dataService: DataService,
  	public toastr : ToastrManager,
	private cd: ChangeDetectorRef,
  	private stripeService:AngularStripeService
      ) {

        this.checkoutForm = this.formBuilder.group({
          name: ['', Validators.required],
          saveCard:[''],
          exsiting_card:[''],
          cardCvcElement:[''],
          clientsecret:['']
      	})
    }

    ngAfterViewInit() {  
        this.stripeService.setPublishableKey('pk_test_51I9yuoGm48tZv82dqKvjTxBk2hnC4TceAeXH4Kc2S5W5oLnxnfAEFElqKoRGYzWFrjVA4d8ueBLDfQWM9YyVaEBB00YHwGpG8b').then(
        stripe=> {
	        this.stripe = stripe;
	        const elements = stripe.elements();    
	        this.card = elements.create('card');
	        this.card.mount('#card-element')
        	this.card.addEventListener('change', this.cardHandler);
        });
    }

    ngOnInit(){
      if(localStorage.getItem("data")){
        let data = this.dataService.decryptData(localStorage.getItem("data"));
        this.userId = data[0]['user_id'];
      }
  	    //this.userId = localStorage.getItem("user_id")
  	    //this.checkout = new CheckoutComponent()
        this.dataService.getCard(this.userId).subscribe(response => {
            if(response['success'] == true) {
                this.cards = response['body']
            } 
        }) 
         this.checkout.saveOrder();

    }
    __checkout(form: NgForm)
    {
      this.isSavingCard = this.checkoutForm.controls['saveCard'].value

        const customerName = this.checkoutForm.controls['name'].value
        this.customerData['name'] = customerName

           this.dataService.createCustomerCheckout(this.customerData).subscribe(response => {
            if(response['success'] == true) {
                this.customerID = response['body']['id']
                this.createPaymentMethod(customerName,this.customerID);
            } 
          })

      }
    
     async createPaymentMethod(customerName:any,customerID:any){   
        const paymentMethod =  await this.stripe.createPaymentMethod({
          type: 'card',
          card: this.card,
        })
        .then((result:any) => {
	        if (result.error) 
	        {
	          if(result.error['error'] != undefined)
	          {
	            this.error = result.error['error']['message'];
	          }else {this.error = null;}
	        } 
	        else {
	          
	          const methodID = result['paymentMethod']['id']
	          this.paymentData['custom_id'] = customerID
	          this.paymentData['payment_menthod_id'] = methodID
	          this.paymentData['user_id'] = this.userId
	          this.paymentData['name'] = customerName
	          this.paymentData['card_no'] = result['paymentMethod']['card']['last4']
	          this.paymentData['exp_month'] = result['paymentMethod']['card']['exp_month']
	          this.paymentData['exp_year'] = result['paymentMethod']['card']['exp_year']

	          this.createPaymentIntent(customerID,methodID,this.paymentData)
	        }

      });      
    }

    createPaymentIntent(customerID:any,methodID:any,paymentData:any){
      this.paymentIntent['amount'] = '60000'
      this.paymentIntent['currency'] = "USD"
      this.paymentIntent['payment_method'] = methodID
      this.paymentIntent['confirmation_method'] = "automatic"
      this.paymentIntent['customer'] = customerID
      this.paymentIntent['user_id'] = this.userId

      //this.checkout.saveOrder();

      this.dataService.paymentIntentData(this.paymentIntent).subscribe(response => {
          
          if(response['success'] == true){  
            paymentData["client_secret"] = response['body']['client_secret']
              this.dataService.saveCard(paymentData).subscribe(response => {
                 if(response['success'] == true){
                   //this.saveOrderPayment(this.checkout.order, stripe_response)
                }
                else {
                    this.toastr.errorToastr(response['message']); 
                } 
              })

          }
          else{
            this.toastr.errorToastr(response['message']); 
          } 
      })
    }

	onCardChange(card:any){
	    this.selected_client_secret = card['client_secret']
	    this.paymentMethodID = card['payment_menthod_id']
	}

    onChange(error:any) {
      if (error) {
        if(error['error'] != undefined) {
          this.error = error['error']['message'];
        } 
      } else {
        this.error = null;
      }
      this.cd.detectChanges();
    }

}
