import { Component, OnInit, ViewEncapsulation,  ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular'; 
import { EventInput, Calendar } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
  @ViewChild('fullcalendar', { static: false }) calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  calendarApi: Calendar;
  initialized : boolean = false;
  calendarOptions : any;
  booking_data : any = [];
  userType : string = "1";
  constructor(
    private dataService : DataService
  ) { }

  ngOnInit(): void {
    
  }

  loadCalendar(){
    this.userType = "1"
    this.getCalendar();  
  }

  changeType(value:any){
    this.userType = value;
    this.getCalendar();
  }

  getCalendar(){
    this.dataService.getAllRequestList(this.userType).subscribe(response => {
      if(response['success'] == true){
        this.booking_data = [];
        if(response['body'] != '' && response['body'] != null){
          let element = response['body'];
          setTimeout(() => {
            for(let i = 0; i < element.length; i++){
              let obj : any = {};
              obj['id'] = element[i]['id']
              obj['start'] = element[i]['start_date']
              obj['end'] = element[i]['end_date']
              obj['title'] = element[i]['note']
              this.booking_data.push(obj);
            }
             this.calendarOptions = {
              plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
               headerToolbar: {
                 left: 'prev,next today',
                 center: 'title',
                 right: 'timeGridWeek,timeGridDay',
               },
               height:600,
              initialView: 'timeGridWeek',
              weekends: true,
              editable: true,
              selectable: true,
              selectMirror: true,
              dayMaxEvents: true,
              events : this.booking_data,
            };
          }, 100);
        }else{
          this.calendarOptions = {
            plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
             headerToolbar: {
               left: 'prev,next today',
               center: 'title',
               right: 'timeGridWeek,timeGridDay',
             },
             height:600,
            initialView: 'timeGridWeek',
            weekends: true,
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            events : this.booking_data,
          };
        }
      }else{
      }
    },error =>{
      console.log(error);
    });
  }
}
