import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {Project,projects} from './project-data';
import { DataService} from '../../../data.service';
import {environment} from '../../../../environments/environment';
@Component({
  selector: 'app-project-of-month',
  templateUrl: './project-of-month.component.html',
  styleUrls: ['./project-of-month.component.css']
})
export class ProjectOfMonthComponent implements OnInit {
  img_url : string = "";
  populerChannel : any = [];
  isLoading : boolean = false;
  isRecord : boolean = false;
  constructor(
    private dataService : DataService
  ) {
    this.img_url = environment.img_url;
  }

  ngOnInit(): void {
    this.popularChannels();
  }

  popularChannels(){
    this.populerChannel = [];
    this.isLoading = true;
    this.isRecord = false;
    this.dataService.popularChannels().subscribe(response =>{
      if(response['success'] == true){
        if(response['body'] != '' && response['body'] != null){
          this.isRecord = false;
          this.isLoading = false;
          this.populerChannel = response['body']['rows'];
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
