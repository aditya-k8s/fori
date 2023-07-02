import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { DataService } from '../data.service';
import { SocialAuthService } from "angularx-social-login"; 
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { MessagingService } from '../fcm-messaging/messaging.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	userId :any;
	store:any
  user_type:any
  localstorages:any = [];
  url:any
  totalamount = 0;
  isDeleteModal : boolean = false;
  sel_product_id : any = 0;
  shopping_cart:any=[];
  broadcastID:any
  beforeDiscount=0;
  noOfItems = 0 
  isNavBarActive : boolean = false;
  //profileHover = false
  constructor(
    private ngxService: NgxUiLoaderService,
    private dataService: DataService,
    private authService: SocialAuthService,
    private routers: ActivatedRoute,
    private router: Router,

    private messagingService: MessagingService,
    ) {
      this.dataService.shareCartCount.subscribe(response=>{
        if(response){
          this.totalamount = 0
          this.beforeDiscount = 0
          this.noOfItems = 0
          if(localStorage.getItem('cart')){
            this.localstorages = JSON.parse(localStorage.getItem('cart')|| '{}'); 
            for (var i = 0; i < this.localstorages.length; i++) {
              if (this.localstorages[i].price) {
                //this.totalamount = 0;
                this.totalamount += this.localstorages[i].price * this.localstorages[i].quantity;
                this.beforeDiscount += this.localstorages[i].off_air_price * this.localstorages[i].quantity;
                this.noOfItems += this.localstorages[i].quantity
              }

            }          
          }
        }
      });
    }

  ngOnInit(){
    this.get_items()
    this.getTotal()

    const lastUrlSegment = this.router.url.split('?')[0].split('/').pop()
    if(lastUrlSegment != "inventory"){
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove("no-scroll");
        body.classList.remove("stream-no-scroll");
    }
    if(localStorage.getItem("data")){
      let data = this.dataService.decryptData(localStorage.getItem("data"));
      this.store = data[0]['shopifyverify'];
      this.userId = data[0]['user_id'];
      this.user_type = data[0]['user_type'];
    }

  	// this.store  = localStorage.getItem('shopify_verify')
  	// this.userId = localStorage.getItem("user_id")
    // this.user_type = localStorage.getItem("user_type")
    this.getUserDetails();


    if(localStorage.getItem('cart')){
      this.localstorages = JSON.parse(localStorage.getItem('cart')|| '{}');
    }

    if(localStorage.getItem('broadcast')){
      this.broadcastID = localStorage.getItem('broadcast')            
    }

    // this.ngxService.start(); 
    // setTimeout(() => {
    //   this.ngxService.stop();
    // }, 2000);


  }

  get_items(){
    if(localStorage.getItem('cart')){
      this.localstorages = JSON.parse(localStorage.getItem('cart')|| '{}');
    }
  }
  getTotal(){
    this.totalamount = 0
    this.beforeDiscount = 0
      for (var i = 0; i < this.localstorages.length; i++) {
        if (this.localstorages[i].price) {

          this.totalamount += this.localstorages[i].price * this.localstorages[i].quantity;
          if(this.localstorages[i].broadcastID == 1){
            this.beforeDiscount += this.localstorages[i].off_air_price * this.localstorages[i].quantity;
          } else {
            this.beforeDiscount += this.localstorages[i].price * this.localstorages[i].quantity;
          }
          this.noOfItems += this.localstorages[i].quantity
        }

      }
    //return this.totalamount;
  }

  _removeProductsToCart(product_id:any){
    this.sel_product_id = product_id;
    this.isDeleteModal = true;
    return;
  }

  closeDel(){
    this.isDeleteModal = false;
  }

  yesDelete(){
    let index;
    this.shopping_cart = JSON.parse(localStorage.getItem('cart') || '{}');
    for(let i in this.shopping_cart)
    {
      if(this.sel_product_id == this.shopping_cart[i].product)
      {
        index=i;
      }
    }

    this.shopping_cart.splice(index,1);
    localStorage.setItem('cart', JSON.stringify(this.shopping_cart));
    this.get_items();
    this.getTotal();
    this.closeDel();

    this.dataService.sendCartCount("cartCount");
  }

  getUserDetails(){
    this.dataService.getUserDetails(this.userId).subscribe(response => {
      if(response['success'] == true){
        this.url =  response['data'][0]['profile_pic'];

      }})
  }
  logout(){

    if(localStorage.getItem("social") == "FACEBOOK" || localStorage.getItem("social") == "GOOGLE"){
        this.authService.signOut().then(res => { console.log(res)});
    }
    localStorage.clear();
    this.router.navigate(['login']);
  }

  toggleNavBar(){
    this.isNavBarActive = !this.isNavBarActive;
  }
}
