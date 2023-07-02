import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
@Component({
  selector: 'app-sales-graph',
  templateUrl: './sales-graph.component.html',
  styleUrls: ['./sales-graph.component.css']
})
export class SalesGraphComponent implements OnInit {
  lineChartData1 : any = [];
  lineChartLabels1 :any
  lineChartOptions1 : any = {};
  lineChartColors1 : any;
  lineChartLegend1 : boolean = false;
  lineChartType1 : string = "line";
  constructor(
    private dataService : DataService
  ) { 
  }

  ngOnInit(): void {
    this.getGraphData();
  }

  getGraphData(){
    this.dataService.getSaleorderGraph().subscribe(response =>{
      if(response['success'] == true){
        let data = response['body'];
        let arr = [];
        let val = 0;
        for(let i = 0 ; i<12; i++){
          data.forEach((element:any) => {
            if(element['month'] == i){
              val = element['sale']
            }else{
              val = 0;
            }
          });
          arr.push(val);
        }
        this.lineChartData1 = [{ data: arr, label: 'Sales' }];
        this.lineChartLabels1 = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September','October','November','December'];
        this.lineChartOptions1 = {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                },
                gridLines: {
                  color: 'rgba(0, 0, 0, 0.1)'
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  color: 'rgba(0, 0, 0, 0.1)'
                }
              }
            ]
          },
          lineTension: 10,
          responsive: true,
          maintainAspectRatio: false,
          elements: { line: { tension: 0 } }
        };
        this.lineChartColors1 = [{
            // grey
            backgroundColor: 'rgba(6,215,156,0.0)',
            borderColor: 'rgba(57,139,247,1)',
            pointBackgroundColor: 'rgba(57,139,247,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(57,139,247,0.5)'
          },{
            // dark grey
            backgroundColor: 'rgba(57,139,247,0.0)',
            borderColor: 'rgba(57,139,247,1)',
            pointBackgroundColor: 'rgba(57,139,247,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(57,139,247,0.5)'
          }
        ];
        this.lineChartLegend1 = false;
        this.lineChartType1 = 'line';
      }else{
        console.log(response['message']);
      }
    },error =>{
      console.group(error);
    })
  }
}
