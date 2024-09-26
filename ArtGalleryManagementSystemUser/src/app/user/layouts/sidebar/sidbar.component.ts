import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConectActive } from '../../services/conectActive';

@Component({
  selector: 'sidbar',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './sidbar.component.html',
  host:{
    'collision': 'SidbarComponent'
  }
})
export class SidbarComponent implements OnInit {
  activeClasses = {
    userHome:'',
    contactUs:'',
    aboutUs:'',
    product:'',
    profile:'',
    auction:''
  };
  ariaUser:boolean
  ariaAuction:boolean

  showUser:string
  showAuction:string
  user:any

  constructor(
    private conectActive:ConectActive
  ) {
    this.conectActive.data$.subscribe((data) => {
      console.log(data)
      if (data) {
        this.activeClasses = { ...this.activeClasses, [data]: 'active' };
      }
    });
  }
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("loggedInUser"))
    
  }
}
