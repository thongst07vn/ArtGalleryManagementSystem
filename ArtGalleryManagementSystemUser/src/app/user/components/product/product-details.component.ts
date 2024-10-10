
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
import { BaseURLService } from '../../services/baseURL.service';
import { ProductWithAttributes } from '../../entities/productwithattributes.entity';
import { ProductWithSeller } from '../../entities/productwithseller.entity';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './product-details.component.html',
  host:{
    'collision': 'ProductDetailsComponent'
  }
})
export class ProductDetailsComponent implements OnInit {
  product:ProductWithAttributes
  productId: string
  addsuccess:boolean
  userId:any
  user:any
  imageUrl:any
  buyItems: any = []
  buyQuantity: number
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive,
    private productService: ProductService,
    private userService: UserService,
    private cartService: CartService,
    private baseURLService:BaseURLService
  ){
  }
  async ngOnInit() {
    this.buyQuantity = 1;
    this.imageUrl=this.baseURLService.IMAGE_URL
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    this.addsuccess = false;
    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")
    this.conect.removeScript("src/plugins/src/leaflet/leaflet.js")
    this.conect.removeScript("src/assets/js/apps/invoice-list.js")
    this.conect.removeScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.removeScript("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.removeScript("src/assets/js/custom.js")
    this.conect.removeScript("src/plugins/src/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js")
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
    this.conect.addStyle("src/plugins/css/light/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")
    
    this.conect.addScriptAsync("src/plugins/src/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js")
    this.conect.addScriptAsync("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.addScriptAsync("src/plugins/src/splide/splide.min.js")
    this.conect.addScriptAsync("src/assets/js/apps/ecommerce-details.js")
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")
    this.conect.addScriptAsync("src/plugins/src/sweetalerts2/sweetalerts2.min.js")
    // this.conect.reloadPage()
    this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser"))).then(
      res=>{
        this.user = res['result'] as User
        if(this.user!=null){
          this.userId = this.user.id
        }
      })
    this.activatedRoute.paramMap.subscribe(
      async params => {
        this.productId = params.get('productId');
        await this.productService.findProductIdWithAttributes(parseInt(params.get('productId'))).then(
          res => {
            this.product = res as ProductWithAttributes
            console.log(this.product);
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
  }
  addQuantity(){
    if(this.buyQuantity < this.product.quantity){
      this.buyQuantity +=1;
    }
  }
  minusQuantity(){
    if(this.buyQuantity > 1){
      this.buyQuantity -=1;
    }
  }
  async addToCart(productID:any){
    await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser"))).then(
      async res=>{
        if(res['result']){
          this.user = res['result'] as User;
          const cartItem = new CartItem();
          cartItem.cartId = this.user.id;
          cartItem.productId = productID;
          cartItem.quantity = this.buyQuantity;
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
  async BuyItems(){
    console.log(this.user);
    this.buyItems=[]
    sessionStorage.setItem('buyItems',JSON.stringify(this.buyItems))
    await this.productService.findProductIdWithSeller(parseInt(this.productId)).then(
      res => {
        const product = res['result'] as ProductWithSeller
        
        this.buyItems.push(
          {
              id : product.id,
              name:product.name,           
              categoryId:product.categoryId,
              image:product.image,
              price:product.price,
              quantity: this.buyQuantity,
              cardid : this.userId,
              avatar: product.avatar,
              username: product.username,
          }
        )
        if(this.buyItems.length >0){
          sessionStorage.setItem('buyItems', JSON.stringify(this.buyItems))
          // console.log(sessionStorage.getItem('buyItems'));
          window.location.href = '../user/invoice'
        }
      },
      error =>{
        console.log(error);
      }
    )
    
  }
  contactUs(){
    window.location.href = '/user/contact-us'
  }
  login(){ 
    Swal.fire({
      title: 'You Love It ?',
      text: 'Please Login !',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes !',
      cancelButtonText: 'No !',
      reverseButtons: true

    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/login'
      }
    })
  }
}

