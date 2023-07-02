import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {DataTablesModule} from 'angular-datatables';
import { NgxUiLoaderService } from "ngx-ui-loader";
import {Title} from "@angular/platform-browser";
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
	//productForm: FormGroup
	searchForm: FormGroup
	userId :any = []
	submitted = false
	categories: any = []
	subCategories: any = []
	numberPatern = '^[0-9.,]+$'
	dtOptions: any = {};
	matchingProducts : any
	checkedItems :any =[]
	request_data : any = {}
	prodUniqueIds : any= []
	productLength = 0
	loading = false
	loading1 = false
	channel_id : any
	store_data :any =[]


  constructor(
  	private router: Router,
		private dataService: DataService,
    public toastr : ToastrManager,
		private formBuilder:FormBuilder,
		private ngxService: NgxUiLoaderService,
		private titleService:Title,
		private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService
	) { 
  	  this.titleService.setTitle("Get Products");

  	  const breadcrumb =  { dynamicText: 'Get Product '};
  		this.ngDynamicBreadcrumbService.updateBreadcrumbLabels(breadcrumb)

      this.searchForm = this.formBuilder.group({
	      searchqry: ['', [Validators.required]]
      });
  }

  ngOnInit(){
		if(localStorage.getItem("data")){
        	let data = this.dataService.decryptData(localStorage.getItem("data"));
        	this.userId = data[0]['user_id'];
    }
  	this.getActivatedStore();

	  this.dtOptions = {
	      pagingType: 'full_numbers',
	      pageLength: 5,
	      lengthMenu : [5, 10, 25],
	      processing: true,
	       paging:   true,
	    };
  }

    getActivatedStore(){
    this.dataService.getPublishedStore().subscribe(response =>{
      if(response['success'] == true && response['body'].length > 0){
        this.store_data = response['body'];

        var index = this.store_data.findIndex(function(pro:any) {
            return pro['isActive'] == 1
        })
        this.channel_id = this.store_data[index]['id']
      }
      else {
      	this.toastr.errorToastr("Please setup your shopify store first.");
        this.router.navigate(['/create-store'])
      }
    },error =>{console.log(error);})
  }

  get formError() { return this.searchForm.controls; }

	 /********** Search products  *********/
	searchProducts(Formdata : any){
	  	this.submitted = true;

	    if (this.searchForm.invalid) {
	        return;
	    }
	    else
	    {
	    	this.loading1 = true;

	    	Formdata['user_id'] = this.userId
	    	Formdata['store_id'] = this.channel_id
	    	 this.dataService.searchProductFromShopify(Formdata).subscribe(response => {
		      	this.loading1 = false;
		        if(response['success'] == true){
		        	this.matchingProducts = response['body']
		        	this.productLength = this.matchingProducts.length
		        	this.toastr.successToastr(response['message']);
		       	}else{
		       		this.toastr.errorToastr(response['message']); 
		      	}
	    	});
	    }
	}

	onChecked(product: any, event: any){
		
	  let {checked, value} = event.target;
		let urlID = value.split("/");
		urlID = urlID[urlID.length - 1]
	    if(checked) {
	      this.prodUniqueIds.push(value)
	      this.checkedItems.push(parseInt(urlID));
	    } else {
	      let index = this.checkedItems.indexOf(parseInt(urlID))
	      if (index !== -1) this.checkedItems.splice(index, 1);
	      this.prodUniqueIds.splice(index, 1);
	    }
  	}

  	saveProducts()
  	{
  		this.loading = true;
		const arr = this.prodUniqueIds;
		let result = this.matchingProducts.filter(function(item:any) {
		  return arr.indexOf(item.node.id) != -1;
		});

		this.request_data['user_id'] = this.userId;
		this.request_data['details'] = result;
		this.request_data['store_id'] = this.channel_id
		this.dataService.saveShopifyProduct(this.request_data).subscribe(response => {
	        this.loading = false;
	        if(response['success'] == true){
	        	//this.matchingProducts = response['data']['message']
	        	this.toastr.successToastr(response['data']['message']);
	       	}else{
	       		this.toastr.errorToastr(response['message']); 
	      	}
	    });

  	}

  	getid(url:any){
  		const ids =url.node.id.split("/");
		return ids[ids.length - 1];
  	}


}
