import { Component, OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef } from '@angular/core';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service'
;
import { FormBuilder,Validators,FormGroup,NgForm } from '@angular/forms';

import { DataService } from '../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit,AfterViewInit  {
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

        //this.card.mount(this.cardInfo.nativeElement);
        this.card.addEventListener('change', this.cardHandler);
        });
    }
    ngOnInit() {
      if(localStorage.getItem("data")){
        let data = this.dataService.decryptData(localStorage.getItem("data"));
        this.userId = data[0]['user_id'];
      }
      //this.userId = localStorage.getItem("user_id")

       this.dataService.getCard(this.userId).subscribe(response => {
            if(response['success'] == true) {
                this.cards = response['body']
            } 
          })

       this.listest()

    }

    async listest()
     {   
      //  const paymentMethod =  await this.stripe.createPaymentMethod({
      //     type: 'card',
      //     card: this.card,
      //   })
       
      //   const paymentMethod =  await this.stripe.paymentMethods.list({
      //     customer: 'cus_JATMmgVpkaouU7',
      //     card: 'card',
      //   })
      //   .then((result:any) => {
      //   if (result.error) 
      //   {
      //     console.log(result.error)
      //   } 
      //   else {
      //     console.log(result)

      //   }

      // });      
    }

     __checkout(form: any)
    {
      this.isSavingCard = this.checkoutForm.controls['saveCard'].value

      if(this.isSavingCard)
      {

        const customerName = this.checkoutForm.controls['name'].value
        this.customerData['name'] = customerName

           this.dataService.createCustomerCheckout(this.customerData).subscribe(response => {
            if(response['success'] == true) {
                this.customerID = response['body']['id']
                this.createPaymentMethod(customerName,this.customerID);
            } 
          })

        }
        else
        {
          const cvc = this.checkoutForm.controls['cardCvcElement'].value
            this.stripe.confirmCardPayment(this.selected_client_secret, {
              payment_method: this.paymentMethodID,
              payment_method_options: {
                card: {
                  cardCvc: cvc
                }
              },
            }).then(function(result:any) {
              if (result.error) {
                // Show error to your customer
              } else {
                if (result.paymentIntent.status === 'succeeded') {
                  // Show a success message to your customer
                  // There's a risk of the customer closing the window before callback
                  // execution. Set up a webhook or plugin to listen for the
                  // payment_intent.succeeded event that handles any business critical
                  // post-payment actions.
                }
              }
            });

        }
      }
    
     async createPaymentMethod(customerName:any,customerID:any)
     {   
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
      this.paymentIntent['amount'] = 1600
      this.paymentIntent['currency'] = "USD"
      this.paymentIntent['payment_method'] = methodID
      this.paymentIntent['confirmation_method'] = "automatic"
      this.paymentIntent['customer'] = customerID
      this.paymentIntent['user_id'] = this.userId

      this.dataService.paymentIntentData(this.paymentIntent).subscribe(response => {
          
          if(response['success'] == true){  
            paymentData["client_secret"] = response['body']['client_secret']
              this.dataService.saveCard(paymentData).subscribe(response => {
                 if(response['success'] == true){
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
// async selectAudioInputDeviceByName(name: string): Promise<void> {
//     console.log('Selecting audio input device by name:', name);
//     const device = await this.audioInputSelectionToDevice(name);
//     return this.selectAudioInputDevice(device);
// }

    // async  __createCustomerStripe(customer:any) {
    //   //const customerName = this.checkoutForm.controls['name'].value; 
    //   this.customerData['email'] = this.checkoutForm.controls['name'].value
    //      this.dataService.createCustomer(this.customerData).subscribe(response => {
    //       console.log(response,"yess")
    //        if(response['success'] == true){
    //          return response['body']['id']
    //       }
    //       else{
    //           this.toastr.errorToastr(response['message']);
    //           return false; 
    //       } 
    //   })
    // }


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

    //  __checkout(form: NgForm)
    // {
    //    console.log(this.card,"card")
    //    this.paymentIntentData['user_id'] = this.userId
    //    this.paymentIntentData['amount'] = 900
    //    this.paymentIntentData['currency'] = 'usd'

    //    this.dataService.createPaymentIntent(this.paymentIntentData).subscribe(response => {
    //         console.log(response,"createnewData")
    //           if(response['success'] == true){
    //              this.client_secret = response['body']['client_secret']
    //              this.__createPaymentMethod()

    //           }
    //           else{


    //           } 
    //     })

    // }

  //   __createPaymentMethod(){
  //     console.log("yes")
  //    this.stripe.createPaymentMethod({
  //         type: 'card',
  //         card: this.card,
  //       })
  //       .then((result:any) => {
  //         console.log(result)
  //         if (result.error) {
  //           if (result.error) {
  //             if(result.error['error'] != undefined)
  //             {
  //               this.error = result.error['error']['message'];
  //             }
  //             } else {
  //               this.error = null;
  //             }
  //          console.log(this.error,"----------------")
  //        }

  //        this.__splitPayment()
  //     });
  // }

    // __splitPayment(){
    //   this.splitPaymentData['user_id'] = this.userId
    //   this.splitPaymentData['amount'] = 900
    //   this.splitPaymentData['currency'] = 'usd'
    //   this.splitPaymentData['stripeAccount'] = 'acct_1I9yuoGm48tZv82d'
    //   this.dataService.paymentTransfer(this.splitPaymentData).subscribe(response => {
    //       console.log(response,"splitPayments")
    //        if(response['success'] == true){
    //           //this.customerID = response['body']['id']
    //         }
    //         else{
    //           this.toastr.errorToastr(response['message']); 
    //        } 
    //     })
    // }



  //   onChange(error:any) {
  //     if (error) {
  //       if(error['error'] != undefined)
  //       {
  //         this.error = error['error']['message'];
  //       }
        
  //     } else {
  //       this.error = null;
  //     }
  //     this.cd.detectChanges();
  //     console.log(this.error)
  // }


	

}
