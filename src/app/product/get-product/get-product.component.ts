import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {DataTablesModule} from 'angular-datatables';
@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.css']
})
export class GetProductComponent implements OnInit {
shopifyProduct : any= [];
id :any = [];
quantity: any = [];
product_data : any={};
items: any={};
localstorages:any = [];
cart : any=[];
  loading = false
  start:any;
   limit:any;
    constructor(
	private routers: ActivatedRoute,
	private router: Router, 
	private dataService: DataService,
	public toastr : ToastrManager,
	private formBuilder:FormBuilder,
	) { }

  
  ngOnInit(){
         if(localStorage.getItem('cart')){
          this.localstorages = JSON.parse(localStorage.getItem('cart')|| '{}');
         }  
         this.getProducts()
  }

    getProducts(){
    this.start=0;
      this.limit=6;
      this.dataService.getProducts(this.start,this.limit).subscribe(response => {
         if(response['success'] == true){
            this.shopifyProduct = response['body']
          }
      });
    }
 
   _addItemToCart(product_id:any) {
    let local_storage;
    let itemsInCart = []
 let cart = [];
let item=[];
 
    this.items = {
      product: product_id,
      quantity: 1,
    }
    if(localStorage.getItem('cart')  == null){
      local_storage =[];
      itemsInCart.push(this.items);
      localStorage.setItem('cart', JSON.stringify(itemsInCart));
      this.toastr.successToastr('Added into cart successfully');
    }
    else
    {
      let local_storage = JSON.parse(localStorage.getItem('cart')|| '{}');
      for(var i in local_storage)
      {
        if(this.items.product == local_storage[i].product){
          local_storage[i].quantity += 1;
          this.items=null;
          break;  
        }
    }
    this.toastr.successToastr('Added into cart successfully');
    if(this.items){
      itemsInCart.push(this.items);
    }
    local_storage.forEach(function (item:any){
      itemsInCart.push(item);
    })
    localStorage.setItem('cart', JSON.stringify(itemsInCart));

    }
  }

 

}
