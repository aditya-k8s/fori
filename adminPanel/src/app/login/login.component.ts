import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl,FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  isServerError : boolean = false;
  checked: boolean = false;  
  isRemember: boolean = false;
  isBtnDisabled : boolean = false; 

  constructor(
      private route: ActivatedRoute,
      private dataService: DataService,
    	private formBuilder:FormBuilder,
      private router: Router,
      public toastr : ToastrManager,
    ) {
  		this.loginForm = this.formBuilder.group({
	      username: ['', Validators.required],
	      password: ['', Validators.required]

      });
   }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; } 

  onSubmit(loginFormdata:any){
   this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }else{
      let encrypted_data = this.dataService.encryptData(loginFormdata);
      let data = {'data' : encrypted_data};
      this.dataService.login(data).subscribe(response => {
        if(response['success'] == true){
          this.isServerError = false;
          if(response['data'][0]['isAdmin']==1){
            this.toastr.successToastr("success");
            sessionStorage.setItem('user_id',response['data'][0]['user_id']);
            sessionStorage.setItem('_username',response['data'][0]['username']);
            sessionStorage.setItem('email',response['data'][0]['email']);
            sessionStorage.setItem('first_name',response['data'][0]['first_name']);
            sessionStorage.setItem('token',response['token']);
            sessionStorage.setItem('isPay_account',response['data'][0]['isPay_account']);
            sessionStorage.setItem('flag','flag');
            this.router.navigate(['/']);
          }
          else{
            this.toastr.errorToastr("You are not authorized person.");
          }
        }
        else{
          this.toastr.errorToastr(response['message']);
        }
      },error => {
        console.log(error);
      });
    }
  }

  term(isChecked: boolean){
    if(isChecked) {
      this.isRemember = true;
    }else {
      // this.cookieService.delete('Email');
      // this.cookieService.delete('Password');
      // this.isRemember = false;
    }
  }

}
