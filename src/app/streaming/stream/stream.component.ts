import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Title} from "@angular/platform-browser";
import {io} from 'socket.io-client';
import {environment} from '../../../environments/environment';

//import { OwlOptions } from 'ngx-owl-carousel-o';
declare var document : any;
@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit, AfterViewChecked {
	userId :any = []
	broadcastData :any = []
	broadcastID :any = []
	sessionBroadcastID: any = []
	products:any = []
	shopifyProduct : any= [];
	id :any = [];
	quantity: any = [];
	product_data : any={};
	items: any={};
	localstorages:any = [];
	cart : any=[];
	selectedVariant: any
	selectedText: any
	selectColor = 1
	productIndex : any
	storePickup :any
	store_pickup_status :any
	broadcastStatus:any
	private socket : any
	socket_url: string = "";
	likes_data : any = [];
	flesh_record : any = [];
	meeting : any;
	image_url : string = "";
	href: string = "";
	follower:any = {}
	following:any
	submitted = false;
	hashtagValue :any = []
	promoVideo:any
	
	variantValues:any = [];
  	variant:any = []
  	afterChangeVartiant = true
  	selectedOption:any
  	cart_variant:any
  	variant_Onprice:any = []
  	variant_Offprice:any = []
  	variant_value =  false
  	cartOptions:any
  	productAdded:any = false
  	productList:any = []
	  variants_stock : any = [];
	  user_type:any
	  showEmojiPicker = false;
	  sets = [
		'native',
		'google',
		'twitter',
		'facebook',
		'emojione',
		'apple',
		'messenger'
	  ]
	  set = 'twitter';
	  message = '';
	  startPos : number = 0;
	  endPos : number = 0;
	  images_arr :any = [];

  	constructor(
	  	private routers: ActivatedRoute,
		private router: Router,
		private dataService: DataService,
		public toastr : ToastrManager,
		private titleService:Title,
		private cd: ChangeDetectorRef

  	){
  		this.titleService.setTitle("Broadcast");
		this.socket_url = environment.socket_url;
		this.image_url = environment.image_url;
		this.socket = io(this.socket_url);
		this.dataService.shareSocket.subscribe(response =>{
			if(response){
				this.broadcastID = response;
				this.liveSales();
				this.getAllUser();
			}
		});
		this.dataService.shareEmptyImg.subscribe(response =>{
			if(response){
				this.images_arr = [];
			}
		})
  }

	ngOnInit(){
		this.href =window.location.href
	  	//this.userId = localStorage.getItem("user_id")
		if(localStorage.getItem("data")){
			let data = this.dataService.decryptData(localStorage.getItem("data"));
			this.userId = data[0]['user_id'];
			this.user_type = data[0]['user_type'];
		}
	  	const body = document.getElementsByTagName('body')[0];
     	body.classList.add('stream-no-scroll');

		this.meeting = new URL(window.location.href).searchParams.get('m');

	  	this.routers.paramMap.subscribe((params: ParamMap) => {
		    this.broadcastID = params.get('id');
		}); 

			this.getBroadcastDetails();
		  this.__getCart();  
			this.liveSales();
			this.getAllUser();
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
	  	//console.log(event.target.value)
	  	this.afterChangeVartiant = false
	  	this.variantValues[variantName] = event.target.value;

	  	this.get_variant(product, index)

	  }

  	getBroadcastDetails() {
  		this.dataService.publicBroadcastingDetails(this.broadcastID,this.userId).subscribe(response => {
	      console.log(response,"broadcast Information")
	     this.broadcastData = response['body'];
	     this.broadcastStatus =  this.broadcastData['broadcast_status']
	     if(this.broadcastData['promo_video']) {
	     	this.promoVideo = this.image_url+this.broadcastData['promo_video']
	     }
	     this.products  = response['body']['productList']
	     this.productList = response['body']['productList']
	     this.productAdded = new Array( this.productList.length)
	     this.storePickup  = response['body']['pickup_address']
	     this.store_pickup_status = response['body']['pickupStore']
	     this.following = response['body']['is_follow']
	     this.selectedVariant = "noValue"
	      let data = this.broadcastData['channelTag']
	      console.log(this.broadcastData['channelTag'])
	       if( data != '') {
	       		this.hashtagValue = data.split(',');
	       }

	    });
  	}

  	__saveCartData(){
			let data = {
				'user_id' : this.userId,
				'broadcast_id' : this.broadcastID,
				'page' : "stream",
			}
			this.dataService.saveCartLog(data).subscribe(response =>{
				if(response['success'] == true){}else{}
			},error =>{
				//console.log(error);
			})
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

  	__getCart()
  	{
  		if(localStorage.getItem('cart')){
          this.localstorages = JSON.parse(localStorage.getItem('cart')|| '{}');
        }  
  	}

  	/*================Get Variants Data==============*/

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
		//console.log(this.cartOptions)
		let values = Object.values(result)
		let res = values.reverse(); 
		let variantCobination = res.join(" / ")
		var indexing =-1
		if(this.productList[index].variants){
		  indexing =  this.productList[index].variants.findIndex(function(pro:any) {
	      return pro['title'] == variantCobination
	    })
		}


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

  	/*================ Add To cart ==================*/
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
			console.log(obj,"--------")

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
			console.log('Pushed first Item: ', itemsInCart);
			this.toastr.successToastr('Added Product into cart successfully');
			this.dataService.sendCartCount("cartCount");
			}else{
				localStorage.setItem('broadcast', this.broadcastID);
				localStorage.setItem('storePickup', JSON.stringify(this.storePickup));
				let local_storage = JSON.parse(localStorage.getItem('cart')|| '{}');
				//console.log("LOCAL STORAGE HAS ITEMS",JSON.parse(localStorage.getItem('cart')));
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
		 	//this.variantValues = []
		// 	this.selectedVariant = "noValue"
		// }
	}
	getAllLikes(){
		this.socket.emit('likesIt',{"broadcast_id":this.broadcastID,"user_id" : this.userId});
		this.socket.on('Getlikes',(likes:any) => {
			this.likes_data = likes;
		});
	}

	liveSales(){
		//console.log("liveSales --",this.broadcastID);
		this.socket.emit('getFlashProduct',{"broadcast_id":this.broadcastID});
		this.socket.on('ShowFlashProduct',(response:any) => {
				//console.log('ShowFlashProduct --', response);
				this.flesh_record = response;
			});
	}
	
	getAllUser(){
		console.log("working --",this.broadcastID);
		this.flesh_record = [];
        this.socket.on('updateUsers',(response:any) => {
			this.socket.emit('getFlashProduct', {"broadcast_id":this.broadcastID});
			this.socket.on('ShowFlashProduct',(response:any) => {
				//console.log('ShowFlashProduct --', response);

				this.flesh_record = response;
			});
		  //this.socket.disconnect();
        });
        this.socket.on('updateLike',(response:any) => {
        	this.socket.on('getTextonScreen',(text:any) => {
		      //console.log('getTextonScreen -- ',text);
		    });
			this.socket.emit('getLikesCount',{"broadcast_id":this.broadcastID,"user_id" : this.userId});
			this.socket.on('returnLikesCount',(likes:any) => {
				this.likes_data = likes.likes;
			});
        });
    }

	copyUrl(inputElement:any){
		inputElement.select();
	  document.execCommand('copy');
	  inputElement.setSelectionRange(0, 0);
	}

	goBack(){
		this.router.navigate(['/view-stream/'+this.broadcastID]);
	}
	expandWindow(){

    const toggleList = document.getElementById('action-expand');
    if (toggleList) {  
       toggleList.style.display = 'none';   
    }
    const actionCompress = document.getElementById('action-compress');
    if (actionCompress) {  
       actionCompress.style.display = 'block';   
    }
    const toggleListcontainer = document.getElementById('right-action-toggle');
    if (toggleListcontainer) {  
      toggleListcontainer.classList.toggle('close-right-sec'); 
    } 
    const lefttoggleListcontainer = document.getElementById('left-action-toggle');
    if (lefttoggleListcontainer) {  
      lefttoggleListcontainer.classList.toggle('fullscreen-left-sec'); 
    } 
  }
  compressWindow(){

    const toggleList = document.getElementById('action-expand');
    if (toggleList) {  
       toggleList.style.display = 'block';   
    }
    const actionCompress = document.getElementById('action-compress');
    if (actionCompress) {  
       actionCompress.style.display = 'none';   
    }
    const toggleListcontainer = document.getElementById('right-action-toggle');
    if (toggleListcontainer) {  
      toggleListcontainer.classList.toggle('close-right-sec'); 
    } 
    const lefttoggleListcontainer = document.getElementById('left-action-toggle');
    if (lefttoggleListcontainer) {  
      lefttoggleListcontainer.classList.toggle('fullscreen-left-sec'); 
    } 
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

	toggleEmojiPicker() {
		this.showEmojiPicker = !this.showEmojiPicker;
	}

	addEmoji(areaId:any, event:any){
		const { message } = this;
		const emoji = `${message}${event.emoji.native}`;
		var txtarea = document.getElementById(areaId) as HTMLInputElement;
		if (!txtarea) {
			return;
		}
		var scrollPos = txtarea.scrollTop;
		var strPos = 0;
		var br = ((txtarea.selectionStart || txtarea.selectionStart == 0) ? "ff" : (document.selection ? "ie" : false));
		if (br == "ie") {
			txtarea.focus();
			var range = document.selection.createRange();
			range.moveStart('character', -txtarea.value.length);
			strPos = range.text.length;
		} else if (br == "ff") {
			if(txtarea.selectionStart)
			strPos = txtarea.selectionStart;
		}
		var front = (txtarea.value).substring(0, strPos);
		var back = (txtarea.value).substring(strPos, txtarea.value.length);
		txtarea.value = front + emoji + back;
		strPos = strPos + emoji.length;
		if (br == "ie") {
			txtarea.focus();
			var ieRange = document.selection.createRange();
			ieRange.moveStart('character', -txtarea.value.length);
			ieRange.moveStart('character', strPos);
			ieRange.moveEnd('character', 0);
			ieRange.select();
		} else if (br == "ff") {
			txtarea.selectionStart = strPos;
			txtarea.selectionEnd = strPos;
			txtarea.focus();
		}
		txtarea.scrollTop = scrollPos;
	}

	addImage(url:any){
		console.log('add Image'+url);
		// let src = 'assets/chat-stickers/party-popper.svg';
		let src = url;
		let obj : any = {};
		obj.url = src;
		this.images_arr.push(obj);
		this.dataService.sendImgtext(this.images_arr);

		this.closedropmenu('openQualitysettings');

		let element:HTMLElement = document.getElementById('send-messageBtn') as HTMLElement;
		element.click();
	}

	deleteImg(index:any){
		this.images_arr.splice(this.images_arr.indexOf(index), 1);
		this.dataService.sendImgtext(this.images_arr);
	}
	 closedropmenu(divID:any):void{
    console.log('close-----',divID)
    var screenagendaopen=document.getElementById(divID);
    if (screenagendaopen) {
      screenagendaopen.classList.remove('show');
    }
  }

  opendropmenu(divID:any):void{
    var closeDivID=document.getElementById(divID);
      if (closeDivID) {  
        closeDivID.classList.toggle('show');   
      }
    // if (closeDivID) {
    //   console.log('show added')
    //   closeDivID.classList.add("show");
    // }
  }

}
