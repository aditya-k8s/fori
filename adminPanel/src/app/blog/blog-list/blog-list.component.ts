import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  @ViewChild('epltable', { static: false }) private epltable?: ElementRef;
  blog_list : any = []; 
  isLoading : boolean = false; 
  isRecord : boolean = false;
  searchStr: string = ""; 
  isDelete : boolean = false;
  users_id : any = "";
  index : any;
  search : string = "";
  fileName= 'blog-list';
  main_data : any = [];
  blog_id : number = 0;
  isNewsStatus : boolean = false;
  header_txt : string = "";
  body_txt : string = "";
  constructor(
    private dataService: DataService,
  	public toastr : ToastrManager,
    private router : Router
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_id')){
      this.users_id = sessionStorage.getItem('user_id');
    }
	  this.getAllBlog();
  }

  getAllBlog(){
    this.isLoading = true;
    this.isRecord = false;
    this.blog_list = [];
    this.dataService.getBlog(this.users_id).subscribe(response => {
      if(response['success'] == true){
        if(response['body'] != '' && response['body'] != null){
          this.isLoading = false;
          this.isRecord = false;
          this.blog_list = response['body'];
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

  addBlog(){
    sessionStorage.removeItem('blog');
    this.router.navigate(['/blog/add-blog']);
  }

  openDelete(pvarId : any){
    this.blog_id = pvarId;
    this.isDelete = true;
  }

  yesDelete(){
    this.dataService.delBlog(this.blog_id).subscribe((response :any) =>{
      if(response['success'] == true){
        this.toastr.successToastr(response['message']);
        this.closeDelete();
        this.getAllBlog();
      }else{
        this.isDelete = true;
      }
    },(error:any) =>{
      console.log(error);
    })
  }

  closeDelete(){
    this.blog_id = 0;
    this.isDelete = false;
  }

  editNews(pvarId :any,pvarObj :any){
    sessionStorage.setItem('blog', JSON.stringify(pvarObj));
    this.router.navigate(['/blog/add-blog'],{ queryParams: { id:pvarId}});
  }

  activate(pvarId : any, pvarStatus : any){
    if(pvarStatus == 1){
      this.header_txt = 'Deactivate Confirmation';
      this.body_txt = "Are you sure you want to deactive this blog?";
    }else{
      this.header_txt = 'Active Confirmation';
      this.body_txt = "Are you sure you want to active this blog?";
    }
    this.blog_id = pvarId;
    this.isNewsStatus = true;
  }

  closeStatus(){
    this.blog_id = 0;
    this.isNewsStatus = false;
  }

  changeStatus(){
    this.dataService.updateBlogStatus({'blog_id' : this.blog_id}).subscribe((response :any) =>{
      if(response['success'] == true){
        this.toastr.successToastr(response['message']);
        this.closeStatus();
        this.getAllBlog();
      }else{
        this.isDelete = true;
      }
    },(error:any) =>{
      console.log(error);
    })
  }
}
