import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl,FormArray }  from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { HttpModule } from '@angular/http';


import { DataService } from '../../data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';
import { TileOrganizer } from '../../tileorganizer.model';

//import CircularCut from '.videofilter/CircularCut';
//import EmojifyVideoFrameProcessor from './videofilter/EmojifyVideoFrameProcessor';
import WebRTCStatsCollector from './webrtcstatscollector/WebRTCStatsCollector';
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
declare var require: any
@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.css']
})
export class LiveStreamComponent implements OnInit {

  VideoFile=new FileReader();// document.getElementById('content-share-video');
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
 	testVideo=   'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.360p.vp9.webm';
	/*BASE_URL: string = [
    location.protocol,
    '//',
    location.host,
    location.pathname.replace(/\/*$/, '/').replace('/v2', ''),
  ].join('');*/
  BASE_URL="https://chime.kindlebit.com/";//"http://54.237.71.220:4200/";
	LOGGER_BATCH_SIZE: number = 85;
	LOGGER_INTERVAL_MS: number = 2000;
	MAX_MEETING_HISTORY_MS: number = 5 * 60 * 1000;
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
    'button-camera': true,
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

	markdown = require('markdown-it')({ linkify: true , html: true});
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
	//formAuthenticate: FormGroup;
	//formDevices:FormGroup;

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
	streamTitle= "My video";
  AttendeeName:any= "Attendee Name-"+Date.now();
  streamLogo=  "<img src='https://fori.kindlebit.com/assets/images/logo.png' class='mark'>";//"https://fori.kindlebit.com/assets/images/logo.png";
  SimulcastLayerMapping = {
	  [SimulcastLayers.Low]: 'Low',
	  [SimulcastLayers.LowAndMedium]: 'Low and Medium',
	  [SimulcastLayers.LowAndHigh]: 'Low and High',
	  [SimulcastLayers.Medium]: 'Medium',
	  [SimulcastLayers.MediumAndHigh]: 'Medium and High',
	  [SimulcastLayers.High]: 'High',
	};
  image_url=''
  profile_Pic:any
  user_name:any
  user_id:any
  uname:any
  connectionPoor=false
  connectionGood=false
  constructor(
  	private routers: ActivatedRoute,
	  private router: Router,
	  private dataService: DataService,
	  private formBuilder:FormBuilder,
	) { 
    //this.image_url = environment.image_url;
  }

