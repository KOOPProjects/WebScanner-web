import { Component, OnInit } from '@angular/core';
import { HtmlOrder } from '../../models/HtmlOrder';
import { HtmlOrdersBackendServiceInterface } from '../../services/htmlorders-backendservice-interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addhtmlorder',
  templateUrl: './addhtmlorder.component.html',
  styleUrls: ['./addhtmlorder.component.css']
})
export class AddhtmlorderComponent implements OnInit {

  constructor(
    private htmlService: HtmlOrdersBackendServiceInterface,
    private location: Location
  ) { }

  order: HtmlOrder = new HtmlOrder();

  ngOnInit() { }

  onSubmit(order: HtmlOrder): void {
    this.htmlService.addHtmlOrder(order).subscribe(
      onSuccess => {
        console.log(onSuccess);
        this.location.back();
      },
      onError => console.log(onError));
    
  }
}
