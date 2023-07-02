import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {
  broadcastID:any
  constructor(
    private titleService:Title,
    private route: ActivatedRoute,
   ) { 
   this.titleService.setTitle("Thank You");
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.broadcastID = params['id'];
    });
  }

}
