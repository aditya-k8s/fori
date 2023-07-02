import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatStepper } from '@angular/material/stepper';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {Title} from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-influencer-profile',
  templateUrl: './influencer-profile.component.html',
  styleUrls: ['./influencer-profile.component.css']
})
export class InfluencerProfileComponent implements OnInit {
	  firstFormGroup: FormGroup
    secondFormGroup: FormGroup
  	thirdFormGroup: FormGroup
    fourthFormGroup: FormGroup
    isServerError : boolean = false
    stepDisabled =false
  	userId :any = []
  	selectedIndex = 0
  	submitted = false
    influencerData : any = []
  	loading = false
    loading1 = false
    status : string = "";
    imageData:any = {}
    imageChangedEvent: any = '';
    croppedImage: any = '';
    droppedImage:any = '';
    isFileSelected :any
    public files: NgxFileDropEntry[] = [];
    newImage :any
    bannerWidth : any
    bannerHeight : any
    categoryList : any = []
    categoryCountList : any = []
    categoryValue : any = []
    storeCategoryValue : any = []
    file: any
    categryFormData :any = {}
    StoreCategryFormData:any = {}
    isEditable = true
    storeData : any = []
    image_url = '';
    checkedStoreItems :any =[]
  constructor(
  	  private _formBuilder: FormBuilder,
      private dataService: DataService,
      public toastr : ToastrManager,
      private router: Router,
      private http: HttpClient,
      private route: ActivatedRoute,
      private titleService:Title,
      private ngxService: NgxUiLoaderService,
    ) { 
  		this.titleService.setTitle("Influencer Profile");
      this.image_url = environment.image_url;

      const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  		this.firstFormGroup = this._formBuilder.group({
  			designation: ['', Validators.required],
  			fb_link: ['', [Validators.required, Validators.pattern(reg)]],
        insta_link: ['', [Validators.required, Validators.pattern(reg)]],
        welcome_video: [''],
      });

      this.secondFormGroup = this._formBuilder.group({});

      this.thirdFormGroup = this._formBuilder.group({});

      this.fourthFormGroup = this._formBuilder.group({});

  	}
  	get f() { return this.firstFormGroup.controls; }

	  ngOnInit() {
      if(localStorage.getItem("data")){
        let data = this.dataService.decryptData(localStorage.getItem("data"));
        this.userId = data[0]['user_id'];
      }
	  	//this.userId =localStorage.getItem("user_id")
      this.__getInfluencerDetail();
      this.__getCategory();
      this.__categoryStoreCount();
      this.__getStoreList();
	  }

      handleFileInput(event: any) {
       this.file = event.target.files
      }

    
    __categoryStoreCount(){
      this.dataService.categoryStoreCount().subscribe(response => {
        
         if(response['success'] == true){
            this.categoryCountList = response['body']
          }
        });
    }
 

   __getCategory(){
      this.dataService.getCategory().subscribe(response => {
        
         if(response['success'] == true){
            this.categoryList = response['body']
              for(let i = 0; i < this.categoryList.length; i++)
              {
                if(this.categoryList[i]['isSelect'] == 1) {
                  this.categoryValue.push(this.categoryList[i]['id'])
                }
              }
          }
        });
    }

   __onChangeCategory( id: any, event: any) {
       let {checked, value} = event.target;
      if(checked) {
        this.categoryValue.push(id);
      } else {
        let index = this.categoryValue.indexOf(id)
        this.categoryValue.splice(index, 1);
      }
    }

    __onChangeStoreCategory(id: any, event: any) {

      let {checked, value} = event.target;
      if(checked) {
        this.storeCategoryValue.push(id);
      } else {
        let index = this.storeCategoryValue.indexOf(id)
        this.storeCategoryValue.splice(index, 1);
      }
        
        this.__getStoreList();
    }

    __getStoreList() {
      this.ngxService.start();
      this.StoreCategryFormData['user_id'] = this.userId
      this.StoreCategryFormData['category'] = this.storeCategoryValue
      this.dataService.storelistCat(this.StoreCategryFormData).subscribe(response => {
        this.ngxService.stop();
        if(response['success'] == true)
        { 
          this.storeData = response['body']
          this.loading = false
          //this.toastr.successToastr(response['message']);

        }
      })
    }

    onChecked(channelId: any, event: any){
      this.ngxService.start();
      let favouriteStores = {
        'user_id' : this.userId,
        'store_id' :  channelId
      }

      this.dataService.saveMyfavoriteStore(favouriteStores).subscribe(response => {
        this.ngxService.stop();
        if(response['success'] == true)
        { 
          this.__getStoreList();
          this.toastr.successToastr(response['message']);
        }
        else
        {
          this.toastr.errorToastr(response['message']); 
        }
      })

    }

