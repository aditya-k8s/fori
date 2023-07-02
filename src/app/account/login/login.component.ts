import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl,FormArray }  from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 	loginForm: FormGroup
 	submitted = false;
  is_captcha : boolean = false;
  isRecaptcha : boolean = false;
  isServerError : boolean = false;
  user:any=  SocialUser;
  loggedIn: any;
  socialdata:any = {}
  date : any
  item:any
  loading = false
   	constructor(
    	private route: ActivatedRoute,
  		private dataService: DataService,
      public toastr : ToastrManager,
  		private formBuilder:FormBuilder,
  		private router: Router,
      private authService: SocialAuthService,
      private titleService:Title
    ) {
      this.titleService.setTitle("Login");

  		this.loginForm = this.formBuilder.group({
	      username: ['', Validators.required],
	      password: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(15)]]
    });


     // this.user = this.SocialUser
		
	}



  ngOnInit(){


  }

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.__loginwithSocialMedia()

  }

  signInWithFB(){
    let response  = this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.__loginwithSocialMedia()
  }

  signOut(): void {
    this.authService.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('profile_Pic');
    localStorage.removeItem('shopify_verify');
  }

  __loginwithSocialMedia()
  {
    this.authService.authState.subscribe((user) => {
    this.user = user;
    this.loggedIn = (user != null);
    if(this.loggedIn == true){
        this.socialdata['username'] = user['name']
        this.socialdata['social_type'] = user['provider']
        this.socialdata['id'] = user['id']
        this.socialdata['email'] = user['email']
        this.socialdata['profile_pic'] = user['photoUrl']
        this.socialdata['firstName'] = user['firstName']
        this.socialdata['lastName'] = user['lastName']
        this.dataService.loginWithSocialMedia(this.socialdata).subscribe(response => {
          
          this.toastr.successToastr("You have been successfully logged in.");
          localStorage.setItem("data",this.dataService.encryptData(response['data']));
          // localStorage.setItem('user_id',response['data']['user_id']);
          // localStorage.setItem('profile_Pic',response['data']['profile_pic']);
          // localStorage.setItem('user_name',response['data']['username']);
          localStorage.setItem('token',response['token']);
          //localStorage.setItem('shopify_verify',response['data']['shopifyverify']);
          localStorage.setItem('social',user['provider']);
          this.setWithExpiry();
          if(response['data']['shopifyverify'] == 1){
             this.router.navigate(['/inventory']);
          }
          else{
             this.router.navigate(['create-store']);
          }
        });
      }
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(loginFormdata:any){
  	this.submitted = true;
    
    if (this.loginForm.invalid) {
        return;
    }
    else
    {
      this.loading = true;
      let encrypted_data = this.dataService.encryptData(loginFormdata);
      let data = {'data' : encrypted_data};
      this.dataService.login(data)
       .subscribe(
          response => {
            this.loading = false;
             if(response['success'] == true) {
                localStorage.removeItem('token');
                localStorage.removeItem('user_id');
                localStorage.removeItem('user_name');
                localStorage.removeItem('profile_Pic');
                localStorage.removeItem('shopify_verify');

                this.toastr.successToastr("You have been successfully logged in.");
                this.isServerError = false;
                localStorage.setItem("data",this.dataService.encryptData(response['data']));
                // localStorage.setItem('user_id',response['data'][0]['user_id']);
                // localStorage.setItem('profile_Pic',response['data'][0]['profile_pic']);
                // localStorage.setItem('user_name',response['data'][0]['username']);
                // localStorage.setItem('user_type',response['data'][0]['user_type']);
                localStorage.setItem('token',response['token']);
                //localStorage.setItem('shopify_verify',response['data'][0]['shopifyverify']);
                 this.setWithExpiry();
                 localStorage.setItem('localStorage', JSON.stringify(localStorage));
                 this.dataService.sendFCM("enable");

               if(response['data'][0]['user_type'] == "0")
               {
                    if(response['data'][0]['is_recommendation'] == "0")
                    {
                      this.router.navigate(['/interests']);
                    }
                    else{
                        this.router.navigate(['/']);
                    }
               }
               else if(response['data'][0]['user_type'] == "1")
               {
                    if(response['data'][0]['shopifyverify'] == 1){
                      this.router.navigate(['/inventory']);
                    }
                    else{
                       this.router.navigate(['/guid']);
                    }
               }
               else 
               {
                //this.router.navigate(['/guid']);
                if(response['data'][0]['influencer_details']['id'])
                {
                  this.router.navigate(['/account/profile']);
                  
                }
                else {
                  this.router.navigate(['/guid']);
                }
               }

              

             
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

  setWithExpiry() {
        let now = new Date()
        this.item = now.getTime()
        localStorage.setItem("startTime", this.item)
  }

  resolved (captchaResponse: string) {
    this.is_captcha = false;
    this.isRecaptcha = true;
  }

}
