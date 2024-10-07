
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { BaseURLService } from '../../services/baseURL.service';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './invoice.component.html',
  host:{
    'collision': 'InvoiceComponent'
  }
})
export class InvoiceComponent implements OnInit {
  invoiceList: any = [];
  total:number;
  imageUrl:any
  
  constructor(
    private conect : Conect,
    private baseURLService:BaseURLService
  ){

  }
  ngOnInit(): void {
    this.imageUrl=this.baseURLService.IMAGE_URL
    this.invoiceList = JSON.parse(sessionStorage.getItem('buyItems'))
    this.total=0;
    for(let i =0; i< this.invoiceList.length; i++){
     
      this.total += (this.invoiceList[i].price * this.invoiceList[i].quantity);
    }
    // Các Script không sử dụng
    this.conect.removeScript("src/plugins/src/global/vendors.min.js");
    this.conect.removeScript("layouts/horizontal-light-menu/app.js");
    this.conect.removeScript("src/plugins/src/splide/splide.min.js");
    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js");


    // Các Script sử dụng + trong index
    this.conect.addScript("src/assets/js/apps/invoice-preview.js");

    // Các style có sử dụng
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")
    this.conect.addStyle("src/assets/css/light/apps/invoice-preview.css");
    this.conect.addStyle("src/assets/css/dark/apps/invoice-preview.css");
    this.conect.addStyle("src/assets/css/light/components/list-group.css")
    this.conect.addStyle("src/assets/css/dark/components/list-group.css")


    this.conect.addScriptAsync("src/plugins/src/sweetalerts2/sweetalerts2.min.js")
    this.conect.addScriptAsync("layouts/horizontal-light-menu/alert.js")


  }
}
