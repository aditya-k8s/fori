import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-add-testimonial',
  templateUrl: './add-testimonial.component.html',
  styleUrls: ['./add-testimonial.component.css']
})
export class AddTestimonialComponent implements OnInit {
  @ViewChild('file',{static:false}) fileupload : ElementRef;
  file:any;
  testimonialForm: FormGroup;
  submitted = false;
  userId :any;
  testData  : any;
  testimonial_id : any = 0;
  isBtnDisable : boolean = false;
  base_64 : string = "";
  img_url : string = "";
  test_image : string = "";
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
        this.testimonial_id = parseInt(params['id']);
      }
    });
    this.img_url = environment.img_url;
    this.testimonialForm = this.formBuilder.group({
      auther_name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if(sessionStorage.getItem("user_id")){
      this.userId = sessionStorage.getItem("user_id");
    };
    if(sessionStorage.getItem('testimonial')){
      this.testData = JSON.parse(sessionStorage.getItem('testimonial') || '{}');
      if(this.testData['image_url'] != null && this.testData['image_url'] != undefined){
        this.test_image = this.testData['image_url'];
        this.base_64 = "";
      }
      this.testimonialForm.patchValue({'auther_name' : this.testData['auther_name'], 'description' : this.testData['description']})
    }
  }

  get f() { return this.testimonialForm.controls; }

  fileChange(event:any){
    //this.file = event.target.files;
    this.test_image = "";
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
    if (this.testimonialForm.invalid) {
      return;
    }else{
      FormData['testimonial_id'] = this.testimonial_id == undefined || this.testimonial_id == null || this.testimonial_id == 0 ? 0 : this.testimonial_id;
      FormData['image'] = this.base_64;
      this.isBtnDisable = true;
      this.dataService.addadmTestimonial(FormData).subscribe((response:any) => {
        if(response['success'] == true){
          this.isBtnDisable = false;
          this.file = [];
          this.submitted = false;
          this.router.navigate(['/testomonial/testimonial']);
          this.toastr.successToastr(response['message']);
        }else{
          this.isBtnDisable = false;
          this.toastr.errorToastr(response['message']);
        }
      },error =>{
        console.log(error);
      });
    }
  }

}
