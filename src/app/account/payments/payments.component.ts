import { Component, OnInit, HostListener,ViewChild, ElementRef } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl,FormArray }  from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Title } from "@angular/platform-browser";
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
	 //@ViewChild('file', { static: false }) fileupload: ElementRef;
  file: any;
	public files: NgxFileDropEntry[] = [];
	paymentForm: FormGroup
 	submitted = false;
 	loading = false
 	bankData : any = []
 	userId :any = []
 	imageChangedEvent: any = '';
 	getData :any = []
 	image_url = '';
 	isFileSelected = false
 	newFile = true


  constructor(
  		private route: ActivatedRoute,
	  	private dataService: DataService,
	    public toastr : ToastrManager,
	  	private formBuilder:FormBuilder,
	  	private router: Router,
	    private authService: SocialAuthService,
	    private titleService:Title 
	){ 
		
   		this.titleService.setTitle("Bank Information");
   		this.image_url = environment.image_url;

  		this.paymentForm = this.formBuilder.group({
	      bank_name: ['', Validators.required],
	      bank_address: ['', Validators.required],
	      account: ['', Validators.required],
	      routing: ['', Validators.required],
	      business_name: [''],
	      business_address: [''],
    	});
    }

	get f() { return this.paymentForm.controls; }
	
	ngOnInit(): void {
		if(localStorage.getItem("data")){
			let data = this.dataService.decryptData(localStorage.getItem("data"));
			this.userId = data[0]['user_id'];
		}
	  	//this.userId = localStorage.getItem("user_id")
	  	this.getBankDetails()
	}

	getBankDetails() {
	    this.dataService.getBankDetails().subscribe(response => {
			if(response['success'] == true){
				if(response['body'] != ''){
					this.getData = response['body'][0]['business_doc']
					if(this.getData) {
						this.isFileSelected = true
						this.newFile = false
					}
					this.paymentForm.patchValue({
						'bank_name' : response['body'][0]['bank_name'],
						'bank_address' : response['body'][0]['bank_address'],
						'account' : response['body'][0]['account'],
						'routing' : response['body'][0]['routing'],
						'business_name' : response['body'][0]['business_name'],
						'business_address' : response['body'][0]['business_address']
					})
				}
			}else{
				this.toastr.errorToastr(response['message']); 
			}
        },error => {this.toastr.errorToastr(error);});
    }

    //addNewDocument() {
    	//this.newFile = true
    //}
	

	handleFileInput(event: any) {
    	 this.file = event.target.files
	}

	onSubmit(PayData:any){
	  	this.submitted = true;
	    if (this.paymentForm.invalid) {
	        return;
	    }
	    else
	    {
	    	PayData['user_id'] = this.userId
	    	let encrypted_data = this.dataService.encryptData(PayData);

	    	const formData = new FormData();
	    	formData.append('data', encrypted_data);

	    	if(this.file != undefined){
	            if(this.file)
	            {
			        for (var i = 0; i < this.file.length; i++) { 
			          formData.append("business_doc", this.file[i]);
			        }
			    }else{
			        formData.append("business_doc", this.file);
			    }
		 	}

		    this.dataService.addBankDetail(formData).subscribe(response => {
 
	            if(response['success'] == true) {
	               this.toastr.successToastr(response['message']);
	            }
	             else{
	              this.toastr.errorToastr(response['message']); 
	            }
	        },error => {this.toastr.errorToastr(error);});
	   	}
	}

}
