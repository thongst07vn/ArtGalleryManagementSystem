
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';
import { UserService } from '../../services/user.service';
import { BaseURLService } from '../../services/baseURL.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../entities/user.entity';
import { ProductWithSeller } from '../../entities/productwithseller.entity';
import { ProductService } from '../../services/product.service';

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
  productswithsellers:any
  productItems:any
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive,
    private userService:UserService,
    private baseURLService : BaseURLService,
    private formBuilder: FormBuilder,
    private productService : ProductService
  ){
    this.reviewForm = this.formBuilder.group({
      rating: ['',Validators.required],
      reviewText:['',Validators.required]
    })
  }
  async ngOnInit(){
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

    const userResult = await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser")))
    this.user = userResult['result'] as User;
    this.activatedRoute.paramMap.subscribe(
      param=>{
        console.log(param.get('sellerId'))
        const sellerResult = this.userService.findbyid(parseInt(param.get('sellerId')))
        if(sellerResult['result']!=null){
          if(sellerResult['result'].role == 2){
            this.user = null
            this.seller = sellerResult['result'] as User
          }
        }
        
      }
    )
    console.log(this.user)
    this.productService.findallbyseller(this.user.id).then(
      async res => {
        this.productswithsellers = res as ProductWithSeller[];
        // this.productItems = []; // Initialize cartItems array
        // this.productItems.push({
        //   id : this.productswithsellers.id,
        //   name:this.productswithsellers.name,           
        //   // categoryId:product['result'].categoryId,
        //   image:this.productswithsellers.image,
        //   price:this.productswithsellers.price,
        //   quantity: this.productswithsellers.quantity,
        //   // cardid : this.cartResult['result'][i].id,
        //   // avatar: product['result'].avatar,
        //   // username: product['result'].username,
        //   // selectedindex: this.productswithsellers.id,
        //   selected:false
        // });
            
      })
    
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
  
  deleteAll(){
    // if(this.cartItems!=''){
    //   this.cartService.deleteallItem(this.cartResult['result'][0].cartId)
    //   // window.location.href = 'user/add-to-cart'
    // }else{
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'There are no products to delete',
    //   }).then(()=>{
    //     window.location.href = 'user/home'
    //   })
    // }
  }
  ChangeSelectedValueAll(evt:any){
    const isChecked = evt.target.checked;
    console.log(isChecked); // Log the checkbox state for debugging

    const deleteButtonContainer = document.querySelector('.deleteA');

    // Create the button once initially outside the conditional block:
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('dt-button', 'dt-delete', 'btn', 'btn-danger','btn-lg');
    deleteButton.setAttribute('tabindex', '0');
    deleteButton.setAttribute('aria-controls', 'invoice-list');
    deleteButton.textContent = 'Delete All';

    // Add an event listener to the button outside the conditional block:
    deleteButton.addEventListener('click', () => {
      this.deleteAll(); // Assuming this refers to a defined function
    });
    deleteButtonContainer.appendChild(deleteButton);

    // Only conditionally append or remove the button based on checkbox state:
    if (!isChecked) {
      deleteButtonContainer.removeChild(deleteButton);
      window.location.href='/user/profile'
    }

    const allCheckedBoxes = Array.from(document.querySelectorAll(".productchecked")) as HTMLInputElement[]
    for(let i=0; i< this.productswithsellers.length; i++){
      this.productswithsellers[i].selected = isChecked
      allCheckedBoxes[i].checked = isChecked
    }
  }
  ChangeSelectedValue(selectedindex: number,evt:any){
    const isChecked = evt.target.checked;
    this.productswithsellers[selectedindex].selected = isChecked
  }
  delete(event:any){

  }
}
