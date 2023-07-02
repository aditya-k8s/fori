import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
declare var CryptoJS : any;
//import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class DataService {
	base_url: string = "";
  secureApi = '';
  token : any; 
  userId :any;
  secret_key: string = "";
  constructor(private http: HttpClient) 
  { 
    this.secret_key = environment.secret_key;
    this.base_url = environment.base_url;
    this.secureApi = environment.secureApi;
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem("user_id")
  }

  encryptData(data : any) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secret_key).toString();
  }

    /* Forgot Password */
    forgotPassword(input_data:any){
      return this.http.post(this.base_url+'forgotPassword/',input_data).pipe(
        map((response: any) => {const data = response;return data;}),
        catchError((error: any) => {const data = error;return data;})
      )
    }

    /* Create Category*/
    addCategory(input_data:any){
      const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
      return this.http.post(this.secureApi+'addCategory',input_data,httpOptions).pipe(
        map((response: any) => {const data = response;return data;}),
        catchError((error: any) => {const data = error;return data;}))
    }

    updateCategory(input_data:any){
      const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
      return this.http.post(this.secureApi+'updateCategory',input_data,httpOptions).pipe(
        map((response: any) => {const data = response;return data;}),
        catchError((error: any) => {const data = error;return data;}))
    }

    getSubCategory(category_id:any){
      const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
      return this.http.get(this.secureApi+'getSubCategory/'+category_id,httpOptions).pipe(
        map((response: any) => {const data = response;return data;}),
        catchError((error: any) => {const data = error;return data;}))
    }

    addSubCategory(input_data :any){
      const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
      return this.http.post(this.secureApi+'addSubCategory',input_data,httpOptions).pipe(
        map((response: any) => {const data = response;return data;}),
        catchError((error: any) => {const data = error;return data;}))
    }

    updateSubCategory(input_data :any){
      const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
      return this.http.post(this.secureApi+'updateSubCategory',input_data,httpOptions).pipe(
        map((response: any) => {const data = response;return data;}),
        catchError((error: any) => {const data = error;return data;}))
    }

    getUserById(id: any) {
      this.token = sessionStorage.getItem('token');
      const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
      return this.http.get(this.secureApi + 'user/' + id,httpOptions).pipe(
        map((response: any) => {const data = response;return data;}),
        catchError((error: any) => {const data = error;return data;})
      )
    }
    
    /** Login admin **/
    login(input_data:any){
      return this.http.post(this.base_url+'login/',input_data).pipe(
        map((response: any) => {const data = response;return data;}),
        catchError((error: any) => {const data = error;return data;})
      )
    }

  /*Get all categories*/
  getCategory() {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi + 'categoryStoreCount ',httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  getUsers(user_id:any) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi + 'getAllusers/'+user_id,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  getRecentusers() {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi + 'getRecentusers',httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  deleteUser(pvarId:any){
    this.token = sessionStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi + 'deleteUser/'+pvarId,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  usersDetails(channel_name:any){
    this.token = sessionStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.base_url + 'myChannel/'+channel_name,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }
  getMyProduct(input_data:any) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi + 'getMyProduct/0/100',input_data,httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }
  
  updateUserStatus(user_id:any){
    this.token = sessionStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi + 'updateUserStatus/'+user_id,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  getOrder() {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi + 'getAllOrder/',httpOptions)
    .pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }
  
  updateUserProfile(input_data:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi + 'updatePersonalDetail',input_data,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  getCountry(){
    return this.http.get(this.base_url+'country/').pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }
  
  followingsStoreList(pvarId:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'followingsStoreList/'+pvarId,httpOptions).pipe(
      map((response: any) => {const data = response; return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getMyOrder(pvarId:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getMyOrder/'+pvarId,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getSyncStore(pvarId:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getSyncStore/'+pvarId,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getmyStreamingChannel(pvarId:any,store_id:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getmyStreamingChannel/'+pvarId+'/'+store_id+'/'+ 0 +'/'+ 100,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getAddress(pvarId:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getAddress/'+pvarId,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})) 
  }

  getMarchantOrder(pvarId:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getMarchantOrder/'+pvarId,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})) 
  }

  getMyOrderDetail(store_id:any, user_id:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getMyOrderDetail/'+store_id+'/'+user_id,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})) 
  }

  getAllChannel(){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.base_url+'getAllChannel/'+ 0 +'/'+ 100,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getStreamingChannel(channel_name:any, user_id :any){
    return this.http.get(this.base_url+'myChannel/'+channel_name+'/'+user_id).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  publicBroadcastingContentDetails(channel_id:any){
    return this.http.get(this.base_url+'publicBroadcastingContentDetails/'+channel_id).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  updatefeeDetail(data:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi+'updatefeeDetail',data,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getfeeDetail(){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getfeeDetail',httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getInfluencerList(){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getInfluencerList',httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getInfluencerDetail(user_id:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getInfluencerDetail/'+user_id, httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  delCategory(category_id:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'delCategory/'+category_id, httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  delSubCategory(sub_category_id:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'delSubCategory/'+sub_category_id, httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  storelistCat(category:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi+'storelistCat',category, httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  popularChannels(){
    return this.http.get(this.base_url+'popularChannels').pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getSaleorderGraph(){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getSaleorderGraph',httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getDeviceGraph(){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getDeviceGraph',httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getProductSaleReport(month:any,year:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getProductSaleReport/'+month+'/'+year,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getAllRequestList(user_type:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getAllRequestList/'+user_type,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }
  
  getMerchantList(){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getMerchantList',httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getMerchantBalance(user_id:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi+'getMerchantBalance/'+user_id,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  payToMerchant(data:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi+'payToMerchant',data,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;}))
  }

  getNews(user_id:any) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi + 'getNews',httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  addNews(data:any) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi + 'addNews',data,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  delNews(news_id:any) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi + 'delNews/'+news_id,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  updateNewsStatus(data:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi + 'updateNewsStatus',data,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  addBlog(data:any) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi + 'addBlog',data,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  getBlog(user_id:any) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi + 'getBlog',httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  delBlog(blog_id:any) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi + 'delBlog/'+blog_id,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  updateBlogStatus(data:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi + 'updateBlogStatus',data,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  donationList(){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi + 'donationList',httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }
  
  updateDonationStatus(data:any){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi + 'updateDonationStatus',data,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  getadmTestimonial(){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi + 'getadmTestimonial',httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  addadmTestimonial(data:any) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.post(this.secureApi + 'addadmTestimonial',data,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

  deladmTestimonial(testimonial_id:any) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', token: this.token})};
    return this.http.get(this.secureApi + 'deladmTestimonial/'+testimonial_id,httpOptions).pipe(
      map((response: any) => {const data = response;return data;}),
      catchError((error: any) => {const data = error;return data;})
    )
  }

}
