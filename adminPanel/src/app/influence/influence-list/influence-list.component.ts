import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-influence-list',
  templateUrl: './influence-list.component.html',
  styleUrls: ['./influence-list.component.css']
})
export class InfluenceListComponent implements OnInit {
  @ViewChild('epltable', { static: false }) private epltable?: ElementRef;
  influencer_list : any = []; 
  isLoading : boolean = false; 
  isRecord : boolean = false;
  users_id : any = "";
  search : string = "";
  fileName= 'influencer-list'; 
  constructor(
    private dataService: DataService,
  	public toastr : ToastrManager,
    private router : Router
  ) { }

  ngOnInit() {
    if(sessionStorage.getItem('user_id')){
      this.users_id = sessionStorage.getItem('user_id');
    }
	  this.getUser();
  }

  getUser(){
    this.isLoading = true;
    this.isRecord = false;
    this.dataService.getInfluencerList().subscribe(response => {
      if(response['success'] == true){
        if(response['body'] != '' && response['body'] != null){
          this.isLoading = false;
          this.isRecord = false;
          this.influencer_list = response['body'];
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
  
  influencerDetails(pvarObj:any){
    this.router.navigate(['/influencer/influencer-details'], {queryParams: {id : pvarObj['user_id']}} )
  }

}
