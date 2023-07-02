import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder,Validators,FormGroup,FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { DataTablesModule } from 'angular-datatables';
@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  @ViewChild('epltable', { static: false }) private epltable?: ElementRef;
  orderlist : any = []; 
  isLoading : boolean = false; 
  isRecord : boolean = false;
  searchStr: string = ""; 
  channelName : any ="";
  users_id : any = "";
  index : any;
  total_amount : number = 0;
  shipping_fee : number = 0;
  search : string = "";
  fileName : string = "order-list";

  filterForm: FormGroup;
  loading = false;
  submitted = false;
  tableData:any =[];
  dtOptions: any = {};
  // get fromDate() { return this.filterForm.get('fromDate').value; }
  // get toDate() { return this.filterForm.get('toDate').value; }
  constructor(
  	private dataService: DataService,
  	public toastr : ToastrManager,
  	private router: Router,
  	private route: ActivatedRoute,
    private formBuilder:FormBuilder,
  ) {
    // this.pipe = new DatePipe('en');
    // console.log(this.orderlist.filterPredicate,"");
    //     const defaultPredicate=this.dataSource.filterPredicate;
    // this.dataSource.filterPredicate = (data, filter) =>{
    //   const formatted=this.pipe.transform(data.created,'MM/dd/yyyy');
    //   return formatted.indexOf(filter) >= 0 || defaultPredicate(data,filter) ;
    // }

    this.filterForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    });
  }

  get f() { return this.filterForm.controls; }

  ngOnInit() {
    this.getOrder();
  }

  reverseAndTimeStamp(dateString:any) {
    const reverse = new Date(dateString);
    return reverse.getTime();
  }

  filterDate(formData:any){
    this.orderlist = this.tableData
    const fromDate = formData['fromDate']
    const toDate = formData['toDate']
    if(fromDate && toDate){
      const selectedMembers = this.orderlist.filter((m:any) => {
        return this.reverseAndTimeStamp(m.create_date) >= this.reverseAndTimeStamp(fromDate)
        && this.reverseAndTimeStamp(m.create_date) <= this.reverseAndTimeStamp(toDate)
      });
      this.orderlist = selectedMembers
    }
  }

  ClearFilter() {
    this.filterForm.patchValue({'fromDate' : '','toDate' : ''});
    this.orderlist = this.tableData
  }

  getOrder(){
    this.isLoading = true;
    this.isRecord = false;
    this.total_amount = 0;
    this.shipping_fee = 0;
    this.dataService.getOrder().subscribe(response => {
      if(response['success'] == true){
        if(response['body'] != '' && response['body'] != null){
          this.isLoading = false;
          this.isRecord = false;
          this.orderlist = response['body'];
          this.tableData = response['body'];
          this.orderlist.forEach((element :any) => {
            this.total_amount += element['total_amount'];
            if(element['shipping_fee'] != null && element['shipping_fee'] != ''){
              this.shipping_fee += parseFloat(element['shipping_fee']);
            }
          });
        }else{
          this.isLoading = false;
          this.isRecord = true;
        }
      }else{
        this.isLoading = false;
        this.isRecord = false;
      }
    },error =>{
      console.log("error")
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

