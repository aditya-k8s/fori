import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatStepper } from '@angular/material/stepper';
import { environment } from '../../../environments/environment';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {Title} from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-edit-stream',
  templateUrl: './edit-stream.component.html',
  styleUrls: ['./edit-stream.component.css']
})
export class EditStreamComponent implements OnInit {
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
  lastId :any = []
  channel_data:any=[];
  broadcast_data:any=[];
  stream_id:any;
  image_url = '';
  minDate : any;
  showPickupAddress: any;
  hashtagValue :any = []
  hashtagValues : any
  tags:any = []
  checkIndex:any
  imageData:any = {}
  bannerWidth : any
  bannerHeight : any
  newImage :any
  start = 0;
  limit = 20;
  store_id:any
  store_data : any = [];
  productData :any = {}
  promoVideo:any
  totalProduct = false
  loading = false

  constructor( private routers: ActivatedRoute, private router: Router,
  private dataService: DataService,
  public toastr : ToastrManager,
  private formBuilder:FormBuilder,
  private titleService:Title,
   private ngxService: NgxUiLoaderService,
  ) { 
      this.titleService.setTitle("Edit Stream");

  	   this.image_url = environment.image_url;
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


    var nowDate = new Date(); 
    this.minDate = new Date(nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate());
}

  ngOnInit() {
    if(localStorage.getItem("data")){
      let data = this.dataService.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
  	 //this.userId = localStorage.getItem("user_id")
      this.getActivatedStore()
      if(this.userId == undefined && this.userId == null){
        this.router.navigate(['/login'])
      }
      this.routers.paramMap.subscribe((params: ParamMap) => {
	      this.stream_id= params.get('stream_id');
	    });


       this.getstreamingDetail();
       this.getBroadcastName();

  }

  delete_promo() {
      this.dataService.deletePromovideo(this.broadcast_data['channel_id']).subscribe(response => {
         console.log(response)
         if(response['success']) {
          this.toastr.successToastr(response['message']);
         }else {
          this.toastr.errorToastr(response['message']);
         }
      });

  }

  getstreamingDetail() {
    this.ngxService.start();
    this.dataService.getBroadcastDetails(this.stream_id).subscribe(response => {
       this.ngxService.stop();
       //console.log(response,"details")
        this.broadcast_data = response['body'][0];
        if(this.broadcast_data['promo_video']) {
         this.promoVideo = this.image_url+this.broadcast_data['promo_video']
        }
        if(this.broadcast_data['channelTag'] != "") {
          this.hashtagValue = this.broadcast_data['channelTag'].split(',')
        }
        else{ this.hashtagValue = []; } 

        if(this.broadcast_data['product_id_link']) {
          this.checkedItems = this.broadcast_data['product_id_link'].split(',');
        }

        this.showPickupAddress = this.broadcast_data['store_pickup']
        this.streamingDetail.patchValue({
          'broadcast_time' : new Date(this.broadcast_data.broadcast_time),
          'store_address' : this.broadcast_data.pickup_address,
          //'broadcast_video_length' : this.broadcast_data[0].broadcast_video_length,
        })
    });
  }

  getBroadcastName() {
      // this.broadcast_datas['user_id'] = this.userId;
    this.dataService.getStreamingChannelbyid(this.stream_id).subscribe(response => {
        //console.log(response['body']);
     this.channel_data = response['body'];

     if(this.channel_data['banner_image'] != null){
       this.croppedImage = this.image_url+this.channel_data['banner_image']
     }
     
      let data = response['body'];
       this.streamForm.patchValue({
          'stream_title' : data.title,
          'stream_description' : data.description,
        })
    });
  }

  getMyStoreProduct(storeId:any){
        this.productData['store_id'] = storeId
        this.productData['user_id'] = this.userId
        this.dataService.getProducts(this.start,this.limit).subscribe(response => {
          console.log(response,"+++++++))))))))")
           if(response['success'] == true){
              this.products = response['body']['rows']
              this.totalProduct = response['body']['totalRecords'] 
              for (let checked of this.checkedItems){
              var index = this.products.findIndex(function(pro:any) {
                  return pro['product_id'] == checked
              })
               if(index != -1){
                this.products[index]['checked'] = true
                }
              }
              console.log(this.checkedItems,"yoooooo")
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
            for (let checked of this.checkedItems){
              var index = this.products.findIndex(function(pro:any) {
                  return pro['product_id'] == checked
              })
               if(index != -1){
                this.products[index]['checked'] = true
                }
              }
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
          this.store_id = this.store_data[index]['id']
          this.getMyStoreProduct(this.store_id)

        }
      },error =>{console.log(error);})
    }


  get f() { return this.streamForm.controls; }
  get fe() { return this.streamingDetail.controls; }

         fileChangeEvent(event: any){
        this.imageChangedEvent = event;
        console.log(this.imageChangedEvent,"-----")

    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.newImage = event.base64
        console.log(this.croppedImage,"--------")
    }
    imageLoaded(event:any) {
      this.bannerWidth = event.original.size['width']
      this.bannerHeight = event.original.size['height']

      if(this.bannerWidth < 1280 && this.bannerHeight < 768)
      {
        this.toastr.errorToastr('Please upload recommended dimension banner');
        this.croppedImage = this.image_url+this.channel_data['banner_image']
        this.newImage = ''
        this.isFileSelected = false;
        console.log(this.croppedImage,"444")
        return;
      }
    }
    cropperReady() {
      console.log('cropReady')
        this.stepDisabled = true;
    }
    loadImageFailed() {
        // show message
        this.toastr.errorToastr('Please select correct image format');
        this.stepDisabled = false;
        console.log("show message")
    }


    allowDrop(event: any) {
      console.log("dropped")
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
        console.log(e.target.result)
      };
      reader.readAsDataURL(file);
    }

