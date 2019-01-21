import { Component, OnInit } from '@angular/core';
import { ServerOrdersBackendServiceInterface } from '../../services/serverorders-backendservice-interface';
import { ServerOrder } from '../../models/ServerOrder';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addserverorder',
  templateUrl: './addserverorder.component.html',
  styleUrls: ['./addserverorder.component.css']
})
export class AddserverorderComponent implements OnInit {

  constructor(
    private serverService: ServerOrdersBackendServiceInterface,
    private location: Location
  ) { }

  order: ServerOrder = new ServerOrder();

  ngOnInit() { }

  onSubmit(order: ServerOrder): void {
    this.serverService.addServerOrder(order).subscribe(
      onSuccess => {
        console.log(onSuccess);
        this.location.back();
      },
      onError => console.log(onError));
  }
}
