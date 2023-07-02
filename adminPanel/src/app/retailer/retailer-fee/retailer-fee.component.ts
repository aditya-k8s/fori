import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl,FormArray } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-retailer-fee',
  templateUrl: './retailer-fee.component.html',
  styleUrls: ['./retailer-fee.component.css']
})
export class RetailerFeeComponent implements OnInit {
  feeForm: FormGroup;
	user_id :any = []
	submitted = false
	countries: any = []
  user : any = []
  constructor(
    private router: Router,
	  	private routers: ActivatedRoute,
	  	private formBuilder:FormBuilder,
	  	private dataService: DataService,
	  	public toastr : ToastrManager,
    ) {
      this.feeForm = this.formBuilder.group({
        retail_fee: ['', Validators.required],
        subscription_fee: ['', Validators.required],
     });
    }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_id')){
      this.user_id = sessionStorage.getItem('user_id');
    }
    this.getRetailerFee();
  }

  getRetailerFee(){
    this.dataService.getfeeDetail().subscribe(response => {
      if(response['success'] == true){
        let data = response['body'];
        this.feeForm.patchValue({'retail_fee' : data['retail_fee'], subscription_fee : data['subscription_fee']});
      }else{
        this.toastr.errorToastr(response['message']); 
      }
    },error => {
      console.log(error);
    });
  }

  get f() { return this.feeForm.controls; }

  onSubmit(Formdata:any){
  	this.submitted = true;
  	if (this.feeForm.invalid) {
      return;
    }else{
      this.dataService.updatefeeDetail(Formdata).subscribe(response => {
        if(response['success'] == true){
          this.toastr.successToastr(response['message']);
        }else{
          this.toastr.errorToastr(response['message']); 
        }
      },error => {
        console.log(error);
      });
  	}
  }

}
