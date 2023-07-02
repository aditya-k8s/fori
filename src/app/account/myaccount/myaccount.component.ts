import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

	profileForm: FormGroup;
	userId :any = []
	submitted = false
	countries: any = []
  user : any = []
  loading = false

  constructor(
	  	private router: Router,
	  	private formBuilder:FormBuilder,
	  	private dataService: DataService,
	  	public toastr : ToastrManager,
      private titleService:Title
  	) { 

    this.titleService.setTitle("My Account");

  	this.profileForm = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: [''],
        dob: ['', Validators.required],
        country: ['', Validators.required],
        shopper_name: [''],
     });
  }

  get f() { return this.profileForm.controls; }

  ngOnInit(){
    if(localStorage.getItem("data")){
      let data = this.dataService.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
  	//this.userId =localStorage.getItem("user_id")
  	if(this.userId == undefined && this.userId == null){
  		this.router.navigate(['/login']);
  	}

    this.getCountries();
    this.getUserDetail();

  }

  getUserDetail() {
    this.dataService.getUserDetails(this.userId).subscribe(response => {
      if(response['success'] == true){
        this.user = response['data'][0]
        this.profileForm.patchValue({
            'first_name' : this.user['first_name'],
            'last_name' : this.user['last_name'],
            'shopper_name' : this.user['shopper_name'],
            'dob' :this.user['dob'],
            'country' : this.user['countryName']
        })
      }
    })
  }

  getCountries(){
    this.dataService.getCountry().subscribe(response => {
      if(response['success'] == true){
        this.countries = response['data']
      }
    });
  }

  onSubmit(Formdata:any){
  	this.submitted = true;

  	if (this.profileForm.invalid) {
        return;
    }else{
        this.loading = true;
        Formdata['user_id'] = this.userId
        this.dataService.updateUserProfile(Formdata).subscribe(response => {
            this.loading = false;
            if(response['success'] == true){
               localStorage.setItem("data",this.dataService.encryptData(response['data']));
              this.toastr.successToastr(response['message']);
            }else{
              this.toastr.errorToastr(response['message']); 
            }
        	},
        	error => {
            this.toastr.errorToastr(error);
      });
  	}
  }

}
