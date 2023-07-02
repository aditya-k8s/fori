import { Component, OnInit } from '@angular/core';
import {io} from 'socket.io-client';
import {environment} from '../../../environments/environment';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  userId :any = [];
  broadcastID :any = [];
  private socket : any
	socket_url: string = "";
  likes_data : any;
  constructor(
    private routers: ActivatedRoute,
  ) {
    this.socket_url = environment.socket_url;
    this.socket = io(this.socket_url);
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem("user_id");
    this.routers.paramMap.subscribe((params: ParamMap) => {
      this.broadcastID = params.get('id');
  }); 
    this.getAllLikes();
  }

  getAllLikes(){
		this.socket.emit('likesIt',{"broadcast_id":this.broadcastID,"user_id" : this.userId});
		this.socket.on('Getlikes',(likes:any) => {
			this.likes_data = likes;
		});
	}
}
