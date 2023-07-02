import { Component, OnInit,AfterViewInit,ViewChild,ElementRef,ChangeDetectorRef } from '@angular/core';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { DataService } from '../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../environments/environment'
import { AWSService } from '../aws.service';
import {Title} from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { LivestreamComponent } from '../livestream/livestream.component';
import {io} from 'socket.io-client';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers : [LivestreamComponent]
})
export class CheckoutComponent implements OnInit,AfterViewInit {
    checkoutForm:FormGroup
    card: any;
    cardHandler = this.onChange.bind(this);
    error: any;
    splitPaymentData : any = {}
    customerData :any = {}
    customerID:any
    paymentIntent : any = {}
    isSavingCard = false  
    paymentData : any = {}
    cards : any = []
    options:any
    selected_client_secret :any
    paymentMethodID : any
    checkout:any
    savedCarddata:any ={}
    shippingForm: FormGroup
    customStripeForm: FormGroup
    promoCodeForm: FormGroup
    submitted = false
    paySubmitted =  false
    countries: any = []
    states: any = []
    handler:any = null;
    localstorages:any = [];
    cart : any=[];
    shopifyProduct : any= [];
    shopping_cart:any=[];
    totalamount:any
    addresses:any =[]
    userId :any = []
    defaultChoice: any
    showForm = false
    formProcess= false
    addressId : any
    orderItems : any = {}
    order : any
    broadcast_id :any
    payment :any = {}
    stripeData : any = []
    stripe_response : any = {}
    showPickupAddress:any
    storePickup:any
    stripe:any
    cardNumber:any 
    expiryMonth:any 
    expiryYear:any 
    cvc: any 
    message:any
    stripeID:any 
    flatShippingRate :any
    AftershippingFee:any
    addShipping:any
    buttonColor :any = "black";
    buttonType :any = "buy";
    isCustomSize = false;
    buttonWidth = 240;
    buttonHeight = 40;
    shippingID : any
    coupon_amount :any
    couponType:any
    couponName:any
    freeShipping :any = "";
    couponSubmit = false;
    coupon_per:any
    coupon_percentage : any
    couponProducts : any = []
    disableCouponBtn = false
    productY = true
    productYID :any =[]
    priceYproduct :any
    getYproduct:any
    store_pickup_status:any
    customer_email:any
    customer_name:any
    stripePublicKey:any
    isPaymentMethod = false
    //selectedCard : any;
    card_type : string = "";
    donation_amount : any = 0.00;
    shippingRange :any = []
    carbonData : any
    CardDetails:any
    customerName :any
    loadingPay = false
    noShippingAddress = false
    formLoader = true
    noOfItems = 0 
    loadingState = false
    private socket : any
    socket_url: string = "";

