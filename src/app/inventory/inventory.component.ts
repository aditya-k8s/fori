import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {DataTablesModule} from 'angular-datatables';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../environments/environment';
import { NgxUiLoaderService } from "ngx-ui-loader";
import {Title} from "@angular/platform-browser";
import { FormControl,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  shopifyProduct : any =[]
  dtOptions: any = {};
  userId :any = []
  streamingList :any = []
  image_url = ''
  product_data : any = {}
  broadcast_data : any = {}
  product_content : any
  broadcast_content : any
  loading = false
  loading1 = false
  start = 0;
  limit = 7;
  start1 = 0;
  limit1 = 7;
  store_data : any = [];
  slideOpen = false
  selectedStore : any
  channel_id : any
  storeData :any = {}
  userName:any
  paramArr:any={}
  influencerResults: any[] = [];
  quryField: FormControl = new FormControl();
  searchStreaminID:any
  influencerProfileData : any = []
  totalProduct = false
  totalBroadcast = false
  constructor(
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private dataService: DataService,
    public toastr : ToastrManager,
    private titleService:Title,
  ) { 
  this.image_url = environment.image_url;
  this.titleService.setTitle("Inventory");
  }

  ngOnInit(){
    this.quryField.valueChanges.subscribe( quryField =>  this.dataService.searchInfluencerList(quryField)
      .subscribe(response => {    
        this.influencerResults = response['body'];
      })
    );

    if(localStorage.getItem("data")){
      let data = this.dataService.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
      this.userName = data[0]['username'];
    }else{
      setTimeout(() => {
       this.router.navigate(['/login'])
      },2000);
    }

    // if(localStorage.getItem("user_id")){
    //   this.userId =localStorage.getItem("user_id");
    //   this.userName=localStorage.getItem("user_name");

    // }else{
    //    setTimeout(() => {
    //     this.router.navigate(['/login'])
    //    },2000);
    // }

    this.getActivatedStore()
    //this.getSearchInfluencer()

    setTimeout(()=>{ 
      this.broadcast_content = "You haven't any Broadcast Channel";
      this.product_content = "You haven't any product";
    }, 6000);

  }

  getstreamingforInfluencer(id:any, requestSentTo:any) {
    this.searchStreaminID = id
    this.influencerProfileData = []
    if(requestSentTo) {
      this.dataService.getUserDetails(requestSentTo).subscribe(response => {
        if(response['success'] == true){
          this.influencerProfileData = response['data'][0]
        }
      });
    }
  }

  cancelInvite(requestId:any){
    this.loading = true;
    this.dataService.merchantCancelInfluRequest(requestId).subscribe(response => {
      this.loading = false;
      if(response['success'] == true){
        this.toastr.successToastr(response['message']);
      }
      else {
        this.toastr.errorToastr(response['message']);
      }
    });
  }

  sendInvite(influeencerID:any) {
    this.loading = true;

      let data = {
        'influencer_id' : influeencerID,
        'broadcast_id' : this.searchStreaminID,
        'user_id' : this.userId
      }

    this.dataService.sendInfluencerRequest(data).subscribe(response => {
      this.loading = false;
      if(response['success'] == true){
        this.toastr.successToastr(response['message']);
      }
      else {
        this.toastr.errorToastr(response['message']);
      }
    });
  }

  closeSearch(){
    this.influencerResults = [];
    this.quryField.setValue('');
  }

  /* ********* Get store Published List ********* */

  getActivatedStore(){
  this.ngxService.start(); 
    this.dataService.getPublishedStore().subscribe(response =>{
      this.ngxService.stop(); 
      this.loading = false;
      if(response['success'] == true && response['body'].length > 0){
        this.store_data = response['body'];

        // var index = this.store_data.findIndex(function(pro:any) {
        //     return pro['isActive'] == 1
        // })
        //this.channel_id = this.store_data[index]['id']
        this.channel_id = this.store_data[0]['id']
        this.__getMyStoreProduct(this.channel_id)
        this.__broadcastList(this.channel_id,this.start1,this.limit1)
      
      }
      else {
        this.toastr.errorToastr("Please setup your shopify store first.");
        this.router.navigate(['/create-store'])
      }
    },error =>{console.log(error);})
  }

  /* ********* Get store broadcast List ********* */

  __broadcastList(channelId: any,start:any,limit:any ) {
      
    this.dataService.getmyStreamingChannel(start,limit,channelId).subscribe(response => {
      this.loading1 = false
        this.ngxService.stop();
       if(response['success'] == true){
        this.totalBroadcast = response['body']['totalRecords']
          if(start == 0){
            this.streamingList = response['body']['rows']
          }
          else {
            this.streamingList = this.streamingList.concat(response['body']['rows']);
           // this.toastr.successToastr(response['message']);
          } 
        }
        else {
          this.toastr.errorToastr(response['message']);
        }
    });
  }

  /* ********* Get store products List ********* */

  __getMyStoreProduct(storeId:any){

    this.storeData['store_id'] = storeId
    this.storeData['user_id'] = this.userId
    this.dataService.getProducts(this.start,this.limit).subscribe(response => {
        this.loading=false
        this.ngxService.stop();
        if(response['success'] == true){
          this.totalProduct = response['body']['totalRecords']
          if(this.start == 0){
            this.shopifyProduct = response['body']['rows']
          }
          else {
            this.shopifyProduct = this.shopifyProduct.concat(response['body']['rows']);
            //this.toastr.successToastr(response['message']);
          } 
        }
        else
        {
           this.toastr.errorToastr(response['message']);
        }
    });
  }

  /* *********** Load More products *********** */

  view_products(start:any,limit:any){
    this.ngxService.start(); 
    this.loading = true;
    this.start = start+this.start;
    this.limit = limit;
    this.__getMyStoreProduct(this.channel_id)
  }

  view_broadcast(start:any,limit:any) {
    this.ngxService.start(); 
    this.loading1 = true;
    this.start1 = start+this.start1;
    this.limit1 = limit;
    this.__broadcastList(this.channel_id,this.start1,this.limit1)
  }

  /* ********* Delete single products********* */

  delete_product(product_id:any,index:any,product_name:any) {
    this.ngxService.start(); 
    if(confirm("Are you sure to delete "+product_name)) {
    this.product_data['user_id'] = this.userId;
    this.product_data['product_id'] = product_id;

    this.dataService.deleteProduct(this.product_data).subscribe(response => {
      this.ngxService.stop(); 
       if(response['success'] == true){
          this.shopifyProduct.splice(index, 1);
        }
    });
   }
  }

  /* ********* Delete single Broadcast ********* */

  delete_streaming_channel(broadcast_id:any,index:any,channel:any) {
    this.ngxService.start(); 
    if(confirm("Are you sure to delete "+channel)) {
       this.broadcast_data['user_id'] = this.userId;
      this.broadcast_data['channel_id'] = broadcast_id;
      this.dataService.deleteStreamingChannel(this.broadcast_data).subscribe(response => {
        this.ngxService.stop(); 
         if(response['success'] == true){
              this.streamingList.splice(index, 1);
          }
      });
    }
  }

  /* ********* Toggle slider for store list ********* */

  __toggleStoreSection() {
     const body = document.getElementsByTagName('body')[0];
     body.classList.add('no-scroll');
     this.slideOpen = true
  }

  /* ********* Close Toggle slider ********* */

  __closeStoreSection() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove("no-scroll");
    this.slideOpen = false
  }

  /* ********** Change or select store ********** */

  // __selectStore(index:any, channelId :any) {
  //   this.ngxService.start(); 
  //   this.selectedStore = index
  //   this.channel_id = channelId
  //   this.__getMyStoreProduct(this.channel_id)
  //   this.__broadcastList(this.channel_id)
  // }
  getBroadcastName(title:any,id:any){

    return title.replace(/ |@|$|~|"|'|{|}|:|;|,|!/gi, "-")+'_'+id;
    
  }
  encryptedData(s:any,u:any,b:any){
    // this.paramArr['s'] = this.getBroadcastName(s,b);
    // this.paramArr['u'] = u;
    // this.paramArr['b'] = b;
    // return this.dataService.encryptData(this.paramArr);
    return this.getBroadcastName(s,b);
  }
}