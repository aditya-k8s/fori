import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../environments/environment';
import {Title} from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";
import {io} from 'socket.io-client';
// import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-view-stream',
  templateUrl: './view-stream.component.html',
  styleUrls: ['./view-stream.component.css']
})
export class ViewStreamComponent implements OnInit, AfterViewChecked {
	userId :any = []
	broadcastData :any = []
	productList:any = []
	productAdded:any = false
	broadcastID :any = []
	sessionBroadcastID: any = []
	products:any = []
	shopifyProduct : any= [];
	id :any = [];
	quantity: any = [];
	product_data : any={};
	items: any;
	localstorages:any = [];
	cart : any=[];
	selectedVariant: any
	selectedText:any
	selectColor = 1
	productIndex : any
	storePickup :any
	follower:any = {}
	following:any
	submitted = false;
	image_url= ''
	timestamp= 624929
	hashtagValue :any = []
	href: string = "";
	copied:any
	currentDateTimestamp :any
	liveTimeTimestamp:any
	user_type:any
	streamingList :any = []
	url:any
	options: any = []
	variantValues:any = [];
	variant:any = []
	afterChangeVartiant = true
	selectedOption:any
	cart_variant:any
	variant_Onprice:any = []
	variant_Offprice:any = []
	variant_value =  false
	cartOptions:any
	broadcastStatus:any

	private socket : any;
	socket_url: string = "";
	avaStock_data : any = [];
	variants_stock : any = [];
  constructor(
	private routers: ActivatedRoute,
	private router: Router,
	private dataService: DataService,
	public toastr : ToastrManager,
	private titleService:Title,
	private ngxService: NgxUiLoaderService,
	//private _pushNotifications: PushNotificationsService
	private cd: ChangeDetectorRef
	){ 
  	this.titleService.setTitle("View Stream");
	  this.image_url = environment.image_url;
	 // this._pushNotifications.requestPermission();
	 this.socket_url = environment.socket_url;
  	this.socket = io(this.socket_url);
	}

  ngOnInit(){
		if(localStorage.getItem("data")){
	        let data = this.dataService.decryptData(localStorage.getItem("data"));
	        this.userId = data[0]['user_id'];
	        this.user_type = data[0]['user_type'];
	  }

	  this.routers.paramMap.subscribe((params: ParamMap) => {
		    this.broadcastID = params.get('stream_id');
		});

    this.href = window.location.href
    this.getBroadcastDetails();
    this.getLiveUpcomingBroadcast();
		this.getAvailableStock();	
  }

  	ngAfterViewChecked() {
		// it must be last line
		this.cd.detectChanges();
 	}

  convert_to_jason(value:any,index:any){
  	let data = JSON.parse(value.value_array)
  	if(this.afterChangeVartiant) {
  		this.variantValues[index+'-'+value.name] =  data[0];
  	}
    return JSON.parse(value.value_array);
  }

  changeVariant(event:any,variantName:any,product:any,index:any){
  	this.afterChangeVartiant = false
  	this.variantValues[variantName] = event.target.value;
  	this.get_variant(product, index)
  }

  getLiveUpcomingBroadcast(){
  	this.dataService.getsteamingList().subscribe(response => {
       if(response['success'] == true){
          this.streamingList = response['body']
        }
    });
  }

  getBroadcastDetails() {
  	this.ngxService.start(); 
    this.dataService.publicBroadcastingContentDetails(this.broadcastID,this.userId).subscribe(response => {
    this.ngxService.stop();
    if(response['success'] == true){
	    this.broadcastData = response['body']
	    this.broadcastStatus =  this.broadcastData['broadcast_status']
	    this.productList = response['body']['productList']
	    this.productAdded = new Array( this.productList.length)
	    this.timestamp = this.broadcastData.timestamp
	    this.storePickup  = response['body']['pickup_address']
	    this.selectedVariant = "noValue"
	    this.following = response['body']['is_follow']

	   // this.variantValues[0]['color'] = this.productList[0].product_id_int
	    if(response['body']['promo_video'])
	    {
	    	this.url = response['body']['promo_video']; // this.image_url+response['body']['promo_video']
	    }
	     
	       let data = this.broadcastData['channelTag']
	       if( data != '') {
	       		this.hashtagValue = data.split(',');
	       }

	        const currentDate = new Date();
	        this.currentDateTimestamp = currentDate.getTime();
	        const liveTime = new Date(this.broadcastData.broadcast_time);
	        this.liveTimeTimestamp = liveTime.getTime();
		}

    });
  }

