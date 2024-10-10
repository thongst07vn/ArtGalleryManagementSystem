
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';
import { UserService } from '../../services/user.service';
import { BaseURLService } from '../../services/baseURL.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../entities/user.entity';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  host:{
    'collision': 'ProfileComponent'
  }
})
export class ProfileComponent implements OnInit, AfterViewInit {
  user: any
  seller:any
  imageUrl:any
  star:any
  serviceStar:any
  reviewForm:FormGroup
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive,
    private userService:UserService,
    private baseURLService : BaseURLService,
    private formBuilder: FormBuilder,
  ){
    this.reviewForm = this.formBuilder.group({
      rating: ['',Validators.required],
      reviewText:['',Validators.required]
    })
  }
  ngOnInit(){
    this.imageUrl = this.baseURLService.IMAGE_URL
    
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )

    
    this.conect.addStyle("src/assets/css/light/components/list-group.css")
    this.conect.addStyle("src/assets/css/light/users/user-profile.css")
    this.conect.addStyle("src/assets/css/dark/components/list-group.css")
    this.conect.addStyle("src/assets/css/dark/users/user-profile.css")


    
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

    this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser"))).then(
      res=>{
        this.user = res['result'] as User;
        // this.conect.reloadPage()
        this.activatedRoute.paramMap.subscribe(
          param=>{
            console.log(param.get('sellerId'))
            this.userService.findbyid(param.get('sellerId')).then(
              res=>{
                if(res['result']!=null){
                  if(res['result'].role == 2){
                    this.user = null
                    this.seller = res['result'] as User
                  }
                }
              }
            );
            
          }
        )
      }
    );
    
  }
  ngAfterViewInit() {
    document.addEventListener('DOMContentLoaded', () => {
      console.log(this.star)
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
  send(){
    console.log(this.reviewForm.value)
  }
}
