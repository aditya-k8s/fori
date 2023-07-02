import { Component, OnInit } from '@angular/core';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';


@Component({
  selector: 'app-invalid-url',
  templateUrl: './invalid-url.component.html',
  styleUrls: ['./invalid-url.component.css']
})
export class InvalidUrlComponent implements OnInit {

	userId :any = [];
	store:any
  	searchResults: any[] = [];
  	queryField: FormControl = new FormControl();
  constructor(
  	private dataService: DataService
  	) { }

  ngOnInit(){
    this.queryField.valueChanges.subscribe( queryField =>  this.dataService.globalSearch(queryField)
    .subscribe(response => {    
      this.searchResults = response['body'];
    })
	);
  }
    closeSearch(){
    this.searchResults = [];
    this.queryField.setValue('');
  }

}
