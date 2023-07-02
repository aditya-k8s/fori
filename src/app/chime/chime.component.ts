import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl,FormArray }  from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


import { DataService } from '../data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { TileOrganizer } from '../tileorganizer.model';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
 

//import CircularCut from '.videofilter/CircularCut';
//import EmojifyVideoFrameProcessor from './videofilter/EmojifyVideoFrameProcessor';
import WebRTCStatsCollector from './webrtcstatscollector/WebRTCStatsCollector';
import {io} from 'socket.io-client';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MediaRecorder, register } from 'extendable-media-recorder';
import * as AWS from 'aws-sdk';
//import * as S3 from 'aws-sdk/clients/s3';
import * as Rx from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/toArray'
import {
  AsyncScheduler,
  AudioInputDevice,
  AudioProfile,
  AudioVideoFacade,
  AudioVideoObserver,
  ClientMetricReport,
  ClientVideoStreamReceivingReport,
  ConsoleLogger,
  ContentShareObserver,
  DataMessage,
  DefaultActiveSpeakerPolicy,
  DefaultAudioMixController,
  DefaultBrowserBehavior,
  DefaultDeviceController,
  DefaultMeetingSession,
  DefaultModality,
  DefaultVideoTransformDevice,
  Device,
  DeviceChangeObserver,
  EventAttributes,
  EventName,
  Logger,
  LogLevel,
  MeetingSession,
  MeetingSessionConfiguration,
  MeetingSessionPOSTLogger,
  MeetingSessionStatus,
  MeetingSessionStatusCode,
  MeetingSessionVideoAvailability,
  MultiLogger,
  NoOpVideoFrameProcessor,
  RemovableAnalyserNode,
  SimulcastLayers,
  TimeoutScheduler,
  Versioning,
  VideoFrameProcessor,
  VideoInputDevice,
  VideoSource,
  VideoTileState,
  VoiceFocusDeviceTransformer,
  VoiceFocusPaths,
  VoiceFocusTransformDevice,
  isAudioTransformDevice
} from 'amazon-chime-sdk-js';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DomSanitizer } from '@angular/platform-browser';
import { CancelService} from '../cancel.service';

@Component({
  selector: 'app-chime',
  templateUrl: './chime.component.html',
  styleUrls: ['./chime.component.css']
})


/*class DemoTileOrganizer {
  // this is index instead of length
  static MAX_TILES = 17;
  tiles: { [id: number]: number } = {};
  tileStates: { [id: number]: boolean } = {};
  remoteTileCount = 0;

  acquireTileIndex(tileId: number): number {
    for (let index = 0; index <= DemoTileOrganizer.MAX_TILES; index++) {
      if (this.tiles[index] === tileId) {
        return index;
      }
    }
    for (let index = 0; index <= DemoTileOrganizer.MAX_TILES; index++) {
      if (!(index in this.tiles)) {
        this.tiles[index] = tileId;
        this.remoteTileCount++;
        return index;
      }
    }
    throw new Error('no tiles are available');
  }

  releaseTileIndex(tileId: number): number {
    for (let index = 0; index <= DemoTileOrganizer.MAX_TILES; index++) {
      if (this.tiles[index] === tileId) {
        this.remoteTileCount--;
        delete this.tiles[index];
        return index;
      }
    }
    return DemoTileOrganizer.MAX_TILES;
  }
}*/



export class ChimeComponent implements OnInit {
  VideoFile=new FileReader();// document.getElementById('content-share-video');//new FileReader();
  ScreenCapture:any=[]
  ContentShareType:any = {'ScreenCapture':this.ScreenCapture, 'VideoFile':this.VideoFile}
  contentShareType: any = this.ContentShareType.VideoFile;

  MAX_TILES = 17;
  tiles:any| { [id: number]: number } = {};
  tileStates:any | { [id: number]: boolean } = {};
  remoteTileCount:any = 0;

  meetingResponse:any={};
  attendeeResponse:any={};
  meetingID:any="";
  logger :any;
  deviceController :any;
  configuration:any;
  meetingSession: MeetingSession | null = null;
  audioInputDevices:any
  audioOutputDevices:any;
  videoInputDevices :any;
  observers:any;
  attendeeId:any; 
  volume:any; 
  muted:any; 
  signalStrength:any;
  meeting:any;
  name:any;


  showActiveSpeakerScores = false;
    activeSpeakerLayout = true;
    voiceConnectorId: string | null = null;
    sipURI: string | null = null;


  region:any;
  enableSimulcast=false;
  enableWebAudio=false;
  enableUnifiedPlanForChromiumBasedBrowsers=false;
  chimeMeetingId:any;
  chimemeetingid:any;
  mobilechimemeetingid:any;
  infomeeting:any;
  infoname:any
  testVideo= 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.360p.vp9.webm';
  youtubevideoURL:any="";
  /*BASE_URL: string = [
    location.protocol,
    '//',
    location.host,
    location.pathname.replace(/\/*$/, '/').replace('/v2', ''),
  ].join('');*/
  BASE_URL="https://chime.kindlebit.com/";//"http://54.237.71.220:4200/";//
  LOGGER_BATCH_SIZE: number = 85;
  LOGGER_INTERVAL_MS: number = 2000;
  MAX_MEETING_HISTORY_MS: number = 480 * 60 * 1000;/* 8 hours meetings                   */
  DATA_MESSAGE_TOPIC: string = 'chat';
  DATA_MESSAGE_LIFETIME_MS: number = 300000;
  DID: string = '+17035550122';

  //audioVideo: any | null = null;
  tileOrganizer:any| TileOrganizer = new TileOrganizer();
  canStartLocalVideo: boolean = true;

  defaultBrowserBehaviour: DefaultBrowserBehavior = new DefaultBrowserBehavior();

  // eslint-disable-next-line                       
  roster: any = {};
  tileIndexToTileId: { [id: number]: number } = {};
  tileIdToTileIndex: { [id: number]: number } = {};
  //tileArea = "demo title";
  tileArea:any= document.getElementById('tile-area') as HTMLDivElement;

  cameraDeviceIds: string[] = [];
  microphoneDeviceIds: string[] = [];
  currentAudioInputDevice:any| AudioInputDevice | undefined;

   buttonStates: { [key: string]: boolean } = {
    'button-microphone': true,
    'button-camera': false,
    'button-speaker': true,
    'button-content-share': false,
    'button-pause-content-share': false,
    'button-video-stats': false,
    'button-video-filter': false,
  };

 
  //contentShareType=VideoFile ;
  // feature flags

  supportsVoiceFocus = false;
  enableVoiceFocus = false;
  voiceFocusIsActive = false;

  markdown = require('markdown-it')({ linkify: true, html: true });
  lastMessageSender: string | null = null;
  lastReceivedMessageTimestamp = 0;

  hasChromiumWebRTC: boolean = this.defaultBrowserBehaviour.hasChromiumWebRTC();
  statsCollector: WebRTCStatsCollector = new WebRTCStatsCollector();
  voiceFocusTransformer:any| VoiceFocusDeviceTransformer | undefined;
  voiceFocusDevice:any| VoiceFocusTransformDevice | undefined;

  // This is an extremely minimal reactive programming approach: these elements
  // will be updated when the Amazon Voice Focus display state changes.
  voiceFocusDisplayables: HTMLElement[] = [];


  
  meetingLogger:any| Logger | undefined = undefined;
  
  failedmeetingerror="";
  failedmeeting="";
  selectedVideoInput: any | null = null;
  search = new URLSearchParams(document.location.search);
  VOICE_FOCUS_CDN = this.search.get('voiceFocusCDN') || undefined;
  VOICE_FOCUS_ASSET_GROUP = this.search.get('voiceFocusAssetGroup') || undefined;
  VOICE_FOCUS_REVISION_ID = this.search.get('voiceFocusRevisionID') || undefined;

  VOICE_FOCUS_PATHS:any | VoiceFocusPaths | undefined = this.VOICE_FOCUS_CDN && {
    processors: this.VOICE_FOCUS_CDN+'processors/',
    wasm: this.VOICE_FOCUS_CDN+'wasm/',
    workers: this.VOICE_FOCUS_CDN+'workers/',
    models: this.VOICE_FOCUS_CDN+'wasm/',
  };
  VOICE_FOCUS_SPEC = {
    assetGroup: this.VOICE_FOCUS_ASSET_GROUP,
    revisionID: this.VOICE_FOCUS_REVISION_ID,
    paths: this.VOICE_FOCUS_PATHS,
  };
  attendeeIds: any;
  formAuthenticate: FormGroup;
  formDevices:FormGroup;

  meetingEventPOSTLogger:any= MeetingSessionPOSTLogger;
  chosenVideoTransformDevice:any= DefaultVideoTransformDevice;

  analyserNode:any| RemovableAnalyserNode;
  audioVideo:any| AudioVideoFacade | null = null;

  VideoFilterName :any| ['NoOp']=[];

  VIDEO_FILTERS:any | ['NoOp'];

  chosenVideoFilter: any = 'None';
    selectedVideoFilterItem: any = 'None';
    attendeeIdmsg:any

    attendeeStart=0;
    streamTitle= "";
    AttendeeName= "Attendee-"+Date.now();
    streamLogo:any= "";// "<img src='https://fori.kindlebit.com/assets/images/logo.png' class='mark'>";//"https://fori.kindlebit.com/assets/images/logo.png";
    SimulcastLayerMapping = {
  [SimulcastLayers.Low]: 'Low',
  [SimulcastLayers.LowAndMedium]: 'Low and Medium',
  [SimulcastLayers.LowAndHigh]: 'Low and High',
  [SimulcastLayers.Medium]: 'Medium',
  [SimulcastLayers.MediumAndHigh]: 'Medium and High',
  [SimulcastLayers.High]: 'High',
};
screentext:any;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  droppedImage:any = '';
  isFileSelected :any
  files = [];
  selectedIndex = 0
  isEditable = false
  file: any
  ImageObject : any
  url : any
  broadcast_id:any;
  broadcastVidoes:any=[]
  image_url='';
  contentsharevideo=0
  paramsArr:any
  userId:any
  userName:any
  user_type:any
  loading:boolean=false;
  textlist:any=[];
  broadcastData:any=[];
  currentDateTimestamp:any;
  liveTimeTimestamp:any;

  private socket : any
  socket_url: string = "";
  likes_data : any = [];
  selected_product : any = [];
  cameraPermission=0;
  isGoLive=0
  meetingURL:any=""
  autoJoined=0

  influencerData:any = []
  isntAccepted = false
  userType:any
  requestID:any
  textshowId=0;
  isCountDown : boolean = false;
  isAlertMsg : boolean = false;
  alertmsg="Please wait to finish the broadcast";
  counter : any;
  autoJoin=0;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  shopper_name:any
  agendaDetail:any=[]
  video_type : string = "";
  videoLink : string = "";
  agenda_id : any = 0;


  clock: any;
  minutes: any = '00';
  seconds: any = '00';
  milliseconds: any = '00';

  start: boolean= true;
  showTimerControls: boolean=true;
  counters: number=0;
  timerRef:any;
  running: boolean = false;
  startText = '';
  showID:any;
  isBroadcastRec:number=0;
  agendaID:any;
  reqVariable : any = null;
  recordingComplete:number=0
  showEmojiPicker = false;
  message = '';
  startPos : number = 0;
  endPos : number = 0;
  profile_Pic:any;

  images_arr :any = [];
  classStr : any;
  constructor(  
    private routers: ActivatedRoute,  
    private router: Router,
    private dataService: DataService,
    private formBuilder:FormBuilder,
    public toastr : ToastrManager,
    private _sanitizer: DomSanitizer,
    private cancelService :CancelService
  //analyserNode: Removab,leAnalyserNode, 
  //currentAudioInputDevice: AudioInputDevice,  
  //audioVideo: AudioVideoFacade,  
  //voiceFocusDevice: VoiceFocusTransformDevice, 
  //voiceFocusTransformer: VoiceFocusDeviceTransformer            
  

) {
  this.image_url = environment.image_url;
  this.socket_url = environment.socket_url;
  this.socket = io(this.socket_url);
  this.formAuthenticate = this.formBuilder.group({
    inputMeeting: ['', Validators.required],
    inputName: ['', Validators.required],
    inputRegion: ['', Validators.required],
    webaudio: [''],
    fullbandspeechmonoquality: [''],
    fullbandmusicmonoquality: [''],
    simulcast: [''],
    planB: ['']

    });
    this.formDevices = this.formBuilder.group({
    audioInput: ['', Validators.required],
    addvoicefocus: [''],
    videoinput: ['', Validators.required],
    videoinputquality: [''],
    audiooutput: [''],
    

    });

    this.dataService.shareEmptyImg.subscribe(response =>{
      if(response){
        this.images_arr = [];
      }
    });

   }

  ngOnInit() {

    if(localStorage.getItem("data")){
      let data = this.dataService.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
      this.userName = data[0]['username'];
      this.user_type = data[0]['user_type'];
      this.profile_Pic = data[0]['profile_pic'];
      this.shopper_name = data[0]['shopper_name']
      if(this.shopper_name) {
          this.AttendeeName = this.shopper_name +"#"+this.userId+"#"+this.user_type;
      }else { 
          this.AttendeeName = this.userName +"#"+this.userId+"#"+this.user_type;
      }
    }else{
      setTimeout(() => {
        this.router.navigate(['/login'])
      },2000);
    }

    //contentShareType= this.ContentShareType;
    //this.ContentShareType=this.ContentShareType.VideoFile
    //this.logger = new ConsoleLogger('MyLogger', LogLevel.INFO);
    //this.deviceController = new DefaultDeviceController(this.logger);
    //this.getMeetingID();
    //(document.getElementById('sdk-version') as HTMLSpanElement).innerText =
    //  'amazon-chime-sdk-js@' + Versioning.sdkVersion;
    this.decryptData();
    this.initEventListeners();
    this.initParameters();
    this.setMediaRegion();
    this.setUpVideoTileElementResizer();
    this.meetingURL=window.location.href+"&share=influencer";
       // console.log(this.meetingURL,'===========',window.location.href);
    if (this.isRecorder() || this.isBroadcaster()) {
      new AsyncScheduler().start(async () => {

        this.meeting= new URL(window.location.href).searchParams.get('m');
        this.meetingURL=window.location.href+"&share=influencer";
        console.log('meeting-2-',this.meeting);
        this.name = this.isRecorder() ? '«Meeting Recorder»' : '«Meeting Broadcaster»';
        await this.authenticate();
        await this.openAudioOutputFromSelection();
        await this.join();
        this.displayButtonStates();
        this.switchToFlow('flow-meeting');
      });
    } else {
      this.switchToFlow('flow-authenticate');
    }

    this.routers.queryParams.subscribe((params:any) => {
      if(params['share'] == 'influencer') {
        console.log(params['share'],"------",this.user_type)
        if(this.user_type == '3') 
        {
          console.log("yooooooooooo")
           this.getInfluencerStatus()
        
        }
      }
    });
    
  }

  getInfluencerStatus(){
    this.dataService.getInfluencerRequestStatus(this.userId,this.broadcast_id).subscribe(response => {
        console.log(response,"000------status",this.user_type)
        if(response['success'] == true) {
          if(response['body'][0]['status'] == 2) {
            console.log("+++++++++++++")
            this.isntAccepted = false
          }
          else {
              console.log("--------------")
              this.isntAccepted = true
          }
        }
    });
  }

  yesDelete(){
    this.dataService.getInfluencerRequest().subscribe(response => {
        console.log(response,"000")
        if(response['success'] == true){
          this.influencerData = response['body']
          this.isntAccepted = false
        }
    });
  }

  closeDelete(){
    this.isntAccepted = false
     this.router.navigate(['/']);
  }

  decryptData(){
    var dataQ = new URL(window.location.href).searchParams.get('q');
    this.paramsArr = dataQ; //this.dataService.decryptData(dataQ);

    console.log('decryptData----------',this.paramsArr);
    if(!dataQ){
      return this.router.navigate(['inventory']);
    }
    return this.paramsArr;
  }
    get fg() { return this.formDevices.controls; }
    get f() { return this.formAuthenticate.controls; }
    initParameters(): void {
      const meeting = new URL(window.location.href).searchParams.get('m');
       this.meetingURL=window.location.href+"&share=influencer";
      let splitVal = this.paramsArr.split("_");
      const title = splitVal[0]+splitVal[1];  //this.paramsArr.s;// new URL(window.location.href).searchParams.get('s');
      const username = this.userName; //this.paramsArr.u;// new URL(window.location.href).searchParams.get('u');
      this.broadcast_id = splitVal[1]; //this.paramsArr.b;// new URL(window.location.href).searchParams.get('b');
     // this.socket.emit('getFlashProduct',{"broadcast_id":this.broadcast_id});
      this.getAllUser();          
     
      console.log('mgetFlashProducteeting');
      //this.liveSales({broadcast_id:this.broadcast_id});
      const broadcaster = new URL(window.location.href).searchParams.get('host');
      this.getbroadcastvideos();
      this.productList();
      this.gettext();
      this.getAllLikes();
      console.log('meeting',meeting);
      if (title && username) {        
        (document.getElementById('inputMeeting') as HTMLInputElement).value = title;
        (document.getElementById('inputName') as HTMLInputElement).value =username;
        this.autoSubmit();
      }
      /*if (meeting) {   
        this.attendeeStart=1;
        (document.getElementById('inputMeeting') as HTMLInputElement).value = meeting;
        (document.getElementById('inputName') as HTMLInputElement).focus();
        if (this.attendeeStart==1) {
          (document.getElementById('inputName') as HTMLInputElement).value =meeting+'+'+this.AttendeeName;
          console.log("Auto host submit>>>>>>>>>>>>>>>>>>>>>>>>>")
        }
      
      }else {
                                                  
        (document.getElementById('inputMeeting') as HTMLInputElement).focus();
      }*/          
  }

async initVoiceFocus(): Promise<void> {
    const logger = new ConsoleLogger('SDK', LogLevel.DEBUG);
    if (!this.enableWebAudio) {
      logger.info('[DEMO] Web Audio not enabled. Not checking for Amazon Voice Focus support.');
      return;
    }

    try {
      this.supportsVoiceFocus = await VoiceFocusDeviceTransformer.isSupported(this.VOICE_FOCUS_SPEC, {
        logger,
      });
      if (this.supportsVoiceFocus) {
        this.voiceFocusTransformer = await this.getVoiceFocusDeviceTransformer();
        this.supportsVoiceFocus =
          this.voiceFocusTransformer && this.voiceFocusTransformer.isSupported();
        if (this.supportsVoiceFocus) {
          logger.info('[DEMO] Amazon Voice Focus is supported.');
         // document.getElementById('voice-focus-setting').classList.remove('hidden');
          const var2= document.getElementById('voice-focus-setting')
          if (var2) {
            var2.classList.remove('hidden');
          }
          await this.populateAllDeviceLists();
          return;
        }
      }
    } catch (e) {
      // Fall through.
      logger.warn(`[DEMO] Does not support Amazon Voice Focus: ${e.message}`);
    }
    logger.warn('[DEMO] Does not support Amazon Voice Focus.');
    this.supportsVoiceFocus = false;
    //document.getElementById('voice-focus-setting').classList.toggle('hidden', true);
    const var5=document.getElementById('voice-focus-setting');
    if (var5) {
      var5.classList.toggle('hidden', true);
    }
    await this.populateAllDeviceLists();
  }
 private async onVoiceFocusSettingChanged(): Promise<void> {
    this.log('[DEMO] Amazon Voice Focus setting toggled to', this.enableVoiceFocus);
    this.openAudioInputFromSelectionAndPreview();
  }
    autoSubmit(){
    
      this.meeting = (document.getElementById('inputMeeting') as HTMLInputElement).value;
      this.name = (document.getElementById('inputName') as HTMLInputElement).value;
      this.region = (document.getElementById('inputRegion') as HTMLInputElement).value;
      this.enableSimulcast = (document.getElementById('simulcast') as HTMLInputElement).checked;
     
      this.name=this.AttendeeName
      if (this.enableSimulcast) {
        const videoInputQuality = document.getElementById(
          'video-input-quality'
        ) as HTMLSelectElement;
        videoInputQuality.value = '360p';
      }
      this.enableWebAudio = (document.getElementById('webaudio') as HTMLInputElement).checked;
      // js sdk default to enable unified plan, equivalent to "Disable Unified Plan" default unchecked
      this.enableUnifiedPlanForChromiumBasedBrowsers = !(document.getElementById(
        'planB'
      ) as HTMLInputElement).checked;
      new AsyncScheduler().start(
        async (): Promise<void> => {
          let chimeMeetingId: string = '';
          this.showProgress('progress-authenticate');
          try {
            chimeMeetingId = await this.authenticate();
            console.log('chimeMeetingId>>>>>>>>>>>>>',chimeMeetingId);
          } catch (error) {
            console.error(error);
            const httpErrorMessage =
              'UserMedia is not allowed in HTTP sites. Either use HTTPS or enable media capture on insecure sites.';
            (document.getElementById(
              'failed-meeting'
            ) as HTMLDivElement).innerText = 'Meeting ID: '+this.meeting;
            (document.getElementById('failed-meeting-error') as HTMLDivElement).innerText =
              window.location.protocol === 'http:' ? httpErrorMessage : error.message;
            this.switchToFlow('flow-failed-meeting');
            return;
          }

        
          /*(document.getElementById(   bvbvbvbvbvb      nnnnn  
            'meeting-id'
          ) as HTMLSpanElement).innerText = this.meeting+' ('+this.region+')';
          (document.getElementById(
            'chime-meeting-id'
          ) as HTMLSpanElement).innerText = 'Broadcast ID: '+chimeMeetingId;
          (document.getElementById(
            'mobile-chime-meeting-id'
          ) as HTMLSpanElement).innerText = 'Broadcast ID: '+chimeMeetingId;
          if(this.meetingSession != null &&  this.meetingSession.configuration!= null) {
            (document.getElementById(
              'mobile-attendee-id'
            ) as HTMLSpanElement).innerText = 'Attendee ID: ';//+this.meetingSession.configuration.credentials.attendeeId;
            (document.getElementById(
              'desktop-attendee-id'   
            ) as HTMLSpanElement).innerText = 'Attendee ID: ';//+this.meetingSession.configuration.credentials.attendeeId;
                
          }*/
          (document.getElementById('info-meeting') as HTMLSpanElement).innerText = this.meeting;
          (document.getElementById('info-name') as HTMLSpanElement).innerText = this.name;
          
          await this.initVoiceFocus();

          this.switchToFlow('flow-devices');
          await this.openAudioInputFromSelectionAndPreview();
          try {
            await this.openVideoInputFromSelection(
              (document.getElementById('video-input') as HTMLSelectElement).value,
              true
            );
          } catch (err) {
            //fatal(err);
            console.log('no video input device selected');
          }
          await this.openAudioOutputFromSelection();
          this.hideProgress('progress-authenticate');
        }
      );
   
    }
    
