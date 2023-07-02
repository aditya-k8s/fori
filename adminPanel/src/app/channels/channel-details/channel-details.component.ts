import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {environment} from '../../../environments/environment';
import { FormBuilder,Validators,FormGroup,FormControl } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';

@Component({
  selector: 'app-channel-details',
  templateUrl: './channel-details.component.html',
  styleUrls: ['./channel-details.component.css']
})
export class ChannelDetailsComponent implements OnInit {
  user_id : any;
  channel_data : any;
  broadcast_data : any;
  img_url : string = "";
  channel_name : string = "";
  isRecord : boolean = false;
  isLoading : boolean = false;

  filterForm: FormGroup;
  loading = false;
  submitted = false;
  tableData:any =[];
  search : string = "";
 //dtOptions: any = {};

 
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router : Router,
    private formBuilder:FormBuilder,
  ) {
    this.img_url = environment.img_url;
         this.filterForm = this.formBuilder.group({
        fromDate: ['', Validators.required],
        toDate: ['', Validators.required],
    });
  }

  ngOnInit(){

    

    

    if(sessionStorage.getItem('user_id')){
      this.user_id = sessionStorage.getItem('user_id');
    }
    this.route.queryParams.subscribe(params => {
			this.channel_name = params['name'];
		})

    this.getChannelInformation();

    // this.dtOptions = {
    //     pagingType: 'full_numbers',
    //     pageLength: 20,
    // };
    
  }

      reverseAndTimeStamp(dateString:any) {
        const reverse = new Date(dateString);
        return reverse.getTime();
   }

  get f() { return this.filterForm.controls; }

  filterDate(formData:any){
    this.loading = true
    this.broadcast_data = this.tableData
    const fromDate = formData['fromDate']
    const toDate = formData['toDate']

    if(fromDate && toDate)
    {
      const selectedMembers = this.broadcast_data.filter((m:any) => {
          return this.reverseAndTimeStamp(m.broadcast_time) >= this.reverseAndTimeStamp(fromDate)
            && this.reverseAndTimeStamp(m.broadcast_time) <= this.reverseAndTimeStamp(toDate)
      });
      this.broadcast_data = selectedMembers
      this.loading = false
    }
  }

  ClearFilter() {
    this.filterForm.patchValue({
        'fromDate' : '',
        'toDate' : '',
    })
    this.broadcast_data = this.tableData
  }


  getChannelInformation(){
    this.isLoading = true;
    this.isRecord = false;
    this.dataService.getStreamingChannel(this.channel_name,this.user_id).subscribe(response => {
      if(response['success'] == true){
        this.channel_data = response['body'];
        if(response['body']['broadcasts'] != ''){
          this.isLoading = false;
          this.isRecord = false;
          this.broadcast_data = response['body']['broadcasts'];
          this.tableData = response['body']['broadcasts'];
        }else{
          this.isLoading = false;
          this.isRecord = true;
        }
      }else{
        this.isLoading = false;
        this.isRecord = true;
      }
      // this.following = response['body']['is_follow']
    });
  }

  broadcastDetails(pvarId :any){
    this.router.navigate(['/channel/channel-stream'], {queryParams: {channel_id : pvarId}} )
  }

  liveStream(channel_id:any,broadcast_id:any){
    this.router.navigate(['/channel/stream/'+channel_id],{queryParams:{m:broadcast_id}});
  }
}
