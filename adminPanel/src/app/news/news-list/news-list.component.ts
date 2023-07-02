import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  @ViewChild('epltable', { static: false }) private epltable?: ElementRef;
  news_data : any = []; 
  isLoading : boolean = false; 
  isRecord : boolean = false;
  searchStr: string = ""; 
  isDelete : boolean = false;
  users_id : any = "";
  index : any;
  search : string = "";
  fileName= 'user-list';
  main_data : any = [];
  img_url : string = "";
  news_id : number = 0;
  isNewsStatus : boolean = false;
  header_txt : string = "";
  body_txt : string = "";
  constructor(
    private dataService: DataService,
  	public toastr : ToastrManager,
    private router : Router
  ) {
    this.img_url = environment.img_url;
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_id')){
      this.users_id = sessionStorage.getItem('user_id');
    }
	  this.getAllNews();
  }

  getAllNews(){
    this.isLoading = true;
    this.isRecord = false;
    this.news_data = [];
    this.dataService.getNews(this.users_id).subscribe(response => {
      if(response['success'] == true){
        if(response['body'] != '' && response['body'] != null){
          this.isLoading = false;
          this.isRecord = false;
          this.news_data = response['body'];
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

  addNews(){
    sessionStorage.removeItem('news');
    this.router.navigate(['/news/add-news']);
  }

  openDelete(pvarId : any){
    this.news_id = pvarId;
    this.isDelete = true;
  }

  yesDelete(){
    this.dataService.delNews(this.news_id).subscribe((response :any) =>{
      if(response['success'] == true){
        this.toastr.successToastr(response['message']);
        this.closeDelete();
        this.getAllNews();
      }else{
        this.isDelete = true;
      }
    },(error:any) =>{
      console.log(error);
    })
  }

  closeDelete(){
    this.news_id = 0;
    this.isDelete = false;
  }

  editNews(pvarId :any,pvarObj :any){
    sessionStorage.setItem('news', JSON.stringify(pvarObj));
    this.router.navigate(['/news/add-news'],{ queryParams: { id:pvarId}})
  }

  activate(pvarId : any, pvarStatus : any){
    if(pvarStatus == 1){
      this.header_txt = 'Deactivate Confirmation';
      this.body_txt = "Are you sure you want to deactive this news?";
    }else{
      this.header_txt = 'Active Confirmation';
      this.body_txt = "Are you sure you want to active this news?";
    }
    this.news_id = pvarId;
    this.isNewsStatus = true;
  }

  closeStatus(){
    this.news_id = 0;
    this.isNewsStatus = false;
  }

  changeStatus(){
    this.dataService.updateNewsStatus({'news_id' : this.news_id}).subscribe((response :any) =>{
      if(response['success'] == true){
        this.toastr.successToastr(response['message']);
        this.closeStatus();
        this.getAllNews();
      }else{
        this.isDelete = true;
      }
    },(error:any) =>{
      console.log(error);
    })
  }
}
