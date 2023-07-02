import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { DataService } from '../data.service';
import { DeviceDetectorService } from 'ngx-device-detector';
@Injectable()
export class MessagingService {
    userId : any;
    deviceInfo : any;
    device_token : any;
    currentMessage = new BehaviorSubject(null);
    constructor(
        private angularFireMessaging: AngularFireMessaging,
        private dataService: DataService,
        private deviceService: DeviceDetectorService,
    ){
        this.angularFireMessaging.messages.subscribe((_messaging: any) => {
            _messaging.onMessage = _messaging.onMessage.bind(_messaging);
            _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        })
        // if(localStorage.getItem("user_id")){
        //     this.userId = localStorage.getItem("user_id");
        // }
        if(localStorage.getItem("data")){
            let data = this.dataService.decryptData(localStorage.getItem("data"));
            this.userId = data[0]['user_id'];
        }
    }
    requestPermission() {
        this.angularFireMessaging.requestToken.subscribe((token) => {
            this.device_token = token
            this.getNotification();
        },(err) => {
            console.error('Unable to get permission to notify.', err);
        });
    }

    getNotification(){
        this.deviceInfo = this.deviceService.getDeviceInfo();
        // let data = {
        //     "user_id":"df4a4808-6869-490c-b46d-1ae07faae372",
        //     "device_token":"eD6aA2rBQUzoLIRqOFScE7:APA91bGuOBBnjvBFg0HIC-uaxX2te-IHqcECnz_4rVosRlLcscGJV8uaSyeFbo9WpYqh1aLm1Ntlxpa9WTuu3Cs1KKOcg7b65haksyc-vkSx6IHnh8C0bCCo6-sTQe-spmsH4i0Nh6Yw",
        //     "device_type":"desktop",
        //     "device_name":"Chrome"
        // }
        let data = {
          "user_id" : this.userId,
          "device_token" : this.device_token,
          "device_type" : this.deviceInfo['deviceType'],
          "device_name" :  this.deviceInfo['browser']
        }
        this.dataService.updateUserdeviceInfo(data).subscribe(response =>{
        },error =>{
          console.log(error);
        })
      }

    receiveMessage() {
        this.angularFireMessaging.messages.subscribe((payload : any) => {
            this.currentMessage.next(payload);
        })
    }
}