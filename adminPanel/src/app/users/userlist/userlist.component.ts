import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  @ViewChild('epltable', { static: false }) private epltable?: ElementRef;
  userslist : any = []; 
  isLoading : boolean = false; 
  isRecord : boolean = false;
  searchStr: string = ""; 
  isDelete : boolean = false;
  users_id : any = "";
  index : any;
  search : string = "";
  fileName= 'user-list'; 
  user_type : string = "";
  main_data : any = [];
  constructor(
  	private dataService: DataService,
  	public toastr : ToastrManager,
    private router : Router
    ) {}

  ngOnInit() {
    if(sessionStorage.getItem('user_id')){
      this.users_id = sessionStorage.getItem('user_id');
    }
	  this.getUser();
  }

  changeType(event:any){
    this.user_type = event.target.value;
    this.userslist = [];
    this.isLoading = true;
    this.isRecord = false;
    if(event.target.value != ''){
      this.main_data.forEach((element:any) => {
        if(element['user_type'] == this.user_type){
          this.isLoading = false;
          this.isRecord = false;
          this.userslist.push(element);
        }
      });
    }else{
      this.isLoading = false;
      this.isRecord = false;
      this.userslist = this.main_data;
    }
  }

  getUser(){
    this.isLoading = true;
    this.isRecord = false;
    this.userslist = [];
    this.dataService.getUsers(this.users_id).subscribe(response => {
      if(response['success'] == true){
        if(response['body'] != '' && response['body'] != null){
          this.isLoading = false;
          this.isRecord = false;
          this.userslist = response['body'];
          this.main_data = response['body'];
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

  userDetails(pvarObj:any){
    this.router.navigate(['/users/userdetails'], {queryParams: {id : pvarObj['user_id']}} )
  }

  openDelete(pvarIndex:any,pvarId:any){  
    this.index = pvarIndex
    this.users_id = pvarId;
    this.isDelete = true;
    if(confirm("Are you sure you want to delete this user.")) {
      this.dataService.deleteUser(this.users_id).subscribe(response =>{
        if(response['success'] == true){
          this.toastr.successToastr(response['message']);
          this.userslist = [];
          this.getUser();
          //this.userslist.splice(this.userslist.indexOf(this.index), 1);
          this.isDelete = false;
        }else{
          console.log(response['message']);
        }
      },error =>{
        console.log(error);
      })
    }else{
      console.log('no');
    }
  }


  updateUserStatus(users_id:any){
      this.dataService.updateUserStatus(users_id).subscribe(response =>{
        if(response['success'] == true){
          this.toastr.successToastr(response['message']);
          this.userslist = [];
          this.getUser();
          //this.userslist.splice(this.userslist.indexOf(this.index), 1);
          this.isDelete = false;
        }else{
          console.log(response['message']);
        }
      },error =>{
        console.log(error);
    })
  }
  
  hideModel(){ this.isDelete = false; }

  // openProfit(pvarId){
  //   this.router.navigate(['/user-profit-report'], { queryParams: { id: pvarId } });
  // }

}