    dropHandler(event: any)
    {
      if (!this.isFileSelected && event.dataTransfer.items.length > 0 &&
        event.dataTransfer.items[0].kind === 'file' &&
        event.dataTransfer.items[0].type.indexOf('image') > -1) {
        console.log("enter")
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
    console.log(evt,"over")
    evt.preventDefault();
    evt.stopPropagation();
}



  onItemAdded(event:any){
    this.hashtagValue.push(event.value)
   }

  onItemRemoved(event:any){
    let index = this.hashtagValue.indexOf(event);
    //console.log(this.hashtagValue,"--------",index,"----",event.value)
      if (index > -1) {
          this.hashtagValue.splice(index, 1);
      } 
  }

    onChecked(product: any, event: any){
    
    let {checked, value} = event.target;
   
      if(checked) {
        this.checkedItems.push(value);
      } else {
        let index = this.checkedItems.indexOf(value)
        if (index !== -1) this.checkedItems.splice(index, 1);
        //this.prodUniqueIds.splice(index, 1);
      }
      console.log(this.checkedItems,"-------------------")
    }
    
  createStreamingChannel(Formdata : any){
      this.submitted = true;
      
      if (this.streamForm.invalid) {
        this.stepDisabled = false;
          return;
      }
      else
      {
        

        Formdata['channel_id'] = this.stream_id
       // console.log(Formdata);
         this.dataService.updateStreamingChannel(Formdata).subscribe(response => {
         /// console.log(response)
            if(response['success'] == true){
             // this.channelID =  response['data']['body']['insertId']
              //console.log(response['data']['body']['insertId'])
              this.toastr.successToastr(response['data']['message']);
              this.stepDisabled = true;
              this.selectedIndex = 1;
            }else{
              this.stepDisabled = false;
              this.selectedIndex = 0
              this.toastr.errorToastr(response['message']); 
            }
        });
    }
  }

    delete(){
      this.url = '';
      this.file = null;
      this.stepDisabled = false; 
    }
        /* Save channel logo*/
    saveStreamingBanner(ImageData:any)
    {
      console.log(this.newImage,"file")

          if(this.newImage)
          {
            this.imageData['channel_id'] = this.stream_id
            this.imageData['cover_image'] = this.croppedImage
            console.log(this.imageData,"--------------")
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
            })
             
          }
          else{
              this.stepDisabled = true;
              this.selectedIndex = 2
              this.toastr.successToastr("Cover Image Updated successfully.");
          }
     

    }

    // getFileExtension(filename : any) {
    //   return filename.split('.').pop();
    // }

    handleFileInput(event: any) {
       this.file = event.target.files
    }

    saveStreamingDetail(Data : any){
    	console.log(Data)
    this.submitted = true;
     if (this.streamingDetail.invalid) {
      console.log("invlid")
        this.stepDisabled = false;
          return;
      }
      else
      {
         console.log("enterrr")
        this.hashtagValues = this.hashtagValue.toString()
        Data['channelTag'] = this.hashtagValues
        Data['user_id'] = this.userId
        Data['channel_id'] = this.stream_id

        let encrypted_data = this.dataService.encryptData(Data);

        const formData = new FormData();
        formData.append('data', encrypted_data);

        
        if(this.file != undefined){
          if(this.file)
          {
            for (var i = 0; i < this.file.length; i++) { 
              formData.append("promo_video", this.file[i]);
            }
          }
          else{
                formData.append("promo_video", this.file);
          }
        }



        // Formdata['channelTag'] = this.hashtagValues
        // Formdata['user_id'] = this.userId
        // Formdata['channel_id'] = this.stream_id
         console.log(this.file)
         this.dataService.updateStreamingDetail(formData).subscribe(response => {
            if(response['success'] == true){
              this.toastr.successToastr('Streaaming upddate successfully');
              this.stepDisabled = true;
              this.selectedIndex = 3;
            }else{
                this.stepDisabled = false;
                this.selectedIndex = 2
              this.toastr.errorToastr(response['message']); 
            }
        });
    }
  }

  saveStreamingProducts(Formdata : any){
    this.submitted = true;
      if (this.streamingProducts.invalid) {
          return;
      }
      else
      {
        Formdata['channel_id'] = this.broadcast_data.id;
        Formdata['store_id'] = this.store_id
        if(this.checkedItems){
            Formdata['product_ids'] = this.checkedItems.toString()
        }
         
         this.dataService.selectBroadcastingProduct(Formdata).subscribe(response => {
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