  initEventListeners(): void {
      if (!this.defaultBrowserBehaviour.hasChromiumWebRTC()) {
        (document.getElementById('simulcast') as HTMLInputElement).disabled = true;
        (document.getElementById('planB') as HTMLInputElement).disabled = true;
      }

    var formAuthenticate=document.getElementById('form-authenticate');
    if (formAuthenticate) {
     formAuthenticate.addEventListener('submit', e => {
      e.preventDefault();                                                                               
      this.meeting = (document.getElementById('inputMeeting') as HTMLInputElement).value;
      this.name = (document.getElementById('inputName') as HTMLInputElement).value;
      this.region = (document.getElementById('inputRegion') as HTMLInputElement).value;
      this.enableSimulcast = (document.getElementById('simulcast') as HTMLInputElement).checked;
      if (this.enableSimulcast) {
        const videoInputQuality = document.getElementById(
          'video-input-quality'
        ) as HTMLSelectElement;
        videoInputQuality.value = '360p';
      }
      this.enableWebAudio = (document.getElementById('webaudio') as HTMLInputElement).checked;
      // js sdk default to enable unified plan, equivalent to "Disable Unified Plan" default unchecked
      this.enableUnifiedPlanForChromiumBasedBrowsers = !(document.getElementById(
        'planB'
      ) as HTMLInputElement).checked;
      new AsyncScheduler().start(
        async (): Promise<void> => {
          let chimeMeetingId: string = '';
          this.showProgress('progress-authenticate');
          try {
            chimeMeetingId = await this.authenticate();
            console.log('chimeMeetingId>>>>>>>>>>>>>',chimeMeetingId);
          } catch (error) {
            console.error(error);
            const httpErrorMessage =
              'UserMedia is not allowed in HTTP sites. Either use HTTPS or enable media capture on insecure sites.';
            (document.getElementById(
              'failed-meeting'
            ) as HTMLDivElement).innerText = 'Meeting ID: '+this.meeting;
            (document.getElementById('failed-meeting-error') as HTMLDivElement).innerText =
              window.location.protocol === 'http:' ? httpErrorMessage : error.message;
            this.switchToFlow('flow-failed-meeting');
            return;
          }

        
          (document.getElementById(
            'meeting-id'
          ) as HTMLSpanElement).innerText = this.meeting+' ('+this.region+')';
          (document.getElementById(
            'chime-meeting-id'
          ) as HTMLSpanElement).innerText = 'Broadcast ID: '+chimeMeetingId;
          (document.getElementById(
            'mobile-chime-meeting-id'
          ) as HTMLSpanElement).innerText = 'Broadcast ID: '+chimeMeetingId;
          if(this.meetingSession != null &&  this.meetingSession.configuration!= null) {
            (document.getElementById(
              'mobile-attendee-id'
            ) as HTMLSpanElement).innerText = 'Attendee ID: ';//+this.meetingSession.configuration.credentials.attendeeId;
            (document.getElementById(
              'desktop-attendee-id'
            ) as HTMLSpanElement).innerText = 'Attendee ID: ';//+this.meetingSession.configuration.credentials.attendeeId;
            
          }
          (document.getElementById('info-meeting') as HTMLSpanElement).innerText = this.meeting;
          (document.getElementById('info-name') as HTMLSpanElement).innerText = this.name;
      
          await this.initVoiceFocus();

          this.switchToFlow('flow-devices');
          await this.openAudioInputFromSelectionAndPreview();
          try {
            await this.openVideoInputFromSelection(
              (document.getElementById('video-input') as HTMLSelectElement).value,
              true
            );
          } catch (err) {
            //fatal(err);
            console.log('no video input device selected');
          }
          await this.openAudioOutputFromSelection();
          this.hideProgress('progress-authenticate');
        }
      );
    });
  }
    const speechMonoCheckbox = document.getElementById(
      'fullband-speech-mono-quality'
    ) as HTMLInputElement;
    const musicMonoCheckbox = document.getElementById(
      'fullband-music-mono-quality'
    ) as HTMLInputElement;
    speechMonoCheckbox.addEventListener('change', _e => {
      if (speechMonoCheckbox.checked) {
        musicMonoCheckbox.checked = false;
      }
    });
    musicMonoCheckbox.addEventListener('change', _e => {
      if (musicMonoCheckbox.checked) {
        speechMonoCheckbox.checked = false;
      }
    });
    var tosipflow= document.getElementById('to-sip-flow');
    if (tosipflow) {
      tosipflow.addEventListener('click', e => {
        e.preventDefault();
        this.switchToFlow('flow-sip-authenticate');
      });
  }

  var formSipAuthenticate=document.getElementById('form-sip-authenticate');
    if (formSipAuthenticate) {
     formSipAuthenticate.addEventListener('submit', e => {
      e.preventDefault();
      this.meeting = (document.getElementById('sip-inputMeeting') as HTMLInputElement).value;
      this.voiceConnectorId = (document.getElementById(
        'voiceConnectorId'
      ) as HTMLInputElement).value;

      new AsyncScheduler().start(
        async (): Promise<void> => {
          this.showProgress('progress-authenticate');
          const region = this.region || 'us-east-1';
          try {
            const response = await fetch(
              this.BASE_URL+'join?title='+encodeURIComponent(
                this.meeting
              )+'&name='+encodeURIComponent(this.DID)+'&region='+encodeURIComponent(
                region
              ),
              {
                method: 'POST',
              }
            );
            const json = await response.json();
            const joinToken = json.JoinInfo.Attendee.Attendee.JoinToken;
            this.sipURI = `sip:${this.DID}@${this.voiceConnectorId};transport=tls;X-joinToken=${joinToken}`;
            this.switchToFlow('flow-sip-uri');
          } catch (error) {
            (document.getElementById(
              'failed-meeting'
            ) as HTMLDivElement).innerText = 'Broadcast ID: '+this.meeting;
            (document.getElementById('failed-meeting-error') as HTMLDivElement).innerText =
              error.message;
            this.switchToFlow('flow-failed-meeting');
            return;
          }
          const sipUriElement = document.getElementById('sip-uri') as HTMLInputElement;
          sipUriElement.value = this.sipURI;
          this.hideProgress('progress-authenticate');
        }
      );
    });
  }
  //on-screen-agenda
  //   var textscreen=document.getElementById('on-screen-agenda');
  //   if (textscreen) {
  //       textscreen.addEventListener('click', () => {
  //         var screenagendaopen=document.getElementById('on-screen-agenda-open');
  //         if (screenagendaopen) {
  //           console.log('show added')
  //           screenagendaopen.classList.add("show");
  //         }
  //         this.streamTitle=""//screentext
  //         //(document.getElementById('inputMeeting') as HTMLInputElement).value = title;

  //     });
  // }
  var createTxt=document.getElementById('createTxt');
  if (createTxt) {
        createTxt.addEventListener('click', () => {
          //textscreen.classList.remove("show");
          this.streamTitle=(document.getElementById('screentextId') as HTMLInputElement).value;
          //console.log((document.getElementById('screentextId') as HTMLInputElement).value);
          console.log('streamTitle------------->',this.streamTitle);
          //attendeeid-demo
          (document.getElementById('attendeeidemo') as HTMLDivElement).innerText = this.streamTitle ;

      });
  }
    var copySipUri=document.getElementById('copy-sip-uri');
    if (copySipUri) {
        copySipUri.addEventListener('click', () => {
        const sipUriElement = document.getElementById('sip-uri') as HTMLInputElement;
        sipUriElement.select();
        document.execCommand('copy');
      });
  }

    const audioInput = document.getElementById('audio-input') as HTMLSelectElement;
    audioInput.addEventListener('change', async (_ev: Event) => {
      console.log('audio input device is changed');
      await this.openAudioInputFromSelectionAndPreview();
    });

    const videoInput = document.getElementById('video-input') as HTMLSelectElement;
    videoInput.addEventListener('change', async (_ev: Event) => {
      console.log('video input device is changed');
      try {
        await this.openVideoInputFromSelection(videoInput.value, true);
      } catch (err) {
        //fatal(err);
        console.log('no video input device selected');
      }
    });

    const videoInputQuality = document.getElementById('video-input-quality') as HTMLSelectElement;
    videoInputQuality.addEventListener('change', async (_ev: Event) => {
      console.log('Video input quality is changed');
      switch (videoInputQuality.value) {
        case '360p':
          this.audioVideo.chooseVideoInputQuality(640, 360, 15, 600);
          //this.audioVideo.chooseVideoInputQuality(320, 180, 15, 250);
          break;
        case '540p':
          this.audioVideo.chooseVideoInputQuality(960, 540, 15, 1400);
          break;
        case '720p':
          this.audioVideo.chooseVideoInputQuality(1280, 720, 15, 1400);
          break;
      }
      try {
        await this.openVideoInputFromSelection(videoInput.value, true);
      } catch (err) {
        //fatal(err);
        console.log('no video input device selected');
      }
    });

    const audioOutput = document.getElementById('audio-output') as HTMLSelectElement;
    if (audioOutput) {
    audioOutput.addEventListener('change', async (_ev: Event) => {
      console.log('audio output device is changed');
      await this.openAudioOutputFromSelection();
    });
  }
    var buttonTestsound=document.getElementById('button-test-sound');
    if (buttonTestsound) {
        buttonTestsound.addEventListener('click', async e => {
        e.preventDefault();
        const audioOutput = document.getElementById('audio-output') as HTMLSelectElement;
        //const testSound = new TestSound(this.meetingEventPOSTLogger, audioOutput.value);
       // await testSound.init();
      });
    }   


    /******text on video*****/
   /*var createTxt=document.getElementById('createTxt');
    if (createTxt) {
        createTxt.addEventListener('click', async e => {
        e.preventDefault();
        this.screentext = (document.getElementById('screentext') as HTMLInputElement).value;
       // attendeeid-demo
        (document.getElementById('attendeeidemo') as HTMLDivElement).innerText = this.screentext ;

        //const testSound = new TestSound(this.meetingEventPOSTLogger, audioOutput.value);
       // await testSound.init();
      });
    } 


    */
     if (this.autoJoined==0) {
      
      const puseVideo= document.getElementById('puseVideo')
      if (puseVideo) {
        puseVideo.style.display = 'none';
      }
      const hideCamera= document.getElementById('hideCamera')
      if (hideCamera) {
        hideCamera.style.display = 'none';
      }
      const hideForm= document.getElementById('hideForm')
      if (hideForm) {
        hideForm.style.display = 'block';
      }
      
      const hideStart= document.getElementById('hideStart')
      if (hideStart) {
        hideStart.style.display = 'none';
      }
      const showStart= document.getElementById('showStart')
      if (showStart) {
        showStart.style.display = 'block';
      }

      const screenAction= document.getElementById('screenAction')
        if (screenAction) {
          screenAction.style.display = 'none';
        }
       const screenform= document.getElementById('screen-form')
        if (screenform) {
          screenform.style.display = 'block';
        }     
      //this.buttonStates['button-camera'] = false;
      let buttoncamrna=document.getElementById('button-camera')
      if (buttoncamrna) {
        buttoncamrna.click();
      }

    }
    if (this.autoJoined==1) {
      const hideForm= document.getElementById('hideForm')
      if (hideForm) {
        hideForm.style.display = 'none';
      }
      const hideCamera= document.getElementById('hideCamera')
      if (hideCamera) {
        hideCamera.style.display = 'block';
      }

      const hideStart= document.getElementById('hideStart')
      if (hideStart) {
        hideStart.style.display = 'block';
      }
      const showStart= document.getElementById('showStart')
      if (showStart) {
        showStart.style.display = 'none';
      }
      const screenAction= document.getElementById('screenAction')
      if (screenAction) {
        screenAction.style.display = 'block';
      }
      const screenform= document.getElementById('screen-form')
      if (screenform) {
        screenform.style.display = 'none';
      }
            

    }
    var startBroadcast=document.getElementById('StartBroadcast');
    if (startBroadcast) {
        startBroadcast.addEventListener('click', e => {
        e.preventDefault();
        //this.autoJoined=1;
        this.openCountDown();
        this.updateBroadcastStatus('1');
        const hideStart= document.getElementById('hideStart')
        if (hideStart) {
          hideStart.style.display = 'none';
        }
        const puseVideo= document.getElementById('puseVideo')
        if (puseVideo) {
          puseVideo.style.display = 'block';
        }
        const liveimg= document.getElementById('liveimg')
        if (liveimg) {
          liveimg.style.display = 'block';
        }
       
        const buttonrecordself = document.getElementById('button-record-self');
        if (buttonrecordself) {
          buttonrecordself.click();
          //buttonrecordself.style.visibility = 'visible';
          this.startTimer();
        }      

      });
    }   
    var formdevices=document.getElementById('form-devices');
    if (formdevices) {
        formdevices.addEventListener('submit', e => {
        e.preventDefault();
        this.openCountDown();
        this.autoJoined=1;
        if (this.autoJoined==1) {
            const hideForm= document.getElementById('hideForm')
            if (hideForm) {
              hideForm.style.display = 'none';
            }
            const screenform= document.getElementById('screen-form')
            if (screenform) {
              screenform.style.display = 'none';
            }
            const hideCamera= document.getElementById('hideCamera')
            if (hideCamera) {
              hideCamera.style.display = 'block';
            }
            const screenAction= document.getElementById('screenAction')
            if (screenAction) {
              screenAction.style.display = 'block';
            }
            
            const hideStart= document.getElementById('hideStart')
            if (hideStart) {
              hideStart.style.display = 'none';
            }
            const puseVideo= document.getElementById('puseVideo')
            if (puseVideo) {
              puseVideo.style.display = 'block';
            }

            const showStart= document.getElementById('showStart')
            if (showStart) {
              showStart.style.display = 'none';
            }

        }
        this.updateBroadcastStatus('1');
        const buttonrecordself = document.getElementById('button-record-self');
        if (buttonrecordself) {
          buttonrecordself.click();
          //buttonrecordself.style.visibility = 'visible';
          this.startTimer();
        }  
        this.contentsharevideo=1;
        this.isGoLive=1
        console.log('attendeeStart------>>>>>>>>>>>>>>>>>>>',this.attendeeStart);
        if (this.attendeeStart==1) {
          const toolbar= document.getElementById('toolbar')
          if (toolbar) {
            toolbar.style.display = 'none';
        }

        }
        new AsyncScheduler().start(async () => {
          try {
            this.showProgress('progress-join');
            await this.stopAudioPreview();
            this.audioVideo.stopVideoPreviewForVideoInput(
              document.getElementById('video-preview') as HTMLVideoElement
            );
            const videopreview= document.getElementById('video-preview');
              if (videopreview) {
                videopreview.style.display = 'none';
                const attendeeidemo= document.getElementById('attendeeidemo');
                if (attendeeidemo) {
                  attendeeidemo.style.display = 'none';
                }
            }
            await this.join();  
            console.log('Join End------>>>>>>>>>>>>>>>>>>>');

            this.audioVideo.chooseVideoInputDevice(null);
            console.log('chooseVideoInputDevice End------>>>>>>>>>>>>>>>>>>>');

            this.hideProgress('progress-join');
            console.log('hideProgress End------>>>>>>>>>>>>>>>>>>>');

            this.displayButtonStates();
            console.log('displayButtonStates End------>>>>>>>>>>>>>>>>>>>');

            this.switchToFlow('flow-meeting');
            console.log('switchToFlow End------>>>>>>>>>>>>>>>>>>>');
            //this.autostartCam();
            let buttoncamrna=document.getElementById('button-camera')
            if (buttoncamrna) {
             buttoncamrna.click();
            }
             this.onVoiceFocusSettingChanged();
          } catch (error) {
            console.log('erro End------>>>>>>>>>>>>>>>>>>>',error);
            const failedjoin= document.getElementById('failed-join');
            const failedjoinerror= document.getElementById('failed-join-error')
            if (failedjoin) {
              failedjoin.innerText = 'Meeting ID: '+this.meeting;
            }
            if (failedjoinerror) {
             failedjoinerror.innerText = 'Error: '+error.message;
          }
          }
        });
      });
    
    }
    var formdevices=document.getElementById('form-devices-camera');
    if (formdevices) {
        formdevices.addEventListener('submit', e => {
        e.preventDefault();
        this.autoJoined=1;
          if (this.autoJoined==1) {
            const hideForm= document.getElementById('hideForm')
            if (hideForm) {
              hideForm.style.display = 'none';
            }
            const screenform= document.getElementById('screen-form')
            if (screenform) {
              screenform.style.display = 'none';
            }
            const hideCamera= document.getElementById('hideCamera')
            if (hideCamera) {
              hideCamera.style.display = 'block';
            }

            const hideStart= document.getElementById('hideStart')
            if (hideStart) {
              hideStart.style.display = 'block';
            }
            const showStart= document.getElementById('showStart')
            if (showStart) {
              showStart.style.display = 'none';
            }
            const screenAction= document.getElementById('screenAction')
            if (screenAction) {
              screenAction.style.display = 'block';
            }
            

          }
        //this.updateBroadcastStatus();
        this.contentsharevideo=1;
        this.isGoLive=1
        console.log('attendeeStart------>>>>>>>>>>>>>>>>>>>',this.attendeeStart);
        if (this.attendeeStart==1) {
          const toolbar= document.getElementById('toolbar')
          if (toolbar) {
            toolbar.style.display = 'none';
        }

        }
        new AsyncScheduler().start(async () => {
          try {
            this.showProgress('progress-join');
            await this.stopAudioPreview();
            this.audioVideo.stopVideoPreviewForVideoInput(
              document.getElementById('video-preview') as HTMLVideoElement
            );
            const videopreview= document.getElementById('video-preview');
              if (videopreview) {
                videopreview.style.display = 'none';
                const attendeeidemo= document.getElementById('attendeeidemo');
                if (attendeeidemo) {
                  attendeeidemo.style.display = 'none';
                }
            }
            await this.join();
              console.log('Join End------>>>>>>>>>>>>>>>>>>>');

            this.audioVideo.chooseVideoInputDevice(null);
              console.log('chooseVideoInputDevice End------>>>>>>>>>>>>>>>>>>>');

            this.hideProgress('progress-join');
            console.log('hideProgress End------>>>>>>>>>>>>>>>>>>>');

            this.displayButtonStates();
            console.log('displayButtonStates End------>>>>>>>>>>>>>>>>>>>');

            this.switchToFlow('flow-meeting');
             console.log('switchToFlow End------>>>>>>>>>>>>>>>>>>>');
            //this.autostartCam();
            let buttoncamrna=document.getElementById('button-camera')
            if (buttoncamrna) {
             buttoncamrna.click();
            }
            

          } catch (error) {
             console.log('erro End------>>>>>>>>>>>>>>>>>>>',error);
             const failedjoin= document.getElementById('failed-join');
             const failedjoinerror= document.getElementById('failed-join-error')
            if (failedjoin) {
              failedjoin.innerText = 'Meeting ID: '+this.meeting;
            }
            if (failedjoinerror) {
             failedjoinerror.innerText = 'Error: '+error.message;
          }
          }
        });
      });
    
     }
    var formdevic=document.getElementById('form-devicesscreen');
    if (formdevic) {
        formdevic.addEventListener('submit', e => {
        e.preventDefault();
        this.autoJoined=1;
          if (this.autoJoined==1) {
            const hideForm= document.getElementById('hideForm')
            if (hideForm) {
              hideForm.style.display = 'none';
            }
            const screenform= document.getElementById('screen-form')
            if (screenform) {
              screenform.style.display = 'none';
            }
            
            const hideCamera= document.getElementById('hideCamera')
            if (hideCamera) {
              hideCamera.style.display = 'block';
            }

            const hideStart= document.getElementById('hideStart')
            if (hideStart) {
              hideStart.style.display = 'block';
            }
            const showStart= document.getElementById('showStart')
            if (showStart) {
              showStart.style.display = 'none';
            }
            const screenAction= document.getElementById('screenAction')
            if (screenAction) {
              screenAction.style.display = 'block';
            }
            

          }
        //this.updateBroadcastStatus();
        this.contentsharevideo=1;
        this.isGoLive=1
        console.log('attendeeStart------>>>>>>>>>>>>>>>>>>>',this.attendeeStart);
        if (this.attendeeStart==1) {
          const toolbar= document.getElementById('toolbar')
          if (toolbar) {
            toolbar.style.display = 'none';
        }

        }
        new AsyncScheduler().start(async () => {
          try {
            this.showProgress('progress-join');
            await this.stopAudioPreview();
            this.audioVideo.stopVideoPreviewForVideoInput(
              document.getElementById('video-preview') as HTMLVideoElement
            );
            const videopreview= document.getElementById('video-preview');
              if (videopreview) {
                videopreview.style.display = 'none';
                const attendeeidemo= document.getElementById('attendeeidemo');
                if (attendeeidemo) {
                  attendeeidemo.style.display = 'none';
                }
            }
            await this.join();
              console.log('Join End------>>>>>>>>>>>>>>>>>>>');

            this.audioVideo.chooseVideoInputDevice(null);
              console.log('chooseVideoInputDevice End------>>>>>>>>>>>>>>>>>>>');

            this.hideProgress('progress-join');
            console.log('hideProgress End------>>>>>>>>>>>>>>>>>>>');

            this.displayButtonStates();
            console.log('displayButtonStates End------>>>>>>>>>>>>>>>>>>>');

            this.switchToFlow('flow-meeting');
             console.log('switchToFlow End------>>>>>>>>>>>>>>>>>>>');
            //this.autostartCam();
            let buttoncamrna=document.getElementById('button-camera')
            if (buttoncamrna) {
             buttoncamrna.click();
            }
             
          } catch (error) {
             console.log('erro End------>>>>>>>>>>>>>>>>>>>',error);
             const failedjoin= document.getElementById('failed-join');
             const failedjoinerror= document.getElementById('failed-join-error')
            if (failedjoin) {
              failedjoin.innerText = 'Meeting ID: '+this.meeting;
            }
            if (failedjoinerror) {
             failedjoinerror.innerText = 'Error: '+error.message;
          }
          }
        });
      });
    
     }
    (document.getElementById('add-voice-focus') as HTMLInputElement).addEventListener(
      'change',
      e => {
        this.enableVoiceFocus = (e.target as HTMLInputElement).checked;
        this.onVoiceFocusSettingChanged();
      }
    );

    

    const buttonMute = document.getElementById('button-microphone');
    ///KBS
    if (buttonMute) {
    buttonMute.addEventListener('click', _e => {/* mousedown */
      //this.audioVideo.realtimeMuteLocalAudio();
      if (this.toggleButton('button-microphone')) {
        this.audioVideo.realtimeUnmuteLocalAudio();
        this.onVoiceFocusSettingChanged();
      } else {
        this.audioVideo.realtimeMuteLocalAudio();
      }
    });
  }

  const buttonRecordSelf = document.getElementById('button-record-self');
  if (buttonRecordSelf) {

    const USER_KEY = 'AKIA3MSRS7Y7G7WYTDLA';
    const USER_SECRET = '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';
    const BUCKET_NAME = 'fori/uploadedMediaChunk';

    AWS.config.update({
      credentials: {
        accessKeyId: "AKIA3MSRS7Y7G7WYTDLA",
        secretAccessKey: "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",
        // region: "us-east-1",
      }
    });

    const s3 = new AWS.S3();

  console.log('recording start-------- broadcast_id',this.broadcast_id)
  const s3Key = 'recorded-file-'+new Date().toISOString()+".webm";
  const params = {
    Bucket: BUCKET_NAME,
    Key: s3Key,
    ACL: 'public-read',
  };

  let uploadId:any;
    //let recorder: MediaRecorder;
    const mediaStream = new MediaStream();

    var recorder = new MediaRecorder(mediaStream);

    buttonRecordSelf.addEventListener('click', _e => {
      const chunks: Blob[] = [];
      console.log('click recording start--------');
      AsyncScheduler.nextTick(async () => {
        if (!this.toggleButton('button-record-self')) {
          console.info('Stopping recorder ', recorder);
          recorder.stop();
          //recorder = undefined;     
          (document.getElementById('button-record-self') as HTMLDivElement).innerHTML ="<i class='fas fa-pause' style='color: red;''></i> Rec. Stopped" ;  
          (buttonRecordSelf as HTMLButtonElement).disabled = true;                                                                
          return;
        }   
           
        // Combine the audio and video streams.
        const mixed = new MediaStream();

        const localTile = this.audioVideo.getLocalVideoTile();
        if (localTile) {
          mixed.addTrack(localTile.state().boundVideoStream.getVideoTracks()[0]);
        }

        // We need to get access to the media stream broker, which requires knowing
        // the exact implementation. Sorry!
        /* @ts-ignore */
        const av: DefaultAudioVideoController = this.audioVideo.audioVideoController;
        const input = await av.mediaStreamBroker.acquireAudioInputStream();
        mixed.addTrack(input.getAudioTracks()[0]);

        recorder = new MediaRecorder(mixed, { mimeType: 'video/webm; codecs=vp9' });
        console.info('Setting recorder to', recorder);
        recorder.ondataavailable = (event:any) => {
          if (event.data.size) {
            chunks.push(event.data);
          }
        };

        //let uploadId;

  // We are going to handle everything as a chain of Observable operators.
    Rx.Observable
    // First create the multipart upload and wait until it's created.
    .fromPromise(s3.createMultipartUpload(params).promise())
    .switchMap((data:any) => {
      // Save the uploadId as we'll need it to complete the multipart upload.
      uploadId = data.UploadId;
          console.log(recorder.state);

      recorder.start(840000);
          console.log(recorder.state);

      // Then track all 'dataavailable' events. Each event brings a blob (binary data) with a part of video.
      return Rx.Observable.fromEvent(recorder, "dataavailable");
    })
    // Track the dataavailable event until the 'stop' event is fired.
    // MediaRecorder emits the "stop" when it was stopped AND have emitted all "dataavailable" events.
    // So we are not losing data. See the docs here: https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/stop
    .takeUntil(Rx.Observable.fromEvent(recorder, "stop"))
    .map((event:any, index:any) => {
      // Show how much binary data we have recorded.
      const $bytesRecorded = document.querySelector("span#bytesRecorded");
      if($bytesRecorded && $bytesRecorded.textContent){
        $bytesRecorded.textContent =parseInt($bytesRecorded.textContent) + event.data.size; // Use frameworks in prod. This is just an example.
      }

      // Take the blob and it's number and pass down.
      return { blob: event.data, partNumber: index + 1 };
    })
    // This operator means the following: when you  receive a blob - start uploading it.
    // Don't accept any other uploads until you finish uploading: http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatMap
    .concatMap(({ blob, partNumber }:any) => {
      return (
        s3
          .uploadPart({
            Body: blob,
            Bucket: BUCKET_NAME,
            Key: s3Key,
            PartNumber: partNumber,
            UploadId: uploadId,
            ContentLength: blob.size,
          })
          .promise()
          // Save the ETag as we'll need it to complete the multipart upload
          .then(({ ETag }) => {
            // How how much bytes we have uploaded.
            const $bytesUploaded = document.querySelector("span#bytesUploaded");
            if($bytesUploaded && $bytesUploaded.textContent){
              $bytesUploaded.textContent = parseInt($bytesUploaded.textContent) + blob.size;
            }
            return { ETag, PartNumber: partNumber };
          })
      );
    })
    // Wait until all uploads are completed, then convert the results into an array.
    .toArray()
    // Call the complete multipart upload and pass the part numbers and ETags to it.
    .switchMap((parts:any) => {
      return s3
        .completeMultipartUpload({
          Bucket: BUCKET_NAME,
          Key: s3Key,
          UploadId: uploadId,
          MultipartUpload: {
            Parts: parts
          }
        })
        .promise();
    })
    .subscribe(
      ({ Location }:any) => {
        // completeMultipartUpload returns the location, so show it.
        const $location = document.querySelector("span#location");
        if($location){
          $location.textContent = Location;
          this.uploadAWS(Location)

        }

        console.log("Uploaded successfully.");
      },(err:any) => {
        console.error(err);
        console.log("Error : ",err)
        if (uploadId) {
          // Aborting the Multipart Upload in case of any failure. console.error(e)
          // Not to get charged because of keeping it pending.  this.router.navigate(['inventory'])
          s3
            .abortMultipartUpload({
              Bucket: BUCKET_NAME,
              UploadId: uploadId,
              Key: s3Key
            })
            .promise()
            .then(() =>console.log("Multipart upload aborted"))
            .catch(e =>this.router.navigate(['inventory']))
        }
      }
    );
        /*recorder.onstop = () => {  
          const blob = new Blob(chunks, {
            type: 'video/mp4',
          });
          this.isBroadcastRec=1;
          this.startTimer();
          //this.uploadAWS(blob);    
          chunks.length = 0;        
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          /* @ts-ignore *
          a.style = 'display: none'; 
          a.href = url;
          a.download = 'recording.mp4';
          a.click();
          console.log('url---+++++++',url)
          window.URL.revokeObjectURL(url);

        };*/

        //recorder.start();
      });
    });
    const buttonStopVideo = document.getElementById('stop');
    if (buttonStopVideo) {
      // After we call .stop() MediaRecorder is going to emit all the data it has via 'dataavailable'.
      // And then finish our stream by emitting 'stop' event.
      buttonStopVideo.addEventListener('click', _e => {
        console.log("Console stop the recording ----------- ");
        const confirmEnd = new URL(window.location.href).searchParams.get('confirm-end') === 'true';
        const prompt =
          'Are you sure you want to end the broadcast for everyone? The broadcast cannot be used after ending it.';
        if (!window.confirm(prompt)) {
          return;
        }                                                         
        this.isAlertMsg = true;
        console.log(recorder.state);
        if(recorder.state=='inactive'){
          this.updateBroadcastStatus('2');
          this.router.navigate(['inventory']);
        }else{
          recorder.stop();    
        }                                                                     
        ////this.audioVideo.stop();                                            
      });
    }
  }
    const buttonVideo = document.getElementById('button-camera');
    if (buttonVideo) {
    buttonVideo.addEventListener('click', _e => {
      
      if (this.isGoLive==0) {
        if (this.cameraPermission==1) {
        this.cameraPermission=3;
        this.ngOnInit();
        }
      }else{
      
        new AsyncScheduler().start(async () => {
          this.contentsharevideo=1;
          if (this.toggleButton('button-camera') && this.canStartLocalVideo) {
            try {
              let camera: string = videoInput.value;
              if (videoInput.value === 'None') {
                camera = this.cameraDeviceIds.length ? this.cameraDeviceIds[0] : 'None';
              }
              await this.openVideoInputFromSelection(camera, false);
              this.audioVideo.startLocalVideoTile();
            } catch (err) {
              //fatal(err);
              console.log('no video input device selected');
            }
          } else {
            this.audioVideo.stopLocalVideoTile();
            this.hideTile(this.MAX_TILES);
          }
        });
      }
      
    });
  }
    const buttonPauseContentShare = document.getElementById('button-pause-content-share');
    if (buttonPauseContentShare) {
    buttonPauseContentShare.addEventListener('click', _e => {
      if (!this.isButtonOn('button-content-share')) {
        return;
      }
      new AsyncScheduler().start(async () => {
        if (this.toggleButton('button-pause-content-share')) {
          this.audioVideo.pauseContentShare();
        } else {
          this.audioVideo.unpauseContentShare();
        }
      });
    });
  }
    const buttonContentShare = document.getElementById('button-content-share');
    if (buttonContentShare) {
      buttonContentShare.addEventListener('click', _e => {
      var tile16 = document.getElementById('tile-16');
        new AsyncScheduler().start(() => {
          if (!this.isButtonOn('button-content-share')) {
            if (tile16) {
            tile16.classList.remove('video-width');
          }
            this.contentShareStart();
          } else {
            if (tile16) {
            tile16.classList.add('video-width');
          }
            this.contentShareStop();
          }
        });
      });
    }
    const buttonSpeaker = document.getElementById('button-speaker');
    if (buttonSpeaker) {
      buttonSpeaker.addEventListener('click', _e => {
        new AsyncScheduler().start(async () => {
          if (this.toggleButton('button-speaker')) {
            try {
              await this.audioVideo.bindAudioElement(
                document.getElementById('meeting-audio') as HTMLAudioElement
              );
            } catch (e) {
              //fatal(e);
              console.log('Failed to bindAudioElement', e);
            }
          } else {
            this.audioVideo.unbindAudioElement();
          }
        });
      });
  }
    const buttonVideoStats = document.getElementById('button-video-stats');
    if (buttonVideoStats) {
      buttonVideoStats.addEventListener('click', () => {
        if (this.isButtonOn('button-video-stats')) {
          document.querySelectorAll('.stats-info').forEach(e => e.remove());
        } else {
          this.getRelayProtocol();
        }
        this.toggleButton('button-video-stats');
      });
    }
    // const sendMessage = (): void => {
    const sendMessage = (msg:any): void => {
      console.log("send message->>>>>>>>>"+msg);
      new AsyncScheduler().start(() => {
        const textArea = document.getElementById('send-message') as HTMLTextAreaElement;
        // const textToSend = textArea.value.trim();
        var textToSend = textArea.value.trim();
        if (msg!=0) {
          textToSend = msg.trim();
        }

        if (!textToSend) {
          return;
        }
        textArea.value = '';
        this.audioVideo.realtimeSendDataMessage(
          this.DATA_MESSAGE_TOPIC,
          textToSend,
          this.DATA_MESSAGE_LIFETIME_MS
        );
        // echo the message to the handler
        var attendeeId:any;
        var externalUserId:any;
        if (this.meetingSession) {
          attendeeId= this.meetingSession.configuration.credentials!.attendeeId;
          externalUserId=this.meetingSession.configuration.credentials!.externalUserId;
        }

        this.dataMessageHandler(
          new DataMessage(
            Date.now(),
            this.DATA_MESSAGE_TOPIC,
            new TextEncoder().encode(textToSend),
            attendeeId,
            externalUserId,
            
          )
        );
      });
    };

    const textAreaSendMessage = document.getElementById('send-message') as HTMLTextAreaElement;
    textAreaSendMessage.addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        if (e.shiftKey) {
          textAreaSendMessage.rows++;
        } else {
          e.preventDefault();
          // sendMessage();
          sendMessage(0);
          textAreaSendMessage.rows = 1;
        }
      }
    });

    const buttonMeetingEnd = document.getElementById('button-meeting-end');
    if (buttonMeetingEnd) {
      buttonMeetingEnd.addEventListener('click', _e => {
        const confirmEnd = new URL(window.location.href).searchParams.get('confirm-end') === 'true';
        const prompt =
          'Are you sure you want to end the broadcast for everyone? The broadcast cannot be used after ending it.';
        if (!window.confirm(prompt)) {
          return;
        }

        
        (document.getElementById('button-meeting-end') as HTMLDivElement).innerHTML ="<label class='ico'><i class='fa fa-spinner fa-spin' style='color: red;'></i></label><label class='text' style='text-transform: capitalize;font-size: 11px;font-weight: 600;padding: 3px 3px 0;line-height: 12px;width: 100%;'> Rec. Uploading. Wait...</label>" ;                                                                  
        if(buttonMeetingEnd){
           (buttonMeetingEnd as HTMLButtonElement).disabled = true;
        }
        this.updateBroadcastStatus('2');
        //this.statsCollector.resetStats();
        this.audioVideo.stop();
        const buttonrecordStop = document.getElementById('stop');
        if (buttonrecordStop) {
          buttonrecordStop.click();
          this.startTimer();
        }  
        /*const buttonrecordself = document.getElementById('button-record-self');
        if (buttonrecordself) {
          //if (this.isBroadcastRec==0) {
            buttonrecordself.click();
            this.startTimer();
          //}
        } */
        if(this.recordingComplete==1){
          new AsyncScheduler().start(async () => {
            (buttonMeetingEnd as HTMLButtonElement).disabled = true;
            await this.leave();  
            await this.endMeeting();
          
            (buttonMeetingEnd as HTMLButtonElement).disabled = false;

          });
        }
        
      });
    } 
    const buttonMeetingLeave = document.getElementById('button-meeting-leave') as HTMLButtonElement;
    buttonMeetingLeave.addEventListener('click', _e => {
      new AsyncScheduler().start(async () => {
        (buttonMeetingLeave as HTMLButtonElement).disabled = true;
        await this.leave();
        (buttonMeetingLeave as HTMLButtonElement).disabled = false;
      });
    });

    const purchaseProduct = document.getElementById('send-messageBtn') as HTMLButtonElement;
    purchaseProduct.addEventListener('click', e => {
      e.preventDefault();

      if(this.images_arr.length > 0){
        this.images_arr.forEach((ele:any) =>{
          let img = '<img src='+ele.url+'>';
          sendMessage(img);
          textAreaSendMessage.rows = 1; 
        });
        this.dataService.sendEmptyImg('emptyImages');
      }

      var txtarea = document.getElementById('send-message') as HTMLInputElement;
      if(txtarea.value){
        sendMessage(txtarea.value);
        textAreaSendMessage.rows = 1;
      }
    });

  }


  getSupportedMediaRegions(): string[] {
    const supportedMediaRegions: string[] = [];
    const mediaRegion = document.getElementById('inputRegion') as HTMLSelectElement;
    for (let i = 0; i < mediaRegion.length; i++) {
      supportedMediaRegions.push(mediaRegion.value);
    }
    return supportedMediaRegions;
  }

  async getNearestMediaRegion(): Promise<string> {
    const nearestMediaRegionResponse = await fetch(`https://nearest-media-region.l.chime.aws`, {
      method: 'GET',
    });
    const nearestMediaRegionJSON = await nearestMediaRegionResponse.json();
    const nearestMediaRegion = nearestMediaRegionJSON.region;
    return nearestMediaRegion;
  }

  setMediaRegion(): void {
    new AsyncScheduler().start(
      async (): Promise<void> => {
        try {
          const nearestMediaRegion = await this.getNearestMediaRegion();
          if (nearestMediaRegion === '' || nearestMediaRegion === null) {
            throw new Error('Nearest Media Region cannot be null or empty');
          }
          const supportedMediaRegions: string[] = this.getSupportedMediaRegions();
          if (supportedMediaRegions.indexOf(nearestMediaRegion) === -1) {
            supportedMediaRegions.push(nearestMediaRegion);
            const mediaRegionElement = document.getElementById('inputRegion') as HTMLSelectElement;
            const newMediaRegionOption = document.createElement('option');
            newMediaRegionOption.value = nearestMediaRegion;
            newMediaRegionOption.text = nearestMediaRegion + ' (' + nearestMediaRegion + ')';
            mediaRegionElement.add(newMediaRegionOption, null);
          }
          (document.getElementById('inputRegion') as HTMLInputElement).value = nearestMediaRegion;
        } catch (error) {
          //fatal(error);
          console.log('Default media region selected: ' + error.message);
        }
      }
    );
  }

  toggleButton(button: string, state?: 'on' | 'off'): boolean {
    if (state === 'on') {
      this.buttonStates[button] = true;
    } else if (state === 'off') {
      this.buttonStates[button] = false;
    } else {
      this.buttonStates[button] = !this.buttonStates[button];
    }
    this.displayButtonStates();
    return this.buttonStates[button];
  }

  isButtonOn(button: string): boolean {
    return this.buttonStates[button];
  }

  displayButtonStates(): void {
    console.log("displayButtonStates>>>>>>>>>>>>>>>>>>>");
    for (const button in this.buttonStates) {
      const element = document.getElementById(button) as HTMLButtonElement;
      const drop = document.getElementById(button+'-drop');
      const on = this.buttonStates[button];
     // element.classList.add(on ? 'btn-success' : 'btn-outline-secondary');
      //element.classList.remove(on ? 'btn-outline-secondary' : 'btn-success');
      if (element) {
      element.classList.add(on ? 'btn-success' : 'btn-outline-secondary');
      element.classList.remove(on ? 'btn-outline-secondary' : 'btn-success');
    }
     // (element.firstElementChild as SVGElement).classList.add(on ? 'svg-active' : 'svg-inactive');
      // (element.firstElementChild as SVGElement).classList.remove(
      //   on ? 'svg-inactive' : 'svg-active'
      // );
      if (drop) {
        drop.classList.add(on ? 'btn-success' : 'btn-outline-secondary');
        drop.classList.remove(on ? 'btn-outline-secondary' : 'btn-success');
      }
    }
  }

  showProgress(id: string): void {
    (document.getElementById(id) as HTMLDivElement).style.visibility = 'visible';
  }

  hideProgress(id: string): void {
    (document.getElementById(id) as HTMLDivElement).style.visibility = 'hidden';
  }

  switchToFlow(flow: string): void {
    console.log('switchToFlow---------------',flow);
    Array.from(document.getElementsByClassName('flow')).map(
      e => ((e as HTMLDivElement).style.display = 'none')
    );
    (document.getElementById(flow) as HTMLDivElement).style.display = 'block';
  }

  async onAudioInputsChanged(freshDevices: MediaDeviceInfo[]): Promise<void> {
    await this.populateAudioInputList();

    if (!this.currentAudioInputDevice) {
      return;
    }

    if (this.currentAudioInputDevice === 'default') {
      // The default device might actually have changed. Go ahead and trigger a
      // reselection.
      console.log('Reselecting default device.');
      await this.selectAudioInputDevice(this.currentAudioInputDevice);
      return;
    }

    const freshDeviceWithSameID = freshDevices.find(
      device => device.deviceId === this.currentAudioInputDevice
    );

    if (freshDeviceWithSameID === undefined) {
      console.log('Existing device disappeared. Selecting a new one.');

      // Select a new device.
      await this.openAudioInputFromSelectionAndPreview();
    }
  }

  audioInputsChanged(freshAudioInputDeviceList: MediaDeviceInfo[]): void {
    this.onAudioInputsChanged(freshAudioInputDeviceList);
  }

  videoInputsChanged(_freshVideoInputDeviceList: MediaDeviceInfo[]): void {
    this.populateVideoInputList();
  }

  audioOutputsChanged(_freshAudioOutputDeviceList: MediaDeviceInfo[]): void {
    this.populateAudioOutputList();
  }

  audioInputStreamEnded(deviceId: string): void {
    console.log('Current audio input stream from device id '+deviceId+' ended.');
  }

  videoInputStreamEnded(deviceId: string): void {
    console.log('Current video input stream from device id '+deviceId+' ended.');
  }

  estimatedDownlinkBandwidthLessThanRequired(
    estimatedDownlinkBandwidthKbps: number,
    requiredVideoDownlinkBandwidthKbps: number
  ): void {
    console.log('Estimated downlink bandwidth is '+estimatedDownlinkBandwidthKbps+'is less than required bandwidth for video '+requiredVideoDownlinkBandwidthKbps);
  }

  videoNotReceivingEnoughData(videoReceivingReports: ClientVideoStreamReceivingReport[]): void {
    console.log('One or more video streams are not receiving expected amounts of data '+JSON.stringify(videoReceivingReports));
  }

  metricsDidReceive(clientMetricReport: ClientMetricReport): void {
    const metricReport = clientMetricReport.getObservableMetrics();
   /* if (
      typeof metricReport.availableSendBandwidth === 'number' &&
      !isNaN(metricReport.availableSendBandwidth)
    ) {
      (document.getElementById('video-uplink-bandwidth') as HTMLSpanElement).innerText =
        'Available Uplink Bandwidth: ' +
        String(metricReport.availableSendBandwidth / 1000) +
        ' Kbps';
    } else if (
      typeof metricReport.availableOutgoingBitrate === 'number' &&
      !isNaN(metricReport.availableOutgoingBitrate)
    ) {
      (document.getElementById('video-uplink-bandwidth') as HTMLSpanElement).innerText =
        'Available Uplink Bandwidth: ' +
        String(metricReport.availableOutgoingBitrate / 1000) +
        ' Kbps';
    } else {
      (document.getElementById('video-uplink-bandwidth') as HTMLSpanElement).innerText =
        'Available Uplink Bandwidth: Unknown';
    }*/

    /*if (
      typeof metricReport.availableReceiveBandwidth === 'number' &&
      !isNaN(metricReport.availableReceiveBandwidth)
    ) {
      (document.getElementById('video-downlink-bandwidth') as HTMLSpanElement).innerText =
        'Available Downlink Bandwidth: ' +
        String(metricReport.availableReceiveBandwidth / 1000) +
        ' Kbps';
    } else if (
      typeof metricReport.availableIncomingBitrate === 'number' &&
      !isNaN(metricReport.availableIncomingBitrate)
    ) {
      (document.getElementById('video-downlink-bandwidth') as HTMLSpanElement).innerText =
        'Available Downlink Bandwidth: ' +
        String(metricReport.availableIncomingBitrate / 1000) +
        ' Kbps';
    } else {
      (document.getElementById('video-downlink-bandwidth') as HTMLSpanElement).innerText =
        'Available Downlink Bandwidth: Unknown';
    }*/

    this.hasChromiumWebRTC && this.isButtonOn('button-video-stats') && this.getAndShowWebRTCStats();
  }

  getAndShowWebRTCStats(): void {
    const videoTiles = this.audioVideo.getAllVideoTiles();
    if (videoTiles.length === 0) {
      return;
    }
    for (const videoTile of videoTiles) {
      const tileState = videoTile.state();
      if (tileState.paused || tileState.isContent) {
        continue;
      }
      const tileId = videoTile.id();
      const tileIndex = this.tileIdToTileIndex[tileId];
      this.getStats(tileIndex);
      if (tileState.localTile) {
        this.statsCollector.showUpstreamStats(tileIndex);
      } else {
        this.statsCollector.showDownstreamStats(tileIndex);
      }
    }
  }

  async getRelayProtocol(): Promise<void> {
    const rawStats = await this.audioVideo.getRTCPeerConnectionStats();
    if (rawStats) {
      rawStats.forEach((report:any) => {
        if (report.type === 'local-candidate') {
          console.log('Local WebRTC Ice Candidate stats: '+JSON.stringify(report));
          const relayProtocol = report.relayProtocol;
          if (typeof relayProtocol === 'string') {
            if (relayProtocol === 'udp') {
              console.log('Connection using '+relayProtocol.toUpperCase()+'protocol');
            } else {
              console.log('Connection fell back to '+relayProtocol.toUpperCase()+'protocol');
            }
          }
        }
      });
    }
  }

  async getStats(tileIndex: number): Promise<void> {
    const id = 'video-'+tileIndex;
    const videoElement = document.getElementById(id) as HTMLVideoElement;
    if (!videoElement || !videoElement.srcObject) {
      return;
    }

    const stream = videoElement.srcObject as MediaStream;
    const tracks = stream.getVideoTracks();
    if (tracks.length === 0) {
      return;
    }
    const report = await this.audioVideo.getRTCPeerConnectionStats(tracks[0]);
    this.statsCollector.processWebRTCStatReportForTileIndex(report, tileIndex);
  }

  async createLogStream(
    configuration: MeetingSessionConfiguration,
    pathname: string
  ): Promise<void> {
    console.log('configuration',configuration);
    const body = JSON.stringify({
      meetingId: configuration.meetingId,
      attendeeId:configuration.credentials!.attendeeId,
    });
     console.log('[DEMO] log stream created------',this.BASE_URL+pathname);

    try {
      const response = await fetch(`${this.BASE_URL}${pathname}`, {
        method: 'POST',
        body,
      });
       console.log('-----------createLogStream----------------',response);
      if (response.status === 200) {
        console.log('[DEMO] log stream created');
      }
    } catch (error) {
     // fatal(error);
      console.log(error.message);
    }
  }

  eventDidReceive(name: EventName, attributes: EventAttributes): void {
    console.log('Received an event: '+JSON.stringify({ name, attributes }));
    //console.log('meetingEventPOSTLogger.....--------: '+this.meetingEventPOSTLogger);
    console.log('name.....--------: '+name);

    const { meetingHistory, ...otherAttributes } = attributes;
    switch (name) {
      case 'meetingStartRequested':
      case 'meetingStartSucceeded':
      case 'meetingEnded': {
        // Exclude the "meetingHistory" attribute for successful events.
        this.meetingEventPOSTLogger?.info(
          JSON.stringify({
            name,
            attributes: otherAttributes,
          })
        );
        break;
      }
      case 'audioInputFailed':
      case 'videoInputFailed':
      case 'meetingStartFailed':
      case 'meetingFailed': {
        // Send the last 5 minutes of events.
        this.meetingEventPOSTLogger?.info(
          JSON.stringify({
            name,
            attributes: {
              ...otherAttributes,
              meetingHistory: meetingHistory?.filter(({ timestampMs }) => {
                return Date.now() - timestampMs < this.MAX_MEETING_HISTORY_MS;
              }),
            },
          })
        );
        break;
      }
    }
  }

  async initializeMeetingSession(configuration: MeetingSessionConfiguration): Promise<void> {
    const logLevel = LogLevel.INFO;
    const consoleLogger = (this.meetingLogger = new ConsoleLogger('SDK', logLevel));
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      this.meetingLogger = consoleLogger;
    } else {
      await Promise.all([
        this.createLogStream(configuration, 'create_log_stream'),
        this.createLogStream(configuration, 'create_browser_event_log_stream'),
      ]);
           console.log('[DEMO] log stream created------',this.BASE_URL+'logs');

     /* this.meetingLogger = new MultiLogger(
        consoleLogger,
        new MeetingSessionPOSTLogger(
          'SDK',
          configuration,
          this.LOGGER_BATCH_SIZE,
          this.LOGGER_INTERVAL_MS,
          `${this.BASE_URL}logs`,
          logLevel
        )
      );
      */
      /*this.meetingEventPOSTLogger = new MeetingSessionPOSTLogger(
        'SDKEvent',
        configuration,
        this.LOGGER_BATCH_SIZE,
        this.LOGGER_INTERVAL_MS,
        this.BASE_URL+'log_meeting_event',
        logLevel
      );
      */
    }
    const deviceController = new DefaultDeviceController(this.meetingLogger, {
      enableWebAudio: this.enableWebAudio,
    });
    configuration.enableUnifiedPlanForChromiumBasedBrowsers = this.enableUnifiedPlanForChromiumBasedBrowsers;
    configuration.attendeePresenceTimeoutMs = 5000;
    configuration.enableSimulcastForUnifiedPlanChromiumBasedBrowsers = this.enableSimulcast;
    this.meetingSession = new DefaultMeetingSession(
      configuration,
      this.meetingLogger,
      deviceController
    );
    if ((document.getElementById('fullband-speech-mono-quality') as HTMLInputElement).checked) {
      this.meetingSession.audioVideo.setAudioProfile(AudioProfile.fullbandSpeechMono());
      this.meetingSession.audioVideo.setContentAudioProfile(AudioProfile.fullbandSpeechMono());
    } else if (
      (document.getElementById('fullband-music-mono-quality') as HTMLInputElement).checked
    ) {
      this.meetingSession.audioVideo.setAudioProfile(AudioProfile.fullbandMusicMono());
      this.meetingSession.audioVideo.setContentAudioProfile(AudioProfile.fullbandMusicMono());
    }
    this.audioVideo = this.meetingSession.audioVideo;
    if (this.enableSimulcast) {
      //360p  30  250 800
      //this.audioVideo.chooseVideoInputQuality(1280, 720, 15, 1400);
     // this.audioVideo.chooseVideoInputQuality(640, 360, 15, 600);
      this.audioVideo.chooseVideoInputQuality(320, 180, 15, 250);

    }
    this.audioVideo.addDeviceChangeObserver(this);
    this.setupDeviceLabelTrigger();
    await this.populateAllDeviceLists();
    this.setupMuteHandler();
    this.setupCanUnmuteHandler();
    this.setupSubscribeToAttendeeIdPresenceHandler();
    this.setupDataMessage();
    this.audioVideo.addObserver(this);
    this.audioVideo.addContentShareObserver(this);
    this.initContentShareDropDownItems();
  }

  async join(): Promise<void> {
    console.log("Join>>>>>>>>>>>>>>>>>>>>>");

    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
      console.log("rejected-------------------------",event.reason);
    });
    this.audioVideo.start();
  }

  async leave(): Promise<void> {
    this.statsCollector.resetStats();
    this.audioVideo.stop();
    this.voiceFocusDevice?.stop();
    this.voiceFocusDevice = undefined;

    await this.chosenVideoTransformDevice?.stop();
    this.chosenVideoTransformDevice = undefined;
    this.roster = {};
  }
