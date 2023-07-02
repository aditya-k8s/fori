import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  @ViewChild('file',{static:false}) fileupload : ElementRef;
  file:any;
  secureApi : string = "";
  newsForm: FormGroup;
  submitted = false;
  token : any;
	userId :any;
  news_id : any = 0;
  isBtnDisable : boolean = false;
  base_64 : string = "";
  newsData : any = [];
  news_image : string = "";
  img_url : string = "";
  constructor(
    private router: Router,
		private dataService: DataService,
    public toastr : ToastrManager,
		private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
  ) {
    this.route.queryParams.subscribe(params => {
      if((params['id'])){
        this.news_id = parseInt(params['id']);
      }
    });
    this.secureApi = environment.secureApi;
    this.img_url = environment.img_url;
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.newsForm = this.formBuilder.group({
      title: ['', Validators.required],
      news_link: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem("user_id")
	    if(this.userId == undefined && this.userId == null){
	        this.router.navigate(['/login'])
	    }
		this.route.queryParams.subscribe(params => {
			this.news_id = parseInt(params['id']);
    })
    if(sessionStorage.getItem('news')){
      this.newsData = JSON.parse(sessionStorage.getItem('news') || '{}');
      if(this.newsData['image'] != null && this.newsData['image'] != undefined){
        this.news_image = this.newsData['image'];
        this.base_64 = this.newsData['image'];
      }
      this.newsForm.patchValue({'title' : this.newsData['title'], 'news_link' : this.newsData['news_link'], 'description' : this.newsData['description']})
    }
  }

  get f() { return this.newsForm.controls; }

  fileChange(event:any){
    //this.file = event.target.files;
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event:any) => {
      this.base_64 = event.target.result;
    }
    reader.onerror = (error:any) => {
      console.log('Error: ', error);
    };
  }

  onSubmit(FormData : any){
    this.submitted = true;
    if (this.newsForm.invalid) {
      return;
    }else{
      FormData['news_id'] = this.news_id == undefined || this.news_id == null || this.news_id == 0 ? 0 : this.news_id;
      FormData['image'] = this.base_64;
      // const formData = new FormData();
      // formData.append('news_id', this.news_id == undefined || this.news_id == null || this.news_id == 0 ? 0 : this.news_id);
      // formData.append('title', form.title);
      // formData.append('description', form.description);
      // formData.append('news_link', form.news_link);
      // if(this.file){
      //   for (var i = 0; i < this.file.length; i++) { 
      //     formData.append("image", this.file[i]);
      //   }
      // }else{
      //   formData.append("image", this.file);
      // }
      this.isBtnDisable = true;
      this.dataService.addNews(FormData).subscribe((response:any) => {
        if(response['success'] == true){
          this.isBtnDisable = false;
          this.file = [];
          this.submitted = false;
          this.router.navigate(['/news/list']);
          this.toastr.successToastr(response['message']);
        }else{
          this.isBtnDisable = false;
          this.toastr.errorToastr(response['message']);
        }
      },error =>{
        console.log(error);
      });
      // this.httpClient.post(this.secureApi+'addNews', formData, httpOptions).subscribe((response:any) =>{
      //   if(response['success'] == true){
      //     this.isBtnDisable = false;
      //     this.file = [];
      //     this.submitted = false;
      //     this.newsForm.reset();
      //     this.fileupload.nativeElement.value = "";
      //     this.toastr.successToastr(response['message']);
      //   }else{
      //     this.isBtnDisable = false;
      //     this.toastr.errorToastr(response['message']);
      //   }
      // },(error:any) => console.log(error))
    }
  }

}
