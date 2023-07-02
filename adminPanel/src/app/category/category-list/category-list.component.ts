import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
	categories :any = [];
	isDelete : boolean = false;
	isLoading : boolean = false; 
	isRecord : boolean = false;
	category_id : number = 0;
  	constructor(
		private dataService: DataService,
		public toastr : ToastrManager,
		private router : Router
	) {

	}

  	ngOnInit() {
		this.getCategories();
  	}

  	getCategories(){
		this.categories = [];
		this.isLoading = true;
    	this.isRecord = false;
		this.dataService.getCategory().subscribe(response => {
			if(response['success'] == true){
				if(response['body'] != '' && response['body'] != null){
					this.isLoading = false;
          			this.isRecord = false;
					this.categories = response['body'];
				}else{
					this.isLoading = false;
          			this.isRecord = true;
				}
			}else{
				this.isLoading = false;
        		this.isRecord = true;
			}
		},error =>{
			console.log(error);
		});
  	}

	editCategory(pvarObj : any){
		this.router.navigate(['/category/update'], {queryParams: {id : pvarObj['id'], name : pvarObj['category_name']}} )
	}

	subCategory(pvarObj : any){
		this.router.navigate(['/category/sub-caterory-list'], {queryParams: {id : pvarObj['id']}} )
	}

	storeList(pvarId: any){
		this.router.navigate(['/category/store-list'], {queryParams: {id : pvarId}} )
	}
	
	openDelete(pvarId:any){
		this.category_id = pvarId;
		this.isDelete = true;
	}

	yesDelete(){
		this.dataService.delCategory(this.category_id).subscribe(response =>{
			if(response['success'] == true){
				this.getCategories();
				this.toastr.successToastr((response['message']));
				this.closeDelete();
			}else{
				this.toastr.errorToastr((response['message']));
				this.isDelete = true;
			}
		},error =>{
			console.log(error);
			this.isDelete = true;
		})
	}

	closeDelete(){
		this.isDelete = false;
	}
}