/*autostartCam(){
      new AsyncScheduler().start(async () => {
        if (this.toggleButton('button-camera') && this.canStartLocalVideo) {
          try {
            if (videoInput) {
            let camera: string = videoInput.value;
            if (videoInput.value === 'None') {
              camera = this.cameraDeviceIds.length ? this.cameraDeviceIds[0] : 'None';
            }
            await this.openVideoInputFromSelection(camera, false);
            this.audioVideo.startLocalVideoTile();
            }
          } catch (err) {
            //fatal(err);
            console.log('no video input device selected');
          }
        } else {
          this.audioVideo.stopLocalVideoTile();
          this.hideTile(this.MAX_TILES);
        }
      });
    }*/
  setupMuteHandler(): void {
    const handler = (isMuted: boolean): void => {
      console.log(`muted = ${isMuted}`);
    };
    this.audioVideo.realtimeSubscribeToMuteAndUnmuteLocalAudio(handler);
    const isMuted = this.audioVideo.realtimeIsLocalAudioMuted();
    handler(isMuted);
  }

  setupCanUnmuteHandler(): void {
    const handler = (canUnmute: boolean): void => {
      console.log(`canUnmute = ${canUnmute}`);
    };
    this.audioVideo.realtimeSubscribeToSetCanUnmuteLocalAudio(handler);
    handler(this.audioVideo.realtimeCanUnmuteLocalAudio());
  }

  updateRoster(): void {
    const roster = document.getElementById('roster');
    const newRosterCount = Object.keys(this.roster).length;
    const viwer = document.getElementById('viwer') as HTMLDivElement;
    if(viwer){
      (viwer).innerHTML ="<i class='fas fa-eye'></i> "+newRosterCount+"" ;
    }
    if (this.attendeeStart==1) {
      (document.getElementById('roster') as HTMLDivElement).style.visibility = 'hidden';
    }
    //console.log('newRosterCount>>>>>>>>>>>>>>>>>>>>',newRosterCount);
    if (roster) {
      while (roster.getElementsByTagName('li').length < newRosterCount) {
        const li = document.createElement('li');
        //console.log("li->>>>>>>>>>>>>>>>>>>>>>>>",li);
        if (li) {
          li.className = 'list-group-item d-flex justify-content-between align-items-center';
          li.appendChild(document.createElement('span'));
          li.appendChild(document.createElement('span'));
          roster.appendChild(li);
        }
      }
      while (roster.getElementsByTagName('li').length > newRosterCount) {
        roster.removeChild(roster.getElementsByTagName('li')[0]);
      }
      const entries = roster.getElementsByTagName('li');
      let i = 0;
      for (const attendeeId in this.roster) {
        const spanName = entries[i].getElementsByTagName('span')[0];
        const spanStatus = entries[i].getElementsByTagName('span')[1];
        let statusClass = 'badge badge-pill ';
        let statusText = '\xa0'; // &nbsp
        if (this.roster[attendeeId].signalStrength < 1) {
          statusClass += 'badge-warning';
        } else if (this.roster[attendeeId].signalStrength === 0) {
          statusClass += 'badge-danger';
        } else if (this.roster[attendeeId].muted) {
          statusText = 'MUTED';
          statusClass += 'badge-secondary';
        } else if (this.roster[attendeeId].active) {
          statusText = 'SPEAKING';
          statusClass += 'badge-success';
        } else if (this.roster[attendeeId].volume > 0) {
          statusClass += 'badge-success';
        }
        this.updateProperty(spanName, 'innerText', this.roster[attendeeId].name);
        this.updateProperty(spanStatus, 'innerText', statusText);
        //this.updateProperty(spanStatus, 'innerHTML', statusText);
        this.updateProperty(spanStatus, 'className', statusClass);
        i++;
      }
  }

  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateProperty(obj: any, key: string, value: string): void {
    if (value !== undefined && obj[key] !== value) {
      obj[key] = value;
    }
  }

  setupSubscribeToAttendeeIdPresenceHandler(): void {
    const handler = (
      attendeeId: string,
      present: boolean,
      externalUserId: string,
      dropped: boolean
    ): void => {
      console.log(attendeeId +' present = '+present+' ('+externalUserId+')');
      const isContentAttendee = new DefaultModality(attendeeId).hasModality(
        DefaultModality.MODALITY_CONTENT
      );
      const isSelfAttendee =
        new DefaultModality(attendeeId).base() ===
        this.meetingSession!.configuration.credentials!.attendeeId;
      if (!present) {
        delete this.roster[attendeeId];
        this.updateRoster();
        console.log(attendeeId+' dropped = '+dropped+' ('+externalUserId+')');
        return;
      }
      //If someone else share content, stop the current content share
      if (
        !this.allowMaxContentShare() &&
        !isSelfAttendee &&
        isContentAttendee &&
        this.isButtonOn('button-content-share')
      ) {
        const tile16 = document.getElementById('tile-16');
        if (tile16) {
          tile16.classList.add('video-width');
        }
        this.contentShareStop();
      }
      if (!this.roster[attendeeId]) {
        this.roster[attendeeId] = {
          name: externalUserId.split('#').slice(-3)[0] + (isContentAttendee ? ' «Content»' : ''),
        };
      }
      this.audioVideo.realtimeSubscribeToVolumeIndicator(
        attendeeId,
        async (
          attendeeId: string,
          volume: number | null,
          muted: boolean | null,
          signalStrength: number | null
        ) => {
          if (!this.roster[attendeeId]) {
            return;
          }
          if (volume !== null) {
            this.roster[attendeeId].volume = Math.round(volume * 100);
          }
          if (muted !== null) {
            this.roster[attendeeId].muted = muted;
          }
          if (signalStrength !== null) {
            this.roster[attendeeId].signalStrength = Math.round(signalStrength * 100);
          }
          this.updateRoster();
        }
      );
    };
    this.audioVideo.realtimeSubscribeToAttendeeIdPresence(handler);
    const activeSpeakerHandler = (attendeeIds: string[]): void => {
      for (const attendeeId in this.roster) {
        this.roster[attendeeId].active = false;
      }
      for (const attendeeId of attendeeIds) {
        if (this.roster[attendeeId]) {
          this.roster[attendeeId].active = true;
          break; // only show the most active speaker
        }
      }
      this.layoutFeaturedTile();
    };
    this.audioVideo.subscribeToActiveSpeakerDetector(
      new DefaultActiveSpeakerPolicy(),
      activeSpeakerHandler,
      (scores: { [attendeeId: string]: number }) => {
        for (const attendeeId in scores) {
          if (this.roster[attendeeId]) {
            this.roster[attendeeId].score = scores[attendeeId];
          }
        }
        this.updateRoster();
      },
      this.showActiveSpeakerScores ? 100 : 0
    );
  }

  async getStatsForOutbound(id: string): Promise<void> {
    const videoElement = document.getElementById(id) as HTMLVideoElement;
    const stream = videoElement.srcObject as MediaStream;
    const track = stream.getVideoTracks()[0];
    const basicReports: { [id: string]: number } = {};

    const reports = await this.audioVideo.getRTCPeerConnectionStats(track);
    let duration: number;

    reports.forEach((report:any) => {
      if (report.type === 'outbound-rtp') {
        // remained to be calculated
        console.log(id+' is bound to ssrc '+report.ssrc);
        basicReports['bitrate'] = report.bytesSent;
        basicReports['width'] = report.frameWidth;
        basicReports['height'] = report.frameHeight;
        basicReports['fps'] = report.framesEncoded;
        duration = report.timestamp;
      }
    });

    await new TimeoutScheduler(1000).start(() => {
      this.audioVideo.getRTCPeerConnectionStats(track).then((reports:any )=> {
        reports.forEach((report:any) => {
          if (report.type === 'outbound-rtp') {
            duration = report.timestamp - duration;
            duration = duration / 1000;
            // remained to be calculated
            basicReports['bitrate'] = Math.trunc(
              ((report.bytesSent - basicReports['bitrate']) * 8) / duration
            );
            basicReports['width'] = report.frameWidth;
            basicReports['height'] = report.frameHeight;
            basicReports['fps'] = Math.trunc(
              (report.framesEncoded - basicReports['fps']) / duration
            );
            console.log(JSON.stringify(basicReports));
          }
        });
      });
    });
  }

  dataMessageHandler(dataMessage: DataMessage): void {

    if (!dataMessage.throttled) {
      const isSelf =
        dataMessage.senderAttendeeId === this.meetingSession!.configuration.credentials!.attendeeId;
      if (dataMessage.timestampMs <= this.lastReceivedMessageTimestamp) {
        return;
      }
      this.lastReceivedMessageTimestamp = dataMessage.timestampMs;
      const messageDiv = document.getElementById('receive-message') as HTMLDivElement;
      const picdiv = document.createElement('div') as HTMLDivElement;
      const nametxtdiv = document.createElement('div') as HTMLDivElement;
      const msgmain = document.createElement('div') as HTMLDivElement;
      msgmain.classList.add('msgmain');

      picdiv.classList.add('profilepic');
      nametxtdiv.classList.add('nametxt');

      const profileimage = document.createElement('div') as HTMLDivElement;
      profileimage.classList.add('profileimage');
      //profileimage.innerHTML ="<img src='https://fori.kindlebit.com/upload/profile/1617889145423_profile_pic.png'>";
      profileimage.innerHTML = "<img src='"+this.image_url+'/upload/profile/'+dataMessage.senderExternalUserId.split('#').slice(-2)[0]+"_profile_pic.png'>";
      /*if(this.profile_Pic) {
        profileimage.innerHTML = "<img src='"+this.image_url+'/upload/profile/'+dataMessage.senderExternalUserId.split('#').slice(-2)[0]+"_profile_pic.png'>";
      }
      else {
        profileimage.innerHTML = "<img src='./assets/img/no-photo.jpg'>";
      }*/
      const messageNameSpan = document.createElement('div') as HTMLDivElement;
      messageNameSpan.classList.add('message-bubble-sender');
      console.log(dataMessage,"yooooo0000")
      this.user_type=dataMessage.senderExternalUserId.split('#').slice(-1)[0];

      if(this.user_type == 0) {
        if(this.shopper_name) {
         messageNameSpan.innerText =  this.shopper_name+" (Shopper)"
        }
        else { 
          messageNameSpan.innerText = dataMessage.senderExternalUserId.split('#').slice(-3)[0]+" (Shopper)";
        }
      } else if (this.user_type == 3) {
        messageNameSpan.innerText = dataMessage.senderExternalUserId.split('#').slice(-3)[0]+" (Infulencer)";
      } else {
        messageNameSpan.innerText = dataMessage.senderExternalUserId.split('#').slice(-3)[0]+" (Seller)";
      }

     // messageNameSpan.innerText = dataMessage.senderExternalUserId.split('#').slice(-2)[0];
      const messageTextSpan = document.createElement('div') as HTMLDivElement;
      messageTextSpan.classList.add(isSelf ? 'message-bubble-self' : 'message-bubble-other');
      messageTextSpan.innerHTML = this.markdown
        .render(dataMessage.text())
        .replace(/[<]a /g, '<a target="_blank" ');
        const appendClass = (element: HTMLElement, className: string): void => {
        for (let i = 0; i < element.children.length; i++) {
          const child = element.children[i] as HTMLElement;
          console.log("appendClass>>>>>>>>>>>>>>>>>>>>>>>>>",className);
          child.classList.add(className);
          appendClass(child, className);
        }
      };
      //messageDiv.appendChild(profileimage);
      appendClass(messageTextSpan, 'markdown');
     // if (this.lastMessageSender !== dataMessage.senderAttendeeId) {
        //messageDiv.appendChild(messageNameSpan);
        nametxtdiv.appendChild(messageNameSpan);
      //}
      this.lastMessageSender = dataMessage.senderAttendeeId;
      nametxtdiv.appendChild(messageTextSpan);
      msgmain.appendChild(profileimage);
      msgmain.appendChild(nametxtdiv);

      messageDiv.appendChild(msgmain);

      //messageDiv.appendChild(messageTextSpan);
      messageDiv.scrollTop = messageDiv.scrollHeight;
    } else {
      console.log('Message is throttled. Please resend');
    }
  }

  setupDataMessage(): void {
    this.audioVideo.realtimeSubscribeToReceiveDataMessage(
      this.DATA_MESSAGE_TOPIC,
      (dataMessage: DataMessage) => {
        this.dataMessageHandler(dataMessage);
      }
    );
  }

  // eslint-disable-next-line
  async joinMeeting(): Promise<any> {
    const response = await fetch(
      `${this.BASE_URL}join?title=${encodeURIComponent(
        this.meeting
      )}&name=${encodeURIComponent(this.name)}&region=${encodeURIComponent(this.region)}`,
      {
        method: 'POST',
      }
    );
    const json = await response.json();
    if (json.error) {
      throw new Error('Server error: '+json.error);
    }
    return json;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async endMeeting(): Promise<any> {
    await fetch(this.BASE_URL+'end?title='+encodeURIComponent(this.meeting), {
      method: 'POST',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getAttendee(attendeeId: string): Promise<any> {
    const response = await fetch(
      this.BASE_URL+'attendee?title='+encodeURIComponent(
        this.meeting
      )+'&attendee='+encodeURIComponent(attendeeId)
    );
    const json = await response.json();
    if (json.error) {
      throw new Error('Server error: '+json.error);
    }
    return json;
  }

  setupDeviceLabelTrigger(): void {
    // Note that device labels are privileged since they add to the
    // fingerprinting surface area of the browser session. In Chrome private
    // tabs and in all Firefox tabs, the labels can only be read once a
    // MediaStream is active. How to deal with this restriction depends on the
    // desired UX. The device controller includes an injectable device label
    // trigger which allows you to perform custom behavior in case there are no
    // labels, such as creating a temporary audio/video stream to unlock the
    // device names, which is the default behavior. Here we override the
    // trigger to also show an alert to let the user know that we are asking for
    // mic/camera permission.                                                                            
    //                                                           
    // Also note that Firefox has its own device picker, which may be useful
    // for the first device selection. Subsequent device selections could use
    // a custom UX with a specific device id.                                         
    console.log("trigger call audioVideo>>>>>>>>>>>>>>>>>>>>>>", this.cameraPermission);
     
    this.audioVideo.setDeviceLabelTrigger(
      async (): Promise<MediaStream> => {

        if (this.isRecorder() || this.isBroadcaster()) {
          throw new Error('Recorder or Broadcaster does not need device labels');
        }                                                                                                              
        this.cameraPermission=1;                   
        this.switchToFlow('flow-need-permission');
        console.log('attendeeStart >>>>>>>>>>>validation>>>>>>>>>>>>>',this.attendeeStart)
        // if (this.attendeeStart==1) {
        //   console.log("false -------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"); 
        //     //this.autoJoin();
        //     var stream = await navigator.mediaDevices.getUserMedia();
        //     return stream;
        // }else{
            var stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

       // }
        console.log('attendeeStart>>>>>>>>>>>stream>>>>>>>>>>>>>',stream)

        this.switchToFlow('flow-devices');

        return stream;
      }
    );
    
  }

  populateDeviceList(
    elementId: string,
    genericName: string,
    devices: MediaDeviceInfo[],
    additionalOptions: string[]
  ): void {
    const list = document.getElementById(elementId) as HTMLSelectElement;
    while (list.firstElementChild) {
      list.removeChild(list.firstElementChild);
    }
    for (let i = 0; i < devices.length; i++) {
      const option = document.createElement('option');
      list.appendChild(option);
      option.text = devices[i].label || `${genericName} ${i + 1}`;
      option.value = devices[i].deviceId;
    }
    if (additionalOptions.length > 0) {
      const separator = document.createElement('option');
      separator.disabled = true;
      separator.text = '──────────';
      list.appendChild(separator);
      for (const additionalOption of additionalOptions) {
        const option = document.createElement('option');
        list.appendChild(option);
        option.text = additionalOption;
        option.value = additionalOption;
      }
    }
    if (!list.firstElementChild) {
      const option = document.createElement('option');
      option.text = 'Device selection unavailable';
      list.appendChild(option);
    }
  }

  populateInMeetingDeviceList(
    elementId: string,
    genericName: string,
    devices: MediaDeviceInfo[],
    additionalOptions: string[],
    additionalToggles: [] | undefined,
    callback: (name: string) => void
  ): void {
    const menu = document.getElementById(elementId) as HTMLDivElement;
    while (menu.firstElementChild) {
      menu.removeChild(menu.firstElementChild);
    }
    for (let i = 0; i < devices.length; i++) {
      this.createDropdownMenuItem(menu, devices[i].label || `${genericName} ${i + 1}`, () => {
        callback(devices[i].deviceId);
      });
    }
    if (additionalOptions.length) {
      this.createDropdownMenuItem(menu, '──────────', () => {}).classList.add('text-center');
      for (const additionalOption of additionalOptions) {
        this.createDropdownMenuItem(
          menu,
          additionalOption,
          () => {
            callback(additionalOption);
          },
          `${elementId}-${additionalOption.replace(/\s/g, '-')}`
        );
      }
    }
    if (additionalToggles?.length) {
      this.createDropdownMenuItem(menu, '──────────', () => {}).classList.add('text-center');
      for (const { name, oncreate, action } of additionalToggles) {
        const id = 'toggle-'+elementId+'-'+name;//.replace(/\s/g, '-');
        const elem = this.createDropdownMenuItem(menu, name, action, id);
        //oncreate(elem);
      }
    }
    if (!menu.firstElementChild) {
      this.createDropdownMenuItem(menu, 'Device selection unavailable', () => {});
    }
  }

  createDropdownMenuItem(
    menu: HTMLDivElement,
    title: string,
    clickHandler: () => void,
    id?: string
  ): HTMLButtonElement {
    const button = document.createElement('button') as HTMLButtonElement;
    menu.appendChild(button);
    button.innerText = title;
    button.classList.add('dropdown-item');
    if (id) {
      this.updateProperty(button, 'id', id);
  }
    button.addEventListener('click', () => {
      clickHandler();
      if (title.includes('Camera')) {
        let buttoncamrna=document.getElementById('button-camera')
        if (buttoncamrna) {
          buttoncamrna.click();
        }
      }else if (title.includes('Microphone')) {
        this.onVoiceFocusSettingChanged();
      }
    });
    return button;
  }

  async populateAllDeviceLists(): Promise<void> {
    await this.populateAudioInputList();
    await this.populateVideoInputList();
   // await this.populateVideoFilterInputList();
    await this.populateAudioOutputList();
  }

  /*private async populateVideoFilterInputList(): Promise<void> {
    const genericName = 'Filter';
    let filters: this.VideoFilterName[] = ['None'];

    if (
      this.defaultBrowserBehaviour.supportsCanvasCapturedStreamPlayback() &&
      this.enableUnifiedPlanForChromiumBasedBrowsers
    ) {
      filters = filters.concat(this.VIDEO_FILTERS);
    }

    this.populateInMeetingDeviceList(
      'dropdown-menu-filter',
      genericName,
      [],
      filters,
      undefined,
      async (name: VideoFilterName) => {
        this.selectedVideoFilterItem = name;
        console.log(`clicking video filter ${this.selectedVideoFilterItem}`);
        this.toggleButton(
          'button-video-filter',
          this.selectedVideoFilterItem === 'None' ? 'off' : 'on'
        );
        if (this.isButtonOn('button-camera')) {
          try {
            await this.openVideoInputFromSelection(this.selectedVideoInput, false);
          } catch (err) {
            //fatal(err);
            console.log('Failed to choose VideoTransformDevice', err);
          }
        }
      }
    );
  }
*/
  async populateAudioInputList(): Promise<void> {
    const genericName = 'Microphone';
    const additionalDevices =['None'];// ['None', '440 Hz'];
    const additionalToggles:any = [];

    // This can't work unless Web Audio is enabled.
    if (this.enableWebAudio && this.supportsVoiceFocus) {
      additionalToggles.push({
        name: 'Amazon Voice Focus',
        oncreate: (elem: HTMLElement) => {
          this.voiceFocusDisplayables.push(elem);
        },
        action: () => this.toggleVoiceFocusInMeeting(),
      });
    }

    this.populateDeviceList(
      'audio-input',
      genericName,
      await this.audioVideo.listAudioInputDevices(),
      additionalDevices
    );

    this.populateInMeetingDeviceList(
      'dropdown-menu-microphone',
      genericName,
      await this.audioVideo.listAudioInputDevices(),
      additionalDevices,
      additionalToggles,
      async (name: string) => {
        await this.selectAudioInputDeviceByName(name);
      }
    );
  }

  private isVoiceFocusActive(): boolean {
    return this.currentAudioInputDevice instanceof VoiceFocusTransformDevice;
  }

  private updateVoiceFocusDisplayState(): void {
    const active = this.isVoiceFocusActive();
    console.log('Updating Amazon Voice Focus display state:', active);
    for (const elem of this.voiceFocusDisplayables) {
      elem.classList.toggle('vf-active', active);
    }
  }

  private isVoiceFocusEnabled(): boolean {
    console.log('VF supported:', this.supportsVoiceFocus);
    console.log('VF enabled:', this.enableVoiceFocus);
    return this.supportsVoiceFocus && this.enableVoiceFocus;
  }

  private async reselectAudioInputDevice(): Promise<void> {
    const current = this.currentAudioInputDevice;

    if (current instanceof VoiceFocusTransformDevice) {
      // Unwrap and rewrap if Amazon Voice Focus is selected.
      const intrinsic = current.getInnerDevice();
      const device = await this.audioInputSelectionWithOptionalVoiceFocus(intrinsic);
      return this.selectAudioInputDevice(device);
    }

    // If it's another kind of transform device, just reselect it.
    if (isAudioTransformDevice(current)) {
      return this.selectAudioInputDevice(current);
    }

    // Otherwise, apply Amazon Voice Focus if needed.
    const device = await this.audioInputSelectionWithOptionalVoiceFocus(current);
    return this.selectAudioInputDevice(device);
  }

  private async toggleVoiceFocusInMeeting(): Promise<void> {
    const elem = document.getElementById('add-voice-focus') as HTMLInputElement;
    this.enableVoiceFocus = this.supportsVoiceFocus && !this.enableVoiceFocus;
    elem.checked = this.enableVoiceFocus;
    console.log('Amazon Voice Focus toggle is now', elem.checked);

    await this.reselectAudioInputDevice();                         
  }

  async populateVideoInputList(): Promise<void> {
    const genericName = 'Camera';
    const additionalDevices =['None'];//['None', 'Blue', 'SMPTE Color Bars'];
    this.populateDeviceList(
      'video-input',
      genericName,              
      await this.audioVideo.listVideoInputDevices(),
      additionalDevices
    );
    this.populateInMeetingDeviceList(
      'dropdown-menu-camera',
      genericName,
      await this.audioVideo.listVideoInputDevices(),
      additionalDevices,
      undefined,
      async (name: string) => {
        try {
          await this.openVideoInputFromSelection(name, false);
        } catch (err) {
          //fatal(err);
          console.log('no video input device selected');
        }
      }
    );
    const cameras = await this.audioVideo.listVideoInputDevices();
    this.cameraDeviceIds = cameras.map((deviceInfo:any) => {
        return deviceInfo.deviceId;
    });
    
  }

  async populateAudioOutputList(): Promise<void> {
    const supportsChoosing = this.defaultBrowserBehaviour.supportsSetSinkId();
    const genericName = 'Speaker';
    const additionalDevices: string[] = [];
    const devices = supportsChoosing ? await this.audioVideo.listAudioOutputDevices() : [];
    this.populateDeviceList('audio-output', genericName, devices, additionalDevices);
    this.populateInMeetingDeviceList(
      'dropdown-menu-speaker',
      genericName,
      devices,
      additionalDevices,
      undefined,
      async (name: string) => {
        if (!supportsChoosing) {
          return;
        }
        try {
          await this.chooseAudioOutputDevice(name);
        } catch (e) {
          //fatal(e);
          console.log('Failed to chooseAudioOutputDevice', e);
        }
      }
    );
  }

  private async chooseAudioOutputDevice(device: string): Promise<void> {
    // Set it for the content share stream if we can.
    const videoElem = document.getElementById('content-share-video') as HTMLVideoElement;
    if (this.defaultBrowserBehaviour.supportsSetSinkId()) {
      // @ts-ignore
      videoElem.setSinkId(device);
    }

    await this.audioVideo.chooseAudioOutputDevice(device);
  }

  private analyserNodeCallback = () => {};

  async selectedAudioInput(): Promise<AudioInputDevice> {
    const audioInput = document.getElementById('audio-input') as HTMLSelectElement;
    const device = await this.audioInputSelectionToDevice(audioInput.value);
    return device;
  }

  async selectAudioInputDevice(device: AudioInputDevice): Promise<void> {
    this.currentAudioInputDevice = device;
    console.log('Selecting audio input', device);
    try {
      await this.audioVideo.chooseAudioInputDevice(device);
    } catch (e) {
      //fatal(e);
      console.log(`failed to choose audio input device ${device}`, e);
    }
    this.updateVoiceFocusDisplayState();
  }

  async selectAudioInputDeviceByName(name: string): Promise<void> {
    console.log('Selecting audio input device by name:', name);
    const device = await this.audioInputSelectionToDevice(name);
    return this.selectAudioInputDevice(device);
  }

  async openAudioInputFromSelection(): Promise<void> {
    const device = await this.selectedAudioInput();
    await this.selectAudioInputDevice(device);
  }

  async openAudioInputFromSelectionAndPreview(): Promise<void> {
    await this.stopAudioPreview();
    await this.openAudioInputFromSelection();
    console.log('Starting audio preview.');
    await this.startAudioPreview();
  }

  setAudioPreviewPercent(percent: number): void {
    const audioPreview = document.getElementById('audio-preview');
    if (!audioPreview) {
      return;
    }
    this.updateProperty(audioPreview.style, 'transitionDuration', '33ms');
    this.updateProperty(audioPreview.style, 'width', `${percent}%`);
    if (audioPreview.getAttribute('aria-valuenow') !== `${percent}`) {
      audioPreview.setAttribute('aria-valuenow', `${percent}`);
    }
  }

  async stopAudioPreview(): Promise<void> {
    if (!this.analyserNode) {
      return;
    }

    this.analyserNodeCallback = () => {};

    // Disconnect the analyser node from its inputs and outputs.
    this.analyserNode.disconnect();
    this.analyserNode.removeOriginalInputs();

    this.analyserNode = undefined;
  }

  startAudioPreview(): void {
    this.setAudioPreviewPercent(0);

    // Recreate.
    if (this.analyserNode) {
      // Disconnect the analyser node from its inputs and outputs.
      this.analyserNode.disconnect();
      this.analyserNode.removeOriginalInputs();

      this.analyserNode = undefined;
    }

    const analyserNode = this.audioVideo.createAnalyserNodeForAudioInput();

    if (!analyserNode) {
      return;
    }

    if (!analyserNode.getByteTimeDomainData) {
      const audioPreview=document.getElementById('audio-preview') as HTMLDivElement
        if (audioPreview) {
          audioPreview.parentElement!.style.visibility = 'hidden';
      }
      return;
    }

    this.analyserNode = analyserNode;
    const data = new Uint8Array(analyserNode.fftSize);
    let frameIndex = 0;
    this.analyserNodeCallback = () => {
      if (frameIndex === 0) {
        analyserNode.getByteTimeDomainData(data);
        const lowest = 0.01;
        let max = lowest;
        for (const f of data) {
          max = Math.max(max, (f - 128) / 128);
        }
        let normalized = (Math.log(lowest) - Math.log(max)) / Math.log(lowest);
        let percent = Math.min(Math.max(normalized * 100, 0), 100);
        this.setAudioPreviewPercent(percent);
      }
      frameIndex = (frameIndex + 1) % 2;
      requestAnimationFrame(this.analyserNodeCallback);
    };
    requestAnimationFrame(this.analyserNodeCallback);
  }

  async openAudioOutputFromSelection(): Promise<void> {
    if (this.defaultBrowserBehaviour.supportsSetSinkId()) {
      try {
        const audioOutput = document.getElementById('audio-output') as HTMLSelectElement;
        await this.chooseAudioOutputDevice(audioOutput.value);
      } catch (e) {
       // fatal(e);
        console.log('failed to chooseAudioOutputDevice', e);
      }
    }
    const audioMix = document.getElementById('meeting-audio') as HTMLAudioElement;
    try {
      await this.audioVideo.bindAudioElement(audioMix);
    } catch (e) {
      //fatal(e);
      console.log('failed to bindAudioElement', e);
    }
  }

  //private selectedVideoInput: string | null = null;
  async openVideoInputFromSelection(selection: string | null, showPreview: boolean): Promise<void> {
    if (selection) {
      this.selectedVideoInput = selection;
    }
    console.log('Switching to: '+this.selectedVideoInput);
    const device = await this.videoInputSelectionToDevice(this.selectedVideoInput);
    if (device === null) {
      if (showPreview) {
        this.audioVideo.stopVideoPreviewForVideoInput(
          document.getElementById('video-preview') as HTMLVideoElement
        );
      }
      this.audioVideo.stopLocalVideoTile();
      this.toggleButton('button-camera', 'off');
      // choose video input null is redundant since we expect stopLocalVideoTile to clean up
      try {
        await this.audioVideo.chooseVideoInputDevice(device);
      } catch (e) {
        //fatal(e);
        console.log('failed to chooseVideoInputDevice '+device, e);
      }
      throw new Error('no video device selected');
    }
    try {
      await this.audioVideo.chooseVideoInputDevice(device);
    } catch (e) {
      //fatal(e);
      console.log('failed to chooseVideoInputDevice '+device, e);
    }

    if (showPreview) {
      this.audioVideo.startVideoPreviewForVideoInput(
        document.getElementById('video-preview') as HTMLVideoElement
      );
    }
  }

  private async audioInputSelectionToIntrinsicDevice(value: string): Promise<Device> {
    if (this.isRecorder() || this.isBroadcaster()) {
      return null;
    }

    if (value === '440 Hz') {
      return DefaultDeviceController.synthesizeAudioDevice(440);
    }

    if (value === 'None') {
      return null;
    }

    return value;
  }

  private async getVoiceFocusDeviceTransformer(): Promise<VoiceFocusDeviceTransformer> {
    if (this.voiceFocusTransformer) {
      return this.voiceFocusTransformer;
    }
    const logger = new ConsoleLogger('SDK', LogLevel.DEBUG);
    const transformer = await VoiceFocusDeviceTransformer.create(this.VOICE_FOCUS_SPEC, { logger });
    this.voiceFocusTransformer = transformer;
    return transformer;
  }

  private async createVoiceFocusDevice(inner: Device): Promise<VoiceFocusTransformDevice | Device> {
    if (!this.supportsVoiceFocus) {
      return inner;
    }

    if (this.voiceFocusDevice) {
      // Dismantle the old one.
      return (this.voiceFocusDevice = await this.voiceFocusDevice.chooseNewInnerDevice(inner));
    }

    try {
      const transformer = await this.getVoiceFocusDeviceTransformer();
      const vf:any | VoiceFocusTransformDevice = await transformer.createTransformDevice(inner);
      if (vf) {
        return (this.voiceFocusDevice = vf);
      }
    } catch (e) {
      // Fall through.
    }
    return inner;
  }

  private async audioInputSelectionWithOptionalVoiceFocus(
    device: Device
  ): Promise<Device | VoiceFocusTransformDevice> {
    if (this.isVoiceFocusEnabled()) {
      if (!this.voiceFocusDevice) {
        return this.createVoiceFocusDevice(device);
      }

      // Switch out the inner if needed.
      // The reuse of the Voice Focus device is more efficient, particularly if
      // reselecting the same inner -- no need to modify the Web Audio graph.
      // Allowing the Voice Focus device to manage toggling Voice Focus on and off
      // also
      return (this.voiceFocusDevice = await this.voiceFocusDevice.chooseNewInnerDevice(device));
    }

    return device;
  }

  private async audioInputSelectionToDevice(
    value: string
  ): Promise<Device | VoiceFocusTransformDevice> {
    const inner = await this.audioInputSelectionToIntrinsicDevice(value);
    return this.audioInputSelectionWithOptionalVoiceFocus(inner);
  }

  private videoInputSelectionToIntrinsicDevice(value: string): Device {
    if (value === 'Blue') {
      return DefaultDeviceController.synthesizeVideoDevice('blue');
    }

    if (value === 'SMPTE Color Bars') {
      return DefaultDeviceController.synthesizeVideoDevice('smpte');
    }

    return value;
  }

  /*private videoFilterToProcessor(videoFilter: VideoFilterName): VideoFrameProcessor | null {
    console.log(`Choosing video filter ${videoFilter}`);

    if (videoFilter === 'Emojify') {
      return new EmojifyVideoFrameProcessor('🚀');
    }

    if (videoFilter === 'CircularCut') {
      return new CircularCut();
    }

    if (videoFilter === 'NoOp') {
      return new NoOpVideoFrameProcessor();
    }

    return null;
  }*/

  private async videoInputSelectionWithOptionalFilter(
    innerDevice: Device
  ): Promise<VideoInputDevice> {
    if (this.selectedVideoFilterItem === 'None') {
      return innerDevice;
    }

    if (
      this.chosenVideoTransformDevice &&
      this.selectedVideoFilterItem === this.chosenVideoFilter
    ) {
      if (this.chosenVideoTransformDevice.getInnerDevice() !== innerDevice) {
        // switching device
        this.chosenVideoTransformDevice = this.chosenVideoTransformDevice.chooseNewInnerDevice(
          innerDevice
        );
      }
      return this.chosenVideoTransformDevice;
    }

    // A different processor is selected then we need to discard old one and recreate
    if (this.chosenVideoTransformDevice) {
      await this.chosenVideoTransformDevice.stop();
    }

    const proc =[];// this.videoFilterToProcessor(this.selectedVideoFilterItem);
    this.chosenVideoFilter = this.selectedVideoFilterItem;
    this.chosenVideoTransformDevice = new DefaultVideoTransformDevice(
      this.meetingLogger,
      innerDevice,
      []
    );
    return this.chosenVideoTransformDevice;
  }

  private async videoInputSelectionToDevice(value: string): Promise<VideoInputDevice> {
    if (this.isRecorder() || this.isBroadcaster() || value === 'None') {
      return null;
    }
    const intrinsicDevice = this.videoInputSelectionToIntrinsicDevice(value);
    return await this.videoInputSelectionWithOptionalFilter(intrinsicDevice);
  }     


// shareuploadedvideo(ids:any,btnid:any) { 
//   //this.hidestopuploadedvideo();     
shareuploadedvideo(ids:any,btnid:any) {
  
  const tile0Active = document.getElementById('tile-0');
    if (tile0Active) { 
      this.classStr=tile0Active.classList.value;
      this.classStr =this.classStr.match(/active/g);
        if(this.classStr=='active'){
           return this.hidestopuploadedvideo()
        }
  }
  
  const tile16 = document.getElementById('tile-16');
  if (tile16) {tile16.classList.add('video-width');}
  const tile1 = document.getElementById('tile-0');
  if (tile1) {tile1.classList.remove('active');}
  console.log('shareuploadedvideo----',ids);    
  this.testVideo=ids;    
  
  for (let i = 0; i <= this.broadcastVidoes.length; i++) {
    var showAllBTN = document.getElementById('showbtn-'+i) as HTMLButtonElement;
    if(showAllBTN){
      showAllBTN.disabled=false;
    }
  }
  const showBTN = document.getElementById('showbtn-'+btnid) as HTMLButtonElement;
  if(showBTN && showBTN.disabled==true){
      showBTN.disabled=false;
  }else{
      showBTN.disabled=true
  }
  //const videoFile = document.getElementById('content-share-video') as HTMLVideoElement;
  //videoFile.pause();     
  if(this.contentsharevideo==0){       
    (document.getElementById('content-share-video') as HTMLDivElement).style.display = 'block';
    const tile1 = document.getElementById('tile-0');
    if (tile1) {tile1.classList.remove('active');}
    (document.getElementById('u-video') as HTMLDivElement).style.display = 'none';      

  }

    const buttonMute = document.getElementById('video-0') as HTMLVideoElement;
    if (buttonMute) {
      console.log('buttonMute--------',buttonMute)
      buttonMute.muted = true;
       console.log('buttonMute--------','true')
    }

  /*
   var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
 /*     var match = this.videoLink.match(regExp);
      if (match&&match[7].length==11){
          code =match[7];
          code = "https://www.youtube.com/embed/"+code;
          //u-video
      }else{
        this.toastr.errorToastr('Invalid URL');
        return;
      }
  */
  this.savebroadcastMedia(this.testVideo);
  this.contentShareTypeChanged(this.ContentShareType.VideoFile, this.testVideo);
  
}
hidestopuploadedvideo() {

  console.log('hideuploadedvideo----',);
  for (let i = 0; i <= this.broadcastVidoes.length; i++) {
    var showAllBTN = document.getElementById('showbtn-'+i) as HTMLButtonElement;
    if(showAllBTN){
      showAllBTN.disabled=false;
    }
  } 
  (document.getElementById('content-share-video') as HTMLDivElement).style.display = 'none';      
  new AsyncScheduler().start(() => {
    this.savebroadcastMedia("");
    if (!this.isButtonOn('button-content-share')) {
      /*const tile16 = document.getElementById('tile-16');
      if (tile16) {tile16.classList.remove('video-width');}
      const tile1 = document.getElementById('tile-0');
      if (tile1) {tile1.classList.add('active');}
      this.contentShareStart();*/
       const tile16 = document.getElementById('tile-16');
      if (tile16) {tile16.classList.add('video-width');}
      const tile1 = document.getElementById('tile-0');
      if (tile1) {tile1.classList.remove('active');}
        (document.getElementById('u-video') as HTMLDivElement).style.display = 'none';      
      this.contentShareStop();
    } else {
      const tile16 = document.getElementById('tile-16');
      if (tile16) {tile16.classList.add('video-width');}
      const tile1 = document.getElementById('tile-0');
      if (tile1) {tile1.classList.remove('active');}
        (document.getElementById('u-video') as HTMLDivElement).style.display = 'none';      
      this.contentShareStop();
    }

    //const videoFile = document.getElementById('content-share-video') as HTMLVideoElement;
    //videoFile.pause();
  });
    

}

  

  private initContentShareDropDownItems(): void {
    
    let item = document.getElementById('dropdown-item-content-share-screen-capture') as HTMLSpanElement;
    item.addEventListener('click', () => {                                                  
      this.contentShareTypeChanged(this.ContentShareType.ScreenCapture);
    });
    let items = document.getElementById('dropdown-item-content-share-screen-capture-box') as HTMLSpanElement;
    items.addEventListener('click', () => {                                                  
      this.contentShareTypeChanged(this.ContentShareType.ScreenCapture);
    });

    // item = document.getElementById('dropdown-item-content-share-screen-test-video') as HTMLSpanElement;
    // item.addEventListener('click', () => {
    //   this.contentShareTypeChanged(this.ContentShareType.VideoFile, this.testVideo);
    // });
    /*item = document.getElementsByClassName('share-uploaded-video') as HTMLButtonElement;
    item.addEventListener('click', () => {
      //this.
      this.contentShareTypeChanged(this.ContentShareType.VideoFile, this.testVideo);
    });*/
    var contentshareitem= document.getElementById('content-share-item') as HTMLInputElement 
    contentshareitem.addEventListener('click', () => {
      const fileList = document.getElementById('content-share-item') as HTMLInputElement;
      if (fileList!.files) {
        const file = fileList.files[0];
        if (!file) {
          console.log('no content share selected');
          return;
        }  
        var fileSize= Math.round(file.size / 1024/1024);
        var strFileName = this.getFileExtension(file.name);
        if(strFileName != 'mp4' &&strFileName != 'MP4' && strFileName != 'MOV' && strFileName != 'FLV'){
          console.log('Please select correct video format');
          //this.toastr.errorToastr("Please select correct video format file");
          return;
        }                                   
        if(fileSize>100){             
          console.log("Please upload the file less then 100MB");
          //this.toastr.errorToastr("Please upload the file less then 100MB");
          return;
        }
        const url = URL.createObjectURL(file);
        console.log('content share selected: '+url);
        this.contentShareTypeChanged(this.ContentShareType.VideoFile, url);
        fileList.value = '';
      }else{                                 
        console.log('no content share selected');
          return;                                                      
      }                                                                         
    });                                                             
  }                                                       
                                                                                                                    
  private async contentShareTypeChanged(
    contentShareType: any,//this.ContentShareType,       
    videoUrl?: string    
  ): Promise<void> {                                     
    if (this.isButtonOn('button-content-share')) {
      await this.contentShareStop();
      
    }
    console.log('contentShareStart>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<',contentShareType,'videoUrl---',videoUrl)
    this.contentShareType = contentShareType;
    const tile16 = document.getElementById('tile-16');
    if (tile16) {tile16.classList.remove('video-width');}
    if (this.contentsharevideo==1) {
      
      if(videoUrl){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = videoUrl.match(regExp);
        if (match && match[7].length==11){
            var code =match[7];
            this.youtubevideoURL = "https://www.youtube.com/embed/"+code;
            (document.getElementById('u-video') as HTMLDivElement).style.display = 'block';      

        }else{
          const tile1 = document.getElementById('tile-0');
          if (tile1) {tile1.classList.add('active');}
        }
        
      }else{   
          const tile1 = document.getElementById('tile-0');
          if (tile1) {tile1.classList.add('active');}
          
        }                
    }
    await this.contentShareStart(videoUrl);
  }   

  private async contentShareStart(videoUrl?: string): Promise<void> {
    this.toggleButton('button-content-share');
    switch (this.contentShareType) {
      case this.ContentShareType.ScreenCapture:
        this.audioVideo.startContentShareFromScreenCapture();
        break;
      case this.ContentShareType.VideoFile:
        const videoFile = document.getElementById('content-share-video') as HTMLVideoElement;
       console.log('videoUrl>>>>>>>>.>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<',videoUrl);
        
        if (videoUrl){
          videoFile.src = videoUrl;
        }                  
        await videoFile.play();
        //videoFile.muted= true;

        let mediaStream: MediaStream;
        if (this.defaultBrowserBehaviour.hasFirefoxWebRTC()) {
          // @ts-ignore
          mediaStream = videoFile.mozCaptureStream();
        } else {
          // @ts-ignore
          mediaStream = videoFile.captureStream();
        }                                         
        this.audioVideo.startContentShare(mediaStream);
        if (this.contentsharevideo==0) {
          const tile1 = document.getElementById('tile-0');
          if (tile1) {tile1.classList.remove('active');}
          (document.getElementById('u-video') as HTMLDivElement).style.display = 'none';      
        }
        break;
    }
  }

  private async contentShareStop(): Promise<void> {
    console.log('contentShareStop>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<',"contentShareStop")

    if (this.isButtonOn('button-pause-content-share')) {
      this.toggleButton('button-pause-content-share');
    }
    this.toggleButton('button-content-share');

    const tile16 = document.getElementById('tile-16');
    if (tile16) {  tile16.classList.add('video-width')};

      if(this.contentsharevideo==0){    
        const tile1 = document.getElementById('tile-0');
        if (tile1) {tile1.classList.remove('active');}
        (document.getElementById('u-video') as HTMLDivElement).style.display = 'none';      

      }

    this.audioVideo.stopContentShare();
    if (this.contentShareType === this.ContentShareType.VideoFile) {
      const videoFile = document.getElementById('content-share-video') as HTMLVideoElement;
      videoFile.pause();
      videoFile.style.display = 'none';
    }
  }

  isRecorder(): boolean {
    return new URL(window.location.href).searchParams.get('record') === 'true';
  }

  isBroadcaster(): boolean {
    return new URL(window.location.href).searchParams.get('broadcast') === 'true';
  }

  async authenticate(): Promise<string> {
    const joinInfo = (await this.joinMeeting()).JoinInfo;
    const configuration = new MeetingSessionConfiguration(joinInfo.Meeting, joinInfo.Attendee);
    await this.initializeMeetingSession(configuration);
    const url = new URL(window.location.href);
    url.searchParams.set('m', this.meeting);
    history.replaceState({}, this.meeting, url.toString());
    return configuration!.meetingId!;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(str: string, ...args: any[]): void {
    console.log.apply(console, ['[DEMO]'+ str, ...args]);
  }

  audioVideoDidStartConnecting(reconnecting: boolean): void {
    console.log('session connecting. reconnecting: '+reconnecting);
  }

  audioVideoDidStart(): void {
    console.log('session started');
  }

  audioVideoDidStop(sessionStatus: MeetingSessionStatus): void {
    console.log('session stopped from '+JSON.stringify(sessionStatus));
    console.log('resetting stats in WebRTCStatsCollector');
    this.statsCollector.resetStats();
    if (sessionStatus.statusCode() === MeetingSessionStatusCode.AudioCallEnded) {
      console.log(`meeting ended`);
      // @ts-ignore
      window.location = window.location.pathname;
    } else if (sessionStatus.statusCode() === MeetingSessionStatusCode.Left) {
      console.log('left meeting');

      // @ts-ignore
      window.location = window.location.pathname;
    }
  }

  videoTileDidUpdate(tileState: VideoTileState): void {
    console.log('video tile updated: '+JSON.stringify(tileState, null, '  '));
    if (!tileState.boundAttendeeId) {
      return;
    }

    const tileIndex =  tileState.localTile ? 16 : this.tileOrganizer.acquireTileIndex(tileState.tileId);
    const tileElement = document.getElementById('tile-'+tileIndex) as HTMLDivElement;
    const videoElement = document.getElementById('video-'+tileIndex) as HTMLVideoElement;
    const nameplateElement = document.getElementById('nameplate-'+tileIndex) as HTMLDivElement;
    const attendeeIdElement = document.getElementById('attendeeid-'+tileIndex) as HTMLDivElement;
    //const attendeeIdElementlogo = document.getElementById('attendeeid-logo-'+tileIndex) as HTMLDivElement;
    console.log('attendeeIdElement>>>>>>>>>attendeeid-'+tileIndex+'>>>>>>>>>>',attendeeIdElement);

    //console.log('attendeeIdElementlogo>>>>>>>>>attendeeid-logo-'+tileIndex+'>>>>>>>>>>',attendeeIdElementlogo);
    const pauseButtonElement = document.getElementById('video-pause-'+tileIndex) as HTMLButtonElement;
    //KBS
    if (this.attendeeStart==1) {
      (document.getElementById('video-pause-'+tileIndex) as HTMLDivElement).style.visibility = 'hidden';
      (document.getElementById('nameplate-'+tileIndex) as HTMLDivElement).style.visibility = 'hidden';
    }
    //(document.getElementById('attendeeid-logo-1') as HTMLDivElement).style.visibility = 'hidden';
    if(pauseButtonElement){ 

    pauseButtonElement.addEventListener('click', () => {
      if (!tileState.paused) {
        this.audioVideo.pauseVideoTile(tileState.tileId);
        pauseButtonElement.innerHTML = '<label class="ico"><i class="fa fa-pause"></i></label><label class="text">Resume</label>';
      } else {
        this.audioVideo.unpauseVideoTile(tileState.tileId);
        pauseButtonElement.innerHTML = '<label class="ico"><i class="fa fa-play"></i></label><label class="text">Pause</label>';
      }
    });
  }

    console.log('binding video tile '+tileState.tileId+' to '+videoElement.id);
    this.audioVideo.bindVideoElement(tileState.tileId, videoElement);
   if (tileState.tileId) {
    this.tileIndexToTileId[tileIndex] = tileState.tileId;
    this.tileIdToTileIndex[tileState.tileId] = tileIndex;
    //this.updateProperty(nameplateElement, 'innerText', tileState!.boundExternalUserId!.split('#')[1]);

    }
    if(nameplateElement){
      this.updateProperty(nameplateElement, 'innerText', this.streamTitle);
    }
    //this.updateProperty(attendeeIdElement, 'innerText', this.streamTitle);//tileState.boundAttendeeId
    //this.updateProperty(attendeeIdElementlogo, 'innerHTML', this.streamLogo);//tileState.boundAttendeeId
                
    this.showTile(tileElement, tileState);
    this.updateGridClasses();
    this.layoutFeaturedTile();
  }

  videoTileWasRemoved(tileId: number): void {
    const tileIndex = this.tileOrganizer.releaseTileIndex(tileId);
    console.log('video tileId removed: '+tileId+' from tile-'+tileIndex);
    this.hideTile(tileIndex);
    this.updateGridClasses();
  }

  videoAvailabilityDidChange(availability: MeetingSessionVideoAvailability): void {
    this.canStartLocalVideo = availability.canStartLocalVideo;
    console.log('video availability changed: canStartLocalVideo  '+availability.canStartLocalVideo);
  }
  showTile(tileElement: HTMLDivElement, tileState: VideoTileState): void {
    tileElement.classList.add('active');

    if (tileState.isContent) {
      tileElement.classList.add('content');
    }
  }

  hideTile(tileIndex: number): void {
    const tileElement = document.getElementById('tile-'+tileIndex) as HTMLDivElement;
    tileElement.classList.remove('active', 'featured', 'content');
  }

  tileIdForAttendeeId(attendeeId: string): number | null {
    for (const tile of this.audioVideo.getAllVideoTiles()) {
      const state = tile.state();
      if (state.boundAttendeeId === attendeeId) {
        return state.tileId;
      }
    }
    return null;
  }

  findContentTileId(): number | null {
    for (const tile of this.audioVideo.getAllVideoTiles()) {
      const state = tile.state();
      if (state.isContent) {
        return state.tileId;
      }
    }
    return null;
  }

  activeTileId(): number | null {
    let contentTileId = this.findContentTileId();
    if (contentTileId !== null) {
      return contentTileId;
    }
    for (const attendeeId in this.roster) {
      if (this.roster[attendeeId].active) {
        return this.tileIdForAttendeeId(attendeeId);
      }
    }
    return null;
  }

  layoutFeaturedTile(): void {
    if (!this.meetingSession) {
      return;
    }
    const tilesIndices = this.visibleTileIndices();
    const localTileId = this.localTileId();
    const activeTile = this.activeTileId();

    for (let i = 0; i < tilesIndices.length; i++) {
      const tileIndex = tilesIndices[i];
      const tileElement = document.getElementById('tile-'+tileIndex) as HTMLDivElement;
      const tileId = this.tileIndexToTileId[tileIndex];

      if (tileId === activeTile && tileId !== localTileId) {
        tileElement.classList.add('featured');
      } else {
        tileElement.classList.remove('featured');
      }
    }

    this.updateGridClasses();
  }

  updateGridClasses(): void {
    const localTileId = this.localTileId();
    const activeTile = this.activeTileId();
    this.tileArea=document.getElementById('tile-area');
    console.log('localTileId-------',localTileId, 'tileArea>>>>>>>>',this.tileArea,"v-grid size->>>>>>>>>>>>>>>>>>>>>>>>",this.availablelTileSize());
    this.tileArea.className = 'v-grid size-'+this.availablelTileSize();

    if (activeTile && activeTile !== localTileId) {
      this.tileArea.classList.add('featured');
    } else {
      this.tileArea.classList.remove('featured');
    }
  }

  availablelTileSize(): number {
    return (
      this.tileOrganizer.remoteTileCount + (this.audioVideo.hasStartedLocalVideoTile() ? 1 : 0)
    );
  }

  localTileId(): number | null {
    //console.log('availablelTileSize>>>>>>>>>>>>>>>>>' +this.audioVideo.hasStartedLocalVideoTile+">>>>>>>>>>>>>>>"+ this.audioVideo.getLocalVideoTile().state().tileId )
    return this.audioVideo.hasStartedLocalVideoTile()
      ? this.audioVideo.getLocalVideoTile().state().tileId
      : null;
  }

  visibleTileIndices(): number[] {
    const tileKeys = Object.keys(this.tileOrganizer.tiles);
    const tiles = tileKeys.map(tileId => parseInt(tileId));
    return tiles;
  }

  setUpVideoTileElementResizer(): void {
    for (let i = 0; i <= this.MAX_TILES; i++) {
      const videoElem = document.getElementById('video-'+i) as HTMLVideoElement;
      videoElem.onresize = () => {
        if (videoElem.videoHeight > videoElem.videoWidth) {
          // portrait model 
          videoElem.style.objectFit = 'contain';
          console.log('video-'+i+' changed to portrait mode resolution '+videoElem.videoWidth+'x'+videoElem.videoHeight);
        } else {
          videoElem.style.objectFit = 'cover';
        }
      };
    }
  }

  allowMaxContentShare(): boolean {
    const allowed = new URL(window.location.href).searchParams.get('max-content-share') === 'true';
    if (allowed) {
      return true;
    }
    return false;
  }

  connectionDidBecomePoor(): void {
    console.log('connection is poor');
  }

  connectionDidSuggestStopVideo(): void {
    console.log('suggest turning the video off');
  }

  connectionDidBecomeGood(): void {
    console.log('connection is good now');
  }

  videoSendDidBecomeUnavailable(): void {
    console.log('sending video is not available');
  }

  contentShareDidStart(): void {
    console.log('content share started.');
  }

  contentShareDidStop(): void {
    console.log('content share stopped.');
    for (let i = 0; i <= this.broadcastVidoes.length; i++) {
    var showAllBTN = document.getElementById('showbtn-'+i) as HTMLButtonElement;
    if(showAllBTN){
      showAllBTN.disabled=false;
    }
  } 
    const tile18 = document.getElementById('tile-16');
    if (tile18) {tile18.classList.add('video-width');}
    if (this.isButtonOn('button-content-share')) {
      this.buttonStates['button-content-share'] = false;
      this.buttonStates['button-pause-content-share'] = false;
      this.displayButtonStates();
    }
  }

  contentShareDidPause(): void {
    console.log('content share paused.');
  }

  contentShareDidUnpause(): void {
    console.log('content share unpaused.');
  }

  encodingSimulcastLayersDidChange(simulcastLayers: SimulcastLayers): void {
    console.log('current active simulcast layers changed to: '+this.SimulcastLayerMapping[simulcastLayers]);
  }

  remoteVideoSourcesDidChange(videoSources: VideoSource[]): void {
    console.log('available remote video sources changed: '+JSON.stringify(videoSources));
  }
  closedropmenu(divID:any):void{
    console.log('close-----',divID)
    var screenagendaopen=document.getElementById(divID);
    console.log('screenagendaopen-----',screenagendaopen)

    if (screenagendaopen) {
      screenagendaopen.classList.remove('show');
    }
  }

  opendropmenu(divID:any):void{
    var closeDivID=document.getElementById(divID);
    if(divID!='on-screen-open'){
      this.closeAlldropdownBox();
    }
    if (closeDivID) {
      console.log('show added')
      closeDivID.classList.add("show");
    }
  }

  closeAlldropdownBox(){
    var onscreenopen=document.getElementById('on-screen-open');
    var onscreenagendaopen=document.getElementById('on-screen-agenda-open');
    var livesaleshead=document.getElementById('live-sales-head');
    var mediahead=document.getElementById('media-head');
    var guest=document.getElementById('guest');
    var microphone=document.getElementById('microphone');
    var cameraid=document.getElementById('cameraid');
    if (onscreenopen) {
      onscreenopen.classList.remove('show');
    }
    if (onscreenagendaopen) {
      onscreenagendaopen.classList.remove('show');
    }
    if (livesaleshead) {
      livesaleshead.classList.remove('show');
    }
    if (mediahead) {
      mediahead.classList.remove('show');
    }
    if (guest) {
      guest.classList.remove('show');
    }
    if (microphone) {
      microphone.classList.remove('show');
    }
    if (cameraid) {
      cameraid.classList.remove('show');
    }
  }

   /*Validate the upload channel logo*/
  onSelectFile(event:any) {
      if (event.target.files && event.target.files[0]) {
       var reader = new FileReader();
        this.file = event.target.files[0]
        this.ImageObject =event;

        if(this.file != undefined && this.file != null)
        {
          var fileSize= Math.round(event.target.files[0].size / 1024/1024);
          console.log('size :  ', fileSize );
          console.log('type : ', event.target.files[0].type);
          var strFileName = this.getFileExtension(this.file.name);
          if(strFileName != 'mp4' &&strFileName != 'MP4' && strFileName != 'MOV' && strFileName != 'FLV'){
            console.log('Please select correct video format');
            this.toastr.errorToastr("Please select correct video format file");
            return;
          }
           if(fileSize>100){
            console.log("Please upload the file less then 100MB");
            this.toastr.errorToastr("Please upload the file less then 100MB");
            return;
          }
          else
          {
            if (this.file) {
               
             
              const url = URL.createObjectURL(this.file);
              console.log('content share selected: '+url);
             // this.contentShareTypeChanged(this.ContentShareType.VideoFile, url);
            }else{
                this.toastr.errorToastr("no content share selected");
                return;
            }
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            reader.onload = (event) => { // called once readAsDataURL is completed
              this.url = reader.result;
            }

            if (this.file) {
              this.streamMedialist();
                //this.fileName = this.file.name;

                const formData = new FormData();
                formData.append("broadcast_id", this.broadcast_id);
                formData.append("video_file", this.file);
                formData.append("vid_type", 'uploaded');

                //const upload$ = this.http.post("/api/thumbnail-upload", formData);
                this.loading=true
                //upload$.subscribe(); 
                window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
                this.reqVariable = this.dataService.uploadvideo(formData).subscribe(response => {
                  if(response['success'] == true){
                        this.toastr.successToastr("Video uploaded successfully.");
                        //this.isServerError = false;
                        this.getbroadcastvideos();
                        this.loading=false
                       }
                       else{
                         console.log(response);
                        this.toastr.errorToastr(response['message']);
                        this.loading=false 
                      }
                  },
                  error => {
                      this.toastr.errorToastr(error);
                  }).add(() =>{
                    this.reqVariable = null;
                  });
            }
          }
        }
        else
        {
          console.log('Please select image');
          return;
        }
      }
    }

    cancelVideoRequest(){
      if(this.reqVariable != null){
        this.reqVariable.unsubscribe();
        this.cancelService.stopRequest.next();
        console.log("unsubscribe working");
      }
    }

     /*Check Image type*/
    getFileExtension(filename : any) {
      return filename.split('.').pop();
    }
    
    public delete(){
      this.url = '';
    }

    updateBroadcastStatus(status:any){
      this.dataService.updateBroadcastStatus(this.broadcast_id,status).subscribe(response => {
        if(response['success'] == true){
             // this.toastr.successToastr("success");
              //this.isServerError = false;
              //this.broadcastVidoes=response['body'];
              console.log(response);
          }else{
             console.log(response);
            //this.toastr.errorToastr(response['message']); 
          }
        },
        error => {
            //this.toastr.errorToastr(error);
      });

    }
    getbroadcastvideos(){

      this.dataService.getbroadcastvideos(this.broadcast_id).subscribe(response => {
        if(response['success'] == true){
             // this.toastr.successToastr("success");
              //this.isServerError = false;
              this.broadcastVidoes=response['body'];
              for (let i = 0; i <= this.broadcastVidoes.length; i++) {
                var showAllBTN = document.getElementById('showbtn-'+i) as HTMLButtonElement;
                if(showAllBTN){
                  showAllBTN.disabled=false;
                }
              } 
              // console.log(broadcastVidoes);
          }else{
             console.log(response);
            //this.toastr.errorToastr(response['message']); 
          }
        },
        error => {
            //this.toastr.errorToastr(error);
      });

    }
    
    deletebroadcastvideos(id:any){
      this.loading=true
      const videoFile = document.getElementById('content-share-video') as HTMLVideoElement;
      videoFile.pause();
      this.dataService.deletebroadcastvideos(id).subscribe(response => {
        if(response['success'] == true){
              this.toastr.successToastr("Video deleted successfully");
              //this.isServerError = false;
              //this.broadcastVidoes=response['body'];
              this.loading=false;
              // console.log(broadcastVidoes);
              this.getbroadcastvideos();
          }else{
             console.log(response);
             this.loading=false;
            //this.toastr.errorToastr(response['message']); 
          }
        },
        error => {
            this.toastr.errorToastr(error);
      });

    }

    savetext() {
      var title=(document.getElementById('screentextId') as HTMLInputElement).value;;
      if (title) {
        const resetform= document.getElementById("screentextId") as HTMLInputElement;
        if(resetform){
          resetform.value="";
        } 
        const formData = new FormData();
        formData.append("broadcast_id", this.broadcast_id);
        formData.append("user_id", this.userId);
        formData.append("text",title);
        formData.append("text_agenda",this.agenda_id)
        this.dataService.savetext(formData).subscribe(response => {
          if(response['success'] == true){
                this.toastr.successToastr("Success");
                //this.isServerError = false;
                this.getScreentext(this.agenda_id);
                this.agenda_id = 0;
                this.gettext();
               }
               else{
                 console.log(response);
                this.toastr.errorToastr(response['message']);
              }
          },
          error => {
              this.toastr.errorToastr(error);
          });
      }
    }
    saveAgendatext() {
      var title=(document.getElementById('screenagendaId') as HTMLInputElement).value;;
      if (title) {
        const resetform=document.getElementById("screenagendaId")as HTMLInputElement;
        if(resetform){
           resetform.value="";
        } 
        const formData = new FormData();
        formData.append("broadcast_id", this.broadcast_id);
        formData.append("user_id", this.userId);
        formData.append("agenda",title);

        this.dataService.saveAgendatext(formData).subscribe(response => {
          if(response['success'] == true){
                this.toastr.successToastr("Success");
                //this.isServerError = false;
                this.gettext();
               }
               else{
                 console.log(response);
                this.toastr.errorToastr(response['message']);
              }
          },
          error => {
              this.toastr.errorToastr(error);
          });
      }
    }
    gettext(){

      this.dataService.gettext(this.broadcast_id).subscribe(response => {
        if(response['success'] == true){
             // this.toastr.successToastr("success");
              //this.isServerError = false;
              this.textlist=response['body'];
              // console.log(broadcastVidoes);
          }else{
             console.log(response);
            //this.toastr.errorToastr(response['message']); 
          }
        },
        error => {                    
            //this.toastr.errorToastr(error);                                                                                                                                                                                   
      });
                               
    }
  
    getScreentext(text_agnda_id:any){

      this.dataService.getScreentext(text_agnda_id).subscribe(response => {
        if(response['success'] == true){
             // this.toastr.successToastr("success");
              //this.isServerError = false;
              this.agendaDetail=response['body'];
              // console.log(broadcastVidoes);
          }else{
             console.log(response);
            //this.toastr.errorToastr(response['message']); 
          }
        },
        error => {                    
            //this.toastr.errorToastr(error);                                                                                                                                                                                   
      });
                               
    }
    getagendaDetail(indexID:any,pvarId:any){
      this.agenda_id = pvarId;
       this.agendaDetail=this.textlist[indexID].screen_text;;
    }

    deletetext(id:any,text_agnda_id:any,indexid:any){
      const prompt =
        'Are you sure you want to delete?';
      if (!window.confirm(prompt)) {
        return;
      }
      const rowhide = document.getElementById("rowhide-"+indexid) as HTMLDivElement;
      if(rowhide){
        rowhide.style.display = 'none';
      }  

      if (this.showID==id) {
        const videoFiletext = document.getElementById('nameplate-16') as HTMLDivElement;
        if(videoFiletext){
          videoFiletext.style.display = 'none';
        }
        this.streamTitle='';
       
      }
      this.dataService.deletetext(id).subscribe(response => {
        if(response['success'] == true){
              this.toastr.successToastr("Deleted successfully");
                          
              this.gettext();
          }else{
            console.log(response);
            //this.loading=false;  
            this.toastr.errorToastr(response['message']); 
          }
        },
        error => {
            this.toastr.errorToastr(error);
      });
    }
    
    deletetextagenda(id:any){
      const prompt =
        'Are you sure you want to delete?';
      if (!window.confirm(prompt)) {
        return;
      }
      if(id==this.agendaID){
        this.streamTitle='';
        this.closedropmenu('on-screen-open');

      }
      this.dataService.deletetextagenda(id).subscribe(response => {
        if(response['success'] == true){
              this.toastr.successToastr("Deleted successfully");
              //this.isServerError = false;
              //this.broadcastVidoes=response['body'];
              //this.loading=false;
              // console.log(broadcastVidoes);
              this.gettext();
          }else{
             console.log(response);
             this.loading=false;  
            //this.toastr.errorToastr(response['message']); 
          }
        },
        error => {
            this.toastr.errorToastr(error);
      });
    }
    showtext(text:any,id:any,agenda_id:any) { 
      this.agendaID=agenda_id;
      var hidetext=document.getElementById('textid'+id);
      console.log('hidetext-------','textid'+id);
      if(this.agendaDetail.length>0){
        for (let index = 0; index < this.agendaDetail.length; index++) {
          if (this.agendaDetail[index].id != id) {
            var textid =document.getElementById('textid'+this.agendaDetail[index].id);
            if (textid) {textid.classList.add('fa-eye-slash');}
          }
        }
      }

      if (hidetext) {
        hidetext.classList.remove('fa-eye-slash');
        hidetext.classList.add('fa-eye');
      } 

      const videoFile = document.getElementById('nameplate-16') as HTMLDivElement;
      if(videoFile){
        videoFile.style.display = 'block';
      }
      
      if (this.showID==id) {
        const videoFile = document.getElementById('nameplate-16') as HTMLDivElement;
        if(videoFile){
          videoFile.style.display = 'none';
        }
        text=""; 
        if (hidetext) {
          hidetext.classList.add('fa-eye-slash');
          hidetext.classList.remove('fa-eye');
        }
        this.showID='undefined';
      }else{
        this.showID= id;
      }
      this.streamTitle=text
      //console.log((document.getElementById('screentextId') as HTMLInputElement).value);
      console.log('streamTitle------------->',this.streamTitle);
      //attendeeid-demo
      (document.getElementById('attendeeidemo') as HTMLDivElement).innerText = this.streamTitle ;
      this.socket.emit('setTextonScreen',{"broadcast_id":this.broadcast_id,"text" : this.streamTitle});
      this.socket.on('getTextonScreen',(res:any) => {
        this.streamTitle = res;
      });
 
    }
    microphone(tagId:any){
      const buttonMute = document.getElementById(tagId) as HTMLVideoElement;
      const contentshare_video = document.getElementById('content-share-video') as HTMLVideoElement;

       if (buttonMute) {
        console.log('buttonMute--------',buttonMute)
       // buttonMute.click();
        if(buttonMute.muted){
          buttonMute.muted = false;
           console.log('buttonMute--------','false') 
        } else {
          buttonMute.muted = true;
           console.log('buttonMute--------','true')
        }   

      }
      if (contentshare_video) {
         //contentshare_video.pause();
        console.log('contentshare_video--------',contentshare_video)
        if(contentshare_video.muted){
          contentshare_video.muted = false;
           console.log('contentshare_video--------','false') 
        } else {
          contentshare_video.muted = true;
           console.log('contentshare_video--------','true')
        }   

      } 
    }



    productList(){
      this.dataService.publicBroadcastingContentDetails(this.broadcast_id,this.userId).subscribe(response => {
      this.broadcastData = response['body'];
      //this.timestamp = this.broadcastData.timestamp 
       console.log(this.broadcastData,"broadcast Information")
    
        const currentDate = new Date();
        this.currentDateTimestamp = currentDate.getTime();
        const liveTime = new Date(this.broadcastData.broadcast_time);
        this.liveTimeTimestamp = liveTime.getTime();
        console.log(this.currentDateTimestamp,"----",this.liveTimeTimestamp) 
    
    });
    }
             
    /* ****** get likes with socket io *******/

    getAllLikes(){
      // this.socket.emit('likesIt',{"broadcast_id":this.broadcast_id,"user_id" : this.userId});
      // this.socket.on('Getlikes',(likes:any) => {
      //   this.likes_data = likes;
      // });
      console.log('getAllLikes',this.broadcast_id,this.userId);

      this.socket.emit('getLikesCount',{"broadcast_id":this.broadcast_id,"user_id" : this.userId});
      this.socket.on('returnLikesCount',(res:any) => {
              console.log('returnLikesCount');

        this.likes_data = res.likes;
      });
    }

    isAllSelected(event:any,pvarObj: any){
      if(event.target.checked){
        pvarObj['broadcast_id'] =this.broadcast_id;
        this.selected_product.push(pvarObj);
      }else{
        this.selected_product.splice( this.selected_product.indexOf(pvarObj), 1);
      }
    }

    liveSales(){
      // var elems = document.querySelectorAll(".products");
      // if (elems) {
      //   [].forEach.call(elems, function(el:any) {
      //     if (el) {
      //       el.classList.remove("active");
      //     }
      //   });
      // }
      // const productActive = document.getElementById('product'+index);
      // if (productActive) {  
      //   productActive.classList.toggle('active');   
      // }
      console.log(this.selected_product);
      this.socket.emit('showProduct',{'products':this.selected_product,'broadcast_id':this.broadcast_id}); 
      this.socket.on('GetProduct',(response:any) => {
        this.dataService.sendSocket(response['broadcast_id']);
      });
    }
    savebroadcastMedia(media_url:any){
      this.socket.emit('savebroadcastMedia',{'media_url':media_url,'broadcast_id':this.broadcast_id});       
    }
    hideliveSales(){
      this.broadcastData['productList'].forEach((element:any) => {
        element['isSelected'] = false;
      });
      console.log('hideliveSales',this.selected_product);
      this.selected_product=[];
      console.log('hideliveSales -----',this.selected_product);

      this.socket.emit('showProduct',{'products':this.selected_product,'broadcast_id':this.broadcast_id}); 
      this.socket.on('GetProduct',(response:any) => {
        this.dataService.sendSocket(response['broadcast_id']);
      });
    }
    getAllUser(){
       this.socket.on('updateUsers',(response:any) => {});
      this.socket.on('updateLike',(response:any) => {
        this.socket.emit('getLikesCount',{"broadcast_id":this.broadcast_id,"user_id" : this.userId});
              console.log('updateLike returnLikesCount');

        this.socket.on('returnLikesCount',(likes:any) => {
          this.likes_data = likes.likes;
        });
      });
    }

  copyLink(){
          //this.meeting = (document.getElementById('inputMeeting') as HTMLInputElement).value;

        var guestLink = document.getElementById('copyClipboard') as HTMLInputElement;//).value;
        if (guestLink) {
          guestLink.select();
          document.execCommand('copy');
          this.toastr.successToastr("Guest link copied successfully");
        }
      
  }

 openCountDown(){
    this.startCountdown(5);
    this.isCountDown = true;
  }
  startCountdown(seconds:any) {
    this.counter = seconds;
    const interval = setInterval(() => {
      this.counter--;
      if (this.counter < 0 ) {
        clearInterval(interval);
        this.isCountDown = false;
      }
    }, 1000);
  }

  drop(event: CdkDragDrop<string[]>) {
    // console.log(event.previousIndex);
    // console.log(event.currentIndex);
    // console.log(JSON.stringify(this.textlist, undefined, 2));
    moveItemInArray(this.textlist, event.previousIndex, event.currentIndex);
    let data = {
      "data" : this.textlist
    };
    this.dataService.updateAgendatextIndex(data).subscribe(response =>{
      if(response['success'] == true){
        this.toastr.successToastr(response['message']);
      }else{
        console.log(response['message'])
      }
    },error =>{
      console.log(error);
    })
  }

  openLinkBox(divID:any,pvarType:string):void{
    this.videoLink = "";
    this.video_type = pvarType;
    var screenagendaopen=document.getElementById(divID);
    if (screenagendaopen) {
      screenagendaopen.classList.add("show");
    }
  }

  saveLink(){
    let code;
    if(this.videoLink){
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = this.videoLink.match(regExp);
      if (match&&match[7].length==11){
          code =match[7];
          code = "https://www.youtube.com/embed/"+code;
      }else{
        this.toastr.errorToastr('Invalid URL');
        return;
      }
    }else{
      this.toastr.errorToastr('Please enter video url');
      return;
    }
    let data = {
      "broadcast_id": this.broadcast_id,
      "video_file" : code,
      "vid_type" : this.video_type
    }
    this.dataService.uploadvideo(data).subscribe(response =>{
      console.log(response);
      if(response['success'] == true){
        this.videoLink = "";
        this.closeLinkBox('on-link-open');
        this.getbroadcastvideos();
      }else{
        console.log(response['message']);
      }
    },error =>{
      console.log(error);
    })
  }

  sanitizerURL(videoURL: string){
    return this._sanitizer.bypassSecurityTrustResourceUrl(videoURL);
  }

  closeLinkBox(divID:any):void{
      var screenagendaopen=document.getElementById(divID);
      if (screenagendaopen) {
        screenagendaopen.classList.remove('show');
      }
    }

    uploadAWS(blob:any) {
      if(blob){

        this.isAlertMsg = true;
        this.updateBroadcastStatus('2');
        (document.getElementById('button-meeting-end') as HTMLDivElement).innerHTML ="<label class='ico'><i class='fa fa-spinner fa-spin' style='color: red;'></i></label><label class='text' style='text-transform: capitalize;font-size: 11px;font-weight: 600;padding: 3px 3px 0;line-height: 12px;width: 100%;'> Rec. Uploading. Wait...</label>" ;                                                                  
        var endbutton=  document.getElementById('button-meeting-end') as HTMLButtonElement;
        if(endbutton){
          endbutton.disabled = true;
        }
        const formData = new FormData();
        formData.append("broadcast_id", this.broadcast_id);
        formData.append("video_file", blob);
        formData.append("vid_type", 'uploaded');
          this.dataService.uploadRecVideo(formData).subscribe(response => {
          (document.getElementById('button-meeting-end') as HTMLDivElement).innerHTML ="<label class='ico'><i class='fas fa-power-off' style='color: red;''></i></label><label class='text' style='text-transform: capitalize;font-size: 11px;font-weight: 600;padding: 3px 3px 0;line-height: 12px;width: 100%;'> End Broadcast</label>" ;                                                                  
          if(endbutton){
            endbutton.disabled = false;
          }
          this.recordingComplete=1;
          this.isAlertMsg = false;
          if(response['success'] == true){
                this.toastr.successToastr("Recording uploaded successfully.");
                //this.isServerError = false;
                //this.getbroadcastvideos();
                //this.loading=false
                 this.router.navigate(['inventory']);
               }
               else{
                 console.log(response);
                this.toastr.errorToastr(response['message']);
                //this.loading=false 
              }
          },
          error => {
              this.toastr.errorToastr(error);
          });

      }
     /* if (blob) {
       var reader = new FileReader();
        this.file = blob
        //this.ImageObject =event;

        if(this.file != undefined && this.file != null)
        {
          /*var strFileName = this.getFileExtension(this.file.name);
          if(strFileName != 'mp4' &&strFileName != 'MP4' && strFileName != 'MOV' && strFileName != 'FLV'){
            console.log('Please select correct video format');
            this.toastr.errorToastr("Please select correct video format file");
            return;
          }
          else
          {*/
            /*if (this.file) {
               
              if (!this.file) {
                console.log('no content share selected');                   
                this.toastr.errorToastr("no content share selected");

                return;
              }
              const url = URL.createObjectURL(this.file);
              console.log('content share selected: '+url);
              this.contentShareTypeChanged(this.ContentShareType.VideoFile, url);
            }else{
                this.toastr.errorToastr("no content share selected");
                return;
            }
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            reader.onload = (event) => { // called once readAsDataURL is completed
              this.url = reader.result;
            }

            *
            if (this.file) {
              this.isAlertMsg = true;
              (document.getElementById('button-meeting-end') as HTMLDivElement).innerHTML ="<label class='ico'><i class='fa fa-spinner fa-spin' style='color: red;'></i></label><label class='text' style='text-transform: capitalize;font-size: 11px;font-weight: 600;padding: 3px 3px 0;line-height: 12px;width: 100%;'> Rec. Uploading. Wait...</label>" ;                                                                  
              var endbutton=  document.getElementById('button-meeting-end') as HTMLButtonElement;
              if(endbutton){
                endbutton.disabled = true;
              }
                
                //this.fileName = this.file.name;

                const formData = new FormData();
                formData.append("broadcast_id", this.broadcast_id);
                formData.append("video_file", this.file);
                formData.append("vid_type", 'uploaded');

                //const upload$ = this.http.post("/api/thumbnail-upload", formData);
                //this.loading=true
                //upload$.subscribe(); 
                //window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
                this.dataService.uploadRecVideo(formData).subscribe(response => {
                  (document.getElementById('button-meeting-end') as HTMLDivElement).innerHTML ="<label class='ico'><i class='fas fa-power-off' style='color: red;''></i></label><label class='text' style='text-transform: capitalize;font-size: 11px;font-weight: 600;padding: 3px 3px 0;line-height: 12px;width: 100%;'> End Broadcast</label>" ;                                                                  
                  if(endbutton){
                    endbutton.disabled = false;
                  }
                  this.recordingComplete=1;
                  this.isAlertMsg = false;
                  if(response['success'] == true){
                        this.toastr.successToastr("Recording uploaded successfully.");
                        //this.isServerError = false;
                        //this.getbroadcastvideos();
                        //this.loading=false
                         this.router.navigate(['inventory']);
                       }
                       else{
                         console.log(response);
                        this.toastr.errorToastr(response['message']);
                        //this.loading=false 
                      }
                  },
                  error => {
                      this.toastr.errorToastr(error);
                  });
            }
         // }
        }
        else
        {
          console.log('Please select image');
          return;
        }
      }*/
           // var AWS = require('aws-sdk');
      /*
      S3 bucket:-
      Bucket Name: fori
      USER: foris3
      Access Key: AKIA3MSRS7Y7G7WYTDLA
      Secret Key: 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

      */

       /* var vaultBucketName = "fori";
        var bucketRegion = "us-east-1";

        var IdentityPoolId = "fori2021live";
        
        //Let's create a filename as a DD-MM-YYYY--HH-SS.mpeg
        var currentDate = new Date();
        var recordkey = currentDate.getDate().toString() + '-' + currentDate.getMonth().toString() + '-' +
            currentDate.getFullYear().toString() + '--' + currentDate.getHours().toString() + '-' + currentDate.getMinutes().toString() + '.mpeg';

        AWS.config.update({
            region: bucketRegion,
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: IdentityPoolId
            })
        });

         var s3 = new AWS.S3({
            apiVersion: "2006-03-01",
            params: { Bucket: vaultBucketName }
        });

        var upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: vaultBucketName,
                Key: recordkey,
                Body: blob,
                ACL: "public-read"
            }
        });
        console.log('S3 upload----------',upload);*/
      }




  startTimer() {
    this.running = !this.running;
    if (this.running) {
      this.startText = 'Recording';
      const startTime = Date.now() - (this.counters || 0);
      this.timerRef = setInterval(() => {
        this.counters = Date.now() - startTime;
        this.milliseconds = Math.floor(Math.floor(this.counters % 1000) / 10).toFixed(0);
        this.minutes = Math.floor(this.counters / 60000);
        this.seconds = Math.floor(Math.floor(this.counters % 60000) / 1000).toFixed(0);
        if (Number(this.minutes) < 10) {
          this.minutes = '0' + this.minutes;
        } else {
          this.minutes = '' + this.minutes;
        }
        if (Number(this.milliseconds) < 10) {
          this.milliseconds = '0' + this.milliseconds;
        } else {
          this.milliseconds = '' + this.milliseconds;
        }
        if (Number(this.seconds) < 10) {
          this.seconds = '0' + this.seconds;
        } else {
          this.seconds = '' + this.seconds;
        }
      });
    } else {
      this.startText = 'Pause';
      clearInterval(this.timerRef);
    }
  }
  

  clearTimer() {
    this.running = false;
    this.startText = '';
    this.counters = 0;
    this.milliseconds = '00',
      this.seconds = '00',
      this.minutes = '00';
    clearInterval(this.timerRef);
  }
  streamMedialist(){

    const toggleList = document.getElementById('toggle-list');
    if (toggleList) {  
      toggleList.classList.toggle('active');   
    }
    const toggleListcontainer = document.getElementById('toggle-list-container');
    //const toggleListcontainerscreen = document.getElementById('toggle-list-container-screen');
    if (toggleListcontainer) {  
      toggleListcontainer.classList.toggle('active'); 
    }
    // if (toggleListcontainerscreen) {  
    //   toggleListcontainerscreen.classList.toggle('active');  
    // }
    
  }

  toggleEmojiPicker() {
		this.showEmojiPicker = !this.showEmojiPicker;
	}

	addEmoji(event:any){
		const { message } = this;
		const emoji = `${message}${event.emoji.native}`;
		const txtarea = document.getElementById('send-message') as HTMLInputElement;
		if (!txtarea) {
		 return;
		}else{
      var scrollPos = txtarea.scrollTop;
      var strPos = 0;
      let document : any;
      var br = ((txtarea.selectionStart || txtarea.selectionStart == 0) ? "ff" : (document.selection ? "ie" : false));
      if (br == "ie") {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        strPos = range.text.length;
      } else if (br == "ff") {
        if(txtarea.selectionStart)
        strPos = txtarea.selectionStart;
      }
      var front = (txtarea.value).substring(0, strPos);
      var back = (txtarea.value).substring(strPos, txtarea.value.length);
      txtarea.value = front + emoji + back;
      strPos = strPos + emoji.length;
      if (br == "ie") {
        txtarea.focus();
        var ieRange = document.selection.createRange();
        ieRange.moveStart('character', -txtarea.value.length);
        ieRange.moveStart('character', strPos);
        ieRange.moveEnd('character', 0);
        ieRange.select();
      } else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
      }
      txtarea.scrollTop = scrollPos;
    }
	}

  addImage(url:any){
    console.log('add Image'+url);
    let src = url;
    let obj : any = {};
    obj.url = src;
    this.images_arr.push(obj);
    this.dataService.sendImgtext(this.images_arr);

    this.closedropmenu('openQualitysettingsImg');

    let element:HTMLElement = document.getElementById('send-messageBtn') as HTMLElement;
    element.click();
  }
  
}
