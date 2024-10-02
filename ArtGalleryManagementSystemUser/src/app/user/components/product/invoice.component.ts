
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './invoice.component.html',
  host:{
    'collision': 'InvoiceComponent'
  }
})
export class InvoiceComponent implements OnInit {
  constructor(
    private conect : Conect
  ){

  }
  ngOnInit(): void {
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
