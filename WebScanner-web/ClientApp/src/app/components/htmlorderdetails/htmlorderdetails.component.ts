import { Component, OnInit, Renderer2, ChangeDetectorRef } from '@angular/core';
import { HtmlOrdersBackendServiceInterface } from '../../services/htmlorders-backendservice-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsesBackendServiceInterface } from '../../services/responses-backendservice-interface';
import { HtmlOrder } from '../../models/HtmlOrder';
import { WebAppResponse } from '../../models/Response';
import { FullHtmlResponse } from '../../models/FullResponse';
import { HtmlContent } from '../../models/HtmlContent';
import { Chart } from 'chart.js';
import { Location } from '@angular/common';

@Component({
  selector: 'app-htmlorderdetails',
  templateUrl: './htmlorderdetails.component.html',
  styleUrls: ['./htmlorderdetails.component.css']
})
export class HtmlorderdetailsComponent implements OnInit {

  constructor(
    private htmlService: HtmlOrdersBackendServiceInterface,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private responseService: ResponsesBackendServiceInterface,
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef
  ) { }

  chart = [];
  dates = [];
  data = [];
  idParam: number;
  htmlOrder: HtmlOrder = new HtmlOrder();
  responses: WebAppResponse[] = new Array<WebAppResponse>();
  htmlFullResponses: FullHtmlResponse[] = new Array<FullHtmlResponse>();
  firstChangeDate: string;


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
      this.htmlService.getHtmlOrder(this.idParam).subscribe(data => {
        this.htmlOrder = data;
      });
  }

  getResponses(): void {
    var ids: number[] = new Array<number>();
    ids[0] = this.idParam;
    this.responseService.getByOrderIds(ids).subscribe(data => {
      this.responses = data.responses;
      console.log(this.responses);
      this.responses.forEach(obj => {
        if (obj.type == "html") {
            let response: FullHtmlResponse = new FullHtmlResponse();
            let responseContent: HtmlContent = new HtmlContent();
            responseContent = JSON.parse(obj.content);
            response.content = responseContent;
            response.date = obj.date;
            response.id = obj.id;
            response.orderId = obj.orderId;
            response.type = obj.type;
            this.htmlFullResponses.push(response);
        }
      });
      this.htmlFullResponses.sort((a, b) =>
        a.date.localeCompare(b.date)
      );
        this.makeHtmlChart();
    });
  }

  makeHtmlChart() {
    this.htmlFullResponses.forEach(obj => {
      this.dates.push(obj.date);
      if (obj.content.Status == "Failure") {
        this.data.push(-1);
      }
      if (obj.content.Status == "Changed") {
        this.data.push(1);
      }
      if (obj.content.Status == "Not changed") {
        this.data.push(0);
      }
    });
    this.makeChart();
  }

  makeChart() {
    this.getFirstChangeDate();
    var cha = document.getElementById("canvas");
    cha.remove();
    var chartcontainer = document.getElementById("chartcontainer");
    var canvas = this.renderer.createElement("canvas");
    this.renderer.setAttribute(canvas, "id", "canvas");
    const text = this.renderer.createText("{{ chart }}");
    this.renderer.appendChild(canvas, text);
    this.renderer.appendChild(chartcontainer, canvas);
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            data: this.data,
            borderColor: "#fa2d2d",
            backgroundColor: "#fa2d2d",
            fill: false,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'green'
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
          text: 'Chart of changes in the html code'
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
      
        this.htmlFullResponses.forEach(obj => {
          if (obj.date == firstDate) {
            check = 1;
          }
          if (obj.date == secondDate) {
            check = 0;
          }
          if (check == 1) {
            this.dates.push(obj.date);
            if (obj.content.Status == "Failure") {
              this.data.push(-1);
            }
            if (obj.content.Status == "Changed") {
              this.data.push(1);
            }
            if (obj.content.Status == "Not changed") {
              this.data.push(0);
            }
          }
        });
      
      this.makeChart();
    }

  showAllDates() {
    this.chart = new Array();
    this.dates = new Array();
    this.data = new Array();
    this.responses = new Array();
    this.htmlFullResponses = new Array();
    this.getResponses();
  }

  goBack(): void {
    this.location.back();
  }

  goToDelete() {
      this.router.navigate(['/deleteorder/html/' + this.idParam]);
  }

  getFirstChangeDate() {
    var check: number = 1;
    this.firstChangeDate = "No change has occurred in the current scan time";
    this.htmlFullResponses.forEach(obj => {
      if (obj.content.Status == "Changed") {
        if (check == 1) {
          this.firstChangeDate = obj.date;
          check = 0;
        }
      }
    });
  }

  getLasts(amount: number) {
    if (amount > this.htmlFullResponses.length) {
      this.showAllDates();
    }
    var indexOfFirst = this.htmlFullResponses.length - amount;
    var responses = this.htmlFullResponses.slice(indexOfFirst, this.htmlFullResponses.length);
    console.log(responses);
    this.chart = [];
    this.dates = [];
    this.data = [];
    responses.forEach(obj => {
      this.dates.push(obj.date);
      if (obj.content.Status == "Failure") {
        this.data.push(-1);
      }
      if (obj.content.Status == "Changed") {
        this.data.push(1);
      }
      if (obj.content.Status == "Not changed") {
        this.data.push(0);
      }
    });
    this.makeChart();
  }


}
