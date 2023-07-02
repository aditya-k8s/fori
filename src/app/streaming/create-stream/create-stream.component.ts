import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatStepper } from '@angular/material/stepper';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-create-stream',
  templateUrl: './create-stream.component.html',
  styleUrls: ['./create-stream.component.css']
})
export class CreateStreamComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  droppedImage:any = '';
  isFileSelected :any
  public files: NgxFileDropEntry[] = [];
  streamForm: FormGroup
  streamingProducts: FormGroup
  streamingBanner : FormGroup
  streamingDetail : FormGroup
  submitted = false
  userId :any = []
  isEditable = false
  channelID : any = []
  url : any
  ImageObject : any
  stepDisabled =false
  file: any
  selectedIndex = 0
  products : any = []
  checkedItems :any =[]
  lastId :any
  showPickupAddress: any;
  hashtagValue :any = []
  hashtagValues : any
  imageData:any = {}
  bannerWidth : any
  bannerHeight : any
  start = 0;
  limit = 20;
  store_id:any
  store_data : any = [];
  productData :any = {}
  totalProduct = false
  loading = false
  //file: any

  constructor(
  private router: Router,
  private dataService: DataService,
  public toastr : ToastrManager,
  private formBuilder:FormBuilder,
  private titleService:Title
  ) {
      this.titleService.setTitle("Create Stream");

      this.streamForm = this.formBuilder.group({
        stream_title: ['', Validators.required],
        stream_description: ['', [Validators.required]],
      });
        this.streamingBanner = this.formBuilder.group({});
        this.streamingProducts = this.formBuilder.group({});

        this.streamingDetail = this.formBuilder.group({
          pay_to_watch:[''],
          text_on_screen: [''],
          resolution_type: [''],
          pickupStore:[''],
          broadcast_time: ['', Validators.required],
          store_address: [''],
          chips: [''],
          //broadcast_video_length:['', [Validators.required, Validators.pattern("^[0-9]*$")]]
        });


   }

    ngOnInit(){
      if(localStorage.getItem("data")){
        let data = this.dataService.decryptData(localStorage.getItem("data"));
        this.userId = data[0]['user_id'];
      }
      //this.userId = localStorage.getItem("user_id")
      this.getActivatedStore()
      if(this.userId == undefined && this.userId == null){
        this.router.navigate(['/login'])
      }
      
      // this.dataService.getProducts(this.start,this.limit).subscribe(response => {
      //   console.log(response);
      //     if(response['success'] == true){
      //       this.products = response['body']
      //     }
      // });


    }

    handleFileInput(event: any) {
       this.file = event.target.files
    }

  __getMyStoreProduct(storeId:any){
    this.productData['store_id'] = storeId
    this.productData['user_id'] = this.userId
    this.dataService.getProducts(this.start,this.limit).subscribe(response => {
      console.log(response,"+++++++))))))))")
       if(response['success'] == true){
          this.totalProduct = response['body']['totalRecords']
          this.products = response['body']['rows']
         // console.log(this.shopifyProduct,"+++++++")
        }
    });
  }

    view_products(start:any,limit:any){
      this.loading = true;
      this.start = start+this.start;
      this.limit = limit;
      this.dataService.getProducts(this.start,this.limit).subscribe(response => {
         this.loading = false;
          if(response['success'] == true){  
            this.totalProduct = response['body']['totalRecords']        
            this.products = this.products.concat(response['body']['rows']);
          }
          else{this.toastr.errorToastr(response['message']);}
      });
    }


    getActivatedStore(){
      this.dataService.getPublishedStore().subscribe(response =>{
        if(response['success'] == true){
          this.store_data = response['body'];
          var index = this.store_data.findIndex(function(pro:any) {
              return pro['isActive'] == 1
          })
          console.log(this.store_data[index]['id'],"++++++++++++")
          this.store_id = this.store_data[index]['id']
          this.__getMyStoreProduct(this.store_id)

        }
      },error =>{console.log(error);})
    }

    fileChangeEvent(event: any){
        this.imageChangedEvent = event;
        //console.log(this.imageChangedEvent,"-----")

    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;     
    }
    imageLoaded(event:any) {

      this.bannerWidth = event.original.size['width']
      this.bannerHeight = event.original.size['height']

      if(this.bannerWidth < 1280 && this.bannerHeight < 768)
      {
        this.toastr.errorToastr('Please upload recommended dimension banner');
        this.croppedImage = ""
        this.isFileSelected = false;
        return;
      }
    }
    cropperReady() {
        this.stepDisabled = true;
    }
    loadImageFailed() {
        this.toastr.errorToastr('Please select correct image format');
        this.stepDisabled = false;
       // console.log("show message")
    }


    allowDrop(event: any) {
     // console.log("dropped")
      event.preventDefault();
    }


    onDragLeave(evt:any) {
      evt.preventDefault();
      evt.stopPropagation();
     // console.log(this.croppedImage)
    }

    readImageFile(file: any) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.croppedImage = e.target.result;
       // console.log(e.target.result)
      };
      reader.readAsDataURL(file);
    }

    dropHandler(event: any)
    {
      if (!this.isFileSelected && event.dataTransfer.items.length > 0 &&
        event.dataTransfer.items[0].kind === 'file' &&
        event.dataTransfer.items[0].type.indexOf('image') > -1) {
       // console.log("enter")
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

  onItemAdded(event:any){
    this.hashtagValue.push(event.value)
    this.hashtagValues = this.hashtagValue.toString()  
  }

  get f() { return this.streamForm.controls; }
  get fe() { return this.streamingDetail.controls; }

  onChecked(product: any, event: any){
    
    let {checked, value} = event.target;
   
      if(checked) {
        this.checkedItems.push(value);
      } else {
        let index = this.checkedItems.indexOf(value)
        if (index !== -1) this.checkedItems.splice(index, 1);
        //this.prodUniqueIds.splice(index, 1);
      }
     // console.log(this.checkedItems)
    }


  createStreamingChannel(Formdata : any){
      this.submitted = true;
      if (this.streamForm.invalid) {
        this.stepDisabled = false;
          return;
      }
      else
      {
        Formdata['user_id'] = this.userId
        Formdata['store_id'] = this.store_id
         this.dataService.createStreamingChannel(Formdata).subscribe(response => {
          //console.log(response)
            if(response['success'] == true){
              this.channelID =  response['data']['body']['insertId']
              //console.log(response['data']['body']['insertId'])
              this.toastr.successToastr(response['data']['message']);
              //this.stepDisabled = true;
              this.selectedIndex = 1;
            }else{
              this.stepDisabled = false;
              this.selectedIndex = 0
              this.toastr.errorToastr(response['message']); 
            }
        });
    }
  }

  saveStreamingDetail(Data : any){
    this.submitted = true;
    this.selectedIndex = 2
     if (this.streamingDetail.invalid) {
        this.stepDisabled = false;
          return;
      }
      else
      {
        if(this.hashtagValues == undefined){
          this.hashtagValues = ''
        }

        Data['channelTag'] = this.hashtagValues
        Data['user_id'] = this.userId
        Data['channel_id'] = this.channelID
        Data['store_id'] = this.store_id

        let encrypted_data = this.dataService.encryptData(Data);

        const formData = new FormData();
        formData.append('data', encrypted_data);

        console.log(this.file,"++++")
        if(this.file != undefined){
              if(this.file)
              {
              for (var i = 0; i < this.file.length; i++) { 
                formData.append("promo_video", this.file[i]);
              }
          }else{
              formData.append("promo_video", this.file);
          }
        }

      
        
        this.dataService.saveStreamingDetail(formData).subscribe(response => {
          //console.log(response)
            if(response['success'] == true){
              this.toastr.successToastr(response['message']);
              this.lastId = response['body']['insertId'];
              //this.stepDisabled = true;
              this.selectedIndex = 3;
             // console.log(this.lastId,'lastid');
            }else{
                this.stepDisabled = false;
                this.selectedIndex = 2
              this.toastr.errorToastr(response['message']); 
            }
        });
    }
  }

  /*Validate the upload broadcast Banner*/
    // onSelectFile(event:any) {
    //   if (event.target.files && event.target.files[0]) {
    //    var reader = new FileReader();
    //     this.file = event.target.files[0]
    //     this.ImageObject =event;

    //     if(this.file != undefined && this.file != null)
    //     {
    //       var strFileName = this.getFileExtension(this.file.name);
    //       if(strFileName != 'jpeg' && strFileName != 'png' && strFileName != 'jpg'){
    //         this.toastr.errorToastr('Please select correct image format');
    //         this.stepDisabled = false;
    //         return;
    //       }
    //       else
    //       {
    //         this.stepDisabled = true;
    //         reader.readAsDataURL(event.target.files[0]); // read file as data url
    //         reader.onload = (event) => { // called once readAsDataURL is completed
    //           this.url = reader.result;
    //         }
    //       }
    //     }
    //     else
    //     {
    //       this.toastr.errorToastr('Please select image');
    //       this.stepDisabled = false;
    //       return;
    //     }
    //   }
    // }

    delete(){
      $('.source-image').attr('src', '');
      this.stepDisabled = false; 
    }

    /* upload channel logo*/
    saveStreamingBanner(ImageData:any)
    {
      if(!this.croppedImage)
      {
          this.toastr.errorToastr('Please select correct image format');
          this.stepDisabled = false;
          return;
      }
      else
      {
        this.imageData['channel_id'] = this.channelID
        this.imageData['cover_image'] = this.croppedImage
        this.dataService.uploadBroadcastBanner(this.imageData).subscribe(response => {
          if(response['success'] == true){
            this.toastr.successToastr(response['message']);
            this.stepDisabled = true;
            this.selectedIndex = 2
          }
          else {
            this.stepDisabled = false;
            this.selectedIndex = 1;
            this.toastr.errorToastr(response['message']); 
          }
        },
        error => {
            this.selectedIndex = 1;
            this.stepDisabled = false;
            this.toastr.errorToastr(error);
        });
      }
    }

    getFileExtension(filename : any) {
      return filename.split('.').pop();
    }

  saveStreamingProducts(Formdata : any){
    console.log(this.checkedItems)
    this.submitted = true;
     if (this.streamingProducts.invalid) {
          return;
      }
      else
      {
        //console.log(Formdata)
         Formdata['channel_id'] = this.lastId
         Formdata['product_ids'] = this.checkedItems.toString()
         Formdata['store_id'] = this.store_id
         this.dataService.selectBroadcastingProduct(Formdata).subscribe(response => {
          //console.log(response)
            if(response['success'] == true){
              this.toastr.successToastr(response['message']);
              this.router.navigate(['inventory'])
            }else{
               this.stepDisabled = false;
               this.selectedIndex = 3
              this.toastr.errorToastr(response['message']); 
            }
        });
    }
  }

}