  copyUrl(inputElement:any){
  	this.copied = "Copied"
  	inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

    toggleFollowing(channel_ownerID :any,storeId: any){
      if(this.userId == null || this.userId == ''){
        this.router.navigate(['login'])
      }
       this.submitted = true;
       this.follower['user_id'] = channel_ownerID
       this.follower['follow_by_id'] =  this.userId
       this.follower['store_id'] = storeId

	    this.dataService.addEditfollower( this.follower).subscribe(response => {
	        if(response['error'])this.router.navigate(['login'])
	          if(response['success'] == true){
	            this.toastr.successToastr(response['message']);
	            this.following = response['body']['is_follow']
	            this.getBroadcastDetails();
	          }else{
	            this.toastr.errorToastr(response['message']['message']); 
	          }
	    }); 
    }

    get_variant(product:any, index: any){
    let result:any = [];
		for (const [key, value] of Object.entries(this.variantValues)) {
		 	if(key && key.includes(index)) {
				let keys:any = key.substring(key.indexOf("-") + 1)
			    result[keys] =value;
			 }
		}

		// Get sort value array
		this.cartOptions = result
		
		let values = Object.values(result)
		let res = values.reverse(); 
		let variantCobination = res.join(" / ")
	   var indexing =  this.productList[index].variants.findIndex(function(pro:any) {
            return pro['title'] == variantCobination
     })
	  

	    if(indexing != -1) {
	    	this.cart_variant = this.productList[index].variants[indexing]
	    	this.variant_Onprice[index] = this.cart_variant['on_air_price']
	    	this.variant_Offprice[index] = this.cart_variant['off_air_price']
	    	this.variant_value = true
	    	if(this.variant_Onprice[index] == '' || this.variant_Onprice[index] == 0){
	    		this.variant_Onprice[index] = product['on_air_price']
	    	}

	    	if(this.variant_Offprice[index] == '' || this.variant_Offprice[index] == 0){
	    		this.variant_Offprice[index] = product['off_air_price']
			}

			if(this.productList[index]['available_stock'] > 0){
				this.variants_stock[index] = this.cart_variant['available_inventoryQuantity'];
			}
	    }
	    else {
	    	this.variant_value = false
	    	this.cart_variant = ''
	    	this.variant_Onprice[index] = product['on_air_price']
	    	this.variant_Offprice[index] = product['off_air_price']
	    }

    }

    _addItemToCart(product:any, index: any) {

    	this.get_variant(product, index)
    	this.productAdded[index] = true
   		this.sessionBroadcastID = localStorage.getItem("broadcast")
	  	this.cart = localStorage.getItem('cart')
   		if(this.cart){
   			if(this.sessionBroadcastID != this.broadcastID){
				if(!confirm("Are you sure you want to delete the previous Broadcast's products")) {
					return;
				}
				else{
							localStorage.removeItem("amount_donated");
							localStorage.removeItem('cart');
	       			localStorage.removeItem('broadcast');
	       			localStorage.removeItem('storePickup');
				}
			}

		}

		this.productIndex = index
		this.__saveCartData();
		let local_storage;
		let itemsInCart = []
		let cart = [];
		let item=[];

		const obj = Object.assign({}, this.cartOptions);
		this.items = {
			product: product['product_id_int'],
			quantity: 1,
			product_title: product['product_title'],
			image_url: product['image_url'],
			variant_id : this.cart_variant['product_variant_id'],
			variant_options : obj,
			on_air_price: this.variant_Onprice[index],
			off_air_price: this.variant_Offprice[index],
			currencyCode: product['currencyCode'],
			price : this.broadcastData['broadcast_status'] == "1" ? this.variant_Onprice[index] : this.variant_Offprice[index],
			merchant_id : product['user_id'],
			broadcastID : this.broadcastStatus
		}

		if(localStorage.getItem('cart')  == null){
		local_storage =[];
		itemsInCart.push(this.items);
		localStorage.setItem('cart', JSON.stringify(itemsInCart));
		
		localStorage.setItem('broadcast', this.broadcastID);
		localStorage.setItem('storePickup', JSON.stringify(this.storePickup));
		this.toastr.successToastr('Added Product into cart successfully');
		this.dataService.sendCartCount("cartCount");
		}else
		{
			localStorage.setItem('broadcast', this.broadcastID);
			localStorage.setItem('storePickup', JSON.stringify(this.storePickup));
			let local_storage = JSON.parse(localStorage.getItem('cart')|| '{}');
			for(var i in local_storage)
			{
				if(this.items.product == local_storage[i].product)
				{
					if(this.items.variant_id == local_storage[i].variant_id)
					{
						local_storage[i].quantity += 1;
						this.items=null;
						break; 
					} 
				}
			}
			
			this.toastr.successToastr('Added Product into cart successfully');

			if(this.items){
				itemsInCart.push(this.items);
			}

			local_storage.forEach(function (item:any){
			itemsInCart.push(item);
			})

			localStorage.setItem('cart', JSON.stringify(itemsInCart));
			this.dataService.sendCartCount("cartCount");
	 	}
	 	this.cart_variant = []

	}

	__saveCartData(){
		let data = {
			'user_id' : this.userId,
			'broadcast_id' : this.broadcastID,
			'page' : "view-stream",
		}
		this.dataService.saveCartLog(data).subscribe(response =>{
			if(response['success'] == true){}else{}
		},error =>{
			console.log(error);
		})
  	}

	sendPushNotification(){
		let data = {
			"user_id" : this.userId,
			"send_to" : this.broadcastData['user_id'],
			"msg_type" : "newjoin"
		}
		this.dataService.sendPushNitification(data).subscribe(response =>{
			if(response['success'] == true){}else{}
		},error =>{
			console.log(error);
		})
	}

	getAvailableStock(){
		this.socket.on('updateAvailProductStock',(res:any) => {
			this.productList.forEach((element:any) => {
				if(res['productList'] != "" && res['productList'] != null){
					res['productList'].forEach((ele:any) =>{
						if(element['product_id'] == ele['product_id']){
							element['available_stock'] = ele['available_stock'];
							if(element['variants']){
								element['variants']['available_inventoryQuantity'] = ele['variants']['available_inventoryQuantity'];
								element['variants']['inventoryQuantity'] = ele['variants']['inventoryQuantity']
							}
						}
					});
				};
			});
		});
	}

}
