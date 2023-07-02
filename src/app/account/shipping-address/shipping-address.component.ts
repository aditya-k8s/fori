import { Component, OnInit,ElementRef } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Title} from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";


@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit {
	shippingForm: FormGroup
	submitted = false
	shippingAddress :any = []
	countries: any = []
  states: any = []
	userId : any = []
  addresses : any = []
  showForm = false
  addressId : any
  addShipping = true
  shippingID : any
  deleteShipping :any = {}
  IsmodelShow= false
  loading = false
  loadingState = false
   //@ViewChild("myDiv") divView: ElementRef;
  constructor(
  private route: ActivatedRoute,
	private dataService: DataService,
  public toastr : ToastrManager,
  private formBuilder:FormBuilder,
	private router: Router,
  private titleService:Title,
  private ngxService: NgxUiLoaderService,
  // private el: ElementRef
    ) { 
    this.titleService.setTitle("Shipping Address");
    
  	this.shippingForm = this.formBuilder.group({
        fullname: ['', Validators.required],
        last_name: ['', Validators.required],
        address: ['', Validators.required],
        address_1: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pin_code: [''],
        contact_no: [''],
        address_type: ['', Validators.required],
        country: ['', Validators.required],
    });
  }

  

  ngOnInit() {
    this.ngxService.start();
    if(localStorage.getItem("data")){
      let data = this.dataService.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }

    this.__getCountries()
    this.__getAddresses();
    this.__getStates()


  }

  __getStates(){
   // let countryID = event.target.value
    this.dataService.state(233).subscribe(response => {
        if(response['success'] == true){
          this.states = response['body']
        }
    });

  }

  __getCountries(){
    this.dataService.getCountry().subscribe(response => {
        if(response['success'] == true){
          this.countries = response['data']
        }
    });
  }

  __getAddresses(){
    this.dataService.getAddress(this.userId).subscribe(response => {
        this.addShipping = true
        if(response['success'] == true){
          this.shippingAddress = response['body']
          this.addresses = response['body']
        }else {
          this.shippingAddress = []
          this.addresses = []
        }
        this.ngxService.stop();
     });
  }

  __editAddress(index:any){
      this.addShipping = false
      this.shippingID = this.shippingAddress[index]['id']
        this.shippingForm.patchValue({
            'fullname' : this.shippingAddress[index]['fullname'],
            'last_name' : this.shippingAddress[index]['last_name'],
            'address' : this.shippingAddress[index]['address'],
            'address_1' :this.shippingAddress[index]['address_1'],
            'city' : this.shippingAddress[index]['city'],
            'state' : this.shippingAddress[index]['state'],
            'country' : this.shippingAddress[index]['country'],
            'pin_code' :this.shippingAddress[index]['pin_code'],
            'contact_no' : this.shippingAddress[index]['contact_no'],
            'address_type' : this.shippingAddress[index]['address_type'],
    })
  }

  __addAddress(){
      this.addShipping = true
          this.shippingForm.patchValue({
            'fullname' : '',
            'last_name' : '',
            'address' : '',
            'address_1' :'',
            'city' : '',
            'state' : '',
            'country' : '',
            'pin_code' : '',
            'contact_no' : '',
            'address_type' : '',
        })
  }

  __deleteAddress(id:any){
     this.ngxService.start();
     this.deleteShipping['user_id'] = this.userId
     this.deleteShipping['id'] = id
    if(confirm("Are you sure to delete this shipping address?")) {
      this.dataService.delShippingAddress(this.deleteShipping).subscribe(response => {
          if(response['success'] == true){
             this.__getAddresses();
             this.toastr.successToastr(response['message']);
          }
          else{
              this.toastr.errorToastr(response['message']); 
          }
          this.ngxService.stop();
      });
    }
  }


  // onAddressChange(event:any){
  //   let {checked, value} = event.target;
  //     this.showForm = !this.showForm;
  //    if(value == 'newAddress'){
  //       this.showForm = true
  //    }
  //    else{
  //       this.addressId = value
  //       this.showForm = false
  //    }

  // }

  get f() { return this.shippingForm.controls; }

    onSubmit(shippingdata:any){
	  	this.submitted = true;
	    if (this.shippingForm.invalid) {
	        return;
	    }
	    else
	    {
        this.ngxService.start();
        this.loading = true;
	      if(this.addShipping == true)
        {
  	      shippingdata['user_id'] = this.userId
  	      this.dataService.addShippingAddress(shippingdata).subscribe(
        	response => {
            this.loading = false;
	            if(response['success'] == true){
	              this.toastr.successToastr(response['message']);
                this.__getAddresses();
                jQuery("#profile_shippingModal").hide()
                jQuery(".modal-backdrop").hide()
                var body = $('body');
                body.removeClass('modal-open');
	            }
	            else{
	              this.toastr.errorToastr(response['data']); 
	            }	
        	},error => {this.toastr.errorToastr(error);});
	      } 
        else
        {
            shippingdata['user_id'] = this.userId
            shippingdata['id'] = this.shippingID
            this.dataService.editShippingAddress(shippingdata).subscribe(
            response => {
              this.loading = false;
                if(response['success'] == true){
                  this.toastr.successToastr(response['message']);
                  this.__getAddresses();
                  
                  jQuery("#profile_shippingModal").hide()
                  jQuery(".modal-backdrop").hide()
                  var body = $('body');
                  body.removeClass('modal-open');
                }
                else{
                  this.toastr.errorToastr(response['data']); 
                }

            },
            error => {this.toastr.errorToastr(error);});
        }
        this.ngxService.stop();
      }
    }      
	

}
