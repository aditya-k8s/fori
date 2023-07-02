import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {DataTablesModule} from 'angular-datatables';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-my-sales',
  templateUrl: './my-sales.component.html',
  styleUrls: ['./my-sales.component.css']
})
export class MySalesComponent implements OnInit {
	sales : any = []
	salesDetail : any = []
	//dtOptions: any = {};
    dtOptions: DataTables.Settings = {};
  constructor(
    private router: Router,
  	private dataService: DataService,
    public toastr : ToastrManager,
  	private formBuilder:FormBuilder,
    private titleService:Title
	) { 
      this.titleService.setTitle("Sales History");
    }

  ngOnInit(){
  		this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 20,
        order:[],
        lengthMenu : [20, 50, 100],
        processing: true,
        paging:   true,
     };


      this.dataService.getMarchantOrder().subscribe(response => {
        if(response['success'] == true){
        	this.sales = response['body']
       	}
	   });

  }

}