    //stripeCustomerID : any
  constructor(
      private routers: ActivatedRoute,
      private router: Router, 
      private dataService: DataService,
      public toastr : ToastrManager,
      private formBuilder:FormBuilder,
      private aws : AWSService,
      private cd: ChangeDetectorRef,
      private stripeService:AngularStripeService,
      private titleService:Title,
      private ngxService: NgxUiLoaderService,
      private liveStream : LivestreamComponent
    ) { 

    this.titleService.setTitle("Checkout");

    this.socket_url = environment.socket_url;
    this.socket = io(this.socket_url);

    this.shippingForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      last_name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin_code: ['', Validators.required],
      contact_no: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(15)]],
      address_type: ['', Validators.required],
      country: ['', Validators.required],
      address_1: [''],
    });

    this.customStripeForm = this.formBuilder.group({
          cardNumber: ['', [Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
          expMonth: ['', Validators.required],
          expYear: ['', Validators.required],
          cvv: ['', [Validators.required,Validators.minLength(3)]],
    });

    this.promoCodeForm = this.formBuilder.group({
          coupon_code: ['', Validators.required]
    });

    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
     // saveCard:[''],
      // exsiting_card:[''],
      // cardCvcElement:[''],
      // clientsecret:['']
    })
 
  }

  ngAfterViewInit() {  
    // this.dataService.getPaymentGateway(this.broadcast_id).subscribe(response => {
    //   if(response['success'] == true){
    //     this.stripePublicKey = response['body'][0]['public_key']
    //   }
    // });

    // if(this.isPaymentMethod) {
    //   this.__getStripPaymentForm()
    // }
  }

  ngOnInit() {
    if(localStorage.getItem("data")){
      let data = this.dataService.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }

    this.__getCountries();
    this.__getStates();

    if(localStorage.getItem('cart')){
      this.localstorages = JSON.parse(localStorage.getItem('cart')|| '{}');
    }

    if(localStorage.getItem('broadcast')){
      this.broadcast_id = JSON.parse(localStorage.getItem('broadcast') || '');            
    }

    if(localStorage.getItem('storePickup') != undefined && localStorage.getItem('storePickup') != 'undefined'){
      this.storePickup = JSON.parse(localStorage.getItem('storePickup') || '');             
    }

    if(localStorage.getItem('store_pickup_status') != undefined){
      this.store_pickup_status = JSON.parse(localStorage.getItem('store_pickup_status') || '');           
    }

    this.__getUserDetails()
    this.__getAddress();
    this.__getShippingFlatRate()
    this.__saveCartData('checkout')

    // setTimeout(() => {
    //   this.getTotal();  
    //   //  this.loadStripe('Stripe');  
    // }, 3000);

  }

  __getStripPaymentForm() {
        setTimeout(() => {
          this.stripeService.setPublishableKey('pk_test_51I9yuoGm48tZv82dqKvjTxBk2hnC4TceAeXH4Kc2S5W5oLnxnfAEFElqKoRGYzWFrjVA4d8ueBLDfQWM9YyVaEBB00YHwGpG8b').then(
          stripe=> {
            this.stripe = stripe;
            const elements = stripe.elements();    
            this.card = elements.create('card');
            this.card.mount('#card-element')
            this.card.addEventListener('change', this.cardHandler);
          });
          this.formLoader = false
        }, 2000);
    }

  __getUserDetails() {
    this.dataService.getUserDetails(this.userId).subscribe(response => {
      if(response['success'] == true){
        this.customer_email = response['data'][0]['email']
        this.customer_name = response['data'][0]['username']
        this.customerID = response['data'][0]['strip_customerId']
        if(this.customerID) {
          this.__getcards(this.customerID)
        } else {
          this.__getStripPaymentForm()
        }
      }
    })

  }

  __getcards(customerID:any) {
      this.dataService.getCards(customerID).subscribe(response => {
          if(response['success'] == true){
            this.CardDetails = response['body']['data']
            if(this.CardDetails[0]) {
              this.isPaymentMethod = true
            }
            else {
              if( this.addressId) {
                this.__getStripPaymentForm()
              }
            }
          }
      });
  }

  __getStates(){
    this.loadingState =  true
    //let countryID = event.target.value
    this.dataService.state(233).subscribe(response => {
      this.loadingState =  false
        if(response['success'] == true){
          this.states = response['body']
        }
    });

  }
  __getCountries(){
    this.dataService.getCountry().subscribe(response => {
        if(response['success'] == true){
          this.countries = response['data']
        }
    });
  }
  __saveCartData(page:any){
    let data = {
      'user_id' : this.userId,
      'broadcast_id' : this.broadcast_id,
      'page' : page,
    }
    this.dataService.saveCartLog(data).subscribe(response =>{
      if(response['success'] == true){}else{}
    },error =>{
      console.log(error);
    })
  }

  __getShippingFlatRate(){
    this.dataService.getShippingFee(this.broadcast_id).subscribe(response => {
        if(response['success'] == true){
          this.shippingRange = JSON.parse(response['body']['arrayData'])
        }
        this.getTotal();
    });    
  }      

  __editAddress(index:any){
    this.scrollToTop()
    this.submitted = false;
    this.addShipping = false
    this.showForm = true
    this.shippingID = this.addresses[index]['id']
    this.shippingForm.patchValue({
      'fullname' : this.addresses[index]['fullname'],
      'last_name' : this.addresses[index]['last_name'],
      'address' : this.addresses[index]['address'],
      'address_1' :this.addresses[index]['address_1'],
      'city' : this.addresses[index]['city'],
      'state' : this.addresses[index]['state'],
      'country' : this.addresses[index]['country'],
      'pin_code' :this.addresses[index]['pin_code'],
      'contact_no' : this.addresses[index]['contact_no'],
      'address_type' : this.addresses[index]['address_type'],
    })
  }

  __addAddress(){
    this.showForm = true
    this.addShipping = true
    this.shippingForm.patchValue({
      'fullname' : '','last_name' : '','address' : '','address_1' :'','city' : '','state' : '','country' : '','pin_code' : '','contact_no' : '','address_type' : '',
    })
  }

  get_items(){
    if(localStorage.getItem('cart')){
      this.localstorages = JSON.parse(localStorage.getItem('cart')|| '{}');
    }
  }

  get f() { return this.shippingForm.controls; }
  get pay() { return this.checkoutForm.controls; }

  /****    Validate Coupon Data    ****/

  validateCouponCode(couponData:any){
    this.couponSubmit = true;
    if (this.promoCodeForm.invalid) {
      return;
    }else{
      this.disableCouponBtn = true
      couponData['user_id'] = this.broadcast_id
      this.dataService.validateDiscountCode(couponData).subscribe(response => {
        this.disableCouponBtn = false
        if(response['success'] == true){
          
          var path = response['body']['codeDiscount']

          //Free Shiiping
          if(path['__typename'] == "DiscountCodeFreeShipping"){
            this.productYID = []
            this.freeShipping = "Free Shiiping"
            this.coupon_amount = 0
            this.couponName = path['title']
            this.coupon_percentage = ''
            this.toastr.successToastr(response['message']);
          }

          //Buy x Get Y
          if(path['__typename'] == "DiscountCodeBxgy"){
            var quantity = 0
            var productsArr =  path['customerBuys']['items']['products']['edges']
            var productIdArray = JSON.parse(localStorage.getItem('cart')|| '{}');

            for (let product of productsArr) {
              var coupon_productId =  product['node']['id'].substr( product['node']['id'].lastIndexOf('/') + 1);
              var index = productIdArray.findIndex(function(pro:any) {
                return pro['product'] == coupon_productId
              })
              if(index != -1){ 
                quantity += productIdArray[index]['quantity']
              }
            }
            if(quantity < 2){
              this.toastr.errorToastr("You need apply add more product into cart to apply this product."); 
              return;
            }

            if(this.productY == true)
            {
              this.productYID = []
              let total = 0;
              var productsArr =  path['customerGets']['items']['products']['edges']
              var productIdArray = JSON.parse(localStorage.getItem('cart')|| '{}');

              var disType =  path['customerGets']['value']['__typename']

              //Buy x Get y free on Quantity based
              if(disType == "DiscountOnQuantity"){ 
                for (let product of productsArr) {
                  var coupon_productId =  product['node']['id'].substr( product['node']['id'].lastIndexOf('/') + 1);
                  var index = productIdArray.findIndex(function(pro:any) {
                    return pro['product'] == coupon_productId
                  })

                  /* ** the is comment because we handling the price.  ** */
                  // if(index != -1){ 
                  //   total +=  productIdArray[index]['on_air_price']
                  //   this.productYID.push(coupon_productId)
                  // }

                  if(index != -1){ 
                    total +=  productIdArray[index]['price']
                    this.productYID.push(coupon_productId)
                  }
                }
                this.couponName = path['title']
              }

              //Percent Off on y products
              // if(disType == "DiscountOnQuantity"){ 

              //     for (let product of productsArr) {
              //           var coupon_productId =  product['node']['id'].substr( product['node']['id'].lastIndexOf('/') + 1);
              //           var index = productIdArray.findIndex(function(pro:any) {
              //             return pro['product'] == coupon_productId
              //           })

              //           if(index != -1){ 
              //             total +=  productIdArray[index]['on_air_price']
              //             this.productYID.push(coupon_productId)
              //           }
              //     }

              // }

              if(this.productYID.length > 0){
                this.freeShipping=''
                this.couponProducts = ''
                  this.coupon_percentage = ''
                this.toastr.successToastr(response['message']);
              }

              this.priceYproduct = total
            }

          }
          //Flat Rate Discount
          if(path['__typename'] == "DiscountCodeBasic"){
            this.productYID = []

              // discount on all items
              this.couponType = path['customerGets']['items']['__typename'];
              this.freeShipping=''
              this.couponName = path['title']
              this.priceYproduct = ''

              if(this.couponType == "AllDiscountItems"){
                this.coupon_amount = path['customerGets']['value']['amount']['amount'] 
                this.coupon_percentage = ''
                this.toastr.successToastr(response['message']);
              }

              //Percentage coupon on 
              if(this.couponType == "DiscountProducts"){
                this.coupon_amount = ''
                  var productsArr =  path['customerGets']['items']['products']['edges']
                  var productIdArray = JSON.parse(localStorage.getItem('cart')|| '{}');

                  for (let product of productsArr) {
                  var coupon_productId =  product['node']['id'].substr( product['node']['id'].lastIndexOf('/') + 1);

                  var index = productIdArray.findIndex(function(pro:any) {
                    return pro['product'] == coupon_productId
                  })
                  //this.coupon_per = path['customerGets']['value']['percentage']
                  if(index != -1){
                    this.coupon_percentage= path['customerGets']['value']['percentage'] * 100
                  }
                  }
                  if(index == -1){
                      this.toastr.errorToastr("Coupon not applied on cart's products."); 
                  }
                  else{
                    this.toastr.successToastr(response['message']);
                  }
                
                this.couponProducts = ''
              }
          }
          this.getTotal();
          // this.coupon_amount
          this.couponSubmit = false;
        }
        else{
          this.toastr.errorToastr(response['message']); 
        } 
      },error => {this.toastr.errorToastr(error);});
    }
  }

  onSubmit(shippingdata:any){
      this.submitted = true;
      if (this.shippingForm.invalid) {
          return;
      }else{
        if(this.addShipping == true){;
          shippingdata['user_id'] = this.userId
          this.dataService.addShippingAddress(shippingdata).subscribe(response => {
                if(response['success'] == true){
                  this.toastr.successToastr(response['message']);
                  this.showForm = false;
                  this.__getAddress();
                }
                else{
                  this.toastr.errorToastr(response['message']); 
                } 
            },
            error => {this.toastr.errorToastr(error);
            });
          }else{
            shippingdata['user_id'] = this.userId
            shippingdata['id'] = this.shippingID
            this.dataService.editShippingAddress(shippingdata).subscribe(response => {
                if(response['success'] == true){
                  this.toastr.successToastr(response['message']);
                  this.__getAddress();
                  this.showForm = false
                  // jQuery("#exampleModal").hide()
                  // jQuery(".modal-backdrop").hide()
                }
                else{
                  this.toastr.errorToastr(response['message']); 
                } 
            },
            error => {this.toastr.errorToastr(error);});
        }
      }     
  }

  // __addNewAddress(){
  //   this.showForm = true
  // }

  onAddressChange(event:any,index:any){
    let {checked, value} = event.target;
    this.showForm = !this.showForm;
    if(value == 'newAddress'){
      this.showForm = true
    }
    else{
      this.addressId = value
      this.showForm = false
    }
  }

  /* *****Get Total Amount of products****** */

  getTotal(){
    let total = 0;
    this.noOfItems = 0
    for (var i = 0; i < this.localstorages.length; i++) {
      if (this.localstorages[i].price) {
        total += this.localstorages[i].price * this.localstorages[i].quantity;
        this.totalamount = total;
        this.noOfItems += this.localstorages[i].quantity
      }
    }

    for(var i = 0; i < this.shippingRange.length; i++){
      if(this.shippingRange[i].minValue <= this.totalamount && this.shippingRange[i].maxValue >= this.totalamount)
      {
        this.flatShippingRate = this.shippingRange[i].shipping;
      }
    }

    /* ****** to add the donation amount in total amount ****** */

    if(localStorage.getItem("amount_donated")){
      this.donation_amount = 0.50;
    }

    // if(this.coupon_amount){
    //    this.totalamount =  this.totalamount - this.coupon_amount
    // }

    if(this.freeShipping != '') {
      this.AftershippingFee = this.totalamount;
      this.AftershippingFee = this.AftershippingFee + this.donation_amount;
    }
    else if(this.productYID.length > 0){
      this.totalamount = this.totalamount - this.priceYproduct
      this.AftershippingFee = this.totalamount + parseFloat(this.flatShippingRate); //(this.totalamount *  this.flatShippingRate)/100;
      this.AftershippingFee = this.AftershippingFee + this.donation_amount;
      
      //let cartArr
      let cartArr = JSON.parse(localStorage.getItem('cart') || '{}');
      for(let i in cartArr){
        var index = this.productYID.findIndex(function(pro:any) {
          //this.priceYproduct :any pro['product']
          return pro == cartArr[i].product
        })
        if(index != -1){
          cartArr[i]["getProduct"] = "true";
          //cartArr[i].push({"element": "element"});
        }
      }
      
      localStorage.setItem('cart', JSON.stringify(cartArr));
      this.localstorages = JSON.parse(localStorage.getItem('cart')|| '{}');
    }
    else if(this.coupon_percentage){
      this.totalamount = this.totalamount -(this.totalamount *  this.coupon_percentage)/100
      this.AftershippingFee = this.totalamount + parseFloat(this.flatShippingRate); //(this.totalamount *  this.flatShippingRate)/100;
      this.AftershippingFee = this.AftershippingFee + this.donation_amount;
    }
    else if(this.coupon_amount){
      this.totalamount =  this.totalamount - this.coupon_amount
      this.AftershippingFee = this.totalamount + parseFloat(this.flatShippingRate); //(this.totalamount *  this.flatShippingRate)/100;
      this.AftershippingFee = this.AftershippingFee + this.donation_amount;
    }
    else {
      if(this.flatShippingRate){
        this.AftershippingFee = this.totalamount + parseFloat(this.flatShippingRate); //(this.totalamount *  this.flatShippingRate)/100;
        this.AftershippingFee = this.AftershippingFee + this.donation_amount;
      }
      else{
        this.AftershippingFee = this.totalamount;
        this.AftershippingFee = this.AftershippingFee + this.donation_amount;
      }
    }
    return total;
  }

  __getAddress(){
    this.ngxService.start(); 
    this.dataService.getAddress(this.userId).subscribe(response => {
      this.ngxService.stop(); 
      if(response['success'] == true){
        this.noShippingAddress = true
        this.addresses = response['body']
        this.addressId = this.addresses[this.addresses.length - 1]['id']
        if(!this.isPaymentMethod){
          this.__getStripPaymentForm()
        }
      }
      else {
        this.noShippingAddress = false
        this.toastr.errorToastr(response['message']); 
      }
    });
    return this.addresses;
  }

  saveOrder(client_secret:any){
    this.orderItems['user_id'] = this.userId
    this.orderItems['broadcast_id'] = this.broadcast_id
    this.orderItems['total_items'] = this.localstorages.length
    this.orderItems['sub_total_amount'] = this.totalamount
    this.orderItems['total_amount'] = this.AftershippingFee
    this.orderItems['shipping_fee'] = this.flatShippingRate
    this.orderItems['currency'] = this.localstorages[0]['currencyCode']
    this.orderItems['billing_address'] =  this.addressId
    this.orderItems['shipping_address'] =  this.addressId
    this.orderItems['coupon_code'] = ''
    this.orderItems['note'] = ''
    this.orderItems['products'] =  this.localstorages
    this.orderItems['pickupStore'] = this.showPickupAddress
    let encrypted_data = this.dataService.encryptData(this.orderItems);
    let data = {'data' : encrypted_data};
    this.dataService.saveOrder(data).subscribe(response => {
        if(response['success'] == true){

          this.toastr.successToastr(response['message']);
          this.order = response['body']['order_id'];
          //this.order  = 2840
          if(localStorage.getItem('amount_donated')){
            this.carbonClickPayment(client_secret)
          }

          /** Save order payment Data **/
          this.saveOrderPayment(this.order,client_secret)

        
            
        }
        else {
          this.toastr.errorToastr(response['data']); 
          this.loadingPay = false
        }
    });
    return this.order;
  }

  saveOrderPayment(order:any,client_secret:any){
    this.payment['user_id'] = this.userId
    this.payment['order_id'] = order
    this.payment['payment_type'] = 'ONLINE'
    this.payment['amount_received'] =  this.AftershippingFee
    this.payment['payment_gateway'] = 'stripe'
    this.payment['client_secret'] = client_secret
    this.payment['txn'] = this.paymentMethodID
    this.payment['donation_id'] = this.carbonData
    let encrypted_data = this.dataService.encryptData(this.payment);
    let data = {'data' : encrypted_data};
    this.dataService.saveOrderPayment(data).subscribe(response => {
       this.loadingPay = false
        if(response['success'] == true){
          this.toastr.successToastr(response['message']);
          this.order = response['body']['order_id']

          /** Socket update Quantity **/
          this.updateAvailableStock(order)

          this.sendPushNotification();

          this.liveStream.getPurchaseAlert(this.localstorages,this.userId,this.broadcast_id);

          this.dataService.sendNotification('notification');

          this.__saveCartData('order-payment');

          localStorage.removeItem('cart');
          localStorage.removeItem('broadcast');
          localStorage.removeItem('storePickup');
          localStorage.removeItem("amount_donated"); // to remove the donation amount after payment.
          //this.broadcast_id
          this.router.navigate(['/success'], { queryParams: {"id": this.broadcast_id}});


        }
    });
    return this.order;
  }

  carbonClickPayment(client_secret:any) {
    let data = {
      "user_id" : this.userId,
      "currency" : "USD",
      "amount" :  0.50,
      "order_id" : this.order
    }
    this.dataService.carbonClickPayment(data).subscribe(response =>{
      if(response['success'] == true){
        this.carbonData = response['body']['donation_id']
        this.saveOrderPayment(this.order,client_secret)
      }else{}
    },error =>{
      console.log(error);
    })
  }

  sendPushNotification(){
		let data = {
			"user_id" : this.userId,
			"send_to" : this.localstorages[0]['merchant_id'],
			"msg_type" : "newpurchase"
		}
		this.dataService.sendPushNitification(data).subscribe(response =>{
			if(response['success'] == true){
			}else{}
		},error =>{
			console.log(error);
		})
	}

  onLoadPaymentData(event:any) {
    //console.log("load payment data", event.detail);
  }

  scrollToTop() {
    (function smoothscroll() {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
    })();
  }


  __createStripeCustomer(){    
    this.customerData['name'] = this.customer_name
    this.customerData['user_id'] = this.userId
    this.dataService.createCustomerCheckout(this.customerData).subscribe(response => {
      if(response['success'] == true) {
        this.customerID = response['body']['id']
        //this.createPaymentMethod(customerName);
      }  
    })
  }

  __checkout(param:any) {
    this.paySubmitted =  true

      if(param == 'old' && !this.paymentMethodID) {
        this.toastr.errorToastr("Please select payment method to make payment."); 
        return;
      } 
      if(param != 'old') {
        if (this.checkoutForm.invalid) {
          return;
        }
      }
      this.loadingPay = true
      this.customerName = this.checkoutForm.controls['name'].value
      if(!this.customerID) {
        this.__createStripeCustomer();
      }
      setTimeout(() => {
        if(!this.isPaymentMethod) {
          this.createPaymentMethod();
        }
        else {
          this.createPaymentIntent();
        }
      }, 2000);
    
  }

 /* ::::::::::::::::::::::: Create Payment method :::::::::::::::::::::::*/

  async createPaymentMethod(){ 
  let addressID = this.addressId 
    var index = this.addresses.findIndex(function(address:any) {
      return address['id'] == addressID
    })

    const paymentMethod =  await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
      billing_details: {
      address: {
        line1: this.addresses[index]['address_1'],
        city: this.addresses[index]['city'],
        state: this.addresses[index]['state'],
        country: this.addresses[index]['country_code'],
      },
      "email": this.customer_email,
      "name": this.customerName,
      "phone": this.addresses[index]['contact_no']
    },
  })
    .then((result:any) => {
     
      if (result.error) {
         this.loadingPay = false
        if(result.error.message){
          this.error = result.error.message;
        }else {this.error = null;}
      } else {
        this.paymentMethodID = result['paymentMethod']['id']
        this.createPaymentIntent()
      }
      console.log(this.error)
    });
  }
  /* ::::::::::::::::::::::: Payment Intent Method :::::::::::::::::::::::*/
  createPaymentIntent(){
    this.paymentIntent['amount'] =  Math.round(this.AftershippingFee * 100)
    this.paymentIntent['currency'] = "USD"
    this.paymentIntent['payment_method'] = this.paymentMethodID
    this.paymentIntent['confirmation_method'] = "automatic"
    this.paymentIntent['customer'] = this.customerID
    this.paymentIntent['user_id'] = this.userId

    let encrypted_data = this.dataService.encryptData(this.paymentIntent);
    let data = {'data' : encrypted_data};

    this.dataService.paymentIntentData(data).subscribe(response => {

      if(response['success'] == true){  
        this.card_type = response['body']['charges']['data'][0]['payment_method_details']['card']['brand'];
        this.saveOrder(this.paymentMethodID);
      }
      else{
        this.loadingPay = false
        this.toastr.errorToastr("Please select Payment Method"); 
      } 
    })
  }

  onCardChange(card:any,index:any){
      this.paymentMethodID = card
      this.isPaymentMethod = true
  }

  newCardPayment(){
    this.isPaymentMethod = false
    this.__getStripPaymentForm()
  }

  /* ::::::::::::::::::::::: donate donation to carbon click ::::::::::::::::::::::: */

  // saveCarbonClickCDonation(){
  //   let data = {
  //     "paymentReference": this.order,
  //     //"paymentProviderId": this.card_type,
  //     "paymentProvider": "FORI",
  //     "merchantCode": environment.MERCHANT_CODE,
  //     "payment": {
  //       "currency": "USD",
  //       "value": this.donation_amount
  //     },
  //     "emailAddress": this.customer_email,
  //     "billingCountry": "US"
  //   }
  //   this.aws.purchaseAmount(data).subscribe(response =>{
  //   });
  // }

  /* ::::::::::::::::::::::: end donate donation to carbon click ::::::::::::::::::::::: */

  onChange(error:any) {
    if (error) {
      if(error['error'] != undefined) {
        this.error = error['error']['message'];
      }
      else {
       this.error = null;
      }  
    } 
    this.cd.detectChanges();
  }

  updateAvailableStock(orderID:any){
    let data = {
      "order_id" : orderID
    }
    this.socket.emit('getProductAvailStock',data);
  }

 }
