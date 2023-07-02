import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DataTablesModule } from 'angular-datatables';
import { Title } from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
	orders : any = []
	ordersDetail : any = []
	dtOptions: any = {};
  constructor(
  	private router: Router,
		private dataService: DataService,
    public toastr : ToastrManager,
		private formBuilder:FormBuilder,
    private titleService:Title,
    private ngxService: NgxUiLoaderService,
		) { this.titleService.setTitle("Order History"); }

  ngOnInit(){
    this.ngxService.start();
	  this.dtOptions = {
      	pagingType: 'full_numbers',
      	pageLength: 20,
        order:[],
      	lengthMenu : [20, 50, 100],
     	  processing: true,
       	paging:   true,
    };


    this.dataService.getMyOrder().subscribe(response => {
      this.ngxService.stop();
        if(response['success'] == true){
        	this.orders = response['body']
       	}
	  });
  }


}
