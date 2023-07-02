import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {Title} from "@angular/platform-browser";
import { DataService } from '../../data.service'
import { DatePipe } from '@angular/common';
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-sales-dashboard',
  templateUrl: './sales-dashboard.component.html',
  styleUrls: ['./sales-dashboard.component.css']
})
export class SalesDashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions : any;
  chartOptions_: any;

  productSalesData = 0
  productSale_total :any = []
  productSale_date :any = []

  orderAvgSalesData = 0
  orderAvgData :any = []
  orderAvgSale_date :any = []
  conversionData:any

  constructor(
    private titleService:Title,
    private dataService: DataService,
    public datepipe: DatePipe,
    private ngxService: NgxUiLoaderService,  
  ) { 
  this.titleService.setTitle("Sales Dashboard");
  }

  ngOnInit(): void {
    this.ngxService.start();
    this.getProductSale();
    this.getAvgOrderGraph();
    this.getConversionData();
  }

  getConversionData() {
    this.dataService.cartReport().subscribe(response => {
       if(response['success'] == true){
          this.conversionData = response['body']
           this.ngxService.stop();
        }
       
    });
  }

  getProductSale() {
    this.productSalesData = 0;
    this.dataService.getProductSaleGraph().subscribe(res => {
      if(res['success'] == true){
        let data : any = [];
        let date : any = [];
        if(res['body'] != ''){
          res['body'].forEach((element :any) => {
            data.push(element['total']);
            date.push(this.dateFormat(element['create_date']))
            this.productSalesData = this.productSalesData + element['total'];
          });
          // for (var k = 0; k < res['body'].length; k++) {
          //   this.productSalesData += res['body'][k]['total']
          //   this.productSale_total.push(res['body'][k]['total'])
          //   let date =this.datepipe.transform(res['body'][k]['create_date'], 'dd MMM');
          //   this.productSale_date.push(date);
          // }
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
              categories : date
            },
            credits: { enabled: false },
            legend: { enabled: false },
            tooltip : { enabled : false },
            chart: { height: 350, width: 350 }
          }
          Highcharts.chart('container', this.chartOptions);
          this.ngxService.stop();
        }
      }else{
        this.ngxService.stop();
      }
    },error =>{
      console.log(error);
    });
    
  }

  dateFormat(date:any){
    let d = new Date(date);
    return this.datepipe.transform(d, 'MM/dd/yyyy');
  }

  getAvgOrderGraph() {
    this.dataService.getAvgOrderGraph().subscribe(res => {
       if(res['success'] == true){
          if(res['body'] != ''){
            for (var k = 0; k < res['body'].length; k++) {
              this.orderAvgSalesData += res['body'][k]['total'];
              this.orderAvgData.push(res['body'][k]['total']);
              let date =this.datepipe.transform(res['body'][k]['create_date'], 'dd MMM');
              this.orderAvgSale_date.push(date);
            }
            this.getOrderData();
          }
        }
        this.ngxService.stop();
    });
  }

  getOrderData(){
    this.chartOptions_ = {
      title: { text: 'Order Value Over Time' },
      series: [
        {
          data: this.orderAvgData
        }
      ],
      exporting: { enabled: true },
      yAxis: {
        allowDecimals: false,
        title: {
          text: ""
        },
        tickInterval : 5
      },
      xAxis: {
        allowDecimals: false,
        title: {
          text: ""
        },
        categories : this.orderAvgSale_date
      },
      credits: { enabled: false },
      legend: { enabled: false },
      tooltip : { enabled : false },
      chart: { height: 350, width: 350 }
    };
    Highcharts.chart('container_', this.chartOptions_);
  }

}
