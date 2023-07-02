import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent implements OnInit {
  @ViewChild('epltable', { static: false }) private epltable?: ElementRef;
  merchant_data : any = [];
  blc_data : any;
  paid_amount : any;
  balance : any;
  total_amount : any;
  amount : any;
  users_id : any = "";
  search : string = ""; 
  searchStr: string = "";
  user_type : string = "";
  merchant_id : string = "";
  fileName= 'merchant-list';
  isPaidAmt: boolean = false;
  isRecord : boolean = false;
  isLoading : boolean = false;
  isPaidAmount : boolean = false;
  constructor(
    private dataService: DataService,
  	public toastr : ToastrManager,
    private router : Router
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_id')){
      this.users_id = sessionStorage.getItem('user_id');
    }
	  this.getMerchant();
  }

  getMerchant(){
    this.isLoading = true;
    this.isRecord = false;
    this.merchant_data = [];
    this.dataService.getMerchantList().subscribe(response => {
      if(response['success'] == true){
        if(response['body'] != '' && response['body'] != null){
          this.isLoading = false;
          this.isRecord = false;
          this.merchant_data = response['body'];
        }else{
          this.isLoading = false;
          this.isRecord = true;
        }
      }else{
        this.isLoading = false;
        this.isRecord = false;
      }
    },error =>{
      console.log(error);
    });
  }

  exportexcel(): void { 
    let element = document.getElementById('epltable'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName+'.xlsx');
  }

  public downloadPDF():void {
    let DATA = this.epltable?.nativeElement;
    let doc = new jsPDF('l','pt', 'a4');
    autoTable(doc, {
      html: '#epltable',
      theme: 'grid',
    });
    doc.save(this.fileName+".pdf");
  }

  openPaid(pvarId:any){
    this.isPaidAmt = true;
    this.merchant_id = pvarId;
    this.getMerchantBalance();
    this.isPaidAmount = true;
  }

  getMerchantBalance(){
    this.dataService.getMerchantBalance(this.merchant_id).subscribe(response =>{
      if(response['success'] == true){
        this.blc_data = response['body'];
        if(this.blc_data['total_amount']){
          this.total_amount = this.blc_data['total_amount'].toFixed(2);
        }
        if(this.blc_data['paid_amount']){
          this.paid_amount = this.blc_data['paid_amount'].toFixed(2);
        }
        if(this.blc_data['balance']){
          this.balance = this.blc_data['balance'].toFixed(2);
        }
      }else{}
    },error =>{
      console.log(error);
    })
  }

  enterAmount(value:any){
    if(value){
      this.amount = value;
      if(value > this.blc_data['balance']){
        this.isPaidAmt = true;
      }else{
        this.balance = ((this.blc_data['balance']) - (this.amount)).toFixed(2);
        this.isPaidAmt = false;
      }
    }else{
      this.balance = this.blc_data['balance'];
    }
  }

  saveAmount(){
    let data = {
      "user_id" : this.merchant_id,
      "amount" : this.amount
    }
    this.dataService.payToMerchant(data).subscribe(response =>{
      if(response['success'] == true){
        this.getMerchant();
        this.closeModal();
      }else{}
    },error =>{
      console.log(error);
    })
  }

  closeModal(){
    this.isPaidAmt = false;
    this.isPaidAmount = false;
  }

  isNumberKey(evt:any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46)
        return false;
    else {
        var len = evt.target.value.length;
        var index = evt.target.value.indexOf('.');
        
        if (index > 0 && charCode == 46) {
            return false;
        }
        if (index > 0) {
            var CharAfterdot = (len + 1) - index;
            if (CharAfterdot > 3) {
                return false;
            }
        }

    }
    return true;
  }
}
