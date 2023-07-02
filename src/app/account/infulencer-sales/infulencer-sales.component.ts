import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import * as Highcharts from 'highcharts';
import {Title} from "@angular/platform-browser";
import { DataService } from '../../data.service';

@Component({
  selector: 'app-infulencer-sales',
  templateUrl: './infulencer-sales.component.html',
  styleUrls: ['./infulencer-sales.component.css']
})
export class InfulencerSalesComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions : any;
  chartOptions_: any;

  productSalesData = 0
  productSale_total :any = []
  productSale_date :any = []

  sessionsData : any = []
  live_Total : any = []
  live_date : any = []
  constructor(
  private dataService: DataService,
  private titleService:Title,
  public datepipe: DatePipe
  ) { 
  this.titleService.setTitle("Sales Dashboard");
  }

  ngOnInit() {
    this.getProductSale()
    this.getBroadcastGraph();
  }

  getProductSale() {
    this.dataService.getProductSaleGraph().subscribe(res => {
       if(res['success'] == true){
         for (var k = 0; k < res['body'].length; k++) {
            this.productSalesData += res['body'][k]['total']
            this.productSale_total.push(res['body'][k]['total'])
            let date =this.datepipe.transform(res['body'][k]['create_date'], 'dd MMM');
            this.productSale_date.push(date)
            this.getProductSalesData();
           
          }
        }
        
    });
  }

  getBroadcastGraph() {
    this.dataService.getBroadcastGraph().subscribe(response => {
       if(response['success'] == true){
        this.sessionsData = response['body']
          for (var i = 0; i < response['body'].length; i++) { 
            this.live_Total.push(response['body'][i]['total'])
            let latest_date =this.datepipe.transform(response['body'][i]['create_date'], 'dd MMM');
            this.live_date.push(latest_date)
            this.getBroadcastData();
          }
      }
    });
  }

   getProductSalesData(){
    this.chartOptions = {
      title: { text: 'Product Sales Over Time' },
      series: [
        {
          data:  this.productSale_total
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
        categories : this.productSale_date
      },
      credits: { enabled: false },
      legend: { enabled: false },
      tooltip : { enabled : false },
      chart: { height: 350, width: 350 }
    };
    Highcharts.chart('container', this.chartOptions);
  }

  getBroadcastData(){
    this.chartOptions_ = {
      title: { text: 'Live Sessions Data' },
      series: [
        {
          data: this.live_Total
        }
      ],
      exporting: { enabled: true },
      yAxis: {
        allowDecimals: false,
        title: {
          text: "Live Sessions"
        },
        tickInterval : 5
      },
      xAxis: {
        allowDecimals: false,
        title: {
          text: ""
        },
        categories : this.live_date
      },
      credits: { enabled: false },
      legend: { enabled: false },
      tooltip : { enabled : false },
      chart: { height: 350, width: 350 }
    };
    Highcharts.chart('container_', this.chartOptions_);
  }


}
