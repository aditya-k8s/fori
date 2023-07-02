import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
userId :any = [];
activation_code :any;
subscribeData:any={}
success:any;
error:any
  constructor(
  	private route: ActivatedRoute,
    private router: Router,
    public toastr : ToastrManager,
  	private dataService: DataService,
  	) { }

  ngOnInit(){
      //Get Logged userID

      if(localStorage.getItem("data")){
        let data = this.dataService.decryptData(localStorage.getItem("data"));
        this.userId = data[0]['user_id'];
      }
      //this.userId = localStorage.getItem("user_id");

      // Get Channel Name from URL
      this.route.paramMap.subscribe(params => {
        this.activation_code = params.get('activation_code');
      });


      //Get Channel Information
     this.getemailconfirmation();
    }

    getemailconfirmation(){
            //Get Channel Information
            this.subscribeData['activation_code'] = this.activation_code;
      this.dataService.getconfirmation(this.subscribeData).subscribe(response => {
        if(response['success'] == true){
            //this.router.navigate(['/login']);
        	 this.success =response['message'];
        }else{
        	this.error = response['message'];
        }
        
      });
    }

}