import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl,FormArray }  from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
	forgotPasswordForm: FormGroup
	submitted = false

	constructor(
	  private route: ActivatedRoute,
		private dataService: DataService,
    public toastr : ToastrManager,
		private formBuilder:FormBuilder,
		private router: Router,
    private titleService:Title
	){
      this.titleService.setTitle("Forgot Password");

	    this.forgotPasswordForm = this.formBuilder.group({
	  		email: ['', Validators.required],
	  	})
   }

   get f() { return this.forgotPasswordForm.controls; }

  ngOnInit(): void {
  }

    onSubmit(Formdata:any){
  	this.submitted = true;

    if (this.forgotPasswordForm.invalid) {

        return;
    }
    else
    {

      this.dataService.forgotPassword(Formdata)
       .subscribe(
          response => {
             if(response['success'] == true){
              this.toastr.successToastr(response['message']);

            //  this.router.navigate(['/']);
             }
             else{
              this.toastr.errorToastr(response['message']); 
            }
          },
          error => {
            this.toastr.errorToastr(error);
             console.log(error);
        });
    }
  }

}
