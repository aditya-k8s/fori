import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
	categoryForm: FormGroup
	submitted = false
	userId :any;
	category_id : number = 0;
    constructor(
   	  	private router: Router,
		private dataService: DataService,
    	public toastr : ToastrManager,
		private formBuilder:FormBuilder,
		private route: ActivatedRoute
  	) {
  		this.categoryForm = this.formBuilder.group({
	        category_name: ['', Validators.required],
      	});
  	}

    ngOnInit() {
    	this.userId = sessionStorage.getItem("user_id")
	    if(this.userId == undefined && this.userId == null){
	        this.router.navigate(['/login'])
	    }
		this.route.queryParams.subscribe(params => {
			this.category_id = params['id'];
			this.categoryForm.patchValue({'category_name' : params['name']});
		})
    }

  	get f() { return this.categoryForm.controls; }

    onSubmit(Formdata : any){
  		this.submitted = true;
	    if (this.categoryForm.invalid) {
	        return;
	    }else{
			if(this.category_id == 0 || this.category_id == undefined){
				Formdata['user_id'] = this.userId
				this.dataService.addCategory(Formdata).subscribe(response => {
					if(response['success'] == true){
						this.toastr.successToastr(response['message']);
						this.router.navigate(['/category/list'])
					}else{
					this.toastr.successToastr(response['message']);
					}
				});
			}else{
				Formdata['user_id'] = this.userId;
				Formdata['category_id'] = this.category_id;
	    	 	this.dataService.updateCategory(Formdata).subscribe(response => {
					if(response['success'] == true){
						this.toastr.successToastr(response['message']);
						this.router.navigate(['/category/list'])
					}else{
						this.toastr.successToastr(response['message']);
					}
	    		});
			}
	    }
  	}

}
