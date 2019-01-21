import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerOrdersBackendServiceInterface } from '../../services/serverorders-backendservice-interface';
import { HtmlOrdersBackendServiceInterface } from '../../services/htmlorders-backendservice-interface';

@Component({
  selector: 'app-deleteorder',
  templateUrl: './deleteorder.component.html',
  styleUrls: ['./deleteorder.component.css']
})
export class DeleteorderComponent implements OnInit {

  constructor(
    private serverService: ServerOrdersBackendServiceInterface,
    private htmlService: HtmlOrdersBackendServiceInterface,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  idParam: number;
  typeParam: string;
  a: number = 1;

  ngOnInit() {
    this.detectUrlParam();
  }

  detectUrlParam(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idParam = params["id"];
      this.typeParam = params["type"];
    });
  }

  goBack(): void {
    this.location.back();
  }

  deleteOrder(): void{
    if (this.typeParam === "server") {
      this.serverService.deleteServerOrder(this.idParam).subscribe(data => {
        this.a = data;
        console.log(this.a);
        this.router.navigate(['/home']);
      });
    }
    else if (this.typeParam === "html") {
      this.htmlService.deleteHtmlOrder(this.idParam).subscribe(data => {
        this.a = data;
        console.log(this.a);
        this.router.navigate(['/home']);
      });
    }
  }
}