  ngOnInit(): void {
    if(localStorage.getItem("user_id")){
      this.profile_Pic = 'assets/images/profile.png' //localStorage.getItem("profile_Pic");
      this.user_id =localStorage.getItem("user_id");
      this.uname=localStorage.getItem("_username");
      this.AttendeeName =localStorage.getItem("_username")+"#"+this.user_id;
    }
      
  	this.initEventListeners();
    this.initParameters();
    this.setMediaRegion();
    this.setUpVideoTileElementResizer();
    if (this.isRecorder() || this.isBroadcaster()) {
      new AsyncScheduler().start(async () => {
        this.meeting = new URL(window.location.href).searchParams.get('m');
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
  }

  
  //get fg() { return this.formDevices.controls; } 
  //get f() { return this.formAuthenticate.controls; }
  
  initParameters(): void {
    const meeting = new URL(window.location.href).searchParams.get('m');
    const broadcaster = new URL(window.location.href).searchParams.get('host');
    console.log('meeting------',meeting);
    if (meeting) {
      this.attendeeStart=1;
      (document.getElementById('inputMeeting') as HTMLInputElement).value = meeting;
      (document.getElementById('inputName') as HTMLInputElement).focus();
        this.meeting=meeting	
        this.name = this.AttendeeName;
      this.autoSubmit();
      // if (this.attendeeStart==1) {
      //   (document.getElementById('inputName') as HTMLInputElement).value =meeting+'+'+this.AttendeeName;
      //   console.log("Auto host submit>>>>>>>>>>>>>>>>>>>>>>>>>")
      // }
    }else {
      (document.getElementById('inputMeeting') as HTMLInputElement).focus();
    }
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
      logger.warn('[DEMO] Does not support Amazon Voice Focus: '+e.message);
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
            ) as HTMLDivElement).innerText = `Meeting ID: ${this.meeting}`;
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
    audioOutput.addEventListener('change', async (_ev: Event) => {
      console.log('audio output device is changed');
      await this.openAudioOutputFromSelection();
    });
	var buttonTestsound=document.getElementById('button-test-sound');
    if (buttonTestsound) {
      	buttonTestsound.addEventListener('click', async e => {
	      e.preventDefault();
	      const audioOutput = document.getElementById('audio-output') as HTMLSelectElement;
	      //const testSound = new TestSound(this.meetingEventPOSTLogger, audioOutput.value);
	      //await testSound.init();
	    });
    }  	
    var formdevices=document.getElementById('form-devices');
    if (formdevices) {
      	formdevices.addEventListener('submit', e => {
      e.preventDefault();
      console.log('attendeeStart------>>>>>>>>>>>>>>>>>>>',this.attendeeStart);
      if (this.attendeeStart==1) {
        (document.getElementById('toolbar') as HTMLDivElement).style.display = 'none';

      }
      new AsyncScheduler().start(async () => {
        try {
          this.showProgress('progress-join');
          await this.stopAudioPreview();
          this.audioVideo.stopVideoPreviewForVideoInput(
            document.getElementById('video-preview') as HTMLVideoElement
          );
          await this.join();
            console.log('Join End------>>>>>>>>>>>>>>>>>>>');
            const clicksms= document.getElementById('send-message')
            if (clicksms) {
              clicksms.click();
            }  
          this.audioVideo.chooseVideoInputDevice(null);
            console.log('chooseVideoInputDevice End------>>>>>>>>>>>>>>>>>>>');

          this.hideProgress('progress-join');
                      console.log('hideProgress End------>>>>>>>>>>>>>>>>>>>');

          this.displayButtonStates();
          console.log('displayButtonStates End------>>>>>>>>>>>>>>>>>>>');

          this.switchToFlow('flow-meeting');
           console.log('switchToFlow End------>>>>>>>>>>>>>>>>>>>');

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

    const buttonMute = document.getElementById('button-microphone') as HTMLButtonElement;
    ///KBS
    
    buttonMute.addEventListener('mousedown', _e => {
      //this.audioVideo.realtimeMuteLocalAudio();
      if (this.toggleButton('button-microphone')) {
        this.audioVideo.realtimeUnmuteLocalAudio();
      } else {
        this.audioVideo.realtimeMuteLocalAudio();
      }
    });

    const buttonVideo = document.getElementById('button-camera') as HTMLButtonElement;
    buttonVideo.addEventListener('click', _e => {
      new AsyncScheduler().start(async () => {
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
    });

    const buttonPauseContentShare = document.getElementById('button-pause-content-share') as HTMLButtonElement;
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

    const buttonContentShare = document.getElementById('button-content-share') as HTMLButtonElement;
    buttonContentShare.addEventListener('click', _e => {
      new AsyncScheduler().start(() => {
        if (!this.isButtonOn('button-content-share')) {
          this.contentShareStart();
        } else {
          this.contentShareStop();
        }
      });
    });

    const buttonSpeaker = document.getElementById('button-speaker') as HTMLButtonElement;
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

    const buttonVideoStats = document.getElementById('button-video-stats') as HTMLButtonElement;
    buttonVideoStats.addEventListener('click', () => {
      if (this.isButtonOn('button-video-stats')) {
        document.querySelectorAll('.stats-info').forEach(e => e.remove());
      } else {
        this.getRelayProtocol();
      }
      this.toggleButton('button-video-stats');
    });

    const sendMessage = (msg:any): void => {
      new AsyncScheduler().start(() => {
        const textArea = document.getElementById('send-message') as HTMLTextAreaElement;
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
    if(textAreaSendMessage){
      textAreaSendMessage.addEventListener('keydown', e => {
        if (e.keyCode === 13) {
          if (e.shiftKey) {
            textAreaSendMessage.rows++;
          } else {
            e.preventDefault();
            sendMessage(0);
            textAreaSendMessage.rows = 1;
          }
        }
      });
    }
    const textSendMessage = document.getElementById('send-message') as HTMLTextAreaElement;
    if(textSendMessage){
      textSendMessage.addEventListener('click', e => {
        e.preventDefault();
        sendMessage(this.uname+ " Joined");
        textSendMessage.rows = 1;
      });
    }
    const buttonMeetingEnd = document.getElementById('button-meeting-end') as HTMLButtonElement;
    if(buttonMeetingEnd){
      buttonMeetingEnd.addEventListener('click', _e => {
        const confirmEnd = new URL(window.location.href).searchParams.get('confirm-end') === 'true';
        const prompt =
          'Are you sure you want to end the meeting for everyone? The meeting cannot be used after ending it.';
        if (confirmEnd && !window.confirm(prompt)) {
          return;
        }
        new AsyncScheduler().start(async () => {
          (buttonMeetingEnd as HTMLButtonElement).disabled = true;
          await this.endMeeting();
          await this.leave();
          (buttonMeetingEnd as HTMLButtonElement).disabled = false;
        });
      });
    }
    const buttonMeetingLeave = document.getElementById('button-meeting-leave') as HTMLButtonElement;
    if(buttonMeetingLeave){
      buttonMeetingLeave.addEventListener('click', _e => {
        new AsyncScheduler().start(async () => {
          (buttonMeetingLeave as HTMLButtonElement).disabled = true;
          await this.leave();
          (buttonMeetingLeave as HTMLButtonElement).disabled = false;
        });
      });
    }
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

  autoSubmit(): void{
    //this.meeting = (document.getElementById('inputMeeting') as HTMLInputElement).value;
    //this.name = (document.getElementById('inputName') as HTMLInputElement).value;
    this.region = (document.getElementById('inputRegion') as HTMLInputElement).value;
    this.enableSimulcast = (document.getElementById('simulcast') as HTMLInputElement).checked;
    if (this.enableSimulcast) {
      const videoInputQuality = document.getElementById(
        'video-input-quality'
      ) as HTMLSelectElement;
      videoInputQuality.value = '720p';
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
          ) as HTMLDivElement).innerText = `Meeting ID: ${this.meeting}`;
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

        //this.switchToFlow('flow-devices');
        
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
        this.autoJoin();
        this.hideProgress('progress-authenticate');
      }
    );
  }

  autoJoin(): void{
  	console.log('attendeeStart------>>>>>>>>>>>>>>>>>>>',this.attendeeStart);
    if (this.attendeeStart==1) {
      (document.getElementById('toolbar') as HTMLDivElement).style.display = 'none';
    }
    new AsyncScheduler().start(async () => {
      try {
        this.showProgress('progress-join');
        await this.stopAudioPreview();
        this.audioVideo.stopVideoPreviewForVideoInput(
          document.getElementById('video-preview') as HTMLVideoElement
        );
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
  }

  displayButtonStates(): void {
  	console.log("displayButtonStates>>>>>>>>>>>>>>>>>>>");
    for (const button in this.buttonStates) {
      const element = document.getElementById(button) as HTMLButtonElement;
      const drop = document.getElementById(button+'-drop');
      const on = this.buttonStates[button];
      element.classList.add(on ? 'btn-success' : 'btn-outline-secondary');
      element.classList.remove(on ? 'btn-outline-secondary' : 'btn-success');
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
    if (
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
    }

    if (
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
    }

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
      attendeeId: configuration.credentials!.attendeeId,
    });
    try {
      const response = await fetch(`${this.BASE_URL}${pathname}`, {
        method: 'POST',
        body,
      });
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

      this.meetingLogger = new MultiLogger(
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
      this.meetingEventPOSTLogger = new MeetingSessionPOSTLogger(
        'SDKEvent',
        configuration,
        this.LOGGER_BATCH_SIZE,
        this.LOGGER_INTERVAL_MS,
        this.BASE_URL+'log_meeting_event',
        logLevel
      );
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
      this.audioVideo.chooseVideoInputQuality(1280, 720, 15, 1400);
      //this.audioVideo.chooseVideoInputQuality(640, 360, 15, 600);
    }
    this.audioVideo.addDeviceChangeObserver(this);
    if (this.attendeeStart==0) {
    	this.setupDeviceLabelTrigger();
    	await this.populateAllDeviceLists();
	}
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
    //sendMessage(this.uname+" join the group");
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
    (document.getElementById('viwer') as HTMLDivElement).innerHTML ="Viewers ("+newRosterCount+")";
    if (this.attendeeStart==1) {
      (document.getElementById('roster') as HTMLDivElement).style.visibility = 'hidden';
    }
    console.log('newRosterCount>>>>>>>>>>>>>>>>>>>>',newRosterCount);
    if (roster) {
    	while (roster.getElementsByTagName('li').length < newRosterCount) {
	      const li = document.createElement('li');
	      console.log("li->>>>>>>>>>>>>>>>>>>>>>>>",li);

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
        this.contentShareStop();
      }
      if (!this.roster[attendeeId]) {
        this.roster[attendeeId] = {
          name: externalUserId.split('#').slice(-1)[0] + (isContentAttendee ? ' «Content»' : ''),
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
      this.audioVideo.getRTCPeerConnectionStats(track).then((reports:any) => {
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
    console.log('dataMessage----->',dataMessage);
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
      //profileimage.innerHTML =;

      const messageNameSpan = document.createElement('div') as HTMLDivElement;
      messageNameSpan.classList.add('message-bubble-sender');
      messageNameSpan.innerText = dataMessage.senderExternalUserId.split('#').slice(-2)[0];
      console.log('ask--------',dataMessage.senderExternalUserId.split('#').slice(-2)[0])
      //profileimage.innerHTML = "<img src='"+this.image_url+'/upload/profile/'+dataMessage.senderExternalUserId.split('#').slice(-1)[0]+"_profile_pic.png'>";
      profileimage.innerHTML = "<img src="+this.profile_Pic+">";

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
      if (this.lastMessageSender !== dataMessage.senderAttendeeId) {
        //messageDiv.appendChild(messageNameSpan);
        nametxtdiv.appendChild(messageNameSpan);
      }
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
    console.log("trigger call audioVideo>>>>>>>>>>>>>>>>>>>>>>");
    this.audioVideo.setDeviceLabelTrigger(
      async (): Promise<MediaStream> => {
        if (this.isRecorder() || this.isBroadcaster()) {
          throw new Error('Recorder or Broadcaster does not need device labels');
        }
        
        console.log('attendeeStart >>>>>>>>>>>validation>>>>>>>>>>>>>',this.attendeeStart)
        if (this.attendeeStart==1) {
          console.log("false -------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"); 
            //this.autoJoin();
            var stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 1280, height: 720 } });
            return stream;
        }else{
        	this.switchToFlow('flow-need-permission');
            var stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

        }
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
        const id = `toggle-${elementId}-${name}`;//.replace(/\s/g, '-')}`;
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
    const additionalDevices = ['None', '440 Hz'];
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
    const additionalDevices = ['None', 'Blue', 'SMPTE Color Bars'];
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

  private initContentShareDropDownItems(): void {
    let item = document.getElementById('dropdown-item-content-share-screen-capture') as HTMLSpanElement;
    item.addEventListener('click', () => {
      this.contentShareTypeChanged(this.ContentShareType.ScreenCapture);
    });

    item = document.getElementById('dropdown-item-content-share-screen-test-video') as HTMLSpanElement;
    item.addEventListener('click', () => {
      this.contentShareTypeChanged(this.ContentShareType.VideoFile, this.testVideo);
    });

   var contentshareitem= document.getElementById('content-share-item') as HTMLInputElement 
    contentshareitem.addEventListener('change', () => {
      const fileList = document.getElementById('content-share-item') as HTMLInputElement;
      if (fileList!.files) {
      const file = fileList.files[0];
      if (!file) {
        console.log('no content share selected');
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
    contentShareType: any ,//| this.ContentShareType,
    videoUrl?: string
  ): Promise<void> {
    if (this.isButtonOn('button-content-share')) {
      await this.contentShareStop();
    }
    console.log('contentShareStart>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<',contentShareType)
    this.contentShareType = contentShareType;
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
        if (videoUrl) {
          videoFile.src = videoUrl;
        }
        await videoFile.play();
        let mediaStream: MediaStream;
        if (this.defaultBrowserBehaviour.hasFirefoxWebRTC()) {
          // @ts-ignore
          mediaStream = videoFile.mozCaptureStream();
        } else {
          // @ts-ignore
          mediaStream = videoFile.captureStream();
        }
        this.audioVideo.startContentShare(mediaStream);
        break;
    }
  }

  private async contentShareStop(): Promise<void> {
        console.log('contentShareStop>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<',"contentShareStop")

    if (this.isButtonOn('button-pause-content-share')) {
      this.toggleButton('button-pause-content-share');
    }
    this.toggleButton('button-content-share');
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
    const tileIndex = tileState.localTile ? 16: this.tileOrganizer.acquireTileIndex(tileState.tileId);
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
     // (document.getElementById('nameplate-'+tileIndex) as HTMLDivElement).style.visibility = 'hidden';
    }
    //(document.getElementById('attendeeid-logo-1') as HTMLDivElement).style.visibility = 'hidden';

    pauseButtonElement.addEventListener('click', () => {
      if (!tileState.paused) {
        this.audioVideo.pauseVideoTile(tileState.tileId);
        pauseButtonElement.innerText = 'Resume';
      } else {
        this.audioVideo.unpauseVideoTile(tileState.tileId);
        pauseButtonElement.innerText = 'Pause';
      }
    });

    console.log('binding video tile '+tileState.tileId+' to '+videoElement.id);
    this.audioVideo.bindVideoElement(tileState.tileId, videoElement);
    if (tileState.tileId) {
    this.tileIndexToTileId[tileIndex] = tileState.tileId;
    this.tileIdToTileIndex[tileState.tileId] = tileIndex;
    // console.log(tileIndex,' tileState----1',tileState!.boundExternalUserId!.split('#')[-1][0])
    // console.log(tileIndex, 'tileState----2',tileState!.boundExternalUserId!.split('#')[1][0])
    // console.log('tileState----3',tileState!.boundExternalUserId!.split('#')[-2][0]);//externalUserId.split('#').slice(-1)[0] 
    this.updateProperty(nameplateElement, 'innerText', tileState!.boundExternalUserId!.split('#').slice(-1)[0]);
    }
   // this.updateProperty(attendeeIdElement, 'innerText', this.streamTitle);//tileState.boundAttendeeId
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
          // portrait mode
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
    this.connectionPoor=true
    console.log('connection is poor');
  }

  connectionDidSuggestStopVideo(): void {
    console.log('suggest turning the video off');
  }

  connectionDidBecomeGood(): void {
    this.connectionPoor=false;
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

}
