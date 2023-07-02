import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {Title} from "@angular/platform-browser";
import { DataService } from '../../data.service';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css'],
  providers:[DatePipe]
})
export class SalesReportComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions : any;
  chartOptions_: any;
  today : any;
  date : any;
  total_amount : number = 0;
  currentMonth : any = 0;
  currentYear : any = 0;
  constructor(
    private titleService:Title,
    private dataService : DataService,
    public datepipe: DatePipe
  ) {
    this.titleService.setTitle("Sales Dashboard");
  }

  ngOnInit(): void {
    this.today = new Date();
    this.date = this.today.getDate();
    this.currentMonth = this.today.getMonth()+1;
    this.currentMonth = this.currentMonth < 9 ? '0'+this.currentMonth : this.currentMonth;
    this.currentYear = this.today.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    this.date = this.date + monthNames[this.today.getMonth()]
    this.getSalesData();
  }

  monthChange(value:any){
    this.currentMonth = value;
    this.getSalesData();
  }

  yearChange(value:any){
    this.currentYear = value;
    this.getSalesData();
  }

  getSalesData(){
    this.total_amount = 0;
    this.dataService.getProductSaleReport(this.currentMonth,this.currentYear).subscribe(response =>{
      if(response['success'] == true){
        let data : any = [];
        let date : any = [];
        if(response['body'] != '' && response['body'] != null){
          response['body'].forEach((element :any) => {
            data.push(element['total']);
            date.push(this.dateFormat(element['create_date']))
            this.total_amount = this.total_amount + element['total'];
          });
          this.chartOptions = {
            title: { text: 'Sales Over Time' },
            series: [
              {
                data: data
              }
            ],
            exporting: { enabled: true },
            yAxis: {
              allowDecimals: false,
              title: {
                text: ""
              },
              tickInterval : 5,
            },
            xAxis: {
              allowDecimals: false,
              title: {
                text: ""
              },
              categories : date //[this.date, '06 am', '12 pm', '06 pm']
            },
            credits: { enabled: false },
            legend: { enabled: false },
            tooltip : { enabled : false },
            //chart: { height: 400, width: 500 }
          };
          Highcharts.chart('container', this.chartOptions);
        }else{

        }
      }
    },error =>{
      console.log(error);
    })
  }

  dateFormat(date:any){
    let d = new Date(date);
    return this.datepipe.transform(d, 'MM/dd/yyyy');
  }

}
