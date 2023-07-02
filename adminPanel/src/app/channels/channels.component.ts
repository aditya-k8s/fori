import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {environment} from '../../environments/environment';
import { FormBuilder,Validators,FormGroup,FormControl } from '@angular/forms';
import { from } from 'rxjs';
@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  users_id : any = "";
  search : string = "";
  img_url : string = "";
  channel_data : any = [];
  isRecord : boolean = false;
  isLoading : boolean = false; 

  filterForm: FormGroup;
  loading = false;
  submitted = false;
  tableData:any =[];

  constructor(
    private dataService: DataService,
    private router : Router,
    private formBuilder:FormBuilder,
  ) {
    this.img_url = environment.img_url;
     this.filterForm = this.formBuilder.group({
        fromDate: ['', Validators.required],
        toDate: ['', Validators.required],
    });
  }

   get f() { return this.filterForm.controls; }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_id')){
      this.users_id = sessionStorage.getItem('user_id');
    }
    this.getAllChannel();
  }

    reverseAndTimeStamp(dateString:any) {
        const reverse = new Date(dateString);
        return reverse.getTime();
   }


  filterDate(formData:any){
     this.channel_data = this.tableData
    const fromDate = formData['fromDate']
    const toDate = formData['toDate']

    if(fromDate && toDate)
    {
      const selectedMembers = this.channel_data.filter((m:any) => {
          return this.reverseAndTimeStamp(m.create_date) >= this.reverseAndTimeStamp(fromDate)
            && this.reverseAndTimeStamp(m.create_date) <= this.reverseAndTimeStamp(toDate)
      });
      this.channel_data = selectedMembers
    }
  }

  ClearFilter() {
    this.filterForm.patchValue({
        'fromDate' : '',
        'toDate' : '',
    })
    this.channel_data = this.tableData
  }


  getAllChannel(){
    this.isLoading = true;
    this.isRecord = false;
    this.dataService.getAllChannel().subscribe(response => {
      if(response['success'] == true){
        if(response['body'] != '' && response['body'] != null){
          this.isLoading = false;
          this.isRecord = false;
          this.channel_data = response['body']['rows'];
          this.tableData = response['body']['rows'];
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

  openDetails(pvarObj :any){
    this.router.navigate(['/channel/channel-details'], {queryParams: {name : pvarObj['channel_name']}} )
  }
}
