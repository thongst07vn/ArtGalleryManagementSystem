
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { BaseURLService } from '../../services/baseURL.service';
import Swal from 'sweetalert2';
import { ConectActive } from '../../services/conectActive';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './wishlist.component.html',
  host:{
    'collision': 'WishlistComponent'
  }
})
export class WishlistComponent implements OnInit {
  wishlistItems: any
  buyItems: any = []
  imageUrl:any
  wishlistResult:any
  constructor(
    private conect : Conect,
    private userService: UserService,
    private cartService: CartService,
    private productService:ProductService,
    private wishlistService: WishlistService,
    private baseURLService:BaseURLService,
    private activatedRoute: ActivatedRoute,
    private conectActive : ConectActive
  ){}
  async ngOnInit(){
    this.activatedRoute.data.subscribe(
      params => {
        this.conectActive.setData(params['addActive'])
      }
    )
    this.imageUrl=this.baseURLService.IMAGE_URL
    const user = await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser")));
    this.wishlistResult = await this.wishlistService.findallwishlist(user['result'].id)
    console.log(this.wishlistResult)
    if (this.wishlistResult['result']) {
      this.wishlistItems = []; // Initialize cartItems array
        for(let i=0; i<this.wishlistResult['result'].length; i++){
          const product = await this.productService.findProductIdWithSeller(this.wishlistResult['result'][i].productId);
          console.log(product)
          this.wishlistItems.push({
            id : this.wishlistResult['result'][i].id,
            name : this.wishlistResult['result'][i].name,
            productName:product['result'].name,           
            // categoryId:product['result'].categoryId,
            image:product['result'].image,
            price:product['result'].price,
            // quantity: this.cartResult['result'][i].quantity,
            // cardid : this.wishlistResult['result'][i].id,
            avatar: product['result'].avatar,
            username: product['result'].username,
            selectedindex: i,
            selected:false
          });
        }
      // this.wishlistItems = this.wishlistResult['result'] 
    }
    this.conect.removeScript("src/plugins/src/glightbox/glightbox.min.js")
    this.conect.removeScript("src/plugins/src/global/vendors.min.js")
    this.conect.removeScript("src/plugins/src/splide/splide.min.js")
    this.conect.removeScript("src/assets/js/apps/ecommerce-details.js")

    this.conect.removeScript("src/assets/js/apps/invoice-list.js")
    this.conect.removeScript("src/plugins/src/table/datatable/datatables.js")
    this.conect.removeScript("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.removeScript("src/assets/js/custom.js")

    this.conect.addStyle("src/plugins/src/table/datatable/datatables.css")
    this.conect.addStyle("src/plugins/css/light/table/datatable/dt-global_style.css")
    this.conect.addStyle("src/assets/css/light/apps/invoice-list.css")
    this.conect.addStyle("src/plugins/css/dark/table/datatable/dt-global_style.css")
    this.conect.addScriptAsync("src/assets/js/custom.js")

    this.conect.addStyle("src/assets/css/dark/apps/invoice-list.css")
    
    this.conect.addScriptAsync("src/plugins/src/table/datatable/datatables.js")
    this.conect.addScriptAsync("src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js")
    this.conect.addScriptAsync("src/assets/js/apps/invoice-list.js")
  }
  formattedPrice(price: { toString: () => string; }){
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  truncate(text: string, length: number, suffix: any) {
    if (text.length > length) {
      // text = text.replace(/\s+/g, '')
      return text.substring(0, length) + suffix;
    }
    return text; 
  }
  deleteAll(){
    // if(this.cartItems!=''){
    //   this.cartService.deleteallItem(this.cartResult['result'][0].cartId)
    //   window.location.href = 'user/add-to-cart'
    // }else{
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'There are no products to delete',
    //   })
    // }
  }
  addToCardAll(){

  }
  ShareAll(){
    
  }
  DeleteItem(id:any){
    console.log(id)
    this.cartService.deleteItem(id);
    window.location.href = 'user/add-to-cart'
  }
  ShareItem(id:any){

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
    
    const addtocardAButtonContainer = document.querySelector('.addtocartA');
    // Create the button once initially outside the conditional block:
    const addtocardAButton = document.createElement('button');
    addtocardAButton.classList.add('dt-button', 'dt-delete', 'btn', 'btn-info','btn-lg');
    addtocardAButton.setAttribute('tabindex', '0');
    addtocardAButton.setAttribute('aria-controls', 'invoice-list');
    addtocardAButton.textContent = 'Add All To Card';

    // Add an event listener to the button outside the conditional block:
    addtocardAButton.addEventListener('click', () => {
      this.addToCardAll(); // Assuming this refers to a defined function
    });
    addtocardAButtonContainer.appendChild(addtocardAButton);

    

    const shareAButtonContainer = document.querySelector('.shareA');

    // Create the button once initially outside the conditional block:
    const shareAButton = document.createElement('button');
    shareAButton.classList.add('dt-button', 'dt-delete', 'btn', 'btn-success','btn-lg');
    shareAButton.setAttribute('tabindex', '0');
    shareAButton.setAttribute('aria-controls', 'invoice-list');
    shareAButton.textContent = 'Share All';

    // Add an event listener to the button outside the conditional block:
    shareAButton.addEventListener('click', () => {
      this.ShareAll(); // Assuming this refers to a defined function
    });
    shareAButtonContainer.appendChild(shareAButton);

    // Only conditionally append or remove the button based on checkbox state:
    if (!isChecked) {
      deleteButtonContainer.removeChild(deleteButton)
      addtocardAButtonContainer.removeChild(addtocardAButton)
      shareAButtonContainer.removeChild(shareAButton)
      window.location.href='/user/wishlist'
    }

    const allCheckedBoxes = Array.from(document.querySelectorAll(".productchecked")) as HTMLInputElement[]
    for(let i=0; i< this.wishlistItems.length; i++){
      this.wishlistItems[i].selected = isChecked
      allCheckedBoxes[i].checked = isChecked
    }
  }
  ChangeSelectedValue(selectedindex: number,evt:any){
    const isChecked = evt.target.checked;
      this.wishlistItems[selectedindex].selected = isChecked
  }
  BuyItems(){
    this.buyItems=[]
    sessionStorage.setItem('buyItems',JSON.stringify(this.buyItems))

    for(let i = 0; i < this.wishlistItems.length; i++){
      if(this.wishlistItems[i].selected){
        this.buyItems.push(this.wishlistItems[i]);
      }
    }
    if(this.buyItems.length >0){
      sessionStorage.setItem('buyItems', JSON.stringify(this.buyItems))
      // console.log(sessionStorage.getItem('buyItems'));
      window.location.href = '../user/invoice'
    }
  }
}