    saveCategory() {
      this.loading = true
      this.categryFormData['user_id'] = this.userId
      this.categryFormData['category'] = this.categoryValue
      this.dataService.addInfluencerCategory(this.categryFormData).subscribe(response => {
        if(response['success'] == true){ 
          this.selectedIndex = 3
          this.stepDisabled = true;
          this.loading = false
          this.toastr.successToastr(response['message']);
        }
      })
    }


  onSubmit(Data:any) {

    this.submitted = true;
    if (this.firstFormGroup.invalid) {
        this.loading = false;
          return;
    }else {
        this.loading = true;
        Data['user_id']= this.userId
        let encrypted_data = this.dataService.encryptData(Data);
        const formData = new FormData();
        formData.append('data', encrypted_data);
        if(this.file != undefined){
          if(this.file){
            for (var i = 0; i < this.file.length; i++) { 
              formData.append("welcome_video", this.file[i]);
            }
          }else{
              formData.append("welcome_video", this.file);
          }
      }
      this.dataService.influencerDetail(formData).subscribe(response => {
        this.loading = false;
           if(response['success'] == true){
            this.selectedIndex = 1
            this.stepDisabled = false;
            this.toastr.successToastr(response['message']);
          }
          else{
            this.toastr.errorToastr(response['message']); 
            this.selectedIndex = 0
            this.stepDisabled = false;
          }
      	},
       	error => {this.toastr.errorToastr(error);});

    }
  }

  __getInfluencerDetail() {

    this.dataService.getInfluencerDetail().subscribe(response => {
        if(response['success'] == true){
          this.influencerData = response['body'][0]
          this.firstFormGroup.patchValue({
            'designation' : this.influencerData.designation,
            'fb_link' : this.influencerData.fb_link,
            'insta_link' : this.influencerData.insta_link,
            'welcome_video' : this.influencerData.welcome_video,
          })
          if(this.influencerData['banner']){
            this.croppedImage = this.image_url + this.influencerData['banner'];
          }
        }
      },
      error => {this.toastr.errorToastr(error);});
    }

     /* Save channel logo*/
    imageSubmit(ImageData:any){
      this.loading1 = true;
      if(this.newImage != undefined ){
          this.imageData['user_id'] = this.userId
          this.imageData['banner_image'] = this.croppedImage
          this.dataService.uploadInfluencerBanner(this.imageData).subscribe(response => {
          this.loading1 = false;
          if(response['success'] == true){
                this.toastr.successToastr(response['message']);
                this.isServerError = false;
                this.selectedIndex = 2
               }
               else{
                this.selectedIndex = 1
                this.stepDisabled = false;
                this.toastr.errorToastr(response['message']); 
              }
          },
          error => {
              this.toastr.errorToastr(error);
          });
      }
      else
      {
          this.stepDisabled = true;
          this.selectedIndex = 2
          this.toastr.successToastr("Banner Image Updated successfully.");
      }

    }

    favouriteStoreSubmit() {
         this.router.navigate(['/account/profile'])
    }

    fileChangeEvent(event: any){
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.newImage = event.base64
    }
    imageLoaded(event:any) {

      this.bannerWidth = event.original.size['width']
      this.bannerHeight = event.original.size['height']

      if(this.bannerWidth < 1280 && this.bannerHeight < 768)
      {
        this.toastr.errorToastr('Please upload recommended dimension banner');
        this.isFileSelected = false;
        return;
      }
    }
    cropperReady() {
        this.stepDisabled = true;
    }
    loadImageFailed() {
        // show message
        this.toastr.errorToastr('Please select correct image format');
        this.stepDisabled = false;
    }

    allowDrop(event: any) {
      event.preventDefault();
    }

    onDragLeave(evt:any) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    readImageFile(file: any) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.croppedImage = e.target.result;
        this.newImage = e.target.result
      };
      reader.readAsDataURL(file);
    }

    dropHandler(event: any)
    {
      if (!this.isFileSelected && event.dataTransfer.items.length > 0 &&
        event.dataTransfer.items[0].kind === 'file' &&
        event.dataTransfer.items[0].type.indexOf('image') > -1) {
        this.isFileSelected = true;
         this.readImageFile(event.dataTransfer.items[0].getAsFile());
      } else {
        //return false;
      }
  }


public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(
          (ev) => {
            this.imageChangedEvent = { target: { files: [ev] } }
             this.isFileSelected = true;
          }
        );
      }

    }
  }
  onDragOver(evt:any) {
    evt.preventDefault();
    evt.stopPropagation();
  }


}
