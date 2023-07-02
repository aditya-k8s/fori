import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Title} from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css'],
})
export class InterestComponent implements OnInit {
	interestList : any
	interestFormData: any = {} 
	loading = false
	tagsValue : any = []
	isSelected = false
	userId:any

    constructor(private router: Router,
      private dataService: DataService,
      public toastr : ToastrManager,
      private formBuilder:FormBuilder,
      private titleService:Title,
      private ngxService: NgxUiLoaderService,
    ) {

    this.titleService.setTitle("Let’s Go Shopping!");

  }


  ngOnInit(): void {
    if(localStorage.getItem("data")){
      let data = this.dataService.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
  	//this.userId = localStorage.getItem("user_id")
  	this.__getAllInterest();

      //this.appService.getEvents(this.actions).then((events: CalendarSchedulerEvent[]) => this.events = events);
  }

	__getAllInterest(){
       this.ngxService.start(); 
	  	  this.dataService.getInterestList().subscribe(response => {
	       this.ngxService.stop(); 
	       if(response['success'] == true){
	          this.interestList = response['body']
	        }
	    });
	}

    __onChangeInterest( tags: any, event: any) {
       let {checked, value} = event.target;
      if(checked) {
        this.tagsValue.push(tags);
      } else {
      	let index = this.tagsValue.indexOf(tags)
        this.tagsValue.splice(index, 1);
      }
       
    }

	__selectInterest() { // Submit all the hasgtags values
	  	this.loading = true
	  	this.interestFormData['user_id'] = this.userId
	  	this.interestFormData['tags'] = this.tagsValue
	  	this.dataService.userInterest(this.interestFormData).subscribe(response => {
        this.loading = false
         if(response['success'] == true){
            this.router.navigate(['/account/profile']);
        }
        else{
            this.toastr.errorToastr(response['message']); 
        } 
    	})
	}


}
