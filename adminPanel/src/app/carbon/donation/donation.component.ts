import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {
  users_id : any = "";
  search : string = "";
  sel_arr : any = [];
  donation_list : any = [];
  isPaid : boolean = false;
  isRecord : boolean = false;
  isLoading : boolean = false;
  isSelData : boolean = false;
  total_amount : number = 0;
  constructor(
    private dataService: DataService,
    private router : Router,
    public toastr : ToastrManager,
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_id')){
      this.users_id = sessionStorage.getItem('user_id');
    }
    this.getAllDonation();
  }

  getAllDonation(){
    this.isLoading = true;
    this.isRecord = false;
    this.donation_list = [];
    this.dataService.donationList().subscribe(response => {
      if(response['success'] == true){
        if(response['body'] != '' && response['body'] != null){
          this.isLoading = false;
          this.isRecord = false;
          this.donation_list = response['body'];
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

  checkDonation(event : any, pvarObj:any){
    if(event.target.checked){
      this.isSelData = true;
      this.sel_arr.push(pvarObj);
    }else{
      this.sel_arr.forEach((element:any) => {
        if(element['id'] == pvarObj['id']){
          this.sel_arr.splice(this.sel_arr.indexOf(pvarObj), 1);
        }
      });
    }
    if(this.sel_arr.length < 1){
      this.isSelData = false;
    }
  }

  openPaid(){
    this.total_amount = 0;
    this.sel_arr.forEach((element:any) => {
      this.total_amount = this.total_amount + element['amount'];
    });
    this.isPaid = true;
  }

  openReceive(pvarObj : any){
    this.sel_arr = [];
    this.sel_arr.push(pvarObj);
    this.total_amount = 0;
    this.sel_arr.forEach((element:any) => {
      this.total_amount = this.total_amount + element['amount'];
    });
    this.isPaid = true;
  }

  closePaid(){
    this.sel_arr = [];
    this.isSelData = false;
    this.isPaid = false;
  }

  yesPay(){
    let data = {
      "donationlist" : this.sel_arr
    }
    this.dataService.updateDonationStatus(data).subscribe(response =>{
      if(response['success'] == true){
        this.toastr.successToastr(response['message']);
        this.getAllDonation();
        this.closePaid();
      }else{
        this.toastr.errorToastr(response['message']);
      }
    },error =>{
      console.log(error);
    })
  }
}
