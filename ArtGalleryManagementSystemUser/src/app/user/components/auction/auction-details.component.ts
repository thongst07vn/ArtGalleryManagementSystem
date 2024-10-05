
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { asyncScheduler, interval, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs/operators';
import { ConectActive } from '../../services/conectActive';
@Component({
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './auction-details.component.html',
  host:{
    'collision': 'AuctionDetailsComponent'
  }
})
export class AuctionDetailsComponent implements OnInit {
  theme: boolean;

  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive
  ){
    
  }
  async ngOnInit() {
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    setTimeout(() => {
      this.conect.getData().subscribe(data => {
        this.theme = data;
      });
    }, 1000);
    
    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")
    this.conect.removeScript("src/plugins/src/filepond/filepond.min.js")
    this.conect.removeScript("src/plugins/src/filepond/FilePondPluginImageTransform.min.js")
    this.conect.removeScript("src/assets/js/apps/ecommerce-details.js")


    this.conect.addStyle("src/assets/css/light/components/accordions.css")
    this.conect.addStyle("src/assets/css/dark/components/accordions.css")
    this.conect.addStyle("src/plugins/src/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css")
    this.conect.addStyle("src/plugins/src/glightbox/glightbox.min.css")
    this.conect.addStyle("src/plugins/src/splide/splide.min.css")
    this.conect.addStyle("src/assets/css/light/components/tabs.css")
    this.conect.addStyle("src/assets/css/light/apps/ecommerce-details.css")
    this.conect.addStyle("src/assets/css/dark/components/tabs.css")
    this.conect.addStyle("src/assets/css/dark/apps/ecommerce-details.css")
    

    this.conect.addScriptAsync("src/plugins/src/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js")
    this.conect.addScriptAsync("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.addScriptAsync("src/plugins/src/splide/splide.min.js")
    this.conect.addScriptAsync("src/assets/js/apps/ecommerce-details.js")
    
    this.conect.reloadPage()

    this.conect.getData().subscribe(data => {
      this.theme = data;
    });
  }
}
