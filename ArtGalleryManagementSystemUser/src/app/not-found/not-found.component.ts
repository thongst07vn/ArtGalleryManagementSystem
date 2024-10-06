import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Conect } from '../conect';
import { asyncScheduler, interval, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs/operators';
import { ConectActive } from '../user/services/conectActive';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'] 
})
export class NotFoundComponent implements OnInit{

  constructor(
    private conect : Conect
  ){}

  ngOnInit(): void {
    this.conect.addStyle("layouts/horizontal-light-menu/css/light/plugins.css")
    this.conect.addStyle("src/assets/css/light/pages/error/error.css")

    this.conect.addStyle("layouts/horizontal-light-menu/css/dark/plugins.css")
    this.conect.addStyle("src/assets/css/light/pages/error/error.css")

    this.conect.removeStyle("src/assets/css/light/elements/custom-pagination.css")
    this.conect.removeStyle("src/assets/css/light/apps/blog-post.css")
    this.conect.removeStyle("src/assets/css/dark/elements/custom-pagination.css")
    this.conect.removeStyle("src/assets/css/dark/apps/blog-post.css")

    


  }
}
