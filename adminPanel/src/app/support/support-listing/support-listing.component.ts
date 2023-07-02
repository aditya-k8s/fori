import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-support-listing',
  templateUrl: './support-listing.component.html',
  styleUrls: ['./support-listing.component.css']
})
export class SupportListingComponent implements OnInit {
  @ViewChild('epltable', { static: false }) private epltable?: ElementRef;
  support_list : any = []; 
  isLoading : boolean = false; 
  isRecord : boolean = false;
  searchStr: string = ""; 
  isDelete : boolean = false;
  users_id : any = "";
  index : any;
  search : string = "";
  fileName= 'support-list';
  userType : string = "1";
  constructor(
    private dataService : DataService
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_id')){
      this.users_id = sessionStorage.getItem('user_id');
    }
	  this.getAllRequestList();
  }

  changeType(value:any){
    this.userType = value;
    this.getAllRequestList();
  }

  getAllRequestList(){
    this.isLoading = true;
    this.isRecord = false;
    this.support_list = [];
    this.dataService.getAllRequestList(this.userType).subscribe(response => {
      if(response['success'] == true){
        if(response['body'] != '' && response['body'] != null){
          this.isLoading = false;
          this.isRecord = false;
          this.support_list = response['body'];
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

}
