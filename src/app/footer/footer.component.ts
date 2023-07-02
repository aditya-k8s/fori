import { Component, OnInit } from '@angular/core';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	userId :any = [];
	store:any
  	results: any[] = [];
  	queryField: FormControl = new FormControl();
  constructor(
  	 private dataService: DataService,
  	 ) { }

  ngOnInit(){
  	   this.queryField.valueChanges
   .subscribe( queryField =>  this.dataService.globalSearch(queryField)
    .subscribe(response => {    
      this.results = response['body'];
    })
	);
  }
    closeSearch(){
    this.results = [];
    this.queryField.setValue('');
  }

}
