import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-category-store-list',
  templateUrl: './category-store-list.component.html',
  styleUrls: ['./category-store-list.component.css']
})
export class CategoryStoreListComponent implements OnInit {
  store_data : any = [];
  img_url : string = "";
  category_id : number = 0;
  isLoading : boolean = false; 
	isRecord : boolean = false;
  constructor(
    private router: Router,
		private dataService: DataService,
    	public toastr : ToastrManager,
		private formBuilder:FormBuilder,
		private route: ActivatedRoute
  ) {
    this.img_url = environment.img_url;
    this.route.queryParams.subscribe(params => {
			this.category_id = parseInt(params['id']);
		})
  }

  ngOnInit(): void {
    this.getCategoryStore();
  }

  getCategoryStore(){
		this.store_data = [];
		this.isLoading = true;
    this.isRecord = false;
    let data = {
      "category" : [this.category_id]
    }
		this.dataService.storelistCat(data).subscribe(response => {
			if(response['success'] == true){
				if(response['body'] != '' && response['body'] != null){
					this.isLoading = false;
          this.isRecord = false;
					this.store_data = response['body'];
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
}
