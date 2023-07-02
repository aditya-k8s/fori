import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  href : boolean = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.router.url == '/stores-brands'){
      this.href = true;
    }
  }

}
