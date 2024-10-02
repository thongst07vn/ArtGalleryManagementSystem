
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';
import { param } from 'jquery';
import { ProductService } from '../../services/product.service';
import { Product } from '../../entities/product.entity';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user.entity';
import { CartItem } from '../../entities/cartitem.entity';
import { formatDate } from '@angular/common';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './product-details.component.html',
  host:{
    'collision': 'ProductDetailsComponent'
  }
})
export class ProductDetailsComponent implements OnInit {
  product:Product
  addsuccess:boolean
  userId:any
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive,
    private productService: ProductService,
    private userService: UserService,
    private cartService: CartService
  ){
    
  }
  ngOnInit(): void {
    this.addsuccess = false;
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.productService.findProductId(parseInt(params.get('productId'))).then(
          res => {
            this.product = res as Product
          },
          error => {
            console.log(error);
          }
        )
      },
      error => {
        console.log(error)
      }
    )
    this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser"))).then(
      res=>{
        let user = res['result'] as User
        this.userId = user.id
      })
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")

    this.conect.removeScript("src/plugins/src/leaflet/leaflet.js")
    this.conect.removeScript("src/assets/js/apps/invoice-list.js")
    this.conect.removeScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.removeScript("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.removeScript("src/assets/js/custom.js")
    this.conect.removeScript("src/plugins/src/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js")

    this.conect.addStyle("src/assets/css/light/components/accordions.css")
    this.conect.addStyle("src/assets/css/dark/components/accordions.css")
    this.conect.addStyle("src/plugins/src/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css")
    this.conect.addStyle("src/plugins/src/glightbox/glightbox.min.css")
    this.conect.addStyle("src/plugins/src/splide/splide.min.css")
    this.conect.addStyle("src/assets/css/light/components/tabs.css")
    this.conect.addStyle("src/assets/css/light/apps/ecommerce-details.css")
    this.conect.addStyle("src/assets/css/dark/components/tabs.css")
    this.conect.addStyle("src/assets/css/dark/apps/ecommerce-details.css")
    this.conect.addStyle("src/plugins/css/light/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")
    

    this.conect.addScriptAsync("src/plugins/src/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js")
    this.conect.addScriptAsync("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.addScriptAsync("src/plugins/src/splide/splide.min.js")
    this.conect.addScriptAsync("src/assets/js/apps/ecommerce-details.js")
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")
    this.conect.addScriptAsync("src/plugins/src/sweetalerts2/sweetalerts2.min.js")
    this.conect.reloadPage()

    
  }
  
  async addToCart(productID:any){
    await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser"))).then(
      async res=>{
        if(res['result']){
          let user = res['result'] as User;
          const cartItem = new CartItem();
          cartItem.cartId = user.id;
          cartItem.productId = productID;
          cartItem.quantity = 1;
          cartItem.createdAt = formatDate(new Date(),'dd-MM-yyyy','en-us');
          await this.cartService.addToCart(cartItem).then(
            res => {
              if(res['result']){
                console.log('add success');
                this.addsuccess = true;               
                    Swal.fire({
                      icon: 'success',
                      title: 'Add success',
                  })                                         
                 
                // window.location.href = 'user/home'
              }
              else{
                console.log('add failed');
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
  buy(){
    window.location.href='user/invoice'
  }
  contactUs(){
    window.location.href = '/user/contact-us'
  }
}
