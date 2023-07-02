import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
//import { INITIAL_EVENTS, createEventId } from './event-utils';
import { EventInput, Calendar } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import { DataService } from '../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
 
@Component({
  selector: 'app-google-calendar',
  templateUrl: './google-calendar.component.html',
  styleUrls: ['./google-calendar.component.css']
})
export class GoogleCalendarComponent implements OnInit {
  calendarOptions: any
  obj: any = {}
  calendarVisible = true;
  currentEvents: EventApi[] = [];
  userId :any = []
  booking_data: any = []

  constructor(
    private dataService: DataService,
    public toastr : ToastrManager,
    //public calendarOptions: CalendarOptions
    ) { }

  ngOnInit(){
    if(localStorage.getItem("data")){
      let data = this.dataService.decryptData(localStorage.getItem("data"));
      this.userId = data[0]['user_id'];
    }
    //this.userId =localStorage.getItem("user_id");
    this.__getBookingDetails();

     setTimeout(() => {
      if(this.booking_data) {
        this.obj['id'] = this.booking_data['id']
        this.obj['start'] = this.booking_data['start_date']
        this.obj['end'] = this.booking_data['end_date']
        this.obj['title'] = this.booking_data['note']
      }
         this.calendarOptions = {
          plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
           headerToolbar: {
             left: 'prev,next today',
             center: 'title',
             right: 'timeGridWeek,timeGridDay,listWeek',
           },
           height:600,
          initialView: 'timeGridWeek',
           weekends: false,
           editable: true,
           selectable: true,
           selectMirror: true,
           dayMaxEvents: true,
           select: this.handleDateSelect.bind(this),
           eventClick: this.handleEventClick.bind(this),
           eventsSet: this.handleEvents.bind(this),
           selectAllow: this.selectallowDates.bind(this),
           events : [ this.obj ],

        };
      }, 3000);
  }
  selectallowDates(select :any) {
    return moment().diff(select.start) <= 0
  }


  //   handleCalendarToggle() {
  //   this.calendarVisible = !this.calendarVisible;
  // }

  // handleWeekendsToggle() {
  //   const { calendarOptions } = this;
  //   calendarOptions.weekends = !calendarOptions.weekends;
  // }

  // handleDateUnselect(unselectInfo: DateSelectArg) {
  // }
  handleDateSelect(selectInfo: DateSelectArg) {
   
    for(let i= 0; this.currentEvents.length > 0; i++){
      this.currentEvents[0].remove();
    }

    const title = prompt('Please enter a title for your Booking request');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        //id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
   }

    if(title ) {
     this.__saveBookingDetails(this.currentEvents[0])
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the booking request '${clickInfo.event.title}'`)) {
       this.__deleteBookingDetails()
       clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  __saveBookingDetails(data:any) {
      let eventData = {
        'user_id' : this.userId,
        'start_date' : data['startStr'],
        'end_date' : data['endStr'],
        'note' : data['title'],
      }
      this.dataService.supportRequest(eventData).subscribe(response => {
          if(response['success'] == true){
            this.toastr.successToastr(response['message']);
          }
          else{this.toastr.errorToastr(response['message']); }
      });
  }

  __getBookingDetails(){
      this.dataService.getRequestList().subscribe(response => {
          if(response['success'] == true){
            this.booking_data = response['body'][0]
          }
          else{this.toastr.errorToastr(response['message']); }
      });
  }
  __deleteBookingDetails(){
      this.dataService.delSupportRequest().subscribe(response => {
          if(response['success'] == true){
            this.toastr.successToastr(response['message']);
          }
          else{this.toastr.errorToastr(response['message']); }
      });
  }

}
