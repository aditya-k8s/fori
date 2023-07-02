import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { DataService } from '../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {DataTablesModule} from 'angular-datatables';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
localstorages:any = [];
cart : any=[];
shopifyProduct : any= [];
shopping_cart:any=[];
totalamount:any;
donation_amount : any = "";
btn_color : string = 'red';
sel_product_id : any;
sel_variant_id : any
isDeleteModal : boolean = false;
noOfItems = 0 
before_donated_price = 0
donated_amount = false
  constructor(
  private routers: ActivatedRoute,
	private router: Router, 
	private dataService: DataService,
	public toastr : ToastrManager,
	private formBuilder:FormBuilder,
  private titleService:Title
	) {
  this.titleService.setTitle("Cart");
  }

  ngOnInit(){
    if(localStorage.getItem('cart')){
      this.localstorages = JSON.parse(localStorage.getItem('cart')|| '{}');
    }
    if(localStorage.getItem("amount_donated")){
      this.donation_amount = 0.50;
      this.btn_color = 'green';
    }
    this.getTotal()

  }

  get_items(){
    if(localStorage.getItem('cart')){
      this.localstorages = JSON.parse(localStorage.getItem('cart')|| '{}');
    }
  }

  getTotal(){
    let total = 0;
    this.noOfItems = 0
    for (var i = 0; i < this.localstorages.length; i++) {
      if (this.localstorages[i].price) {
        total += this.localstorages[i].price * this.localstorages[i].quantity;
        this.before_donated_price = total
        this.totalamount = total + this.donation_amount;
        this.noOfItems += this.localstorages[i].quantity
      }
    }
    return total;
  }


  _removeItemToCart(variantID:any,product_id:any){
    this.sel_variant_id = product_id;
    this.sel_product_id = variantID;
    this.isDeleteModal = true;
    this.dataService.sendCartCount("cartCount");
    return;
  }

  yesDelete(){
    let index;
    this.shopping_cart = JSON.parse(localStorage.getItem('cart') || '{}');
    for(let i in this.shopping_cart)
    {
      if(this.sel_product_id ==  this.shopping_cart[i].product)
      {
        if(this.sel_variant_id ==  this.shopping_cart[i].variant_id)
        {
          index = i;
        }
      }
    }
    this.shopping_cart.splice(index,1);
    localStorage.setItem('cart', JSON.stringify(this.shopping_cart));
    this.get_items();
    this.getTotal();
    this.closeDelete();
  }

  closeDelete(){
    this.isDeleteModal = false;
  }

  /*======================Add Quantity===================*/
  addqty(product_id:any,productID:any){
    this.shopping_cart = JSON.parse(localStorage.getItem('cart') || '{}');
      for(let i in this.shopping_cart) {
        if(productID ==  this.shopping_cart[i].product)
        {
          if(product_id ==  this.shopping_cart[i].variant_id)
          {
            this.shopping_cart[i].quantity += 1;
            break; 
          } 
        }
    }
    localStorage.setItem('cart', JSON.stringify(this.shopping_cart));
    this.get_items();
    this.getTotal();
    this.dataService.sendCartCount("cartCount");
  }

  /*====================== Remove Quantity===================*/
  removeqty(product_id:any,productID:any){
    this.shopping_cart = JSON.parse(localStorage.getItem('cart') || '{}');
    	for(let i in this.shopping_cart){
        if(productID ==  this.shopping_cart[i].product)
        {
          if(product_id ==  this.shopping_cart[i].variant_id)
          {
            if(this.shopping_cart[i].quantity >1) {
              this.shopping_cart[i].quantity-=1;
               break; 
             }
          } 
        }
    }

    localStorage.setItem('cart', JSON.stringify(this.shopping_cart));
    this.get_items();
    this.getTotal();
    this.dataService.sendCartCount("cartCount");
  }

  amountDonate(){
    this.btn_color = 'green';
    this.donation_amount = 0.50;
    this.getTotal();
    localStorage.setItem("amount_donated","0.50");
  }

  deductAmountDonate() {
       this.btn_color = 'red';
       this.donation_amount = 0.0;
       this.getTotal();
       localStorage.removeItem("amount_donated");
  }

  getOptionsLenght(options:any){
    let option = Object.keys(options).length
    if(!option) {
      return;
    }
  }
}