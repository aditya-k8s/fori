import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-stores-brands',
  templateUrl: './stores-brands.component.html',
  styleUrls: ['./stores-brands.component.css']
})
export class StoresBrandsComponent implements OnInit {

  constructor(
    private titleService:Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Stores & Brands");
  }

}
