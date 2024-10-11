import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConectActive } from '../../services/conectActive';
import { CartService } from '../../services/cart.service';
import { User } from '../../entities/user.entity';
import { UserService } from '../../services/user.service';
import { BaseURLService } from '../../services/baseURL.service';
import { Order } from '../../entities/order.entity';
// import {WebcamInitError, WebcamModule} from 'ngx-webcam';
@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink,ReactiveFormsModule],
  templateUrl: './product-rate.component.html',
  // styleUrls: ['./product-rate.component.css']
})
export class ProductRateComponent implements OnInit, AfterViewInit {
  star:any
  serviceStar:any
  reviewForm:FormGroup
  imageUrl:any
  user:any
  orders:any
  seller:any
  productReviewName:string
  productReviewImage:string
  constructor(
    private conect : Conect,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private conectActive: ConectActive,
    private cartService : CartService,
    private userService : UserService,
    private baseURLService : BaseURLService
  ) {
    this.reviewForm = this.formBuilder.group({
      rating: ['',Validators.required],
      reviewText:['',Validators.required]
    })
  }

  async ngOnInit(){
    this.imageUrl=this.baseURLService.IMAGE_URL

    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    

    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    // this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")

    this.conect.removeScript("src/assets/js/apps/invoice-list.js")
    this.conect.removeScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.removeScript("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.removeScript("src/assets/js/custom.js")

    
    this.conect.addStyle("src/plugins/src/table/datatable/datatables.css")
    this.conect.addStyle("src/plugins/css/light/table/datatable/dt-global_style.css")
    this.conect.addStyle("src/assets/css/light/apps/invoice-list.css")
    this.conect.addStyle("src/plugins/css/dark/table/datatable/dt-global_style.css")
    this.conect.addScriptAsync("src/assets/js/custom.js")
    this.conect.addStyle("src/plugins/src/sweetalerts2/sweetalerts2.css")

    this.conect.addStyle("src/plugins/css/light/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/plugins/css/dark/sweetalerts2/custom-sweetalert.css")
    this.conect.addStyle("src/assets/css/dark/apps/invoice-list.css")
    this.conect.addStyle("layouts/horizontal-light-menu/css/product-rate.css")
    this.conect.addScriptAsync("src/plugins/src/table/datatable/datatables.js")
    this.conect.addScriptAsync("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.addScriptAsync("src/assets/js/apps/invoice-list.js")


    this.conect.addStyle("src/assets/css/light/components/modal.css");
    this.conect.addStyle("src/assets/css/dark/components/modal.css");
    const userResult = await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser")));
    this.user = userResult['result'];
    if(this.user != null){
      const result = await this.cartService.findallorder(this.user.id);
      this.orders = result['result'] as Order[]
    }
    console.log(this.orders)
  }

  ngAfterViewInit() {
    document.addEventListener('DOMContentLoaded', () => {
      // Product rating stars
      document.querySelectorAll('.star-rating.product-stars i[data-star]').forEach((starElement) => {
        starElement.addEventListener('click', () => {
           // Ghi log khi ngôi sao được nhấn
          this.star = starElement.getAttribute('data-star');
          const stars = starElement.parentElement?.children;
  
          if (stars) {
            for (let i = 0; i < stars.length; i++) {
              stars[i].classList.remove('text-warning');
              stars[i].classList.add('text-secondary');
  
              if (i < Number(this.star)) {
                stars[i].classList.remove('text-secondary');
                stars[i].classList.add('text-warning');
              }
            }
          }
          this.reviewForm = this.formBuilder.group({
            rating: [this.star,Validators.required],
            reviewText:['',Validators.required]
          })
        });
      });
  
      
    });
  }
  showReview(productName:any,productImage:any){
    this.productReviewName = productName
    this.productReviewImage = productImage
    this.reviewForm.value.productName
  }
  send(){
    
    console.log(this.reviewForm.value)
  }
  // handleInitError(error: WebcamInitError): void {
  //   if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
  //     console.warn("Camera access was not allowed by user!");
  //   }
  // }
  close(){
    window.location.href = 'user/product-rate'
  }
}
