import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  user_id : string = "";
  order_id : string = "";
  order_details : any;
  constructor(
    private dataService: DataService,
		public toastr : ToastrManager,
		private router: Router,
		private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
			this.order_id = params['order_id'];
			this.user_id = params['user_id'];
		})
  }

  ngOnInit(): void {
    this.getMyOrderDetail();
  }

  getMyOrderDetail(){
    this.dataService.getMyOrderDetail(this.order_id,this.user_id).subscribe(response =>{
      if(response['success'] == true){
        this.order_details = response['body'];
      }else{

      }
    },error =>{
      console.log(error);
    })
  }

}
