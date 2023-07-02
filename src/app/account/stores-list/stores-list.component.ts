import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../environments/environment';
import {Title} from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.css']
})
export class StoresListComponent implements OnInit {
  image_url = ''
  userId :any = [];
  store_data : any = [];
  submitted = false;
  isAddStore = false;
  isDeleteModal : boolean = false;
  store_id : number = 0;
  constructor(
      private _formBuilder: FormBuilder,
      private dataService: DataService,
      private router: Router,
      public toastr : ToastrManager,
      private titleService:Title,
      private ngxService: NgxUiLoaderService,
    ) {
    this.image_url = environment.image_url;
    this.titleService.setTitle("Store List");
  }

  ngOnInit(){
    this.ngxService.start();

    if(localStorage.getItem("data")){
      let data = this.dataService.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }

    this.getSyncStore();
  }

  getSyncStore(){
    this.store_data = [];
    this.dataService.getSyncStore().subscribe(response =>{
      if(response['success'] == true){
        this.store_data = response['body'];
      }
      this.ngxService.stop();
    },error =>{
      this.ngxService.stop();
    })
  }

  addStore(){
    this.router.navigate(['create-store'], { queryParams: { status: 'new'} });
  }

  editStore(pvarId : any){
    //this.router.navigate(['create-store'], { queryParams: { status: 'edit', id : pvarId} });
    this.router.navigate(['create-store']);

  }

  addProductBroadcast(pvarId : any){
    this.router.navigate(['inventory'], { queryParams: { id : pvarId} });
  }

  deleteStore(pvarId : any){
    this.store_id = pvarId;
    this.isDeleteModal = true;
  }

  yesDelete(){
    this.ngxService.start();
    this.dataService.deleteStore(this.store_id).subscribe(response =>{
      if(response['success'] == true){
        this.getSyncStore();
        this.toastr.successToastr(response['message']);
        this.closeDelete();
      }else{}
    },error =>{
      this.ngxService.stop();
    })
  }

  closeDelete(){
    this.isDeleteModal = false;
  }

  // change_status(status: any, storeId: any)  {
  //   if(status == 0) {
  //      this.toastr.errorToastr("You cannot publish this store.Please fill all the details for this channel."); 
  //     return false;
  //   }
  //   else
  //   {
  //     var newStatus
  //     if(status == 1) { newStatus = 2 }
  //     if(status == 2) { newStatus = 1 }
        
  //     this.dataService.updateStoreStatus(newStatus,storeId).subscribe(response =>{
  //       if(response['success'] == true) {
  //         this.toastr.successToastr(response['message']);
  //         this.getSyncStore();
  //       }
  //       else {
  //         this.toastr.errorToastr(response['message']); 

  //       }
  //     })

  //     return true
  //   }
  // }

  // addStore(){
  //   this.isAddStore = true;
  // }

  // get fe() { return this.thirdFormGroup.controls; }

  // shopifyDetailsSubmit(){
  //   let Formdata = this.thirdFormGroup.value;
  //   this.submitted = true;
  //   if (this.thirdFormGroup.invalid) {
  //     return;
  //   }else{
  //     Formdata['user_id']= localStorage.getItem('user_id');
  //     this.dataService.verifyShopifyAuth(Formdata).subscribe(response => {
  //       if(response['success'] == true){
  //         this.getSyncStore();
  //         this.toastr.successToastr(response['data']['message']);
  //         this.closeModal();
  //       }
  //       else{this.toastr.errorToastr(response['message']); }
  //     },
  //     error => {this.toastr.errorToastr(error);});
  //   }
  // }

  // closeModal(){
  //   this.isAddStore = false;
  // }
}
