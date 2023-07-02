import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: 'app-sub-categoty-list',
  templateUrl: './sub-categoty-list.component.html',
  styleUrls: ['./sub-categoty-list.component.css']
})
export class SubCategotyListComponent implements OnInit {
  subCatForm: FormGroup;
  sub_categories :any = [];
	isLoading : boolean = false; 
	isRecord : boolean = false;
  isSubCategory : boolean = false;
  submitted : boolean = false;
  isDelete : boolean = false;
  category_id : number = 0;
  sub_category_id : number = 0;
  userId :any;
  header_txt : string = "Add Sub Category";
  constructor(
    private dataService: DataService,
		public toastr : ToastrManager,
		private router : Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
  ) {
    this.subCatForm = this.formBuilder.group({
      sub_category_name: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userId = sessionStorage.getItem("user_id")
    this.route.queryParams.subscribe(params => {
			this.category_id = parseInt(params['id']);
		})
		this.getSubCategory();
  }

  getSubCategory(){
    this.sub_categories = [];
    this.isLoading = true;
    this.isRecord = false;
    this.dataService.getSubCategory(this.category_id).subscribe(response => {
      if(response['success'] == true){
        if(response['body'] != '' && response['body'] != null){
          this.isLoading = false;
          this.isRecord = false;
          this.sub_categories = response['body'];
        }else{
          this.isLoading = false;
          this.isRecord = true;
        }
      }else{
        this.isLoading = false;
        this.isRecord = true;
      }
    },error =>{
      console.log(error);
    });
  }

  openEditCategory(pvarObj :any){
    this.header_txt  = "Update Sub Category";
    this.subCatForm.patchValue({'sub_category_name' : pvarObj['sub_category_name']});
    this.sub_category_id = pvarObj['id'];
    this.isSubCategory = true;
  }

  openAddCategory(){
    this.sub_category_id = 0;
    this.subCatForm.patchValue({'sub_category_name' : ''});
    this.isSubCategory = true;
  }

  get basic() { return this.subCatForm.controls; }

  saveSubCategory(){  
    let Formdata = this.subCatForm.value;
    this.submitted = true;
    if (this.subCatForm.invalid) {
        return;
    }else{
      if(this.sub_category_id == 0){
        Formdata['user_id'] = this.userId,
        Formdata['category_id'] = this.category_id,
        this.dataService.addSubCategory(Formdata).subscribe(response => {
          if(response['success'] == true){
            this.getSubCategory();
            this.toastr.successToastr(response['message']);
            this.closeSubCategory();
          }else{
            this.toastr.successToastr(response['message']);
          }
        });
      }else{
        Formdata['user_id'] = this.userId;
        Formdata['category_id'] = this.category_id;
        Formdata['sub_category_id'] = this.sub_category_id;
        this.dataService.updateSubCategory(Formdata).subscribe(response => {
          if(response['success'] == true){
            this.getSubCategory();
            this.toastr.successToastr(response['message']);
            this.closeSubCategory();
          }else{
            this.toastr.successToastr(response['message']);
          }
        });
      }
    }
  }

  closeSubCategory(){
    this.isSubCategory = false;
  }

  /* ******* delete sub categoty ******** */

  openDelete(pvarObj : any){
    this.category_id = pvarObj['category_id'];
    this.sub_category_id = pvarObj['id'];
    this.isDelete = true;
  }

  yesDelete(){
    this.dataService.delSubCategory(this.sub_category_id).subscribe(response =>{
			if(response['success'] == true){
				this.getSubCategory();
				this.toastr.successToastr((response['message']));
				this.closeDelete();
			}else{
				this.toastr.errorToastr((response['message']));
				this.isDelete = true;
			}
		},error =>{
			console.log(error);
			this.isDelete = true;
		})
  }
  

  closeDelete(){
    this.isDelete = false;
  }
}
