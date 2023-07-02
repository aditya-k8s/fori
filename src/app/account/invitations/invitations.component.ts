import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DataTablesModule } from 'angular-datatables';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {
	dtOptions: any = {};
  influencerData:any = []
  constructor(
      private router: Router,
  	  private dataService: DataService,
      public toastr : ToastrManager,
  	  private formBuilder:FormBuilder,
      private titleService:Title
    ) { this.titleService.setTitle("Invitations"); }

  ngOnInit(): void {
    this.dtOptions = {
      	pagingType: 'full_numbers',
      	pageLength: 15,
    };
    this.getInvitations();
  }

	getInvitations() {
	  this.dataService.getInfluencerRequest().subscribe(response => {
        if(response['success'] == true){
        	this.influencerData = response['body']
       	}
		});
	}

  acceptRequest(id:any) {
    // let data = {
    //   'request_id':id
    // }
    this.dataService.acceptRequestByInfluencer(id).subscribe(response => {
        if(response['success'] == true){
           this.toastr.successToastr(response['message']);
            this.getInvitations();
        }
        else{
          this.toastr.errorToastr(response['message']);
        }
    });
  }

  rejectRequest(id:any) {
    //  let data = {
    //   'request_id':id
    // }
    this.dataService.cancelInfluencerRequest(id).subscribe(response => {
        if(response['success'] == true){
           this.toastr.successToastr(response['message']);
            this.getInvitations();
        }
        else{
          this.toastr.errorToastr(response['message']);
        }
    });
  }
}
