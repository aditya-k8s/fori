import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../data.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  user_data : any = [];
  img_url : string = "";
  isLoading : boolean = false;
  isRecord : boolean = false;
  constructor(
    private dataService : DataService
  ) {
    this.img_url = environment.img_url;
  }

  ngOnInit(): void {
    this.getRecentusers();
  }

  getRecentusers(){
    this.user_data = [];
    this.isLoading = true;
    this.isRecord = false;
    this.dataService.getRecentusers().subscribe(response =>{
      if(response['success'] == true){
        if(response['body'] != '' && response['body'] != null){
          this.isRecord = false;
          this.isLoading = false;
          this.user_data = response['body'];
        }else{
          this.isLoading = false;
          this.isRecord = true;
        }
      }else{
        this.isLoading = false;
        this.isRecord = true;
        console.log(response['message']);
      }
    },error =>{
      this.isLoading = false;
      this.isRecord = true;
      console.log(error);
    })
  }
}
