import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	file: any
	url :any
	userId :any = []
	user : any = []
	image_url = ''
	profile :any 
	showMenu = '';
	user_type:any
	channelName: any
	InfluencerName: any
	imageChangedEvent: any = '';
	croppedImage: any = '';
	droppedImage:any = '';
	isFileSelected :any
	public files: NgxFileDropEntry[] = [];
    bannerWidth : any
	bannerHeight : any
	newImage :any
	MarchantData : any = { }

    constructor(
	  	private dataService: DataService,
	    public toastr : ToastrManager,
	    private routers: ActivatedRoute,
		private router: Router,
	    private authService: SocialAuthService
  	) { 
	  	this.image_url = environment.image_url;
  	}

	ngOnInit(){

	if(localStorage.getItem("data")){
		let data = this.dataService.decryptData(localStorage.getItem("data"));
		this.userId = data[0]['user_id'];
		this.user_type = data[0]['user_type'];
		this.url =  data[0]['profile_Pic'];
	}

	let pageURL = window.location.href; 
	this.showMenu = pageURL.substr(pageURL.lastIndexOf('/') + 1);

	this.getUserDetails(this.userId)

	}

	// onImgErrors(event:any){
	// 	 event.target.src = './assets/img/shopper_default_icon.jpg'
	// 	//Do other stuff with the event.target
	// }

	click_profile() {
		this.dataService.delProfilePic(this.userId).subscribe(response => {
	    if(response['success'] == true){
	    	this.url = ''
	    	localStorage.setItem("data",this.dataService.encryptData(response['body']));
			this.toastr.successToastr(response['message']);
	    }
	    else
	    {
	    	this.toastr.errorToastr(response['message']);
	    }})
	}

	getUserDetails(user:any) {
		this.dataService.getUserDetails(user).subscribe(response => {
	    if(response['success'] == true){
	      this.user = response['data'][0]
	      this.url = this.user['profile_pic'];
	       if(this.url) {
	       	this.croppedImage = this.url
	       }
	      
	      this.channelName = this.user['channel_name']

	      if(this.user['user_type'] == "3") {
	      	this.InfluencerName = '@'+this.user['username']
	      }
	      
	      //localStorage.setItem('profile_Pic',this.user['profile_pic']);
	    }})
	}

	 addClass(element: string) {
	    if (element === this.showMenu) {
	      this.showMenu = ''; 
	    } else {
	      this.showMenu = element;
	    } 
  	}

  	fileChangeEvent(event: any){
        this.imageChangedEvent = event;

    }
    imageCropped(event: ImageCroppedEvent) {``
        this.croppedImage = event.base64;
        this.newImage = event.base64
    }
    imageLoaded(event:any) {
      this.bannerWidth = event.original.size['width']
      this.bannerHeight = event.original.size['height']

      if(this.bannerWidth < 200 && this.bannerHeight < 200)
      {
      	//1280 768
        this.toastr.errorToastr('Please upload recommended dimension banner');
        this.croppedImage = this.url
        this.newImage = ''
        this.isFileSelected = false;
        return;
      }
    }
    cropperReady() {
        //this.stepDisabled = true;
    }
    loadImageFailed() {
        this.toastr.errorToastr('Please select correct image format');
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

	logout(){

	    if(localStorage.getItem("social") == "FACEBOOK" || localStorage.getItem("social") == "GOOGLE"){
	    	this.authService.signOut().then(res => { console.log(res)});
		}
		localStorage.clear();
	    this.router.navigate(['login']);
	}

	updateImage()
	{
		if(this.newImage)
        {
			const formData = new FormData();
			//this.userId = localStorage.getItem('user_id')
			formData.append('user_id', this.userId);
			formData.append('profile_pic', this.croppedImage);

			this.dataService.updateProfilePic(formData).subscribe(response => {
                if(response['success'] == true){
                	this.url = response['data'][0]['profile_pic']
                	jQuery("#profile_imageModal").hide()
	                jQuery(".modal-backdrop").hide()
	                var body = $('body');
	                body.removeClass('modal-open');
                    this.toastr.successToastr(response['message']);
                }
                else{this.toastr.errorToastr(response['message']); }
        	})
			
		}
		else
		{
			this.toastr.successToastr("Profile Image Updated successfully.");
		}
	}

	changeUser(userType:any) {
		this.MarchantData['user_id'] = this.userId
		this.MarchantData['user_type'] = userType
		this.dataService.updateUserType(this.MarchantData).subscribe(response => {
	    if(response['success'] == true){
	    	let data = this.dataService.decryptData(localStorage.getItem("data"));
	    	data[0]['user_type'] = response['body']['user_type']
	    	localStorage.setItem("data",this.dataService.encryptData(data));
			this.router.navigate(['/']);
			this.toastr.successToastr(response['message']);
	    }
	    else
	    {
	    	this.toastr.errorToastr(response['message']);
	    }})
		
	}

}
