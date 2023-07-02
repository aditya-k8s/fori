import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
@Component({
  selector: 'app-visit-graph',
  templateUrl: './visit-graph.component.html',
  styleUrls: ['./visit-graph.component.css']
})
export class VisitGraphComponent implements OnInit {
  device_data : any = [];
  doughnutChartLabels : any = [];
  doughnutChartOptions : any = {};
  doughnutChartData :any = [];
  doughnutChartType : string = "doughnut";
  doughnutChartLegend : boolean = false;
  total_per : number = 0;
  constructor(
    private dataService : DataService
  ) { }

  ngOnInit(): void {
    this.getVisitGraph();
  }

  getVisitGraph(){
    this.dataService.getDeviceGraph().subscribe(response =>{
      if(response['success'] == true){
        let device_type : any = [];
        let device_count : any = [];
        this.total_per  = 0;
        this.device_data = response['body'];
        response['body'].forEach((element:any) => {
          if(element['device_type']){
            device_type.push(element['device_type'])
          }
          if(element['total']){
            device_count.push(element['total'])
          }
          this.total_per += element['total'];
        });
        this.doughnutChartLabels = device_type;
        this.doughnutChartOptions = {
          borderWidth: 1,
          maintainAspectRatio: false
        };
        this.doughnutChartData = device_count;
        this.doughnutChartType = 'doughnut';
        this.doughnutChartLegend = false;
      }else{
        console.log(response['message']);
      }
    },error =>{
      console.log(error);
    })
  }

  calculatePer(pvarTotal:any){
    pvarTotal = (pvarTotal*100)/this.total_per;
    return pvarTotal.toFixed(2) + '%';
  }
}
