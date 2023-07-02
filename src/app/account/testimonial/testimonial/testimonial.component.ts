import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DataTablesModule } from 'angular-datatables';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
	testimonials : any = []
	testimonialDetail : any = []
	dtOptions: any = {};
  constructor(
    	private router: Router,
  	  private dataService: DataService,
      public toastr : ToastrManager,
  	  private formBuilder:FormBuilder,
      private titleService:Title
    ) { this.titleService.setTitle("Testimonial List"); }

  ngOnInit() {
    this.dtOptions = {
      	pagingType: 'full_numbers',
      	pageLength: 5,
    };
    this.getTestimonials();
  }

	getTestimonials() {
	  this.dataService.getTestimonial().subscribe(response => {
        if(response['success'] == true){
        	this.testimonials = response['body']
       	}
		});
	}

  editTestimonial(id : any){
    this.router.navigate(['/account/testimonial'], { queryParams: {status: 'edit', id : id} });
  }

  deleteTestimonial(id: any) {
    this.dataService.delTestimonial(id).subscribe(response => {
        if(response['success'] == true){
          this.toastr.successToastr(response['message']);
          this.getTestimonials()
        }
    });
  }

  toggleStatus(id: any) {
    let testimonialData = {
      'testimonial_id' : id
    }
    this.dataService.updateStatusTestimonial(testimonialData).subscribe(response => {
        if(response['success'] == true){
          this.toastr.successToastr(response['message']);
        }
    });
  }

}
