
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../entities/product.entity';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule,NgClass],
  templateUrl: './home.component.html',
  host:{
    'collision': 'HomeComponent'
  }
})
export class HomeComponent implements OnInit {
   // Pagination variables
   totalItems: number = 0;
   itemsPerPage: number = 12;
   currentPage: number = 1;
  productsToDisplay: Product[] = []; // Array for displaying current page items

  products: Product[]
  // min:any
  max:any
  @ViewChild('input-number-min') min: ElementRef;
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive,
    private productService: ProductService
  ){
    
  }
  ngOnInit(): void {
    this.productService.findall().then(
      res => {
        this.products = res as Product[]
        this.totalItems = this.products?.length || 0; // Assuming products length
        this.updateDisplayedProducts(); // Update displayed products on initial load
      },
      error => {
        console.log(error)
      }
    )
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
    this.conect.addStyle("src/assets/css/light/elements/custom-pagination.css")
    this.conect.addStyle("src/assets/css/dark/elements/custom-pagination.css")
    
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

  truncate(text: string, length: number, suffix: any) {
    if (text.length > length) {
      // text = text.replace(/\s+/g, '')
      return text.substring(0, length) + suffix;
    }
    return text; 
  }
  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    const visiblePages = 5; // Adjust as needed
    const startPage = Math.max(this.currentPage - Math.floor(visiblePages / 2), 1);
    const endPage = Math.min(startPage + visiblePages - 1, totalPages);
    const pageNumbers: number[] = [];
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage; 
    this.productsToDisplay = this.products.slice(startIndex, endIndex);
  }

  // Event handlers for pagination interactions (implement in your component)
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updateDisplayedProducts();
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }

  onNextPage() {
    if (this.currentPage < Math.ceil(this.totalItems / this.itemsPerPage)) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }
  next(){
    return Math.ceil(this.totalItems / this.itemsPerPage)
  }
}
