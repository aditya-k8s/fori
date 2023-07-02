import { Injectable, OnInit } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Subject } from "rxjs";
declare var CryptoJS : any;
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit  {
  base_url: string = "";
  secureApi = '';
  secret_key: string = "";
  token : any;
  userId : any
  httpOption: any
  //token = localStorage.getItem('token');

  constructor(private http: HttpClient) 
  { 
    this.base_url = environment.base_url;
    this.secureApi = environment.secureApi;
    this.secret_key = environment.secret_key;
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
  }

  ngOnInit() {
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

  }

  shareCartCount = new Subject<any>();
  shareFCM = new Subject<any>();
  shareSocket = new Subject<any>();
  shareNotification = new Subject<any>();
  shareImgText = new Subject<any>();
  shareEmptyImg = new Subject<any>();

  sendCartCount(data : any){
    this.shareCartCount.next(data);
  }

  sendFCM(data : any){
    this.shareFCM.next(data);
  }

  sendSocket(data : any){
    this.shareSocket.next(data);
  }

  sendNotification(data : any){
    this.shareNotification.next(data);
  }

  sendImgtext(data:any){
    this.shareImgText.next(data);
  }

  sendEmptyImg(data:any){
    this.shareEmptyImg.next(data);
  }

  encryptData(data : any) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secret_key).toString();
  }
 decryptData(data : any) {
     return JSON.parse( CryptoJS.AES.decrypt(data, this.secret_key).toString(CryptoJS.enc.Utf8));

  }
  /* Register User*/
  register(input_data:any)
  {
    return this.http.post(this.base_url+'signup/',input_data)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  /* Forgot Password */
  forgotPassword(input_data:any)
  {
    return this.http.post(this.base_url+'forgotPassword/',input_data)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  /* Change Password */
  resetPassword(input_data:any)
  {
    return this.http.post(this.base_url+'resetPassword/',input_data)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  /* Create Channel*/
  createChannel(input_data:any)
  {
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'createChannel/',input_data,httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  /* Get user's channel*/
  getUserChannel(userId:any)
  {
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.get(this.secureApi+'getChanneldetail/'+userId,httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

   /* Get user's upcoming broadcast sessions*/
  getupcomingStreaming(start:any,limit:any)
  {
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.get(this.secureApi+'getupcomingStreaming/'+this.userId+'/'+start+'/'+limit,httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  /* Get Influencer accepted broadcast*/
  getInfluencerStreaming(start:any,limit:any)
  {
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.get(this.secureApi+'getInfluencerStreaming/'+this.userId+'/'+start+'/'+limit,httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

     /* Get user's stored sessions*/
  getStoredStreaming(start:any,limit:any)
  {
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.get(this.secureApi+'getStoredStreaming/'+this.userId+'/'+start+'/'+limit,httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }



  /* Upload channel logo*/
  uploadChanelLogo(input_data:any)
  {
    return this.http.post(this.base_url+'uploadchanelLogo/',input_data)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

    // login(input_data:any)
    // {
    //   return this.http.post(this.base_url+'login/',input_data)
      // .pipe(
      //     map((response:Response)=>{const data = response;return data;}),
      //     catchError((error: Error) => {const data = error;return data;})
      // )
    //}

    /** Login User **/
    login(input_data:any){
      return this.http.post(this.base_url+'login/',input_data)
      .pipe(
        map((response: any) => {const data = response;return data;}),
        catchError((error: any) => {const data = error;return data;})
      )
    }


// register(input_data:any) {
//   console.log(this.base_url);
//         return this.http.post('signup/',input_data);
//         .map((response:Response)=>{const data = response.json();return data;})
//         .catch((error:Error) => {console.log(error);return Observable.throw(error);});
//     }

  /* Get Country list*/
  getCountry()
  {

    return this.http.get(this.base_url+'country/')
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get States list*/
  state(countryID:any)
  {

    return this.http.get(this.base_url+'state/'+countryID)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

    /* Get user's channel logo*/
  updateUserProfile(input_data:any)
  {
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi+'updatePersonalDetail',input_data,httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Change Profile Pic*/
  updateProfilePic(input_data:any)
  {
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.base_url+'changeProfilePic/',input_data).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get Product Category*/
  getCategory()
  {
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.get(this.secureApi+'getCategory/'+this.userId,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get Sub Product Category*/
  getSubCategory()
  {
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.get(this.secureApi+'createSubcategory/',httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Create Product*/
  createProduct(input_data:any)
  {
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'createProduct',input_data,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
   }

  /* Get Country list*/
  getUserDetails(userID:any)
  {
    //this.userId = localStorage.getItem("user_id")
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'user/'+userID,httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Verify Shopify Details*/
  verifyShopifyAuth(input_data:any)
  {
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'verifyShopifyAuth',input_data,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
   }

     /* update Shopify Details*/
  updateShopifyAuth(input_data:any)
  {
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'updateShopifyAuth',input_data,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
   }

  /* Verify Shopify Deatils*/
  searchProductFromShopify(input_data:any)
  {
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi+"searchProduct",input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
   }

  /* Add Shopify Products*/
  saveShopifyProduct(input_data:any)
  {
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+"saveShopifyProduct",input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
   }

  /* Get products List*/
  getProducts(start:any,limit:any){
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'getMyProduct/'+start+'/'+limit+'',{'user_id' : this.userId},httpOption).pipe(
      map((response: any) => {console.log(response);const data = response;return data;}),
      catchError((error: any) => {console.log(error);return error;}))
 
  }

  /* Get store products*/
  getMyStoreProduct(start:any,limit:any,inputData:any){
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'getMyStoreProduct/'+start+'/'+limit+'',inputData,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {return error;}))
 
  }

  //   searchAffiliates(pvarUser,pvarUserId){
  //   this.userId = localStorage.getItem("user_id")
  //   this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

  //   const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json', 'authorization': this.token })};
  //   return this._http.get(this.base_url+'affiliateSearch/' + pvarUserId + '/' + pvarUser, httpOptions )
  //   .map((response:Response)=>{const data = response;return data;})
  //   .catch((error:Error) => {console.log(error);return Observable.throw(error);});
  // }


  /* Create streaming channel*/
  createStreamingChannel(input_data:any)
  {
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'createStreamingChannel',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Save Streamin details*/
  updateStreamingDetail(input_data:any)
  {
    return this.http.post(this.base_url+'updateStreamingDetail',input_data).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* update Streamin details*/
  saveStreamingDetail(input_data:any)
  {
    return this.http.post(this.base_url+'saveStreamingDetail',input_data).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get My Streaming Channels*/
  getmyStreamingChannel(start:any,limit:any,channelId: any)
  {
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getmyStreamingChannel/'+this.userId+'/'+channelId+'/'+start+'/'+limit,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get all Streaming Channels*/
  getsteamingList()
  {
    return this.http.get(this.base_url+'getsteamingList').pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Upload channel logo*/
  uploadBroadcastBanner(input_data:any)
  {
    return this.http.post(this.base_url+'uploadCoverImg/',input_data)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  /* Get all Popular Channels*/
  popularChannels()
  {
    return this.http.get(this.base_url+'popularChannels').pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get My products*/
  // getMyProduct()
  // {
  //   this.userId = localStorage.getItem("user_id")
  //   this.token = localStorage.getItem('token');
  //   this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

  //   return this.http.post(this.secureApi+'getMyProduct',{'user_id' : this.userId},this.httpOption).pipe(
  //     map((response: any) => {const data = response;return data;}),
  //     catchError((error: any) => {const data = error;return data;}))
  // }

  /* Get My Streaming Channels*/
  selectBroadcastingProduct(input_data:any)
  {
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'selectBroadcastingProduct',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Delete Single Product */
  deleteProduct(input_data:any)
  {
    return this.http.post(this.secureApi+'deleteProduct',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Delete Single Broadcast Channel */
  deleteStreamingChannel(input_data:any)
  {
    return this.http.post(this.secureApi+'deleteStreamingChannel',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getStreamingChannel(input_data:any, userID :any)
  {
    return this.http.get(this.base_url+'myChannel/'+input_data+'/'+userID).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

    /* Get single product Detail */
  getProductDetail(input_data:any)
  {
    return this.http.post(this.secureApi+'getProductDetail',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Update Product */
  updateProduct(input_data:any)
  {
    return this.http.post(this.secureApi+'updateProduct',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Follow and Unfollow Channels */
  addEditfollower(input_data:any)
  {
    return this.http.post(this.secureApi+'addEditfollower',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

    /* Login with Social media */
  loginWithSocialMedia(input_data:any)
  {
    return this.http.post(this.base_url+'sociallogin',input_data).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Add Shipping Address*/
  addShippingAddress(input_data:any)
  {
    return this.http.post(this.secureApi+'addShippingAddress',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Edit Shipping Address*/
  editShippingAddress(input_data:any)
  {
    return this.http.post(this.secureApi+'editShippingAddress',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Delete Shipping Address*/
  delShippingAddress(input_data:any)
  {
    return this.http.post(this.secureApi+'delShippingAddress',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get Shipping Address*/
  getAddress(id:any)
  {
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getAddress/'+id,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Brodacasting details*/
  publicBroadcastingDetails(id:any,userid:any)
  {
    return this.http.get(this.base_url+'publicBroadcastingDetails/'+id+'/'+userid).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Add Order */
  saveOrder(input_data:any)
  {
    return this.http.post(this.secureApi+'saveOrder',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Add Order Payment */
  saveOrderPayment(input_data:any)
  {
    return this.http.post(this.secureApi+'saveOrderPayment',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* carbon Api */
  carbonClickPayment(input_data:any)
  {
    return this.http.post(this.secureApi+'carbonClickPayment',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }


  /* Get My order */
  getMyOrder()
  {
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getMyOrder/'+this.userId,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }


    /* Get admin sales */
  getMarchantOrder()
  {
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getMarchantOrder/'+this.userId,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get My order Details*/
  getOrderDetails(order_id:any)
  {
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    return this.http.get(this.secureApi+'getMyOrderDetail/'+order_id+'/'+this.userId,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Update streaming channel*/
  updateStreamingChannel(input_data:any){
    return this.http.post(this.secureApi+'updateStreamingChannel',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getAllChannel(start:any,limit:any)
  {
    return this.http.get(this.base_url+'getAllChannel/'+start+'/'+limit+'').pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get   All live stramings*/
  
    getAllSreamingChannel(start:any,limit:any)
  {
    return this.http.get(this.base_url+'getAllSreamingChannel/'+start+'/'+limit+'').pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getStreamingChannelbyid(input_data:any)
  {
    return this.http.get(this.secureApi+'getStreamingChannel/'+input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getBroadcastDetails(channel_id :any){
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.get(this.secureApi+'getBroadcastDetails/'+channel_id,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  globalSearch(queryField :any){
    return this.http.get(this.base_url+'globalSearch/'+queryField).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  publicBroadcastingContentDetails(broadcastID :any,userID:any){
    return this.http.get(this.base_url+'publicBroadcastingContentDetails/'+broadcastID+'/'+userID).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  saveGatewayDetails(input_data :any){
    return this.http.post(this.secureApi+'saveGatewayDetails',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getPaymentGateway(stripeID :any){

    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};


    return this.http.get(this.secureApi+'getPaymentGateway/'+stripeID,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get Retailer Fees*/
  getfeeDetail()
  {

    return this.http.get(this.secureApi+'getfeeDetail/',this.httpOption)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get Shipping Fees*/
  getShippingFee(userID:any)
  {
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.get(this.secureApi+'getShippingFee/'+userID,this.httpOption)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Add Shipping Fees*/
  shippingFee(input_data :any){
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'shippingFee',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Add Shipping Fees*/
  validateDiscountCode(input_data :any){

    return this.http.post(this.secureApi+'validateDiscountCode',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Create Customer for stripe*/
  createCustomer(input_data :any){
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'createCustomer',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Create Subscription for stripe*/
  createSubscription(input_data :any){
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'createSubscription',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Create Subscription for stripe*/
  getSubscription(input_data :any){
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'getSubscription',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Cancle Subscription for stripe*/
  cancelSubscription(input_data :any){
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'cancelSubscription',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* checkout payment  */
  createPaymentIntent(input_data :any){
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'createPaymentIntent',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* checkout payment  */
  paymentTransfer(input_data :any)
  {
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'paymentTransfer',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get Recent sales */
  recentSales()
  {
    return this.http.get(this.base_url+'recentSales').pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getconfirmation(input_data:any)
  {
    return this.http.post(this.base_url+'confirmation',input_data).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  // Create Customer on checkout
  createCustomerCheckout(input_data:any)
  {
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'createCustomerCheckout',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  // paymentIntentData on checkout
  paymentIntentData(input_data:any)
  {
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'paymentIntentData',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }


  // save details into database
  saveCard(input_data:any)
  {
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'saveCard',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  // save details into database
  getCard(input_data:any)
  {
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.get(this.secureApi+'getCard/'+input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }


  // Payment with Saved card
  paymentSavedCard(input_data:any)
  {
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'paymentSavedCard',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  // Refund and cancel the order
  refund(input_data:any)
  {
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'refund',input_data,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  // save details into database
  followingsStoreList()
  {
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.get(this.secureApi+'followingsStoreList/'+this.userId,this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get Interest list*/
  getInterestList()
  {
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getInterestList/',httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Post User Interest list*/
  userInterest(input_data:any)
  {
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi+'userInterest',input_data,httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Signup with Marchant/store*/
  updateUserType(input_data:any)
  {
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi+'updateUserType',input_data,httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

    /* Get Interest list*/
  getRecommendationList(start:any,limit:any)
  {
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getRecommendationList/'+this.userId+'/'+start+'/'+limit,httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

      /* Get liv streaming list*/
  getLiveStream(start:any,limit:any)
  {
    return this.http.get(this.base_url+'getLiveStream/'+start+'/'+limit)
    .pipe(map((response: any) => {const data = response;return data;console.log(data)}),
      catchError((error: any) => {const data = error;return data;console.log(data)}))
  }

  /* Get upcoming stream list*/
  getUpcomingStream(start:any,limit:any)
  {
    return this.http.get(this.base_url+'getUpcomingStream/'+start+'/'+limit)
    .pipe(map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* * get all stores * */
  getSyncStore(){
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getSyncStore/'+this.userId,httpOptions)
    .pipe(map((response: any) => {const data = response;return data;}),catchError((error: any) => {const data = error;return data;}))
  }

  /* * get all published stores * */
  getPublishedStore(){
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getPublishedStore/'+this.userId,httpOptions)
    .pipe(map((response: any) => {const data = response;return data;}),catchError((error: any) => {const data = error;return data;}))
  }

    /* * get all published stores * */
  // carbonClickPayment(){
  //   this.userId = localStorage.getItem("user_id")
  //   this.token = localStorage.getItem('token');
  //   const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
  //   return this.http.get(this.secureApi+'carbonClickPayment/',httpOptions)
  //   .pipe(map((response: any) => {const data = response;return data;}),catchError((error: any) => {const data = error;return data;}))
  // }


  /* * delete store * */
  deleteStore(store_id:any){
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'deleteStore/'+this.userId + '/'+ store_id,httpOptions)
    .pipe(map((response: any) => {const data = response;return data;}),catchError((error: any) => {const data = error;return data;}))
  }

  /* * get store details * */
  getStoredetail(){
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getStoredetail/'+this.userId,httpOptions)
    .pipe(map((response: any) => {const data = response;return data;}),catchError((error: any) => {const data = error;return data;}))
  }

  /****** change store status ******/
  updateStoreStatus(status: any,store_id: any){
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'updateStoreStatus/'+status + '/'+ store_id,httpOptions)
    .pipe(map((response: any) => {const data = response;return data;}),catchError((error: any) => {const data = error;return data;}))
  }

  updateUserdeviceInfo(data:any){
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi+'updateUserdeviceInfo',data,httpOptions)
    .pipe(map((response: any) => {const data = response;return data;}),catchError((error: any) => {const data = error;return data;}))
  }

  sendPushNitification(data:any){
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi+'sendPushNitification',data,httpOptions)
    .pipe(map((response: any) => {const data = response;return data;}),catchError((error: any) => {const data = error;return data;}))
  }

  /* Create Infulencer Details*/
  influencerDetail(input_data:any)
  {
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.base_url+'influencerDetail/',input_data)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  /* Get Infulencer Details*/
  getInfluencerDetail()
  {
   //this.userId = localStorage.getItem("user_id")
   if(localStorage.getItem("data")){
    let data = this.decryptData(localStorage.getItem("data"));
    this.userId = data[0]['user_id'];
  }
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getInfluencerDetail/'+this.userId,httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  /* Upload Infulencer Banner*/
  uploadInfluencerBanner(input_data:any)
  {
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'uploadInfluencerBanner/',input_data,httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  /* Add Infulencer category*/
  addInfluencerCategory(input_data:any)
  {
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi+'addInfluencerCategory/',input_data,httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

      /* * upload video  * */
  uploadvideo(input_data:any){
     this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.base_url+'uploadvideo/',input_data).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }
  uploadRecVideo(input_data:any){
     this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.base_url+'uploadRecVideo/',input_data).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getbroadcastvideos(input_data:any)
  {
    return this.http.get(this.base_url+'getbroadcastvideos/'+input_data).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }
  deletebroadcastvideos(input_data:any)
  {
    return this.http.get(this.base_url+'deletebroadcastvideos/'+input_data).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }
  /*save text on video*/
  savetext(input_data:any){
     this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};


    return this.http.post(this.base_url+'savetext/',input_data).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }
  gettext(input_data:any)
  {
    return this.http.get(this.base_url+'gettext/'+input_data).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }
  getScreentext(input_data:any)
  {
    return this.http.get(this.base_url+'getScreentext/'+input_data).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }
  
  deletetext(input_data:any)
  {
    return this.http.get(this.base_url+'deletetext/'+input_data).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }
  deletetextagenda(input_data:any)
  {
    return this.http.get(this.base_url+'deletetextagenda/'+input_data).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }
 saveAgendatext(input_data:any){
     this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};


    return this.http.post(this.base_url+'saveAgendatext/',input_data).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get Infulencer Store list*/
  storelistCat(input_data:any)
  {
   //this.userId = localStorage.getItem("user_id")
   if(localStorage.getItem("data")){
    let data = this.decryptData(localStorage.getItem("data"));
    this.userId = data[0]['user_id'];
  }
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi+'storelistCat',input_data,httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  /* Get category and count for Influencer*/
  categoryStoreCount()
  {
   //this.userId = localStorage.getItem("user_id")
   if(localStorage.getItem("data")){
    let data = this.decryptData(localStorage.getItem("data"));
    this.userId = data[0]['user_id'];
  }
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'categoryStoreCount',httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }


    /* Get category and count for Influencer*/
  saveMyfavoriteStore(input_data:any)
  {
   //this.userId = localStorage.getItem("user_id")
   if(localStorage.getItem("data")){
    let data = this.decryptData(localStorage.getItem("data"));
    this.userId = data[0]['user_id'];
  }
    this.token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi+'saveMyfavoriteStore',input_data,httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

    /* Get live events List*/
  getInflueStoredStreaming(start:any,limit:any){
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.get(this.secureApi+'getInflueStoredStreaming/'+this.userId+'/'+start+'/'+limit+'',httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
 
  }


  /* Get engegment data List*/
  getInfluencerStreamingDetails(streamID:any){

    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.get(this.secureApi+'getInfluencerStreamingDetails/'+this.userId+'/'+streamID,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
 
  }

  /* Add Bank details*/
  addBankDetail(input_data:any){

    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.base_url+'addBankDetail',input_data).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
 
  }

  /* Get Influencer payment Details*/
  getBankDetails(){
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.get(this.secureApi+'getBankDetails/'+this.userId,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

    /* Get Influencer product sales Details*/
  getProductSaleGraph(){
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    //df4a4808-6869-490c-b46d-1ae07faae372
    return this.http.get(this.secureApi+'getProductSaleGraph/'+this.userId,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get Marchant avg orders Details*/
  getAvgOrderGraph(){
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    //df4a4808-6869-490c-b46d-1ae07faae372
    return this.http.get(this.secureApi+'getAvgOrderGraph/'+this.userId,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get Influencer live sessions Details*/
  getBroadcastGraph(){
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    //df4a4808-6869-490c-b46d-1ae07faae372
    return this.http.get(this.secureApi+'getBroadcastGraph/'+this.userId,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }


  /* Get Influencer profile channel*/
  getInfluencerProfileDetail(username:any){
    this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    //this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.base_url+'getInfluencerProfileDetail/'+username,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Add support bookings*/
  supportRequest(input_data:any){
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'supportRequest',input_data,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
 
  }

  /* Get Influencer profile channel*/
  getRequestList(){
    this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    //this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getRequestList/'+this.userId,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* delete Influencer profile channel*/
  delSupportRequest(){
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'delSupportRequest/'+this.userId,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }


  /* Add testinmonial*/
  addTestimonial(input_data:any){
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.post(this.secureApi+'addTestimonial',input_data,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
 
  }

  /* Get all Testimonial*/
  getTestimonial(){
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getTestimonial/'+this.userId,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get single Testimonial*/
  getTestimonialDetail(testinmonialId:any){
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getTestimonialDetail/'+testinmonialId,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Delete testinmonial*/
  delTestimonial(testinmonialId:any){
    
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.get(this.secureApi+'delTestimonial/'+testinmonialId,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
 
  }


  /* Enable Disable testimonial*/
  updateStatusTestimonial(input_data:any){
   
  this.token = localStorage.getItem('token');
  const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

  return this.http.post(this.secureApi+'updateStatusTestimonial',input_data,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get all testimonials by page*/
  getTestimonialBypage(start:any,limit:any)
  {
    //this.userId = localStorage.getItem("user_id")
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

    return this.http.get(this.secureApi+'getTestimonialBypage/'+this.userId+'/'+start+'/'+limit+'',httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  searchInfluencerList(queryField :any){
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'searchInfluencerList/'+queryField,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }


  /* Send Invite to influencer*/
  sendInfluencerRequest(input_data:any){ 
  this.token = localStorage.getItem('token');
  const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
  return this.http.post(this.secureApi+'sendInfluencerRequest',input_data,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Cancel Invite to influencer by marchant*/
  merchantCancelInfluRequest(input_data:any){
  this.token = localStorage.getItem('token');
  const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
  return this.http.get(this.secureApi+'merchantCancelInfluRequest/'+input_data,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get Influencer Invitations list*/
  getInfluencerRequest(){
  //this.userId = localStorage.getItem("user_id")
  if(localStorage.getItem("data")){
    let data = this.decryptData(localStorage.getItem("data"));
    this.userId = data[0]['user_id'];
  }
  this.token = localStorage.getItem('token');
  const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
  return this.http.get(this.secureApi+'getInfluencerRequest/'+this.userId,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Accept the marchant request by influencer*/
  acceptRequestByInfluencer(id:any){
  this.token = localStorage.getItem('token');
  const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
  return this.http.get(this.secureApi+'acceptRequestByInfluencer/'+id,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Reject the marchant request by influencer*/
  cancelInfluencerRequest(id:any){
  this.token = localStorage.getItem('token');
  const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
  return this.http.get(this.secureApi+'cancelInfluencerRequest/'+id,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

   /* Update the Broadcast status*/
 updateBroadcastStatus(broadcast_id:any,status:any){
  this.token = localStorage.getItem('token');
  const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
  return this.http.get(this.secureApi+'updateBroadcastStatus/'+broadcast_id+'/'+status, httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

 /* Get Influencer status*/
  getInfluencerRequestStatus(user_id:any,BroadcastId:any){
  this.token = localStorage.getItem('token');
  const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
  return this.http.get(this.secureApi+'getInfluencerRequestStatus/'+user_id+'/'+BroadcastId, httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /*SaveCartLogs*/
  saveCartLog(input_data:any){ 
  this.token = localStorage.getItem('token');
  const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
  return this.http.post(this.secureApi+'saveCartLog',input_data,httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get Influencer status*/
  cartReport(){
    if(localStorage.getItem("data")){
      let data = this.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
  //this.userId = localStorage.getItem("user_id")
  this.token = localStorage.getItem('token');
  const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
  return this.http.get(this.secureApi+'cartReport/'+this.userId, httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Delete Promo Video */
  deletePromovideo(broadcastID:any){
  this.token = localStorage.getItem('token');
  const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
  return this.http.get(this.secureApi+'deletePromovideo/'+broadcastID, httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Delete Profile pic */
  delProfilePic(userID:any){
    return this.http.get(this.base_url+'delProfilePic/'+userID).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  /* Get shopper cards details */
  getCards(customerID:any){
  if(localStorage.getItem("data")){
    let data = this.decryptData(localStorage.getItem("data"));
    this.userId = data[0]['user_id'];
  }

  this.token = localStorage.getItem('token');
  this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
  
  return this.http.get(this.secureApi+'getCards/'+customerID, this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  updateAgendatextIndex(data:any){
    this.token = localStorage.getItem('token');
    const httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.base_url+'updateAgendatextIndex',data, httpOption).pipe(
        map((response: any) => {const data = response;return data;}),
        catchError((error: any) => {const data = error;return data;}))
    }

    /* Get shopper cards details */
  delPaymentMethod(methodID:any){
  this.token = localStorage.getItem('token');
  this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};

  return this.http.get(this.secureApi+'delPaymentMethod/'+methodID, this.httpOption).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  saveCardDetails(data:any){
    this.token = localStorage.getItem('token');
    this.httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    
    return this.http.post(this.secureApi+'saveCardDetails',data, this.httpOption).pipe(
        map((response: any) => {const data = response;return data;}),
        catchError((error: any) => {const data = error;return data;}))
  }

  getNewsPublic(start:any,limit:any){
    return this.http.get(this.base_url+'getNewsPublic/'+start+'/'+limit)
    .pipe(map((response: any) => {const data = response;return data;}),
    catchError((error: any) => {const data = error;return data;}))
  }

  getFeaturedInfluencers(start:any,limit:any){
    return this.http.get(this.base_url+'getFeaturedInfluencers/'+start+'/'+limit)
    .pipe(map((response: any) => {const data = response;return data;}),
    catchError((error: any) => {const data = error;return data;}))
  }

  featuredandPopular(start:any,limit:any){
    return this.http.get(this.base_url+'featuredandPopular/'+start+'/'+limit)
    .pipe(map((response: any) => {const data = response;return data;}),
    catchError((error: any) => {const data = error;return data;}))
  }

}
