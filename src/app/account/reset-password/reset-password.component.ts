import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl,FormArray }  from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
	resetPasswordForm: FormGroup
	submitted = false
	token : any;
  	constructor(
	  	private dataService: DataService,
	    public toastr : ToastrManager,
		private formBuilder:FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private titleService:Title
	){ 
		this.titleService.setTitle("Reset Password");

  		this.resetPasswordForm = this.formBuilder.group({
	  		newPassword: ['', [Validators.required,Validators.minLength(8)]],
        	confPassword: ['', [Validators.required,Validators.minLength(8)]]
	  	},{
             validator: this.ConfirmedValidator('newPassword', 'confPassword')
        });

        this.route.params.forEach((params: Params) => {
      		this.token = params['token'];
    	})
 	}

 	get f() { return this.resetPasswordForm.controls; }

  	ngOnInit(): void {
  	}

  	ConfirmedValidator(controlName: string, matchingControlName: string){
	    return (formGroup: FormGroup) => {
	        const control = formGroup.controls[controlName];
	        const matchingControl = formGroup.controls[matchingControlName];
	        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
	            return;
	        }
	        if (control.value !== matchingControl.value) {
	            matchingControl.setErrors({ confirmedValidator: true });
	        } else {
	            matchingControl.setErrors(null);
	        }
	    }
	  }


  	onSubmit(Formdata:any)
  	{
  		this.submitted = true;
	    if (this.resetPasswordForm.invalid) {
	        return;
	    }
	    else
	    {
	    	Formdata['forgotten_password_code']= this.token
	       this.dataService.resetPassword(Formdata).subscribe(response => {
	             if(response['success'] == true){
	              this.toastr.successToastr(response['message']);
	            	  this.router.navigate(['/login']);
	             }
	             else{
	              this.toastr.errorToastr(response['message']); 
	            }
	          },
	          error => {
	            this.toastr.errorToastr('System is in maintenance, try after few minutes.');
	             console.log(error);
	        });
	    }
  	}

}
