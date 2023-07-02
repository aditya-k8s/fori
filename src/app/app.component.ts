import { Component,OnInit } from '@angular/core';
import { MessagingService } from './fcm-messaging/messaging.service';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  userId :any
  title = 'lash';
  date:any
  itemStr:any
  message : any;
   constructor(
      private messagingService: MessagingService,
      private dataService: DataService,
      private router: Router,
      private location: Location,
    ) 
   {
    this.dataService.shareFCM.subscribe(response=>{
      if(response){
        this.messagingService.requestPermission();
        this.messagingService.receiveMessage();
        this.message = this.messagingService.currentMessage;
      }
    });
    let path = this.location.path();
    if(localStorage.getItem('user_type') != undefined){
      let type = localStorage.getItem('user_type');
      // if(type == '0'){
      //   if(path == '/account/orders' || path == '/account/address' ||
      //   path == '/account/follow-list' || path == '/account/recommend'){
      //     // nothing happens
      //   }else{
      //     this.router.navigate(['/invalid-url']);
      //   }
      // }

      // if(type == '1'){
      //   if(path == '/inventory' || path =='/create-store' || path == '/account/sales-dashboard' || path == '/account/shipping-fee' ||
      //   path == '/account/retailer-fee' || path == '/account/sales' || path == '/account/payment' ||
      //   path == '/account/live-session' || path == '/account/store' || path == '/account/my-products'){
      //     // nothing happens
      //   }else{
      //     this.router.navigate(['/invalid-url']);
      //   }
      // }

      // if(type == '3'){
      //   if(path == '/account/influencer-Sale-report' || path == '/account/recent-live-events' ||
      //   path == '/account/bank-info' || path == '/influencer' || path == '/influencer-profile' ||
      //   path == '/account/testimonials/list'){
      //     // nothing happens
      //   }else{
      //     this.router.navigate(['/invalid-url']);
      //   }
      // }

      if(type == '0' || type == '3'){
        if(path == '/inventory' || path == '/account/store'|| path == '/create/stream' || path == '/create/product'|| path == 'edit-stream'|| path == '/account/sales-dashboard'|| path == '/account/shipping-fee'|| path == '/account/retailer-fee'|| path == '/account/sales'|| path == '/account/payment'|| path == '/account/live-session'|| path == '/account/my-products'){
          this.router.navigate(['/invalid-url']);
        }
      }

      if(type == '0' || type == '1'){
        if( path == '/account/influencer-Sale-report'|| path == '/account/bank-info' || path == '/influencer'|| path == 'influencer-profile'){
          this.router.navigate(['/invalid-url']);
        }
      }

      if(type == '1'|| type == '3'){
        if(path == '/cart' || path == '/checkout'){
          this.router.navigate(['/invalid-url']);
        }
      }

      if(type == '0'){
        if(path == '/guid'){
          this.router.navigate(['/invalid-url']);
        }
      }
    }
	}
    ngOnInit(){
      this.itemStr = localStorage.getItem("startTime")
      if (this.itemStr) {
        let afteroneday = Number(this.itemStr) + Number(86400000);
        const now = new Date()
        if (now.getTime() > afteroneday) {
          localStorage.clear();
          
        }
      }

      if(localStorage.getItem("data")){
        this.messagingService.requestPermission();
        this.messagingService.receiveMessage();
        this.message = this.messagingService.currentMessage;
      }
      
      // if(localStorage.getItem("user_id")){
      //   this.messagingService.requestPermission();
      //   this.messagingService.receiveMessage();
      //   this.message = this.messagingService.currentMessage;
      // }

      // this.messagingService.requestPermission();
      // this.messagingService.receiveMessage();
      // this.message = this.messagingService.currentMessage;
  }

  onActivate() {
    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }

}
