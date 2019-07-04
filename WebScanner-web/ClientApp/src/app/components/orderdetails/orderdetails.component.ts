import { Component, OnInit, Renderer2, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerOrdersBackendServiceInterface } from '../../services/serverorders-backendservice-interface';
import { HtmlOrdersBackendServiceInterface } from '../../services/htmlorders-backendservice-interface';
import { Location } from '@angular/common';
import { HtmlOrder } from '../../models/HtmlOrder';
import { ServerOrder } from '../../models/ServerOrder';
import { ResponsesBackendServiceInterface } from '../../services/responses-backendservice-interface';
import { WebAppResponse } from '../../models/Response';
import { ApiResponse } from '../../models/ApiResponse';
import { Console } from '@angular/core/src/console';
import { log } from 'util';
import { ServerContent } from '../../models/ServerContent';
import { Chart } from 'chart.js';
import { FullHtmlResponse, FullServerResponse } from '../../models/FullResponse';
import { HtmlContent } from '../../models/HtmlContent';



@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  constructor(
    private serverService: ServerOrdersBackendServiceInterface,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private responseService: ResponsesBackendServiceInterface,
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef
  ) { }

  chart = [];
  chartinaccessible = [];
  dates = [];
  data = [];
  idParam: number;
  serverOrder: ServerOrder = new ServerOrder();
  responses: WebAppResponse[] = new Array<WebAppResponse>();
  serverFullResponses: FullServerResponse[] = new Array<FullServerResponse>();
  average: number = 0;
  averageString: string;
  percentageOfInaccessible: number = 0;
  inaccessibleData: number[] = new Array<number>();
  worstLatency: string;
  bestLatency: string;

  ngOnInit() {
    this.detectUrlParam();
    this.getOrder();
    this.getResponses();
  }

  detectUrlParam(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idParam = params["id"];
    });
  }

  getOrder(): void {
      this.serverService.getServerOrder(this.idParam).subscribe(data => {
        this.serverOrder.frequency = data.frequency;
        this.serverOrder.id = data.id;
        this.serverOrder.question = data.question;
        this.serverOrder.targetAddress = data.targetAddress;
      });
  }

  getResponses(): void {
    var ids: number[] = new Array<number>();
    ids[0] = this.idParam;
    this.responseService.getByOrderIdAndType(this.idParam, 'server').subscribe(data => {
      this.responses = data;
      console.log(this.responses);
      this.responses.forEach(obj => {
        if (obj.type == "server") {
            let response: FullServerResponse = new FullServerResponse();
            let responseContent: ServerContent = new ServerContent();
            responseContent = JSON.parse(obj.content);
            response.content = responseContent;
            response.date = obj.date;
            response.id = obj.id;
            response.orderId = obj.orderId;
            response.type = obj.type;
            this.serverFullResponses.push(response);
        }
      });
      this.serverFullResponses.sort((a, b) => 
        a.date.localeCompare(b.date)
      );
        this.makeServerChart();
    });
  }

  makeServerChart() {
    this.serverFullResponses.forEach(obj => {
      this.dates.push(obj.date);
      this.data.push(obj.content.Latency);
    });
    
    this.makeChart();
  }

  makeChart() {
    this.getAverage();
    this.getInaccessibleData();
    this.getWorstLatency();
    this.getBestLatency();
    var cha = document.getElementById("canvas");
    cha.remove();
    var chartcontainer = document.getElementById("chartcontainer");
    var canvas = this.renderer.createElement("canvas");
    this.renderer.setAttribute(canvas,"id", "canvas");
    const text = this.renderer.createText("{{ chart }}");
    this.renderer.appendChild(canvas, text);
    this.renderer.appendChild(chartcontainer, canvas);
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.dates,
        datasets: [
          {
            data: this.data,
            borderColor: "#fa2d2d",
            backgroundColor: "#fa2d2d",
            fill: false,
            hoverBackgroundColor: '#e6c3b5',
            
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false
            
          }],
          yAxes: [{
            display: true
            
          }],
        },
        title: {
          display: true,
          text: 'Server latency graph over time'
        }
      }
    });
    this.changeDetector.detectChanges();
  }

  addNewDates(firstDate: string, secondDate: string) {
    this.chart = [];
    let check: number = 0;
    this.dates = [];
    this.data = [];
    this.serverFullResponses.forEach(obj => {
      if (obj.date == firstDate) {
        check = 1;
      }
      if (obj.date == secondDate) {
        check = 0;
      }
      if (check == 1) {
        this.dates.push(obj.date);
        this.data.push(obj.content.Latency);
      }
    });
    console.log(this.dates);
    console.log(this.data);
    this.makeChart();
  }

  showAllDates() {
    this.chart = new Array();
    this.dates = new Array();
    this.data = new Array();
    this.responses = new Array();
    this.serverFullResponses = new Array();
    this.getResponses();
  }

  goBack(): void {
    this.location.back();
  }

  goToDelete() {
      this.router.navigate(['/deleteorder/server/' + this.idParam]);
  }

  getAverage() {
    this.average = 0;
    this.data.forEach(obj => {
      if (obj != 0) {
        this.average += obj;
      }
    });
    this.average = this.average / this.data.length;
    this.averageString = this.average.toPrecision(3).toString() + "ms";
    console.log(this.average);
    
  }

  getInaccessibleData() {
    this.inaccessibleData = new Array<number>();
    this.percentageOfInaccessible = 0;
    this.data.forEach(obj => {
      if (obj != 0) {
        this.percentageOfInaccessible++;
      }
    });
    this.inaccessibleData.push((this.percentageOfInaccessible / this.data.length) * 100);
    this.inaccessibleData.push(((this.data.length - this.percentageOfInaccessible) / this.data.length) * 100);
    var cha = document.getElementById("canvasin");
    cha.remove();
    var chartcontainer = document.getElementById("chartcontainerin");
    var canvas = this.renderer.createElement("canvas");
    this.renderer.setAttribute(canvas, "id", "canvasin");
    const text = this.renderer.createText("{{ chartinaccessible }}");
    this.renderer.appendChild(canvas, text);
    this.renderer.appendChild(chartcontainer, canvas);
    this.chartinaccessible = new Chart('canvasin', {
      type: 'doughnut',
      data: {
        labels: ["Accessible", "Inaccessible"],
        datasets: [{
          label: "The percentage of server availability",
          backgroundColor: ["#12204f", "#fa2d2d"],
          data: this.inaccessibleData,
          hoverBackgroundColor: "#e6c3b5"
        }]
      },
      options: {
        title: {
          display: true,
          text: 'The percentage of server availability'
        },
        
      }
    });
  }

  getWorstLatency() {
    
    var tempLat: number = 0;
    this.data.forEach(obj => {
      if (obj > tempLat) {
        tempLat = obj;
      }
    });
    this.worstLatency = tempLat.toString() + "ms";
    
  }

  getBestLatency() {
    var tempLat: number = 10000;
    this.data.forEach(obj => {
      if (obj != 0) {
        if (obj < tempLat) {
          tempLat = obj;
        }
      }
    });
    this.bestLatency = tempLat.toString() + "ms";
  }

  getLasts(amount: number) {
    if (amount > this.serverFullResponses.length) {
      this.showAllDates();
    }
    var indexOfFirst = this.serverFullResponses.length - amount;
    var responses = this.serverFullResponses.slice(indexOfFirst, this.serverFullResponses.length);
    console.log(responses);
    this.chart = [];
    this.dates = [];
    this.data = [];
    responses.forEach(obj => {
      this.dates.push(obj.date);
      this.data.push(obj.content.Latency);
    });
    this.makeChart();
  }
}
