import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup,AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PasswordStrengthValidator } from "../../validators/password-strength.validators";
import { UsernameValidator } from '../../validators/username.validator';  
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup
	submitted = false
  isServerError : boolean = false
  countries: any = []
  user_type:any
  registerSection =false
  userTypeSec = true
  fieldTextType: boolean = false;
  is_captcha : boolean = false;
  isRecaptcha : boolean = false;
  loading = false
  registerSuccess = false

   	constructor(
  	private route: ActivatedRoute,
		private dataService: DataService,
    public toastr : ToastrManager,
    private titleService:Title,
		private formBuilder:FormBuilder,
		private router: Router
    ) {
      this.titleService.setTitle("Register");

  		this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
        first_name: ['', Validators.required],
        last_name: [''],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(15)]],
        password: ['', [Validators.required,Validators.minLength(8),PasswordStrengthValidator]],
        confirmpassword: ['', [Validators.required,Validators.minLength(8)]],
        privacyPlicy: ['', Validators.required],
        country: ['', Validators.required],
        shopper_name: [''],
      	},{
             validator: this.ConfirmedValidator('password', 'confirmpassword')
        });
		
	}
  get f() { return this.registerForm.controls; }

   ngOnInit(){

      this.dataService.getCountry().subscribe(response => {
        if(response['success'] == true){
          this.countries = response['data']
        }
     });
   }

    // cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
    //     if((control.value as string).indexOf(' ') >= 0){
    //         return {cannotContainSpace: true}
    //     }
  
    //     return null;
    // }

  checkUserType(event:any){
      let {checked, value} = event.target;
       this.user_type = value
       this.registerSection = true
       this.userTypeSec = false
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

  onSubmit(registerdata:any){
  	this.submitted = true;
    if (this.registerForm.invalid) {
      this.loading = false;
        return;
    }else{
      this.loading = true;
      registerdata['user_type'] = this.user_type
      let encrypted_data = this.dataService.encryptData(registerdata);
      let data = {'data' : encrypted_data};
      this.dataService.register(data)
        .subscribe(
        	response => {
            this.loading = false;
            if(response['success'] == true){
              this.isServerError = false;
              this.toastr.successToastr('Register Successfully');
              this.registerSuccess = true
              //this.router.navigate(['/login']);
            }
            else{
              this.toastr.errorToastr(response['message']); 
            }
        	},
        	error => {
            this.toastr.errorToastr(error);
      });
    }      // this.dataService.addUser(this.user2).subscribe(data => {alert("Succesfully Added Product details")},Error => {alert("failed while adding product details")})
  }

  resolved (captchaResponse: string) {
    this.is_captcha = false;
    this.isRecaptcha = true;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
