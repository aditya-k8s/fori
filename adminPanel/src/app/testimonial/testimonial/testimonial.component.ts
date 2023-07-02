import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  users_id : any = "";
  search : string = "";
  img_url : string = "";
  testimonial_data : any = [];
  isRecord : boolean = false;
  isDelete : boolean = false;
  isLoading : boolean = false;
  testimonial_id : number = 0;
  constructor(
    private dataService: DataService,
    private router : Router,
    public toastr : ToastrManager,
  ) {
    this.img_url = environment.img_url;
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_id')){
      this.users_id = sessionStorage.getItem('user_id');
    }
    this.getAllTestimonial();
  }

  getAllTestimonial(){
    this.isLoading = true;
    this.isRecord = false;
    this.testimonial_data = [];
    this.dataService.getadmTestimonial().subscribe(response => {
      if(response['success'] == true){
        if(response['body'] != '' && response['body'] != null){
          this.isLoading = false;
          this.isRecord = false;
          this.testimonial_data = response['body'];
        }else{
          this.isLoading = false;
          this.isRecord = true;
        }
      }else{
        this.isLoading = false;
        this.isRecord = false;
      }
    },error =>{
      console.log(error);
    });
  }

  openDelete(pvarId : any){
    this.testimonial_id = pvarId;
    this.isDelete = true;
  }

  yesDelete(){
    this.dataService.deladmTestimonial(this.testimonial_id).subscribe((response :any) =>{
      if(response['success'] == true){
        this.toastr.successToastr(response['message']);
        this.closeDelete();
        this.getAllTestimonial();
      }else{
        this.isDelete = true;
      }
    },(error:any) =>{
      console.log(error);
    })
  }

  closeDelete(){
    this.isDelete = false;
  }
  
  addTestimonial(){
    sessionStorage.removeItem('testimonial');
    this.router.navigate(['/testomonial/add-testimonial']);
  }

  editTestimonial(pvarObj : any){
    sessionStorage.setItem('testimonial', JSON.stringify(pvarObj));
    this.router.navigate(['/testomonial/add-testimonial'],{ queryParams: { id:pvarObj['id']}});
  }
}
