import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl,FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  updateProfile: FormGroup;
  submitted = false;
  constructor(
    private dataService: DataService,
    private formBuilder:FormBuilder,
    private router: Router,
    public toastr : ToastrManager,
  ) { 
    this.updateProfile = this.formBuilder.group({
        username: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(15)]],
        // password: ['', Validators.required,Validators.minLength(8)],
        // confirmpassword: ['', Validators.required,Validators.minLength(8)]
    });
  }

  ngOnInit() {
    let userId = sessionStorage.getItem("user_id")
    this.dataService.getUserById(userId).subscribe( data => {
        this.updateProfile.controls['username'].setValue(data['data'][0]['username']);
        this.updateProfile.controls['first_name'].setValue(data['data'][0]['first_name']);
        this.updateProfile.controls['last_name'].setValue(data['data'][0]['last_name']);
        this.updateProfile.controls['email'].setValue(data['data'][0]['email']);
        this.updateProfile.controls['phone'].setValue(data['data'][0]['phone']);
        // this.updateProfile.setValue(data['data'][0]);
    });
  }

  get f() { return this.updateProfile.controls; } 

 onSubmit(userProfileData:any){
    this.submitted = true;
    if (this.updateProfile.invalid) {
      return;
    }else{
      // this.dataService.updateProfile(userProfileData).subscribe((response:any) => {
      //   if(response['success'] == true){
      //   }else{

      //   }
      // },(error:any) => {
      //   console.log(error);
      // });
    } 
  }

}
