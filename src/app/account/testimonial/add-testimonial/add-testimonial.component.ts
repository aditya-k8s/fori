import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { DataService } from '../../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {DataTablesModule} from 'angular-datatables';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-add-testimonial',
  templateUrl: './add-testimonial.component.html',
  styleUrls: ['./add-testimonial.component.css']
})
export class AddTestimonialComponent implements OnInit {
	testimonialForm: FormGroup
    loading = false
    userId :any = []
    submitted = false
    testimonialID :any =[]
    status:any
  constructor(
  	private router: Router,
	private route: ActivatedRoute,
	private dataService: DataService,
	public toastr : ToastrManager,
	private formBuilder:FormBuilder,
	private titleService:Title
	) {  
    	this.titleService.setTitle("Testimonial");

		this.testimonialForm = this.formBuilder.group({
	        title: ['', Validators.required],
	        description: ['', Validators.required],
	  	});
	}

    ngOnInit(){
		if(localStorage.getItem("data")){
			let data = this.dataService.decryptData(localStorage.getItem("data"));
			this.userId = data[0]['user_id'];
		}
  		//this.userId = localStorage.getItem("user_id")

  		this.route.queryParams.subscribe(params => {
	       	this.status = params['status'];
	        this.testimonialID = params['id'];
	          if(this.status == 'edit' && this.testimonialID){
	            this.getTestimonial();
	          }
        });

    }


   get f() { return this.testimonialForm.controls; }

    getTestimonial() {
   		this.dataService.getTestimonialDetail(this.testimonialID).subscribe(response => {
    	 	this.loading = false;
	        if(response['success'] == true){
	        	this.testimonialForm.patchValue({
		            'title' : response['body'][0]['title'],
		            'description' : response['body'][0]['description'],
        		})

	       	}else{
	       		this.toastr.errorToastr(response['message']); 
	      	}
	    });
    }

    onSubmit(Formdata : any){
	
    	this.submitted = true
	    if (this.testimonialForm.invalid) {
	        return;
	    }
	    else
	    {
	    	this.loading = true;
	    	if(this.status == 'edit' && this.testimonialID){
	    		Formdata['testimonial_id'] = this.testimonialID
	    	}
	    	Formdata['user_id'] = this.userId
	    	this.dataService.addTestimonial(Formdata).subscribe(response => {
	    	 	this.loading = false;
		        if(response['success'] == true){
		        	this.toastr.successToastr(response['message']);
		        	this.router.navigate(['/account/testimonials/list'])
		       	}else{
		       		this.toastr.errorToastr(response['message']); 
		      	}
	    	});

	    }
	}

}
