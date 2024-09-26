
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule],
  templateUrl: './home.component.html',
  host:{
    'collision': 'HomeComponent'
  }
})
export class HomeComponent implements OnInit {
  // min:any
  max:any
  @ViewChild('input-number-min') min: ElementRef;
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive
  ){
    
  }
  ngOnInit(): void {

    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )

    this.conect.addStyle("src/plugins/src/noUiSlider/nouislider.min.css")
    this.conect.addStyle("src/assets/css/light/scrollspyNav.cs")
    this.conect.addStyle("src/plugins/css/light/noUiSlider/custom-nouiSlider.css")
    this.conect.addStyle("src/plugins/css/light/bootstrap-range-Slider/bootstrap-slider.css")
    this.conect.addStyle("src/assets/css/dark/scrollspyNav.cs")
    this.conect.addStyle("src/plugins/css/dark/noUiSlider/custom-nouiSlider.css")
    this.conect.addStyle("src/plugins/css/dark/bootstrap-range-Slider/bootstrap-slider.css")

    this.conect.addScriptAsync("src/plugins/src/noUiSlider/nouislider.min.js")


    this.conect.addScriptAsync("src/plugins/src/noUiSlider/custom-nouiSlider.js")

    // this.conect.reloadPage()
  }
  selectValue(){
    const inputmin = document.getElementById('input-number-min') as HTMLInputElement
    console.log(inputmin.value);
    const inputmax = document.getElementById('input-number') as HTMLInputElement
    console.log(inputmax.value);
  }
}
