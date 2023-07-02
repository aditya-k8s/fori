import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl,FormArray } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-editusers',
  templateUrl: './editusers.component.html',
  styleUrls: ['./editusers.component.css']
})
export class EditusersComponent implements OnInit {
	profileForm: FormGroup;
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
  ){ 
  	this.profileForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dob: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  get f() { return this.profileForm.controls; }

  ngOnInit(){
  	this.routers.paramMap.subscribe((params: ParamMap) => {
	    this.user_id= params.get('user_id');
    });
    this.getCountries();
    this.getUserDetails();
  }

  getCountries(){
    this.dataService.getCountry().subscribe(response => {
      if(response['success'] == true){
      	this.countries = response['data']
      }
    });
  }

  getUserDetails(){
    this.dataService.getUserById(this.user_id).subscribe(response => {
      if(response['success'] == true){
        this.user = response['data'][0];
        this.profileForm.patchValue({
          'first_name' : this.user['first_name'],'last_name' : this.user['last_name'],
          'country':this.user['country'],'dob' : (this.user['dob']),
        })
      }
    })
  }

  onSubmit(Formdata:any){
  	this.submitted = true;
  	if (this.profileForm.invalid) {
      return;
    }else{
      Formdata['user_id'] = this.user_id
      this.dataService.updateUserProfile(Formdata).subscribe(response => {
        if(response['success'] == true){
          this.toastr.successToastr(response['message']);
        }else{
          this.toastr.errorToastr(response['message']); 
        }
      },error => {
        this.toastr.errorToastr(error);
      });
  	}
  }

}