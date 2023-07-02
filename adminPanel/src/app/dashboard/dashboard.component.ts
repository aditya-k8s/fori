import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  constructor(
  		private router: Router
  	) {
      if(sessionStorage.getItem('flag')){
        sessionStorage.removeItem('flag');
        location.reload();
      }
    }

   ngOnInit(): void {
  	if(sessionStorage.getItem("user_id") != undefined){
    }else{
      this.router.navigate(['']);
      return;
    } 	 	
  }

  ngAfterViewInit() {
    if(sessionStorage.getItem("user_id") != undefined){
    }else{
      this.router.navigate(['/login']);
      return;
    }
  }
}
