import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-payment-data',
  templateUrl: './payment-data.component.html',
  styleUrls: ['./payment-data.component.css']
})
export class PaymentDataComponent implements OnInit {

	paymentForm: FormGroup;
	userId :any = []
	submitted = false
	countries: any = []
  user : any = []
  stripe:any
  loading = false

  constructor(
	  private router: Router,
  	private formBuilder:FormBuilder,
  	private dataService: DataService,
  	public toastr : ToastrManager,
    private titleService:Title
  	) { 
      this.titleService.setTitle("Payment Details");

  		this.paymentForm = this.formBuilder.group({
          payment_gateway: ['', Validators.required],
        	public_key: ['', Validators.required],
          private_key: ['']
     	});

  	}


  ngOnInit(){
    if(localStorage.getItem("data")){
      let data = this.dataService.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
  	//this.userId = localStorage.getItem("user_id")
  	if(this.userId == undefined && this.userId == null){
  		this.router.navigate(['/login']);
  	}


    this.dataService.getPaymentGateway(this.userId).subscribe(response => {
        if(response['success'] == true){
          this.stripe = response['body'][0]
          this.paymentForm.patchValue({
            'payment_gateway' : this.stripe['payment_gateway'],
            'public_key' : this.stripe['public_key'],
            'private_key' :this.stripe['private_key'],
          })
        }
    });

    

  }

  get f() { return this.paymentForm.controls; }

    onSubmit(Formdata:any){
  	this.submitted = true;
    this.loading = true;
  	if (this.paymentForm.invalid) {
      this.loading = false;
        return;
    }
    else
    {

      Formdata['user_id'] = this.userId
      this.dataService.saveGatewayDetails(Formdata).subscribe(response => {
          this.loading = false;
          if(response['success'] == true){
            	// this.isServerError = false;
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
