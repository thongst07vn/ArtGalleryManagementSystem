
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../entities/product.entity';
import { formatDate, NgClass } from '@angular/common';

import { ProductWithSeller } from '../../entities/productwithseller.entity';
import { UserService } from '../../services/user.service';
import { CartItem } from '../../entities/cartitem.entity';
import { User } from '../../entities/user.entity';
import { CartService } from '../../services/cart.service';
import { BaseURLService } from '../../services/baseURL.service';


@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule,NgClass,ReactiveFormsModule],
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
  userId:any
  user:any
  productsToDisplay: ProductWithSeller[] = []; // Array for displaying current page items
  createWishList:FormGroup
  productswithseller: ProductWithSeller[]
  artName:any
  // min:any
  max:any
  imageUrl:any
  @ViewChild('input-number-min') min: ElementRef;
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive,
    private productService: ProductService,
    private userService:UserService,
    private cartService:CartService,
    private baseURLService:BaseURLService,
    private formBuilder : FormBuilder
  ){
    
  }
  ngOnInit(): void {
    this.imageUrl=this.baseURLService.IMAGE_URL
    this.productService.findallwithseller().then(
      res => {
        this.productswithseller = res as ProductWithSeller[];
        this.totalItems = this.productswithseller?.length || 0; // Assuming products length

        this.updateDisplayedProducts(); // Update displayed products on initial load
      },
      error => {
        console.log(error)
      }
    )
    this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser"))).then(
      res=>{
        this.user = res['result'] as User
        this.userId = this.user.id
      })
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
    this.conect.addStyle("src/assets/css/light/components/modal.css");
    this.conect.addStyle("src/assets/css/dark/components/modal.css");

    this.conect.addScriptAsync("src/plugins/src/noUiSlider/nouislider.min.js")


    this.conect.addScriptAsync("src/plugins/src/noUiSlider/custom-nouiSlider.js")

    // this.conect.reloadPage()
  }
  selectValueLowHigh(evt:any){
    const inputmin = document.getElementById('input-number-min') as HTMLInputElement  
    const inputmax = document.getElementById('input-number') as HTMLInputElement
    this.productService.sortbypricelowhigh(evt.target.value,parseFloat(inputmin.value),parseFloat(inputmax.value)).then(
      res => {
        this.productswithseller = res as ProductWithSeller[];
        this.totalItems = this.productswithseller?.length || 0; // Assuming products length
        this.currentPage = 1;
        this.updateDisplayedProducts();
      },
      error => {
        console.log(error);
      }
    )
  }
  selectValue(){
    const inputmin = document.getElementById('input-number-min') as HTMLInputElement  
    const inputmax = document.getElementById('input-number') as HTMLInputElement

    this.productService.sortbyprice(parseFloat(inputmin.value),parseFloat(inputmax.value)).then(
      res => {
        this.productswithseller = res as ProductWithSeller[];
        this.totalItems = this.productswithseller?.length || 0; // Assuming products length
        this.currentPage = 1;
        this.updateDisplayedProducts();
      },
      error => {
        console.log(error);
      }
    );
  }
  searchProduct(evt:any){
    if(evt.target.value == '' || evt.target.value == null){
      this.productService.findallwithseller().then(
        res => {
          this.productswithseller = res as ProductWithSeller[];
          this.totalItems = this.productswithseller?.length || 0; // Assuming products length
          this.currentPage = 1;
          this.updateDisplayedProducts(); // Update displayed products on initial load
        },
        error => {
          console.log(error)
        }
      )
    }
    else {
      this.productService.searchByKeyword(evt.target.value).then(
        res => {
          this.productswithseller = res as ProductWithSeller[];
          this.totalItems = this.productswithseller?.length || 0; // Assuming products length
          this.currentPage = 1;
          this.updateDisplayedProducts();
        },
        error => {
          console.log(error);
        }
      )
    }
    
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

    this.productsToDisplay = this.productswithseller.slice(startIndex, endIndex);

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

  async addToCart(productID:any){
    await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser"))).then(
      res=>{
        if(res['result']){
          this.user = res['result'] as User;
          const cartItem = new CartItem();
          cartItem.cartId = this.user.id;
          cartItem.productId = productID;
          cartItem.quantity = 1;
          cartItem.createdAt = formatDate(new Date(),'dd-MM-yyyy','en-us');
          this.cartService.addToCart(cartItem).then(
            res => {
              if(res['result']){
                console.log('add success');
                window.location.href = 'user/home'
              }
              else{
                console.log('add failed')
              }
            },
            error => {
              console.log(error);
            }
          )
        }
      },
      error=>{
        console.log(error)
      }
    )
  }
  async creatWishlist(productID:any){
    const pro = await this.productService.findProductId(productID)
    this.artName = pro['name']
  }
}
