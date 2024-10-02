declare var google : any 
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'user-header',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './user-header.component.html',
  host:{
    'collision': 'UserHeaderComponent'
  }
})
export class UserHeaderComponent implements OnInit {
  user:any
  theme:boolean
  cartItems :any

  constructor(
    private conect : Conect,
    private userService : UserService,
    private cartService : CartService
  ){}
  async ngOnInit() {
    const userResult = await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser")));
    this.user = userResult['result'];
    if(this.user != null){
      const result = await this.cartService.innerCart(this.user.id);
      this.cartItems = result['result'].length
    }
    console.log(this.user)
    setTimeout(() => {
      const hasDarkClass = document.body.classList.contains('dark');
      this.theme = hasDarkClass;
      this.conect.setData(this.theme);
    }, 500);
  }
  logOut(){
    google.accounts.id.disableAutoSelect()
    sessionStorage.removeItem("loggedInUser")
    window.location.href = '/'
  }
  toggleTheme(){
    setTimeout(() => {
      const hasDarkClass = document.body.classList.contains('dark');
      this.theme = hasDarkClass;
      this.conect.setData(this.theme);
    }, 50);
  }
}
