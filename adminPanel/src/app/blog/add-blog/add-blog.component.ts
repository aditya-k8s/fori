import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  blogForm: FormGroup
	submitted = false
	userId :any;
  blog_id : number = 0;
  blogData : any = [];
  constructor(
    private router: Router,
		private dataService: DataService,
    public toastr : ToastrManager,
		private formBuilder:FormBuilder,
		private route: ActivatedRoute
  ) {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem("user_id")
	    if(this.userId == undefined && this.userId == null){
	        this.router.navigate(['/login'])
	    }
		this.route.queryParams.subscribe(params => {
			this.blog_id = parseInt(params['id']);
    });
    if(sessionStorage.getItem('blog')){
      this.blogData = JSON.parse(sessionStorage.getItem('blog') || '{}');
      this.blogForm.patchValue({'title' : this.blogData['title'], 'description' : this.blogData['description']})
    }
  }

  get f() { return this.blogForm.controls; }

  onSubmit(Formdata : any){
    this.submitted = true;
    if (this.blogForm.invalid) {
      return;
    }else{
      Formdata['blog_id'] = this.blog_id == undefined || this.blog_id == null || this.blog_id == 0 ? 0 : this.blog_id;
      this.dataService.addBlog(Formdata).subscribe(response => {
        if(response['success'] == true){
          this.toastr.successToastr(response['message']);
          this.router.navigate(['/blog/list'])
        }else{
          this.toastr.errorToastr(response['message']);
        }
      }, (error) =>{
        console.log(error);
      });
    }
  }

  inputDesc(e:any){
    console.log(e)
  }

}
