import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css']
})


export class CreateStoreComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  droppedImage:any = '';
  isFileSelected :any
  public files: NgxFileDropEntry[] = [];

  selectedIndex = 0
  isEditable = false
  file: any
  base_url: string = ""
  status : string = "";
  store_id : any
  image_url : string = "";
  secureApi :any
  submitted = false
  isLinear = true
  url : any
  userId :any = []
  ImageObject : any
  stepIndex = 0
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  thirdFormGroup: FormGroup
  isServerError : boolean = false
  stepDisabled =false
  imageData:any = {}
  bannerWidth : any
  bannerHeight : any
  newImage :any
  loading = false
  loading1 = false
  loading2 = false

  constructor(
      private _formBuilder: FormBuilder,
      private dataService: DataService,
      public toastr : ToastrManager,
      private router: Router,
      private http: HttpClient,
      private route: ActivatedRoute,
      private titleService:Title
    ) { 
      this.titleService.setTitle("Create Store");

      this.base_url = environment.base_url;
      this.secureApi = environment.secureApi;
      this.image_url = environment.image_url;
      this.firstFormGroup = this._formBuilder.group({
          channel_name: ['', Validators.required],
          description: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
          // amount: ['', Validators.required],
          // stock: ['', Validators.required]
      });
      this.thirdFormGroup = this._formBuilder.group({
          store_name: ['', Validators.required],
          public_key: ['', Validators.required],
          private_key: ['', Validators.required]
      });
    }

    get f() { return this.firstFormGroup.controls; }
    get fe() { return this.thirdFormGroup.controls; }

    ngOnInit(){
      if(localStorage.getItem("data")){
        let data = this.dataService.decryptData(localStorage.getItem("data"));
        this.userId = data[0]['user_id'];
      }
       //this.userId =localStorage.getItem("user_id")

        if(this.userId == undefined && this.userId == null){
          this.router.navigate(['/login'])
        }
        this.getStoredetail();
        // this.route.queryParams.subscribe(params => {
        //   this.status = params['status'];
        //   this.store_id = params['id'];
        //   if(this.status == 'edit' && this.store_id != "0"){
        //     this.getStoredetail();
        //   }
        // });

      // setTimeout(() => {
      //  this.dataService.getUserChannel(this.userId).subscribe(response => {
      //        if(response['success'] == true){
      //           if (response['body']['channel_name'] == '') { this.selectedIndex = 0 }
      //           else if(response['body']['channel_logo'] == '') { this.selectedIndex = 1 }
      //           else if(response['body']['shopifyverify'] == 1) { this.router.navigate(['inventory']) }
      //           else{ this.selectedIndex = 2; this.isEditable = false; }
      //        }
      //     });
      //  });

    }

    /* *** get store details *** */

    getStoredetail(){
      this.dataService.getStoredetail().subscribe(response =>{
        if(response['success'] == true && response['body'].length > 0){
          let data = response['body'][0];
          this.store_id = data['id']
          if(data['channel_logo']){
            this.croppedImage = this.image_url + data['channel_logo'];
          }
          this.firstFormGroup.patchValue({
            'channel_name' : data['channel_org_name'], 'description' : data['description']
          })
          this.thirdFormGroup.patchValue({
            'store_name' : data['store_name'], 'public_key' : data['public_key'], 'private_key' : data['private_key']
          });
        }else{
          //this.toastr.errorToastr(response['message']);
        }
      })
    }

    /* ******* end ******** */

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

  /*Save channel name and chaneel description*/
     onSubmit(Formdata:any)
     {
      this.submitted = true;
      this.loading = true;
      if (this.firstFormGroup.invalid) {
        this.loading = false;
          return;
      }
      else{

        Formdata['user_id']= this.userId; //localStorage.getItem('user_id');
        if(this.store_id) {
          Formdata['store_id']= this.store_id;
        }
        this.dataService.createChannel(Formdata).subscribe(response => {
            this.loading = false;
               if(response['success'] == true){
                if(response['data']['body']['insertId'] != 0){
                  this.store_id = response['data']['body']['insertId']
                }
                
                this.toastr.successToastr(response['data']['message']);
                this.isServerError = false;
              }
              else{this.toastr.errorToastr(response['message']); }
          },
        error => {this.toastr.errorToastr(error);});
      }

    }

    /* Verify shopify details*/
    shopifyDetailsSubmit(Formdata:any){
      this.submitted = true;
      this.loading2 = true;
      if (this.thirdFormGroup.invalid) {
         this.loading2 = false;
          return;
      }
      else
      {
        let host = Formdata['store_name']
        if (host.indexOf("http://") == 0 || host.indexOf("https://") == 0) {
          var subdomain = host.substr(8, 1000).split(".")[0]
        }
        else{
           var subdomain = host.split('.')[0]
        }
        Formdata['store_name'] = subdomain
        Formdata['user_id']= this.userId; //localStorage.getItem('user_id');
        if(this.store_id) {
          Formdata['store_id']= this.store_id;
        }
        let encrypted_data = this.dataService.encryptData(Formdata);
        let data = {'data' : encrypted_data};

        // if(this.status == 'edit') {
        //    this.dataService.updateShopifyAuth(data).subscribe(response => {
        //     this.loading2 = false;
        //     if(response['success'] == true){
        //        this.toastr.successToastr(response['data']['message']);
        //         //this.router.navigate(['/account/store']);
        //     }
        //     else{ this.toastr.errorToastr(response['message']); }
        // },
        // error => {this.toastr.errorToastr(error);});
        // }
        // else {
          this.dataService.verifyShopifyAuth(data).subscribe(response => {
            this.loading2 = false;
            if(response['success'] == true){
              this.toastr.successToastr(response['data']['message']);
              this.router.navigate(['inventory']);
            }
            else{this.toastr.errorToastr(response['message']); }
          });
      }
    }

    /* Save channel logo*/
    imageSubmit(ImageData:any)
    {
        // if(this.file != undefined && this.file != null)
        // {
          // var strFileName = this.getFileExtension(this.file.name);
          // if(this.newImage)
          // {
            //if(this.newImage != undefined )
          this.loading1 = true;
          if(this.croppedImage)
          {
              this.imageData['user_id'] = this.userId
              this.imageData['cover_image'] = this.croppedImage
              this.imageData['store_id']= this.store_id;

              this.dataService.uploadChanelLogo(this.imageData).subscribe(response => {
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
              this.loading1 = false;
              this.stepDisabled = true;
              this.selectedIndex = 1
              //this.toastr.successToastr("Cover Image Updated successfully.");
          }
          //}
       // }
        // else
        // {
        //   this.toastr.errorToastr('Please select image');
        //   this.stepDisabled = false;
        //   return;
        // }

    }

    /*Check Image type*/
    // getFileExtension(filename : any) {
    //   return filename.split('.').pop();
    // }
    
    // public delete(){
    //   this.url = '';
    // }
  }
