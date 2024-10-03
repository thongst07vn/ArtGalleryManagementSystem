
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Conect } from '../../../conect';
import { ConectActive } from '../../services/conectActive';
import { UserService } from '../../services/user.service';
import { BaseURLService } from '../../services/baseURL.service';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './profile.component.html',
  host:{
    'collision': 'ProfileComponent'
  }
})
export class ProfileComponent implements OnInit {
  user: any
  seller:any
  imageUrl:any
  constructor(
    private conect : Conect,
    private activatedRoute : ActivatedRoute,
    private conectActive : ConectActive,
    private userService:UserService,
    private baseURLService : BaseURLService
  ){
    // this.conect.reloadPage()
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
    const userResult = await this.userService.findbyemail(JSON.parse(sessionStorage.getItem("loggedInUser")));
    this.user = userResult['result'];
    // this.conect.reloadPage()
    this.activatedRoute.paramMap.subscribe(
      async param=>{
        console.log(param.get('sellerId'))
        const sellerResult = await this.userService.findbyid(param.get('sellerId'));
        if(sellerResult['result'].role == 2){
          this.user = null
          this.seller = sellerResult['result']
        }
      }
    )
  }
}
